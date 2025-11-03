import { CardBody, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import CompletedSection from '~/components/CompletedSection';

import packet2 from '../caseFiles/packet2.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you proved Eleanor's death was not an accident</h3>

      <CompletedSection
        items={[
          <>
            In the Crime scene photo - Chemicals: The label shows that
            "Chloroxyline" is also known as "Aetherium-monochloride"
          </>,
          <>
            From the MDS - Chloroxyline sheet: Blood levels rarely reach above 1
            ml/L by inhalation and that toxic level is 8 ml/L. It is not
            possible to get to a toxic level by inhalation
          </>,
          <>
            From the toxicology report: The level of "Aetherium-monochloride"
            was 15.1 ml/L. High enough to kill Eleanor.
          </>,
          <>
            Eleanor had to get a toxic level of Aetherium-monochloride or
            Chloroxyline by some other way than just accidental inhalation.
          </>,
        ]}
      />

      <hr />

      <h3>Next</h3>
      <p>
        Task 2 is to rule out which two suspects could not be at the lab at the
        time of Eleanor's death
      </p>
      <ul>
        <li>
          <a href={packet2}>Download packet 2</a>
        </li>
      </ul>
      <p>
        <Link to='/eleanor/2' className='btn btn-primary'>
          Go to task 2
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
