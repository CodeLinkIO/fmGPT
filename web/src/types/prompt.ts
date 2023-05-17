export enum CustomerMood {
  Frustrated = 'Frustrated',
  Confused = 'Confused',
  Neutral = 'Neutral',
}

export interface Prompt {
  id: string;
  name: string;
  prompt: string;
}
