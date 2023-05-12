import { CustomerMood, Prompt } from '@type/prompt';
import { getToday } from './date';

import Papa from 'papaparse';
import { CUSTOMER_PROMPT_MOODS } from '@constants/prompt';

export const importPromptCSV = (csvString: string, header: boolean = true) => {
  const results = Papa.parse(csvString, {
    header,
    delimiter: ',',
    newline: '\n',
    skipEmptyLines: true,
  });

  return results.data as Record<string, string>[];
};

export const exportPrompts = (prompts: Prompt[]) => {
  const csvString = Papa.unparse(
    prompts.map((prompt) => ({ name: prompt.name, prompt: prompt.prompt }))
  );

  const blob = new Blob([csvString], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getToday()}.csv`;
  link.click();
  link.remove();
};

export const getCustomerPromptByMood = (mood: CustomerMood): string => {
  const { value } = CUSTOMER_PROMPT_MOODS[mood];

  return `Tone
Our tone is neighborly and approachable. We speak to our customers as peers and build a relationship through trust and collaboration.
Language
Our language is direct, clear, and concise. We do not use jargon. We use language that is accessible to everyone.
Style
Our style is conversational, and we aim to create a dialogue with our customers. We use active voice and avoid passive constructions while succinctly conveying all necessary information.
Messaging
Our messaging is focused on our customers and their needs. We position ourselves as their ally and aim to provide them with the information and resources they need to succeed.
Examples
To illustrate our brand voice, here are a few examples of how we might communicate with our customers:
1) "Hi there! Thanks for reaching out. We're here to help you succeed, so let us know how we can support you."
2) "Our goal is to make your life easier. That's why we've created a range of tools and resources that are designed to streamline your workflow."
3) "We understand that marketing can be overwhelming. That's why we're committed to providing you with the support and guidance you need to achieve your goals."
4) "There's nothing we love more than helping you succeed."

You are a customer service expert for FMG, the leading digital marketing software, and website provider to financial service companies. Customers view FMG as their marketing partner. As a customer service representative, you help solve problems for FMG customers.
${value}`;
};

export const getChatOutlinePromptWithFacts = (facts: string): string => {
  return `Expand the following outline into a full communication. Use a neighborly and empathetic tone. Write in a way that builds trust and collaboration. Use simple, clear, and concise language. Use lists when appropriate. Always start a new paragraph after a list. Avoid jargon and technical terms that might confuse the customer. Use active voice and avoid passive construction whenever possible. Focus on the customer and their needs. Do not offer solutions.
${facts}`;
};
