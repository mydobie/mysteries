import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import constants from '~/constants';
import { useDocsDrawer, DocsDrawer } from './DocsDrawer';
import ClockmakerLog from './EchoLog';
import AddAIInfo from './AddAIInfo';

const Clockmaker: React.FC = () => {
  const [aiKey, setAIKey] = React.useState(constants.OPENAI_KEY);
  const [aiModel, setAIModel] = React.useState(constants.AI_MODAL);

  const {  setAllDocsShow, docs } = useDocsDrawer();

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
              setDocShow={setAllDocsShow}
            />
          ) : (
            <AddAIInfo setAIKey={setAIKey} setAIModel={setAIModel} />
          )}
        </Col>
        <Col>
          <DocsDrawer docs={docs} />
        </Col>
      </Row>
    </Container>
  );
};

export default Clockmaker;
