import { Alert, Card, CardBody } from 'react-bootstrap';
import packet4 from '../caseFiles/packet4.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you figured out the killer</h3>

      <p>
        Margaret Vance's interview: Margaret admits she had access to Eleanor's
        bag including the spare badge
      </p>
      <p>
        Crime scene photo - Computer bag: Eleanor's bag doesn't contain the
        badge. Margaret most likely took the badge
      </p>
      <p>Margaret Vance - Person of interest form: Margaret's license plate</p>
      <p>
        Vehicle logs: Margaret's car was in the parking lot around the time of
        Eleanor's death
      </p>
      <p>
        Badge access logs: There is an unusual login for Eleanor around the time
        of the murder. This was most likely Margaret using Eleanor's badge
      </p>
      <Alert variant='secondary'>
        <Alert.Link href={packet4} role='button'>
          Download packet 4
        </Alert.Link>{' '}
        to read the conclusion of the case
      </Alert>
    </CardBody>
  </Card>
);

export default Solution;
