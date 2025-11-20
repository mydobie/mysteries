export interface PromptButton {
  label: string;
  prompt: string;
}

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
};

export interface Character {
  name: string;
  profileImage: string;
  regex: RegExp[];
  id: string;
}

export type Doc = {
  label: string;
  id: string;
  show: boolean;
  regex: RegExp[];
  docImage?: string;
  docContent?: string;
};