import { Link } from 'react-router';
import { Card, CardBody } from 'react-bootstrap';
import CompletedSection from '~/components/CompletedSection';

import packet3 from '../caseFiles/packet3.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you eliminated 2 suspects</h3>

      <CompletedSection
        items={[
          <>Sciencefest flyer: Daniel Keene was 3 hours away.</>,

          <>
            Newspaper article: Under the "Around Northwood" section, it states
            that all pedestrian bridges were closed and it takes another 30
            minutes to cross the river
          </>,

          <>
            Catherine Rowe - Person of interest form - It gives Catherine's
            license plate number
          </>,

          <>
            Parking stub - Verifies Catherine was parked across the river in lot
            B at the time of Eleanor's death
          </>,

          <>
            Because of the 30 minute walk to cross the river, Catherine could
            make it to lab at the time of Eleanor's death
          </>,
        ]}
      />

      <hr />

      <h3>Next</h3>
      <p>Task 3 is to identify the murderer.</p>
      <ul>
        <li>
          <a href={packet3}>Download packet 3</a>
        </li>
      </ul>
      <p>
        <Link to='/eleanor/3' className='btn btn-primary'>
          Go to task 3
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
