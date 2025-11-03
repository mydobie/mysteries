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
            In his interview Kyle Jensen stated that the meteorite was almost
            five percent cobalt - but hasn't published it yet so it was not
            common knowledge. The atomic number of cobalt is 27. The
            StarGazer424 refereed the the meteorite as "my 27 beauty"
          </>,
          <>
            In this interview, Kyle Jensen also stated this about the meteorite:
            <Quote isBlock>
              It’s this perfect mystery—something from beyond Earth, and we’re
              just locking it up under glass
            </Quote>
            StarGazer424 uses the exact same phrasing.
          </>,
        ]}
      />
      <hr />

      <h3>Next</h3>
      <p>
        <a href={packet5}>Download packet 5</a> to read the conclusion of the
        case
      </p>
    </CardBody>
  </Card>
);

export default Solution;
