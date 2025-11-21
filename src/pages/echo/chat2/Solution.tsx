import { CardBody, Card  } from 'react-bootstrap';
import { Link } from 'react-router';
import CompletedSection from '~/components/CompletedSection';



const Solution = () => (
  <Card className='correctCard'>
    <CardBody>
      <h3>Congratulations! You discovered a very important clue.  The bats were present during all the private conversations.</h3>

      <CompletedSection
        items={[
          <>
           Campers fled the woods after seeing a massive bat swarm and heard a faint "beep-beep-beep" sound overhead.  This same type of sound was heard by investigators at the City Hall indicating the presence of bats.  In addition, the recording of the "ghost" is actually the recording of bat echolocation sounds.  
          </>,
          <>
            Gordy was talking to his brother Norm about the muskie he caught while alone in his shop.  His shop was next to the old City Hall.  
          </>,
          <>
             Martha was talking to her partner Doris Halmi about the pie she made for the diner over breakfast at her home on Loon Ridge Road. According to Dr. Elena Mora, the bats activity has doubled on Loon Ridge Road.
          </>,
          <>
            Darla was talking to her daughter Marie about the secret she was keeping from her family.  She was living on the old Olander farm on Stump Trail Road. According to  Mr. Halvorsen there were fresh scratch marks on the large oak tree next to the barn.  It is common for bats to leave scratch marks where they roost.  In addition, he reports strange black birds which could be bats.
          </>,
        ]}
      />
      <hr />

      <h3>Next</h3>

      <p>Task 2 what the bats have to do with the blackmail notes.  Detective Holt suggests going to the library to find out more information.</p>
     
      <p>
        <Link to='/amesworth/2' className='btn btn-primary'>
          Go to the library
        </Link>
      </p>
    </CardBody>
  </Card>
);

export default Solution;
