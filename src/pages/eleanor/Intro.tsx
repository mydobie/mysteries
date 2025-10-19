import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import FilesModal from './FilesModal';

const Intro = () => {
  return (
    <>
      <Card className='caseCard'>
        <Card.Body>
          <h2 className='h3 caseCard__title card-title'>
            Closed Case: 9649-2a
          </h2>
          <div className='typewriter'>
            NORTHWOOD — The scientific community is in shock following the death
            of Dr. Eleanor Vance, 52, a leading biochemist known for her
            groundbreaking work on synthetic enzymes. Dr. Vance was discovered
            dead late Wednesday night in Lab 304 at the Northwood Research
            Institute ...
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
