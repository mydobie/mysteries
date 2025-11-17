import OpenAI from 'openai';
import initialPrompts from './aiInitialPrompts';
import { calibration_prompt } from './calibrationPrompt';

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));



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

    // sleep(1500);
    
    // const response =  "Raymond Holt: Start with the four people who got notes. They’re the ones with secrets, and whoever’s leaking information had access to at least one of them.\n\n- Gordy Skoglund — runs the bait shop. Nervous about the muskie story. Might slip when he talks fishing.  \n- Aaron Heller — teacher. Talks a lot, even in his sleep. Financial details could point to someone in town.  \n- Martha Kellen — Cedar Spoon Pies. Worried about reputation, fusses over details.  \n- Darla Orlander — guarded, protective. If she trusts you she’ll open up; otherwise she’ll clam up.\n\nIf you want a lead on who could have overheard anything or where to look next, talk to me after those interviews. Quiet as a dock in January, I’ll parse it."
        



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
