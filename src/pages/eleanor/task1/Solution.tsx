import { CardBody, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router';

import packet2 from '../caseFiles/packet2.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you proved Eleanor's death was not an accident</h3>

      <p>
        In the Crime scene photo - Chemicals: The label shows that
        "Chloroxyline" is also known as "Aetherium-monochloride"
      </p>
      <p>
        From the MDS - Chloroxyline sheet: Blood levels rarely reach above 1
        ml/L by inhalation and that toxic level is 8 ml/L. It is not possible to
        get to a toxic level by inhalation
      </p>
      <p>
        From the toxicology report: The level of "Aetherium-monochloride" was
        15.1 ml/L. High enough to kill Eleanor.
      </p>

      <p>
        Eleanor had to get a toxic level of Aetherium-monochloride or
        Chloroxyline by some other way than just accidental inhalation.
      </p>

      <Alert variant='secondary'>
        <p className='mt-4, mb-4'>
          <strong>
            Your next task is to rule out which two suspects could not be at the
            lab at the time of Eleanor's death
          </strong>
        </p>
        <Alert.Link href={packet2} role='button'>
          Download packet 2
        </Alert.Link>{' '}
        before going on to task 2
      </Alert>
      <p>
        <Link to='/eleanor/2' className='btn btn-primary'>
          GO TO TASK 2
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
