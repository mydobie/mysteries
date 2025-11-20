import { Card } from 'react-bootstrap';
import { Link } from 'react-router';


const Intro = () => {
  return (
    <>
      <Card className='caseCard'>
        <Card.Body>
          <h2 className='h3 caseCard__title card-title'>
            Something about Echo
          </h2>
          <div className='typewriter'>
            NORTHWOOD — Blah, blah, blah ....
          </div>
        </Card.Body>
      </Card>

   
      <Link to='1' className='btn btn-primary initialGoToButton'>
        Start the case
      </Link>
    </>
  );
};

export default Intro;