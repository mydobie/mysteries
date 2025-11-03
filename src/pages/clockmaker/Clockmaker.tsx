import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import constants from '~/constants';
import harlan from './assets/harlan.png';
import ClockmakerLog from './ClockmakerLog';
import AddAIInfo from './AddAIInfo';

const Clockmaker: React.FC = () => {
  console.log('Constants:', constants);
  const [aiKey, setAIKey] = React.useState(constants.OPENAI_KEY);
  const [aiModel, setAIModel] = React.useState(constants.AI_MODAL);

  return (
    <Container>
      <Card className='caseCard'>
        <Card.Body>
          <h2 className='h3 caseCard__title card-title'>The Clockmaker</h2>
          <div className='typewriter'>
            NORTHWOOD — When Northwood’s beloved clockmaker Harlan Pike is found
            dead in his locked shop, the town’s sense of time shatters ...
          </div>
        </Card.Body>
      </Card>
      <Row>
        <Col md={8}>
          {aiKey ? (
            <ClockmakerLog
              aiKey={aiKey}
              baseURL={constants.AI_BASE_URL}
              aiModel={aiModel}
            />
          ) : (
            <AddAIInfo setAIKey={setAIKey} setAIModel={setAIModel} />
          )}
        </Col>
        <Col>
          <Image src={harlan} rounded fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Clockmaker;
