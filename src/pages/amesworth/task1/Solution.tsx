import { CardBody, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import CompletedSection from '~/components/CompletedSection';

import packet2 from '../caseFiles/packet2.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations! You proved the meteorite is a fake</h3>

      <CompletedSection
        items={[
          <>
            In the Stargazer Event flyer the Meteorite has a distinct pattern of
            lines called a Widmanstätten pattern. In the Artifact authentication
            report, the pattern is different.
          </>,
          <>
            In the The Amesworth Meteorite: From the Heavens to Northwood file
            it states that the meteorite weights 30 pounds. In the evidence
            inventory report, the weight is listed at 14 pounds.
          </>,
        ]}
      />
      <hr />

      <h3>Next</h3>

      <p>Task 2 is to determine where the real meteorite is located.</p>
      <ul>
        <li>
          <a href={packet2}>Download packet 2</a>
        </li>
      </ul>
      <p>
        <Link to='/amesworth/2' className='btn btn-primary'>
          Go to task 2
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
