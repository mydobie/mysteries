export default {
  APP_NAME,
  APP_VERSION,
  GIT_SHA,
  OPENAI_KEY: OPENAI_KEY || import.meta.env.VITE_OPENAI_KEY,
  AI_BASE_URL: AI_BASE_URL || import.meta.env.VITE_AI_BASE_URL,
  AI_MODAL: AI_MODAL || import.meta.env.VITE_AI_MODAL,
  // USE_DEMO: USE_DEMO || import.meta.env.VITE_USE_DEMO,
  // USE_MOCK: USE_MOCK || import.meta.env.VITE_USE_MOCK,
  USE_HASH: USE_HASH || import.meta.env.VITE_USE_HASH,
};
