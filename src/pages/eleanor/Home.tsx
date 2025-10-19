import { ReactElement } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';

import FilesModal from './FilesModal';

const Home = (): ReactElement => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <>
      <Container>
        {location.pathname !== '/eleanor/' &&
        location.pathname !== '/eleanor' ? (
          <Row className='justify-content-md-center'>
            <Col xs lg='10'>
              <Card className='caseCard'>
                <Card.Body>
                  <Card.Title className='caseCard__title'>
                    Dr. Eleanor Vance
                  </Card.Title>
                  <Card.Text>
                    Found dead 11:42 p.m. on Wednesday March 13 at Northwood
                    Research Institute Lab 304. Initially ruled an accident, but
                    was it? - <FilesModal />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}

        <Outlet />
      </Container>
    </>
  );
};

export default Home;
