import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en/translation';

export const FALLBACK_LANGUAGE = 'en';

const resources = {
  en: {
    translation: en,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: FALLBACK_LANGUAGE,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof resources.en;
  }
}

export default i18n;
