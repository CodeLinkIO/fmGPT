export const officialAPIEndpoint =
  'https://api.openai.com/v1/chat/completions/adasd';
const customAPIEndpoint =
  import.meta.env.VITE_CUSTOM_API_ENDPOINT || 'https://chatgpt-api.shn.hk/v1/';
export const defaultAPIEndpoint = import.meta.env.VITE_DEFAULT_API_ENDPOINT;

export const availableEndpoints = [officialAPIEndpoint, customAPIEndpoint];