import { Alert, Card, CardBody } from 'react-bootstrap';
import Quote from '~/components/Quote';
import CompletedSection from '~/components/CompletedSection';
import packet5 from '../caseFiles/packet5.pdf';

const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>
        Congratulations! <br />
        You figured out that Kyle Jensen is StarGazer424
      </h3>

      <CompletedSection
        items={[
          <>
            In his interivew Kyle Jensen stated that{' '}
            <Quote isBlock>
              almost five percent cobalt - but I can’t fully prove or publish it
              until I do more tests
            </Quote>{' '}
            The atomic number of cobalt is 27. The StarGazer424 refereed the the
            meteorite as "my 27 beauty"
          </>,
          <>
            In this interview, Kyle Jensen also stated this about the meteorite{' '}
            <Quote isBlock>
              It’s this perfect mystery—something from beyond Earth, and we’re
              just locking it up under glass
            </Quote>
            StarGazer424 uses the exact same phrasing.
          </>,
        ]}
      />

      <Alert variant='secondary'>
        <Alert.Link href={packet5} role='button'>
          Download packet 5
        </Alert.Link>{' '}
        to read the conclusion of the case
      </Alert>
    </CardBody>
  </Card>
);

export default Solution;
