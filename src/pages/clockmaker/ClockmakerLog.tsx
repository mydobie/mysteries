import React from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';

import { generateResponse, Message } from './AIChat';
// import initialPrompts from './aiInitialPrompts';
import AILoading from './AILoading';
import OpenAI from 'openai';

export default ({
  aiKey,
  baseURL,
  aiModel,
}: {
  aiKey: string;
  baseURL: string;
  aiModel: string;
}) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [log, setLog] = React.useState<Message[]>([]);
  const [aiLog, setAILog] = React.useState<Message[]>([]);
  const [aiError, setAiError] = React.useState('');

  /* Items that could be sent as prompts to make this file more generic */
  const AIName = 'Det. Holt';
  const AIIntro =
    'Hello I am Detective Raymond Holt retired from the Northwood police department.  I was asked to help with the suspicious death of Harlan Pike. Ask me anything about the case to determine what happened.';

  const openai = new OpenAI({
    // baseURL: 'http://localhost:11434/v1', // Point to Ollama's local API
    apiKey: aiKey,
    baseURL: baseURL,
    dangerouslyAllowBrowser: true,
  });

  // guard to ensure the initial loader only runs once (React StrictMode can
  // invoke mount effects twice in dev). We use a ref so it survives re-renders
  // without triggering effects.
  const initializedRef = React.useRef(false);
  const scrollableDivRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollableDivRef.current) {
      //@ts-ignore
      scrollableDivRef.current.scrollTop =
        //@ts-ignore
        scrollableDivRef.current.scrollHeight;
    }
  }, [log]);

  const loadInitial = React.useCallback(async () => {
    setLoading(true);

    const { aiLog: newAiLog, error } = await generateResponse(
      openai,
      aiModel,
      '',
      aiLog,
    );
    // append the developer response using the functional updater as well
    setLoading(false);
    if (error) {
      setAiError(
        'There is an issue loading the initial information.  Please refresh the page.',
      );
    } else if (newAiLog) {
      setLog((prev) => [...prev, { role: 'assistant', content: AIIntro }]);
      setAILog(newAiLog);
    }
  }, []);

  React.useEffect(() => {
    // invoke the async initializer only once. In React 18 StrictMode this
    // effect may be mounted twice in development, so guard with a ref.
    if (!initializedRef.current) {
      initializedRef.current = true;
      loadInitial();
    }
  }, [loadInitial]);

  const onClick = async (prompt: string = '') => {
    setLoading(true);

    setLog((prev) => [...prev, { role: 'user', content: prompt || input }]);
    setInput('');
    const { aiLog: newAiLog, error } = await generateResponse(
      openai,
      aiModel,
      prompt || input,
      aiLog,
    );

    setLoading(false);

    if (error) {
      setAiError(error);
    } else if (newAiLog) {
      setLog((prev) => [...prev, newAiLog[newAiLog.length - 1]]);
      setAILog(newAiLog);
    }
  };
  return (
    <Card className='aiLog'>
      <Card.Body>
        <div className='aiLog_messages' ref={scrollableDivRef}>
          {log.map((message, index) => (
            <div
              key={index}
              className={`aiLog_messages-message ${message.role === 'user' ? 'user' : ' agent'}`}
            >
              <strong>{message.role === 'user' ? 'You' : AIName}:</strong>{' '}
              {message.content}
            </div>
          ))}
          {loading ? (
            <div className='aiLog_messages-message agent'>
              <strong>{AIName}:</strong> <AILoading />
            </div>
          ) : null}
        </div>

        {aiError ? (
          <Alert variant='danger'>{aiError} - Please try again</Alert>
        ) : null}
        <div className='aiButtonBar'>
          <Button
            variant='outline-secondary'
            onClick={() => onClick('Tell me about the crime scene')}
            disabled={loading}
          >
            Tell me about the crime scene
          </Button>
          <Button
            variant='outline-secondary'
            onClick={() => {
              onClick('Tell me about the suspects');
            }}
            disabled={loading}
          >
            Tell me about the suspects
          </Button>
          <Button
            variant='outline-secondary'
            onClick={() => {
              onClick('Tell me about the timeline');
            }}
            disabled={loading}
          >
            Tell me about the timeline
          </Button>
        </div>

        <Form>
          <InputGroup>
            <Form.Control
              as='textarea' // Use textarea for multi-line input
              placeholder={loading ? 'Loading ....' : 'Ask a question ...'}
              aria-label='Message input'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3} // Start with one row, will expand with content
              style={{ resize: 'none' }} // Prevent manual resizing by user
              disabled={loading}
            />
            <Button onClick={() => onClick()} disabled={loading || !input}>
              {loading ? <Spinner animation='border' size='sm' /> : 'Send'}
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};
