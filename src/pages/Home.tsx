import { ReactElement } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';

const Home = (): ReactElement => (
  <>
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs lg='10'>
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
    </Container>
  </>
);

export default Home;
