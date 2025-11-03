import files from '../baseFiles';

import Solution from './Solution';
import QuestionForm from '~/components/Question';

const correctFiles = [
  'crime-scene-chemicals',
  'msds-chloroxyline',
  'toxicology',
];

const Question = () => {
  return (
    <>
      <h2 className='h4'>
        Task 1 - Prove that Eleanor's death was not accidental.
      </h2>
      <QuestionForm
        files={files}
        correctFiles={correctFiles}
        Solution={Solution}
        questionTitle={`What ${correctFiles.length} files prove what Eleanor's death was not accidental`}
      />
    </>
  );
};

export default Question;
