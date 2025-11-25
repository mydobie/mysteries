import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAI } from './AIContext';

export default ({}) => {
  const { setAIKey, setAIModel } = useAI();

  const [aiKey, setAIKeyValue] = React.useState('');  // holder until changes are submit to the context
  const [aiModel, setAIModelValue] = React.useState('gpt-5-mini');// holder until changes are submit to the context
  const [isOpen, setIsOpen] = React.useState(false);

  const onSave = () => {
    setAIKey(aiKey);
    setAIModel(aiModel);
  };

  return (
    <div>
      <p>
        This an interactive case were you communicate directly with the
        characters involved in the case. There are two options:
      </p>
      <p>
        The first is to download this project from{' '}
        <a href='https://github.com/mydobie/mysteries'>GitHub</a> and run the
        application locally by setting an API information on the .env file. See
        the README for more information.
      </p>
      <p>
        The second option is to enter an OpenAI key. This key is used make API
        calls directly with OpenAI. This key is not saved and you will need to
        re-enter your key when refreshing the page or navigating to another page
        and returning. Entering an API key directly in the browser is not
        recommended. Your key will be exposed in API calls. Only do this on a
        trusted machine and network.
      </p>
      {isOpen ? (
        <Form>
          <Form.Group controlId='key'>
            <Form.Label>OpenAI Key</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter OpenAI Key'
              value={aiKey}
              onChange={(e) => setAIKeyValue(e.target.value)}
            />
            <Form.Text style={{ color: '#ccc' }}>
              Do not use a production key or a key used for other things.
            </Form.Text>
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
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          I understand the risks and want to enter a key
        </Button>
      )}
    </div>
  );
};
