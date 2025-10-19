import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import scrollToRef from '~/utils/scrollToRef';

const correctPark = ['arboretum'];

const parks = [
  { label: 'Riverside Grove Park', fieldName: 'riverside' },
  { label: 'Northwood Arboretum', fieldName: 'arboretum' },
  { label: 'Observatory Hill', fieldName: 'observatoryhill' },
  { label: 'Oak Park', fieldName: 'oak' },
  { label: 'Whispering Pines Park', fieldName: 'pines' },
];

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
    const numCorrectTemp = correctPark.filter((key) => {
      return data[key] === true;
    });

    if (numCorrectTemp.length === correctPark.length) {
      console.log('CORRECT ');
      setCorrect();
    } else {
      setNumCorrect(numCorrectTemp.length);
      scrollToRef(alertRef);
    }
  };

  return (
    <>
      <div ref={alertRef}>
        {numCorrect !== null && numCorrect !== correctPark.length && (
          <Alert variant='warning'>
            You got {numCorrect} locations correct. Take another look at the
            evidence and try again.
          </Alert>
        )}
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {parks.map((park) => (
          <Form.Check
            type={'checkbox'}
            label={park.label}
            // @ts-ignore
            {...register(park.fieldName)}
            key={park.fieldName}
            id={park.fieldName}
            disabled={
              numChecked >= correctPark.length &&
              !checkedValues.includes(park.fieldName)
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
