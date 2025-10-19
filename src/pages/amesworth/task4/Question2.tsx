import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import baseFiles from '../baseFiles';
import packet1Files from '../packet1files';
import packet2Files from '../packet2files';
import packet3Files from '../packet3files';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';

const correctFiles = ['stargazer424-posts-3', 'jensen-interview'];

const files = [...baseFiles, ...packet1Files, ...packet2Files, ...packet3Files];

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
        What {correctFiles.length} documents indicate that Kyle Jensen is
        StarGazer424?
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
