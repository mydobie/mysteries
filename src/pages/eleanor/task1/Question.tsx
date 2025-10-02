import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import files from '../baseFiles';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';
import Solution from './Solution';

const correctFiles = [
  'crime-scene-chemicals',
  'msds-chloroxyline',
  'toxicology',
];

const Question = () => {
  const { register, handleSubmit, watch } = useForm();
  const [numCorrect, setNumCorrect] = React.useState<null | number>(null);

  const alertRef = React.useRef(null);

  const allValues = watch();

  const checkedValues = Object.entries(allValues).reduce(
    //@ts-ignore
    (checked, [key, value]) => {
      return value === true ? [...checked, key] : checked;
    },
    [],
  );

  const numChecked = checkedValues.length;

  const onSubmit = (data: any) => {
    const numCorrectTemp = correctFiles.filter((key) => {
      return data[key] === true;
    });

    setNumCorrect(numCorrectTemp.length);
    scrollToRef(alertRef);
  };

  return (
    <>
      <h2 className='h4'>
        Task 1 - Prove that Eleanor's death was not accidental.
      </h2>
      <div ref={alertRef}>
        {numCorrect !== null && numCorrect !== correctFiles.length && (
          <Alert variant='warning'>
            You got {numCorrect} files correct. Take another look at the
            evidence and try again.
          </Alert>
        )}
      </div>
      {numCorrect !== correctFiles.length ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className='questionTitle'>
            What {correctFiles.length} files prove what Eleanor's death was not
            accidental
          </p>
          {files.map((file) => (
            <Form.Check
              type={'checkbox'}
              label={file.label}
              {...register(file.fieldName)}
              key={file.fieldName}
              id={file.fieldName}
              disabled={
                numChecked >= correctFiles.length &&
                !checkedValues.includes(file.fieldName)
              }
            />
          ))}

          <p className='mt-4'>
            <Button type='submit'>Check answer</Button>
          </p>
        </Form>
      ) : (
        <Solution />
      )}
    </>
  );
};

export default Question;
