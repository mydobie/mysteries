import React from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import constants from '~/constants';
import { useDocsDrawer, DocsDrawer } from './DocsDrawer';
import Log from './Log';
import AddAIInfo from './AddAIInfo';
import { Character, Doc, PromptButton } from './types';

interface ChatProps {
  showDocs: boolean;
  rightContent: React.ReactNode;
  aiButtons?: PromptButton[];
  aiIntroMessage?: string;
  testMessage?:any
  calibrationPrompt: string;
  initialPrompts: string;
  characters: Character[];
  docsList? :Doc[];
  handleShowSolution?: (visible: boolean) => void;
  solutionString?: string;
  solutionButtonText?: string;
}

const Chat: React.FC<ChatProps> = ({ showDocs, rightContent, aiButtons, aiIntroMessage , testMessage, calibrationPrompt, initialPrompts, characters, docsList, handleShowSolution, solutionString, solutionButtonText}) => {
  const [aiKey, setAIKey] = React.useState(constants.OPENAI_KEY);
  const [aiModel, setAIModel] = React.useState(constants.AI_MODAL);

  const { setAllDocsShow, docs } = useDocsDrawer(docsList || []);


  return (
    <Container>
    
      <Row>
        <Col md={8}>    

          {aiKey ? (
            <Log
              aiKey={aiKey}
              baseURL={constants.AI_BASE_URL}
              aiModel={aiModel}
              setDocShow={setAllDocsShow}
              aiButtons={aiButtons}
              aiIntroMessage={aiIntroMessage}
              testMessage={testMessage}
              calibrationPrompt={calibrationPrompt}
              initialPrompts={initialPrompts}
              characters={characters}
              docsList={docsList}
              handleShowSolution={handleShowSolution}
              solutionString={solutionString}
              solutionButtonText={solutionButtonText}
            />
          ) : (
            <AddAIInfo setAIKey={setAIKey} setAIModel={setAIModel} />
          )}
        </Col>
        <Col>
          {showDocs && (
            <DocsDrawer docs={docs} />
          )}
          {rightContent && (
            rightContent
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
