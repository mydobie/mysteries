import React from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
  Alert,
  Stack,
} from 'react-bootstrap';

import { generateResponse, Message } from './AIChat';
import AILoading from './assets/AILoading';
import OpenAI from 'openai';
import Characters from './Characters';
import { getAllDocs } from './DocsDrawer';

export default ({
  aiKey,
  baseURL,
  aiModel,
  setDocShow,
}: {
  aiKey: string;
  baseURL: string;
  aiModel: string;
  setDocShow: (response: string, show: boolean) => string;
}) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [log, setLog] = React.useState<Message[]>([]);
  const [aiLog, setAILog] = React.useState<Message[]>([]);
  const [aiError, setAiError] = React.useState('');

  /* Items that could be sent as prompts to make this file more generic */

  const AIIntro =
    'Hello I am Detective Raymond Holt retired from the Northwood police department.  I was asked to help with the suspicious death of Harlan Pike. Ask me anything about the case to determine what happened.';

  const openai = new OpenAI({
    apiKey: aiKey,
    baseURL: baseURL,
    dangerouslyAllowBrowser: true,
  });

  // guard to ensure the initial loader only runs once (React StrictMode can
  // invoke mount effects twice in dev). We use a ref so it survives re-renders
  // without triggering effects.
  const initializedRef = React.useRef(false);
  const scrollableDivRef = React.useRef(null);
  const processedMessageIdsRef = React.useRef<Set<string>>(new Set());
  
  React.useEffect(() => {
    if (scrollableDivRef.current) {
      //@ts-ignore
      scrollableDivRef.current.scrollTop =
        //@ts-ignore
        scrollableDivRef.current.scrollHeight;
    }
  }, [log]);

  // Process new assistant messages for doc references
  React.useEffect(() => {
    log.forEach((message) => {
      if (message.role === 'assistant' && !processedMessageIdsRef.current.has(message.id)) {
        processedMessageIdsRef.current.add(message.id);
        setDocShow(message.content, true);
      }
    });
  }, [log, setDocShow]);

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
      setLog((prev) => [...prev, { role: 'assistant', content: AIIntro, id:`${Date.now()}-assistant-intro` }]);
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

    setLog((prev) => [...prev, { role: 'user', content: prompt || input, id:`${Date.now()}-user` }]);
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

  const getMessageName = (rawMessage: string, role: Message['role'], key: string) => {
    let charName = 'Me';
    let message = rawMessage;
    let charProfileImage = null;
    if (role !== 'user') {
      const { name, profileImage, regex } = Characters(rawMessage) || {};
      charName = name || '';
      charProfileImage = profileImage;

      // Remove character regex patterns from message
      message =
        regex?.reduce((acc, curr) => acc.replace(curr, ''), rawMessage) || rawMessage;

      // Remove all doc regex patterns from message display (doc processing happens in useEffect)
      const docs = getAllDocs(message);
      if (docs.length > 0) {
        message = docs.reduce((cleanedResponse, doc) => {
          return doc.regex.reduce(
            (acc, regex) => acc.replace(regex, ' See doc drawer. '),
            cleanedResponse,
          );
        }, message);
      }
    }

    return (
      <Stack
        direction='horizontal'
        gap={2}
        className={`aiLog_messages-message ${role === 'user' ? 'user' : ''}`}
        key={key}
        style={{ alignItems: 'start' }}
      >
        {role !== 'user' && charProfileImage ? (
          <img
            src={charProfileImage}
            alt={''}
            style={{ width: '40px', height: '40px' }}
          />
        ) : null}

        <div className='aiLog_messages-message'>
          {!!charName ? <strong>{charName}: </strong> : null}

          {message}
        </div>
      </Stack>
    );

    /*
  <Stack
              direction='horizontal'
              gap={2}
              className={`aiLog_messages-message ${message.role === 'user' ? 'user' : ''}`}
              key={index}
              style={{ alignItems: 'start' }}
            >
              {message.role === 'user' ? null : (
                <img
                  src={Characters(message.content)?.profileImage}
                  alt={Characters(message.content)?.name}
                  style={{ width: '40px', height: '40px' }}
                />
              )}
              <div className='aiLog_messages-message'>
                <strong>
                  {message.role === 'user'
                    ? 'Me: '
                    : `${Characters(message.content)?.name}: `}
                  :{' '}
                </strong>
                {message.content}
              </div>
            </Stack>


    */
  };

  return (
    <Card className='aiLog'>
      <Card.Body>
        <div className='aiLog_messages' ref={scrollableDivRef}>
          {log.map((message) => (
            getMessageName(message.content, message.role, message.id)
          ))}
          {loading ? (
            <div className='aiLog_messages-message '>
              <AILoading />
            </div>
          ) : null}
        </div>

        {aiError ? (
          <Alert variant='danger'>{aiError} - Please try again</Alert>
        ) : null}

        <Form>
          <InputGroup>
            <Form.Control
              as='textarea' // Use textarea for multi-line input
              placeholder={loading ? 'Loading ....' : 'Ask a question ...'}
              aria-label='Message input'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={2}
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
