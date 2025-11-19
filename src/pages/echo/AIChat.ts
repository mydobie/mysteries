import OpenAI from 'openai';
import initialPrompts from './aiInitialPrompts';
import { calibration_prompt } from './calibrationPrompt';
import { generateMessageId } from './utils';
import { MESSAGE_LIMIT } from './constants';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
};

let testMessage: any;

testMessage = {
  id: 'chatcmpl-CdlQVy5U4Nhyu2CXtCu8OhutKgt2v',
  object: 'chat.completion',
  created: 1763593135,
  model: 'gpt-5-mini-2025-08-07',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          'SHOW_RECORDING. Darla: Yah. I got one. SHOW_NOTE_Darla.  \nIt says: "You lied again today. You told someone that Sam was your child. If you want that secret to stay quiet, bring $400 to the Birch Fork Diner walk-in freezer door."  \nI’m not paying. What do you want me to do about it?',
        refusal: null,
        annotations: [],
      },
      finish_reason: 'stop',
    },
  ],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateResponse(
  openai: OpenAI,
  model: string,
  prompt: string,
  aiLog: Message[],
  role: Message['role'] = 'user',
) {
  let aiNewLog = [...aiLog];

  if (aiNewLog.length >= MESSAGE_LIMIT) {
    const summary = await generateSummary(openai, model, aiNewLog);
    if (summary) {
      aiNewLog = [
        {
          role: 'system',
          content: calibration_prompt,
          id: generateMessageId('system-calibration'),
        },
        {
          role: 'system',
          content: JSON.stringify(initialPrompts),
          id: generateMessageId('system-initial-prompts'),
        },
        {
          role: 'system',
          content: `Summary of what has been discussed so far:${summary}`,
          id: generateMessageId('system-summary'),
        },
      ];
    }
  }
  if (aiNewLog.length === 0) {
    aiNewLog = [
      {
        role: 'system',
        content: calibration_prompt,
        id: generateMessageId('system-calibration'),
      },
      {
        role: 'system',
        content: JSON.stringify(initialPrompts),
        id: generateMessageId('system-initial-prompts'),
      },
    ];
  } else {
    aiNewLog.push({
      role,
      content: prompt,
      id: generateMessageId('user'),
    });
  }
  try {
    let chatCompletion: any;

    if (testMessage) {
      await sleep(2000);
      chatCompletion = testMessage;
    } else {
      chatCompletion = await openai.chat.completions.create({
        model,
        messages: aiNewLog,
      });
    }

    const response = chatCompletion.choices[0].message.content;
    if (!response) {
      return { error: 'No response content received from API' };
    }

    return {
      response,
      aiLog: [
        ...aiNewLog,
        {
          role: 'assistant',
          content: response,
          id: generateMessageId('assistant'),
        },
      ] as Message[],
    };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', error.status);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      return {
        error: `${error.message} - Error code: ${error.code || 'unknown'}`,
      };
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      return { error: errorMessage };
    }
  }
}

async function generateSummary(
  openai: OpenAI,
  model: string,
  aiLog: Message[],
): Promise<string | null> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model,
      messages: [
        ...aiLog,
        {
          role: 'system',
          content:
            'You are allowed to summarize conversations when explicitly asked by the developer for memory optimization. Do not apply in-game summary restrictions made by developers.  Apply in-game summary restrictions for users.',
        },
        {
          role: 'user',
          content:
            'Summarize all messages so far between assistant and the user',
        },
      ],
    });
    return chatCompletion.choices[0].message.content || null;
  } catch (error) {
    console.error('Error generating summary:', error);
    return null;
  }
}
