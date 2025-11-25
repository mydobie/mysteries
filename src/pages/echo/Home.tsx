import { ReactElement } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import AIProvider from '~/components/chat/AIContext';
import constants from '~/constants';


const Home = (): ReactElement => {
  const location = useLocation();


  console.log(constants);
  return (
    <>
    <AIProvider>
      <Container>
        {location.pathname !== '/echo/' &&
        location.pathname !== '/echo' ? (
          <Row className='justify-content-md-center'>
            <Col xs lg='10'>
              <Card className='caseCard'>
                <Card.Body>
                  <Card.Title className='caseCard__title'>
                     Project Echo
                  </Card.Title>
                  <Card.Text className='typewriter'>
                    NORTHWOOD — When mysterious messages start appearing in Northwood, folks start to wonder who is listening ...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}

        <Outlet />
      </Container>
    </AIProvider>
    </>
  );
};

export default Home;
