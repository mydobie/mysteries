import React from 'react';

import Solution from './Solution';

import QuestionForm from '~/components/Question';
import suspects from '../suspects';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';
import packet2Files from '../packet2files';

const correctSuspects = ['hanlon', 'jensen'];
const correctFiles = ['policelog', 'jensen-selfie'];

const files = [...baseFiles, ...packet1Files, ...packet2Files];

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);

  return (
    <>
      <h2 className='h4'>Task 3 - Reduce the number of suspects</h2>

      {!isQuestion1Done ? (
        <>
          <QuestionForm
            files={suspects}
            correctFiles={correctSuspects}
            correctCallback={setIsQuestion1Done}
            questionTitle={`What ${correctSuspects.length} suspects were not where they said when the meteorite was stolen?`}
          />
        </>
      ) : (
        <QuestionForm
          files={files}
          correctFiles={correctFiles}
          questionTitle={`What ${correctFiles.length} documents prove that Kyle Jensen and Rick
        Hanlon were not where they said when the meteorite was stolen.`}
          Solution={Solution}
        />
      )}
    </>
  );
};

export default Question;
