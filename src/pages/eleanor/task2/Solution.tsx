import { Link } from 'react-router';
import { Alert, Card, CardBody } from 'react-bootstrap';

import packet3 from '../caseFiles/packet3.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you eliminated 2 suspects</h3>

      <p>Sciencefest flyer: Daniel Keene was 3 hours away.</p>
      <p>
        Newspaper article: Under the "Around Northwood" section, it states that
        all pedestrian bridges were closed and it takes another 30 minutes to
        cross the river
      </p>
      <p>
        Catherine Rowe - Person of interest form - It gives Catherine's license
        page number
      </p>
      <p>
        Parking stub - Verifies Catherine was parked across the river in lot B
        at the time of Eleanor's death
      </p>
      <p>
        Because of the 30 minute walk to cross the river, Catherine could make
        it to lab at the time of Eleanor's death
      </p>

      <Alert variant='secondary'>
        <p className='mt-4, mb-4'>
          <strong>Your next task is to identify the murderer.</strong>
        </p>
        <Alert.Link href={packet3} role='button'>
          Download packet 3
        </Alert.Link>{' '}
        before going on to task 3
      </Alert>

      <p>
        <Link to='/eleanor/3' className='btn btn-primary'>
          GO TO TASK 3
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
