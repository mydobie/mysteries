
import Chat from '../../../components/chat/Chat';
import Characters from './Characters';

import aiInitialPrompts from './aiInitialPrompts';
import {calibration_prompt} from './calibrationPrompt';
import { docList } from '../DocList';
import promptButtons from './promptButtons';


const AI_INTRO_MESSAGE =`Several townspeople have recently received mysterious notes.  The towns people are afraid to talk directly to the police, but they are willing to talk to you.  
Detective Raymond Holt has invited them to the Birch Fork Diner to talk to you. 

** Your goal is to determine how all the notes are related **

To talk to a  person, state their name first.  For example "Raymond how are you doing today?"`

let testMessage:any;

//  testMessage = {
//   "id": "chatcmpl-Ce23GMzctLhkdQwTtg3M5O4xIE6e2",
//   "object": "chat.completion",
//   "created": 1763657042,
//   "model": "gpt-5-mini-2025-08-07",
//   "choices": [
//     {
//       "index": 0,
//       "message": {
//         "role": "assistant",
//         "content": "Gordy: Oh—yah. I got one this morning. Heh — well yah, anyway… it says those fishing stories about the “30‑pound muskie” were lies and wants $300 left at the old Marten Creek Fire Tower. SHOW_NOTE_Gordy.",
//         "refusal": null,
//         "annotations": []
//       },
//       "finish_reason": "stop"
//     }
//   ],
// }


const CafeChat = () => {


  return (
    <>
      <h2 className='h4'>
        Birch Fork Diner
      </h2>
      <Chat 
      showDocs={true}
      rightContent={<></>}
      characters={Characters}
      docsList={docList}
      aiButtons={promptButtons}
      aiIntroMessage={AI_INTRO_MESSAGE}
      testMessage={testMessage}
      calibrationPrompt={calibration_prompt}
      initialPrompts={aiInitialPrompts}
      />
     
    </>
  );
};

export default CafeChat;
