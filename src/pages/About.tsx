import { Col, Container, Row } from 'react-bootstrap';

const About = () => (
  <Container className='mt-5'>
    <Row>
      <Col>
        <p>
          The case files on this site are a work of fiction. All people, places,
          and events were created for the purpose of storytelling. Some details
          were developed with the help of AI to bring the mystery to life. Any
          resemblance to real individuals or events is purely coincidental.{' '}
        </p>
        <p>
          {' '}
          I’ve always loved solving case file–style games — the challenge, the
          puzzle, and the way the story slowly unfolds. So I decided to start
          creating my own. I hope you enjoy exploring them as much as I enjoyed
          creating them.
        </p>
        <p> - K Doberstein</p>
      </Col>
    </Row>
  </Container>
);

export default About;
