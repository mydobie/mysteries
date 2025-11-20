import OpenAI from 'openai';

import { generateMessageId } from './utils';
import { MESSAGE_LIMIT } from './constants';

import { Message } from './types';


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


interface GenerateResponseProps {
  openai: OpenAI;
  model: string;
  prompt: string;
  aiLog: Message[];
  role?: Message['role'];
  testMessage?: any;
  calibrationPrompt: string;
  initialPrompts: string
}

export async function generateResponse({ openai, model, prompt, aiLog, role = 'user', testMessage, calibrationPrompt, initialPrompts }: GenerateResponseProps) {
  let aiNewLog = [...aiLog];

  if (aiNewLog.length >= MESSAGE_LIMIT) {
    const summary = await generateSummary(openai, model, aiNewLog);
    if (summary) {
      aiNewLog = [
        {
          role: 'system',
          content: calibrationPrompt,
          id: generateMessageId('system-calibration'),
        },
        {
          role: 'system',
          content: initialPrompts,
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
        content: calibrationPrompt,
        id: generateMessageId('system-calibration'),
      },
      {
        role: 'system',
        content: initialPrompts,
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
