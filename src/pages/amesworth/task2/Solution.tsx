import { Link } from 'react-router';
import { Alert, Card, CardBody } from 'react-bootstrap';
import CompletedSection from '~/components/CompletedSection';

import packet3 from '../caseFiles/packet3.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations! You found the real Amesworth Meteorite</h3>
      <CompletedSection
        items={[
          <>
            A StarGazer424 post indicates that the meteorite is at a park in
            Northwood.
          </>,
          <>
            Riverside Grove is ruled because Maya Ortiz in their interview
            stated that this park is closed due to construction.
          </>,
          <>
            Observatory Hill had over 200 people as part of the Stargazer event.
            StarGazer424 states that the meteorite is under trees, but
            Observatory Hill doesn't have any trees.
          </>,

          <>
            Oak Park opened in 2016 which is a year after when the meteorite was
            stolen.
          </>,

          <>
            Whispering Pines Park had Geocachers in the park according to the
            police log
          </>,
          <>
            The meteorite is located at Arboretum next to the Marie Sundial. The
            description of the Arboretum fits the description left by
            StarGazer424
          </>,
        ]}
      />

      <Alert variant='secondary'>
        <p className='mt-4, mb-4'>
          <strong>Your next task is to narrow down the suspects.</strong>
        </p>
        <Alert.Link href={packet3} role='button'>
          Download packet 3
        </Alert.Link>{' '}
        before going on to task 3
      </Alert>

      <p>
        <Link to='/amesworth/3' className='btn btn-primary'>
          GO TO TASK 3
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
