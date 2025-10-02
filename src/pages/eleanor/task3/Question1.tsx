import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';
import suspects from '../suspects';

const correctSuspects = ['vance'];

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
    const numCorrectTemp = correctSuspects.filter((key) => {
      return data[key] === true;
    });

    if (numCorrectTemp.length === correctSuspects.length) {
      setCorrect();
    } else {
      setNumCorrect(numCorrectTemp.length);
      scrollToRef(alertRef);
    }
  };

  return (
    <>
      <div ref={alertRef}>
        {numCorrect !== null && numCorrect !== correctSuspects.length && (
          <Alert variant='warning'>
            That is not the correct suspect. Take another look at the evidence
            and try again.
          </Alert>
        )}
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {suspects.map((suspect) => (
          <Form.Check
            type={'checkbox'}
            label={suspect.label}
            // @ts-ignore
            {...register(suspect.fieldName)}
            key={suspect.fieldName}
            id={suspect.fieldName}
            disabled={
              numChecked >= correctSuspects.length &&
              !checkedValues.includes(suspect.fieldName)
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
