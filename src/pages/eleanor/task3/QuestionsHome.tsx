import React from 'react';
import QuestionForm from '~/components/Question';
import Solution from './Solution';
import suspects from '../suspects';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';
import packet2Files from '../packet2files';

const correctSuspects = ['vance'];

const correctFiles = [
  'vance-interview',
  'crime-scene-bag',
  'vance-interest-form',
  'badge-logs',
  'vehicle-logs',
];

const files = [...baseFiles, ...packet1Files, ...packet2Files];

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);

  return (
    <>
      <h2 className='h4'>Task 3 - Who killed Eleanor?</h2>

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
          questionTitle={`What ${correctFiles.length} documents prove that Margaret Vance was in
        the lab at the time of Eleanor's death?`}
          Solution={Solution}
        />
      )}
    </>
  );
};

export default Question;
