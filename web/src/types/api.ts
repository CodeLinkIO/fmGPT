export interface EventSourceDataInterface {
  choices: EventSourceDataChoices[];
  created: number;
  id: string;
  model: string;
  object: string;
}

export type EventSourceData = EventSourceDataInterface | '[DONE]';

export interface EventSourceDataChoices {
  delta: {
    content?: string;
    role?: string;
  };
  finish_reason?: string;
  index: number;
}

export interface ShareGPTSubmitBodyInterface {
  avatarUrl: string;
  items: {
    from: 'gpt' | 'human';
    value: string;
  }[];
}

export interface StreamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    delta: {
      role?: string;
      content?: string;
    };
    index: number;
    finish_reason: 'stop' | null;
  }[];
}

export interface EmailContentSubmitBodyInterface {
  user_content: string;
  system_content: string;
}

export interface SlackLogMessageSubmitBodyInterface {
  username: string;
  mood: string;
  facts: string;
  content: string;
}
