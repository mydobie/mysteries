import { ReactNode } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';

export default ({ items }: { items: ReactNode[] | string[] }) => (
  <Container style={{ marginTop: '20px' }}>
    {items.map((item) => (
      <Row style={{ marginBottom: '25px' }}>
        <Col xs='auto'>
          <ArrowRightSquareFill size={30} style={{ marginTop: '5px' }} />
        </Col>
        <Col>{item}</Col>
      </Row>
    ))}
  </Container>
);
