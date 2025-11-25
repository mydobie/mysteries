import { createContext, useContext, useState } from "react";
import constants from '~/constants';

const AI = createContext({
  aiKey: '',
  aiModel: '',
  aiBaseURL: '',
  setAIKey: (key: string) => {},
  setAIModel: (model: string) => {},
  setAIBaseURL: (url: string) => {},
});

export const useAI = () => {
  return useContext(AI);
}

const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [aiKey, setAIKey] = useState(constants.OPENAI_KEY);
  const [aiModel, setAIModel] = useState(constants.AI_MODAL || 'gpt-5-mini');
  const [aiBaseURL, setAIBaseURL] = useState(constants.AI_BASE_URL);
  return (
    <AI.Provider value={{ aiKey, aiModel, aiBaseURL, setAIKey, setAIModel, setAIBaseURL }}>
      {children}
    </AI.Provider>
  );
};


export default AIProvider;