
import Chat from '../../../components/chat/Chat';
import Characters from './Characters';

import aiInitialPrompts from './aiInitialPrompts';
import {calibration_prompt} from './calibrationPrompt';
import { docList } from '../DocList';
import promptButtons from './promptButtons';
import React from 'react';
import Solution from './Solution';


const AI_INTRO_MESSAGE =`Stumped on how the bats are related to the blackmail notes, Detective Holt has brought in numerous experts to the Northwood Public Library to help.

** Your goal is to determine what the bats have to do with the blackmail notes. **

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
  const [showSolution, setShowSolution] = React.useState(false);
  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
    <>
      <h2 className='h4'>
        Northwood Public Library
      </h2>
      {showSolution ? <Solution /> : (<Chat 
      showDocs={true}
      rightContent={<></>}
      characters={Characters}
      docsList={docList}
      aiButtons={promptButtons}
      aiIntroMessage={AI_INTRO_MESSAGE}
      testMessage={testMessage}
      calibrationPrompt={calibration_prompt}
      initialPrompts={aiInitialPrompts}
      handleShowSolution={handleShowSolution}
      solutionString={'GO_TO_LIBRARY'}
      solutionButtonText="Next steps"
      />
      )}
      </>
    );
  };

  export default CafeChat;
