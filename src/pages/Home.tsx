import { ReactElement } from 'react';
import { Card, Col, Container, Row, CardGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import detective from '../assets/detective.png';

const Home = (): ReactElement => (
  <>
    <Container>
      <Row className='justify-content-sm-center'>
        <Col sm='auto' className='d-none d-sm-block'>
          <Image
            src={detective}
            style={{ width: '200px', marginTop: '30px' }}
          />
        </Col>
        <Col sm='auto'>
          <Card className='introCard'>
            <Card.Header>Unravel the Mystery</Card.Header>
            <Card.Body>
              Solve puzzles, uncover hidden clues, and piece together the story.
              <br />
              Every detail could be the key.
            </Card.Body>
            <Card.Footer>
              <Link className='btn btn-primary' to='/eleanor/'>
                Start Your First Case
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <CardGroup>
        <Card className='gameCard'>
          <Card.Header>Eleanor Vance</Card.Header>
          <Card.Body>
            The scientific community is in shock following the death of Dr.
            Eleanor Vance, 52, a leading biochemist known for her groundbreaking
            work on synthetic enzymes.
          </Card.Body>
          <Card.Footer>
            <Link className='btn btn-primary' to='/eleanor/'>
              Eleanor Vance
            </Link>
          </Card.Footer>
        </Card>

        <Card className='gameCard'>
          <Card.Header>Amesworth Meteorite</Card.Header>
          <Card.Body>
            Centerpiece of the observatory’s exhibit for over 15 years. The
            meteorite was present at the beginning of the night’s activities but
            was missing by the conclusion of the telescope demonstration
          </Card.Body>
          <Card.Footer>
            <Link className='btn btn-primary' to='/amesworth/'>
              Amesworth Meteorite
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>
  </>
);

export default Home;
