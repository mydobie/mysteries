import React from 'react';
import Solution from './Solution';
import { Stack } from 'react-bootstrap';
import QuestionForm from '~/components/Question';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';

const correctPark = ['arboretum'];

const parks = [
  { label: 'Riverside Grove Park', fieldName: 'riverside' },
  { label: 'Northwood Arboretum', fieldName: 'arboretum' },
  { label: 'Observatory Hill', fieldName: 'observatoryhill' },
  { label: 'Oak Park', fieldName: 'oak' },
  { label: 'Whispering Pines Park', fieldName: 'pines' },
];

const correctFiles = [
  'policelog',
  'parks',
  'stargazer424-posts-2',
  'ortiz-interview',
];

const files = [...baseFiles, ...packet1Files];

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);

  return (
    <>
      <h2 className='h4'>Task 2 - Where is the real meteorite</h2>

      {!isQuestion1Done ? (
        <>
          <QuestionForm
            files={parks}
            correctFiles={correctPark}
            correctCallback={setIsQuestion1Done}
          />
        </>
      ) : (
        <QuestionForm
          files={files}
          correctFiles={correctFiles}
          questionTitle={`What ${correctFiles.length} documents indicate that the meteorite is at
  the Northwood Arboretum`}
          Solution={Solution}
        />
      )}
    </>
  );
};

export default Question;
