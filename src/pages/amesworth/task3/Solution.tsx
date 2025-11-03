import { Link } from 'react-router';
import { Alert, Card, CardBody } from 'react-bootstrap';

import CompletedSection from '~/components/CompletedSection';
import packet4 from '../caseFiles/packet4.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>
        Congratulations you reduced the suspects to Kyle Jensen and Rick Hanlon
      </h3>
      <CompletedSection
        items={[
          <>
            Kyle claims to be along the river stargazing. Yet the position of
            the big dipper is how it appears in the spring not the fall. Also,
            it is very difficult to photograph M101 during the fall - so that
            photo was also most likely taken in the spring.
          </>,
          <>
            Rick Hanlon claims to be the lower hall of the Observatory. Yet the
            police logs indicate that they found him outside the observatory.
          </>,
          <>
            Helen Markham claims to be meeting attendees during the Stargazer
            event. The event photos show her with the high school students.
          </>,
          <>
            Maya Ortiz claims to be at the registration desk. The event photos
            show her at the registration desk during the time the meteorite was
            taken.
          </>,
        ]}
      />
      <hr />

      <h3>Next</h3>

      <p>Task 4 is to determine who is StarGazer424.</p>
      <ul>
        <li>
          <a href={packet4}>Download packet 4</a>
        </li>
      </ul>

      <p>
        <Link to='/amesworth/4' className='btn btn-primary'>
          Go to task 4
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
