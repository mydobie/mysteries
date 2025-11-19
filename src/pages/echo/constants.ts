// Magic strings for doc triggers
export const DOC_TRIGGERS = {
  GORDY_NOTE: 'SHOW_NOTE_Gordy',
  DARLA_NOTE: 'SHOW_NOTE_Darla',
  MARTHA_NOTE: 'SHOW_NOTE_Martha',
  AARON_NOTE: 'SHOW_NOTE_Aaron',
  RECORDING: 'SHOW_RECORDING',
  CITY_HALL_PICTURE: 'SHOW_CITY_HALL_PICTURE',
} as const;

// Replacement text for doc references
export const DOC_REPLACEMENT_TEXT = ' See doc drawer. ';

// Constants for message limits and delays
export const MESSAGE_LIMIT = 40;
export const MOCK_DELAY_MS = 1500;

// UI text constants
export const UI_TEXT = {
  DOCS_DRAWER_LABEL: 'DOCS DRAWER:',
  LOADING_PLACEHOLDER: 'Loading ....',
  INPUT_PLACEHOLDER: 'Ask a question ...',
  SEND_BUTTON: 'Send',
  ERROR_RETRY: ' - Please try again',
  INITIAL_LOAD_ERROR: 'There is an issue loading the initial information.  Please refresh the page.',
  USER_NAME: 'Me',
} as const;

// AI Introduction message
export const AI_INTRO_MESSAGE =
  'Hello I am Detective Raymond Holt retired from the Northwood police department.  I was asked to help with the suspicious death of Harlan Pike. Ask me anything about the case to determine what happened.';

