/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_HOSTED_DOMAIN: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_FASTAPI_BASE_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
