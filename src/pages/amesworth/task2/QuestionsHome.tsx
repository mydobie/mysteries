import React from 'react';
import Question1 from './Question1';
import Question2 from './Question2';
import Solution from './Solution';
import { Stack } from 'react-bootstrap';

const Question = () => {
  const [isQuestion1Done, setIsQuestion1Done] = React.useState(false);
  const [isQuestion2Done, setIsQuestion2Done] = React.useState(false);

  const setQuestion1 = () => setIsQuestion1Done(true);
  const setQuestion2 = () => setIsQuestion2Done(true);

  return (
    <>
      <Stack direction='horizontal' gap={3}>
        <h2 className='h4'>Task 2 - Where is the real meteorite</h2>
      </Stack>
      {!isQuestion1Done && !isQuestion2Done && (
        <Question1 setCorrect={setQuestion1} />
      )}
      {isQuestion1Done && !isQuestion2Done && (
        <Question2 setCorrect={setQuestion2} />
      )}

      {isQuestion1Done && isQuestion2Done && <Solution />}
    </>
  );
};

export default Question;
