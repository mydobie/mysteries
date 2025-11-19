import React from 'react';
import { Stack } from 'react-bootstrap';
import Characters from './Characters';
import { getAllDocs } from './DocsDrawer';
import { DOC_REPLACEMENT_TEXT, UI_TEXT } from './constants';
import { Message } from './AIChat';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = React.memo<MessageItemProps>(({ message }) => {
  const { content: rawMessage, role, id } = message;

  let charName:string = UI_TEXT.USER_NAME;
  let displayMessage = rawMessage;
  let charProfileImage: string | null = null;

  if (role !== 'user') {
    const character = Characters(rawMessage);
    charName = character?.name || '';
    charProfileImage = character?.profileImage || null;

    // Remove character regex patterns from message
    if (character?.regex) {
      displayMessage = character.regex.reduce(
        (acc, curr) => acc.replace(curr, ''),
        rawMessage,
      );
    }

    // Remove all doc regex patterns from message display
    const docs = getAllDocs(displayMessage);
    if (docs.length > 0) {
      displayMessage = docs.reduce((cleanedResponse, doc) => {
        return doc.regex.reduce(
          (acc, regex) => acc.replace(regex, DOC_REPLACEMENT_TEXT),
          cleanedResponse,
        );
      }, displayMessage);
    }
  }

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={`aiLog_messages-message ${role === 'user' ? 'user' : ''}`}
      style={{ alignItems: 'start' }}
    >
      {role !== 'user' && charProfileImage ? (
        <img
          src={charProfileImage}
          alt={charName || 'Character avatar'}
          style={{ width: '40px', height: '40px' }}
          aria-hidden="true"
        />
      ) : null}

      <div className="aiLog_messages-message">
        {charName && charName !== UI_TEXT.USER_NAME ? (
          <strong>{charName}: </strong>
        ) : null}
        {displayMessage}
      </div>
    </Stack>
  );
});

MessageItem.displayName = 'MessageItem';

