import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';

const correctFiles = [
  'sciencefest',
  'newspaper1',
  'rowe-parking',
  'rowe-interest-form',
];

const files = [...baseFiles, ...packet1Files];

const Question = ({ setCorrect }: { setCorrect: () => void }) => {
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
      //@ts-ignore
      return data[key] === true;
    });

    if (numCorrectTemp.length === correctFiles.length) {
      setCorrect();
    } else {
      setNumCorrect(numCorrectTemp.length);
      scrollToRef(alertRef);
    }
  };

  return (
    <>
      <div ref={alertRef}>
        {numCorrect !== null && numCorrect !== files.length && (
          <Alert variant='warning'>
            You got {numCorrect} files correct. Take another look at the
            evidence and try again.
          </Alert>
        )}
      </div>

      <p className='questionTitle'>
        What {correctFiles.length} documents prove that Daniel Keene and
        Catherine Rowe couldn't be at the lab at the time of Eleanor's death
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default Question;
