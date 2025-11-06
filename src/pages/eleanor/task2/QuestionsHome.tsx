import React from 'react';

import Solution from './Solution';
import suspects from '../suspects';
import QuestionForm from '~/components/Question';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';

const correctSuspects = ['keene', 'rowe'];

const correctFiles = [
  'sciencefest',
  'newspaper1',
  'rowe-parking',
  'rowe-interest-form',
];

const files = [...baseFiles, ...packet1Files];

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);

  return (
    <>
      <h2 className='h4'>
        Task 2 - Identify the two suspects who could not be at the lab at the
        time of Eleanor's death?
      </h2>

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
          questionTitle={`What ${correctFiles.length} documents prove that Daniel Keene and
        Catherine Rowe couldn't be at the lab at the time of Eleanor's death`}
          Solution={Solution}
        />
      )}
    </>
  );
};

export default Question;
