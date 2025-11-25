import React from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';

import { generateResponse } from './AIChat';
import AILoading from './assets/AILoading';
import OpenAI from 'openai';
import { MessageItem } from './MessageItem';
import { generateMessageId } from './utils';
import { UI_TEXT } from './constants';
import { PromptButton, Message, Character, Doc } from './types';
import { useAI } from './AIContext';

export default ({
  setDocShow,
  aiButtons,
  aiIntroMessage,
  testMessage,
  calibrationPrompt,
  initialPrompts,
  characters,
  docsList,
  handleShowSolution,
  solutionString,
  solutionButtonText
}: {
  setDocShow: (response: string, show: boolean) => void;
  aiButtons?: PromptButton[];
  aiIntroMessage?: string;
  testMessage?: any;
  calibrationPrompt: string;
  initialPrompts: string;
  characters: Character[];
  docsList?: Doc[];
  handleShowSolution?: (visible: boolean) => void;
  solutionString?: string;
  solutionButtonText?: string;
}) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [log, setLog] = React.useState<Message[]>([]);
  const [aiLog, setAILog] = React.useState<Message[]>([]);
  const [aiError, setAiError] = React.useState('');

  const { aiKey, aiModel, aiBaseURL } = useAI();

  const openai = React.useMemo(
    () =>
      new OpenAI({
        apiKey: aiKey,
        baseURL: aiBaseURL,
        dangerouslyAllowBrowser: true,
      }),
    [aiKey, aiBaseURL],
  );

  // guard to ensure the initial loader only runs once (React StrictMode can
  // invoke mount effects twice in dev). We use a ref so it survives re-renders
  // without triggering effects.
  const initializedRef = React.useRef(false);
  const scrollableDivRef = React.useRef<HTMLDivElement | null>(null);
  const processedMessageIdsRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [log]);

  // Process new assistant messages for doc references
  React.useEffect(() => {
    const newMessages = log.filter(
      (message) =>
        message.role === 'assistant' &&
        !processedMessageIdsRef.current.has(message.id),
    );

    newMessages.forEach((message) => {
      processedMessageIdsRef.current.add(message.id);
      setDocShow(message.content, true);
    });
  }, [log, setDocShow]);

  const loadInitial = React.useCallback(async () => {
    setLoading(true);

    const { aiLog: newAiLog, error } = await generateResponse({
      openai,
      model: aiModel,
      prompt: '',
      aiLog: [],
      testMessage,
      calibrationPrompt,
      initialPrompts,
    });
    setLoading(false);
    if (error) {
      setAiError(UI_TEXT.INITIAL_LOAD_ERROR);
    } else if (newAiLog && aiIntroMessage) {
      setLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: aiIntroMessage,
          id: generateMessageId('assistant-intro'),
        },
      ]);
      setAILog(newAiLog);
    }
  }, [openai, aiModel, aiIntroMessage]);

  React.useEffect(() => {
    // invoke the async initializer only once. In React 18 StrictMode this
    // effect may be mounted twice in development, so guard with a ref.
    if (!initializedRef.current) {
      initializedRef.current = true;
      loadInitial();
    }
  }, [loadInitial]);

  const onClick = React.useCallback(
    async (prompt: string = '') => {
      const messageContent = prompt || input;
      if (!messageContent.trim()) return;

      setLoading(true);
      setLog((prev) => [
        ...prev,
        {
          role: 'user',
          content: messageContent,
          id: generateMessageId('user'),
        },
      ]);
      setInput('');

      const { aiLog: newAiLog, error } = await generateResponse({
        openai,
        model: aiModel,
        prompt: messageContent,
        aiLog,
        testMessage,
        calibrationPrompt,
        initialPrompts,
      });

      setLoading(false);

      if (error) {
        setAiError(error);
      } else if (newAiLog) {
        setLog((prev) => [...prev, newAiLog[newAiLog.length - 1]]);
        setAILog(newAiLog);
      }
    },
    [input, openai, aiModel, aiLog],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );

  return (
    <Card className='aiLog'>
      <Card.Body>
        <div
          className='aiLog_messages'
          ref={scrollableDivRef}
          role='log'
          aria-live='polite'
          aria-label='Chat messages'
        >
          {log.length === 0 && !loading ? (
            <div className='aiLog_messages-message'>
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            log.map((message) => (
              <MessageItem key={message.id} message={message} characters={characters} docList={docsList || []} solutionString={solutionString} handleShowSolution={handleShowSolution} solutionButtonText={solutionButtonText} />
            ))
          )}
          {loading ? (
            <div
              className='aiLog_messages-message'
              aria-label='Loading response'
            >
              <AILoading />
            </div>
          ) : null}
        </div>

        {aiError ? (
          <Alert variant='danger' role='alert' id='error-message'>
            {aiError}
            {UI_TEXT.ERROR_RETRY}
          </Alert>
        ) : null}

        <div className='aiButtonBar'>
          {aiButtons?.map((button) => (
            <Button
              variant='outline-secondary'
              onClick={() => onClick(button.prompt)}
              disabled={loading}
            >
              {button.label}
            </Button>
          ))}
        </div>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              as='textarea'
              placeholder={
                loading
                  ? UI_TEXT.LOADING_PLACEHOLDER
                  : UI_TEXT.INPUT_PLACEHOLDER
              }
              aria-label='Message input'
              aria-describedby={aiError ? 'error-message' : undefined}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={2}
              style={{ resize: 'none' }}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type='submit'
              disabled={loading || !input.trim()}
              aria-label='Send message'
            >
              {loading ? (
                <>
                  <Spinner animation='border' size='sm' aria-hidden='true' />{' '}
                  <span className='visually-hidden'>Sending...</span>
                </>
              ) : (
                UI_TEXT.SEND_BUTTON
              )}
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};
