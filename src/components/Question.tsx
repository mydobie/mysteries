import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';

const Question = ({
  files,
  correctFiles,
  Solution=<></>,
  questionTitle,
  correctCallback
}: {
  files: { label?: string; fieldName: string; type?: string }[];
  correctFiles: string[];
  Solution?: any;
  questionTitle?: string;
  correctCallback?: (isCorrect: boolean) => void
}) => {
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

    if(correctCallback && numCorrectTemp.length === correctFiles.length) {
        correctCallback(numCorrectTemp.length === correctFiles.length);
    } else {
        setNumCorrect(numCorrectTemp.length);
        scrollToRef(alertRef);
    }
  };

  const SelectForSolution = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
        {questionTitle && (
          <p className='questionTitle'>
            {questionTitle}
          </p>
        )}
      {files.map((file) => {
        if (file.type === 'separator') return <hr key={file.fieldName} />;
        return (
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
        );
      })}

      <p className='mt-4'>
        <Button type='submit'>Check answer</Button>
      </p>
    </Form>
  );

  return (
    <>
   
      <div ref={alertRef}>
        {numCorrect !== null && numCorrect !== correctFiles.length && (
          <Alert variant='warning'>
            You got {numCorrect} files correct. Take another look at the
            evidence and try again.
          </Alert>
        )}
      </div>
      {numCorrect !== correctFiles.length ? (
        <SelectForSolution />
      ) : (
        <Solution />
      )}
    </>
  );
};

export default Question;
