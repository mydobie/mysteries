import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import constants from '~/constants';

import ClockmakerLog from './EchoLog';
import AddAIInfo from './AddAIInfo';

const Clockmaker: React.FC = () => {
  const [aiKey, setAIKey] = React.useState(constants.OPENAI_KEY);
  const [aiModel, setAIModel] = React.useState(constants.AI_MODAL);

  return (
    <Container>
      <Card className='caseCard'>
        <Card.Body>
          <h2 className='h3 caseCard__title card-title'>Project Echo</h2>
          <div className='typewriter'>
            NORTHWOOD — When mysterious messages start appearing in Northwood’, folks start to wonder who is listening ...
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
         
        </Col>
      </Row>
    </Container>
  );
};

export default Clockmaker;
