import { AuthenticationProvider } from '@type/auth';

export const officialAPIEndpoint = 'https://api.openai.com/v1/chat/completions';
const customAPIEndpoint =
  import.meta.env.VITE_CUSTOM_API_ENDPOINT || 'https://chatgpt-api.shn.hk/v1/';
export const defaultAPIEndpoint = `${
  import.meta.env.VITE_BASE_URL
}/chat/completions`;

export const availableEndpoints = [officialAPIEndpoint, customAPIEndpoint];

export const authenticationProviders = Object.values(AuthenticationProvider);
