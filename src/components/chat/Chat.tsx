import React from 'react';
import { Container, Row, Col, Alert  } from 'react-bootstrap';
import { useDocsDrawer, DocsDrawer } from './DocsDrawer';
import Log from './Log';
import AddAIInfo from './AddAIInfo';
import { Character, Doc, PromptButton } from './types';
import { useAI } from './AIContext';

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
  const { aiKey, aiModel,  setAIKey, setAIModel } = useAI();

  const { setAllDocsShow, docs } = useDocsDrawer(docsList || []);

  if(!setAIKey || !setAIModel ) {
   return <Alert variant='danger'>AIContext not found. Please check your AIContext provider.</Alert>
  }


  return (
    <Container>
    
      <Row>
        <Col md={8}>    

          {aiKey && aiModel ? (
            <Log
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
            <AddAIInfo />
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
