import React from 'react';
import { Stack } from 'react-bootstrap';
import getCharacter, { cleanUpResponse } from './utils';
import { Character, Doc, Message } from './types';
import { UI_TEXT } from './constants';

interface MessageItemProps {
  message: Message;
  characters: Character[];
  docList: Doc[];
}

export const MessageItem = React.memo<MessageItemProps>(
  ({ message, characters, docList }) => {
    const { content: rawMessage, role } = message;
    let displayMessage = rawMessage;
    let charName: string = UI_TEXT.USER_NAME;
    let charProfileImage: string | null = null;

    
    if (role !== 'user') {
      const character = getCharacter(rawMessage, characters);
      charName = character?.name || '';
      charProfileImage = character?.profileImage || null;


      displayMessage = cleanUpResponse({
        response: rawMessage,
        docList,
        character,
      });
    }

    return (
      <Stack
        direction='horizontal'
        gap={2}
        className={`aiLog_messages-message ${role === 'user' ? 'user' : ''}`}
        style={{ alignItems: 'start' }}
      >
        {role !== 'user' && charProfileImage ? (
          <img
            src={charProfileImage}
            alt={charName || 'Character avatar'}
            style={{ width: '40px', height: '40px' }}
            aria-hidden='true'
          />
        ) : null}

        <div className='aiLog_messages-message'>
          {charName && charName !== UI_TEXT.USER_NAME ? (
            <strong>{charName}: </strong>
          ) : null}
          {displayMessage}
        </div>
      </Stack>
    );
  },
);

MessageItem.displayName = 'MessageItem';
