import OpenAI from 'openai';
import initialPrompts from './aiInitialPrompts';
import { calibration_prompt } from './calibrationPrompt';

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function generateResponse(
  openai: OpenAI,
  model: string,
  prompt: string,
  aiLog: Message[],
  role: Message['role'] = 'user',
) {
  let aiNewLog = [...aiLog];

  if (aiNewLog.length >= 40) {
    const summary = (await generateSummary(openai, model, aiNewLog)) || '';
    aiNewLog = [
      { role: 'system', content: calibration_prompt },
      { role: 'system', content: JSON.stringify(initialPrompts) },
      {
        role: 'system',
        content: `Summary of what has been discussed so far:${summary}`,
      },
    ];
  }
  if (aiNewLog.length === 0) {
    aiNewLog = [
      { role: 'system', content: calibration_prompt },
      { role: 'system', content: JSON.stringify(initialPrompts) },
    ];
  } else {
    aiNewLog.push({ role, content: prompt });
  }
  try {
    const chatCompletion = await openai.chat.completions.create({
      model,
      messages: aiNewLog,
    });

    const response = chatCompletion.choices[0].message.content;
    // await sleep(1500);
    // const response =
    //   'Yes. The three primary suspects are:\n\n- Lydia Pike — motive: inheritance/financial hardship; alibi: claims she was home, but GPS places her near the shop around 11 PM; evidence: argued with Harlan earlier, gloves found at the scene.\n\n- Benny Moss — motive: Harlan’s confession would expose an old theft; alibi: says he was inventorying his shop alone; evidence: van near scene at 12:18 AM, partial fingerprints inside the clock, ledger entries linking him.\n\n- June Taylor — motive: loyalty to Harlan and disagreements about the business; alibi: neighbors say she was home by 9:45 PM; evidence: brass polish residue on her supplies, and she discovered the body.';

    return {
      response,
      aiLog: [
        ...aiNewLog,
        { role: 'assistant', content: response },
      ] as Message[],
    };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', error.status); // e.g., 400, 401, 429
      console.error('Error message:', error.message);
      console.error('Error code:', error.code); // e.g., 'invalid_api_key', 'rate_limit_exceeded'
      return { error: `${error.message} - Error code: ${error.code}` };
    } else {
      // @ts-ignore
      return { error: `${error?.message || 'An error occurred'}` };
    }
  }
}

async function generateSummary(
  openai: OpenAI,
  model: string,
  aiLog: Message[],
) {
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
        role: 'developer',
        content:
          'Summarize of all messages so far between assistant and the user',
      },
    ],
  });
  return chatCompletion.choices[0].message.content;
}
