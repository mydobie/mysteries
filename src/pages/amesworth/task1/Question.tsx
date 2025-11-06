
import files from '../baseFiles';
import Solution from './Solution';
import QuestionForm from '~/components/Question';

const correctFiles = ['stargazer', 'meteorite1', 'artifact', 'inventory'];

const Question = () => {


  return (
    <>
      <h2 className='h4'>
        Task 1 - Prove the meteorite from the pawn shop is a fake.
      </h2>
      <QuestionForm
        files={files}
        correctFiles={correctFiles}
        questionTitle={`There are 2 reasons that meteorite is a fake. What ${correctFiles.length} files prove the meteorite is a fake`}
        Solution={Solution}
      />
     
    </>
  );
};

export default Question;
