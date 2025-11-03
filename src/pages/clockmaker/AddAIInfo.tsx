/*
 setAIKey={setAIKey}
              setBaseURL={setBaseURL}
              setAIModel={setAIModel}
*/

import React from 'react';
import { Button, Form } from 'react-bootstrap';
export default ({
  setAIKey,
  setAIModel,
}: {
  setAIKey: (key: string) => void;
  setAIModel: (key: string) => void;
}) => {
  const [aiKey, setAIKeyValue] = React.useState('');
  const [aiModel, setAIModelValue] = React.useState('gpt-5-mini');

  const onSave = () => {
    setAIKey(aiKey);
    setAIModel(aiModel);
  };

  return (
    <div>
      <p>
        This an interactive case were you communicate directly with the
        detective investigating the case. There are two options:
      </p>
      <p>
        The first is to download this project from GitHub and run the
        application locally by setting an API information on the .env file. See
        the README for more information.
      </p>
      <p>
        The second option is to enter an OpenAI key and desired model in form
        below. This key is used make API calls directly with OpenAI. This key is
        not saved and you will need to re-enter your key when refreshing the
        page or navigating to another page and returning.
      </p>

      <Form>
        <Form.Group controlId='key'>
          <Form.Label>OpenAI Key</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter OpenAI Key'
            value={aiKey}
            onChange={(e) => setAIKeyValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='model' style={{ marginTop: '30px' }}>
          <Form.Label>OpenAI Model</Form.Label>
          <Form.Control
            type='text'
            value={aiModel}
            onChange={(e) => setAIModelValue(e.target.value)}
          />
        </Form.Group>
        <Button
          style={{ marginTop: '30px' }}
          disabled={!aiKey || !aiModel}
          onClick={onSave}
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};
