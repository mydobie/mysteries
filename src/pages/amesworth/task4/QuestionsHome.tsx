import React from 'react';
// import Question1 from './Question1';
// import Question2 from './Question2';
import Solution from './Solution';
import QuestionForm from '~/components/Question';
import suspects from '../suspects';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';
import packet2Files from '../packet2files';
import packet3Files from '../packet3files';

const correctSuspects = ['jensen'];
const correctFiles = ['stargazer424-posts-3', 'jensen-interview'];

const files = [...baseFiles, ...packet1Files, ...packet2Files, ...packet3Files];

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);

  return (
    <>
      <h2 className='h4'>Task 4 - Who is StarGazer424?</h2>

      {!isQuestion1Done ? (
        <>
          <QuestionForm
            files={suspects}
            correctFiles={correctSuspects}
            correctCallback={setIsQuestion1Done}
          />
        </>
      ) : (
        <QuestionForm
          files={files}
          correctFiles={correctFiles}
          questionTitle={`What ${correctFiles.length} documents indicate that Kyle Jensen is
        StarGazer424?`}
          Solution={Solution}
        />
      )}
    </>
  );
};

export default Question;
