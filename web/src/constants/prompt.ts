import { CustomerMood, Prompt } from '@type/prompt';

// prompts from https://github.com/f/awesome-chatgpt-prompts
const defaultPrompts: Prompt[] = [
  {
    id: '0d3e9cb7-b585-43fa-acc3-840c189f6b93',
    name: 'English Translator',
    prompt:
      'I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. Do you understand?',
  },
];

export const CUSTOMER_PROMPT_MOODS: {
  [key: string]: { value: string; emoji: string };
} = {
  [CustomerMood.Neutral]: {
    value: '',
    emoji: '🙂',
  },
  [CustomerMood.Confused]: {
    value:
      'The customer is confused so your language should be precise and calming.',
    emoji: '😕',
  },
  [CustomerMood.Frustrated]: {
    value:
      'The customer is frustrated and should be approached with care and respect.',
    emoji: '😠',
  },
};

export default defaultPrompts;
