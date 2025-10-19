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
        {location.pathname !== '/amesworth/' &&
        location.pathname !== '/amesworth' ? (
          <Row className='justify-content-md-center'>
            <Col xs lg='10'>
              <Card className='caseCard'>
                <Card.Body>
                  <Card.Title className='caseCard__title'>
                    Ameseworth Meteorite
                  </Card.Title>
                  <Card.Text>
                    Stolen on October 17, 2015 and returned on October 21, 2015
                    ... but was it? - <FilesModal />
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
