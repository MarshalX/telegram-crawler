import { i18n as I18n } from 'i18next';

export type Langs =
  | 'en'
  | 'es'
  | 'fa'
  | 'id'
  | 'it'
  | 'ko'
  | 'ru'
  | 'tr'
  | 'uz'
  | 'zh-CN'
  | 'zh-TW'
  | 'bn'
  | 'hi';

export const convertLangCodeFromAPItoISO = (langCode: string): Langs => {
  switch (langCode) {
    case 'zh_HANT':
      return 'zh-TW';
    case 'zh_HANS':
      return 'zh-CN';
    default:
      return langCode as Langs;
  }
};

export const convertLangCodeFromISOtoAPI = (langCode: string) => {
  switch (langCode) {
    case 'zh-TW':
      return 'zh_HANT';
    case 'zh-CN':
      return 'zh_HANS';
    default:
      return langCode;
  }
};

export const setLanguage = (i18n: I18n, languageCode: Langs) => {
  i18n.changeLanguage(languageCode)?.then(() => {
    document.documentElement.setAttribute('lang', languageCode);
  });
};
