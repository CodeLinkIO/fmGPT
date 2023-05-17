import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const i18nLanguages = [
  // 'ar',
  'da',
  'en',
  'en-GB',
  'en-US',
  'es',
  'fr',
  'fr-FR',
  'it',
  'ja',
  'ms',
  'nb',
  'sv',
  // 'ug',
  'yue',
  'zh-CN',
  'zh-HK',
  'zh-TW',
];

const namespace = ['main', 'api', 'about', 'model'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: {
      default: ['en'],
    },
    ns: namespace,
    defaultNS: 'main',
  });

export default i18n;
