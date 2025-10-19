import { Alert, Card, CardBody } from 'react-bootstrap';
import packet4 from '../caseFiles/packet4.pdf';
import CompletedSection from '~/components/CompletedSection';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations you figured out the killer was Margaret Vance</h3>

      <CompletedSection
        items={[
          <>
            Margaret Vance's interview: Margaret admits she had access to
            Eleanor's bag including the spare badge
          </>,

          <>
            Crime scene photo - Computer bag: Eleanor's bag doesn't contain the
            badge. Margaret most likely took the badge
          </>,

          <>
            Margaret Vance - Person of interest form: Margaret's license plate
          </>,
          <>
            Vehicle logs: Margaret's car was in the parking lot around the time
            of Eleanor's death
          </>,

          <>
            Badge access logs: There is an unusual login for Eleanor around the
            time of the murder. This was most likely Margaret using Eleanor's
            badge
          </>,
        ]}
      />

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
