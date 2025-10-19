import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import FilesModal from './FilesModal';

const Intro = () => {
  return (
    <>
      <Card className='caseCard'>
        <Card.Body>
          <h2 className='h3 caseCard__title card-title'>
            Closed Case: 15-1107
          </h2>
          <div className='typewriter'>
            NORTHWOOD — The meteorite, on loan from the National Geological
            Collection, had been the centerpiece of the observatory’s exhibit
            for over 15 years. Attendees at the event, which drew more than 200
            stargazing enthusiasts, reported that the meteorite was present at
            the beginning of the night’s activities but was missing by the
            conclusion of the telescope demonstration ....
          </div>
        </Card.Body>
      </Card>

      <p>How to get started:</p>
      <ul>
        <li>
          <FilesModal />
        </li>
        <li>Read through the case</li>
        <li>Once you are ready,</li>
      </ul>
      <Link to='1' className='btn btn-primary'>
        GO TO TASK 1
      </Link>
    </>
  );
};

export default Intro;
