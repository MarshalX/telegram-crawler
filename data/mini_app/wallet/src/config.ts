import { CryptoCurrency } from 'api/wallet/generated';

import { generateTelegramLink } from 'utils/common/common';
import { Langs } from 'utils/common/lang';

export const config = {
  productionHost: 'walletbot.me',
  productionBotName: 'wallet',
  apiHost: process.env.API_HOST || window.location.host,
  v2ApiHost:
    process.env.V2_API_HOST ||
    (process.env.API_HOST && `${process.env.API_HOST}/v2api`) ||
    `${window.location.host}/v2api`,
  getGemsApiHost: process.env.GETGEMS_API_HOST,
  scwApiHost: process.env.SCW_API_HOST,
};

export const DEPRECATED_P2P_PAYMENT_METHODS = ['zelle'];

export const ORDER_SETTINGS = {
  CONFIRM_PAYMENT_RECEIVED_TIMEOUT: 'PT10M',
};

export const P2P_CRYPTO_CURRENCIES = {
  [CryptoCurrency.Ton]: 'TON',
  [CryptoCurrency.Btc]: 'BTC',
};

export const CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM = {
  [CryptoCurrency.Btc]: 7,
  [CryptoCurrency.Ton]: 3,
  [CryptoCurrency.Usdt]: 2,
};

export const WALLET_CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM = {
  ...CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM,
  [CryptoCurrency.Ton]: 4,
};

export const P2P_CRYPTO_CURRENCIES_MULTICURRENCY = {
  [CryptoCurrency.Ton]: 'TON',
  [CryptoCurrency.Usdt]: 'USDT',
  [CryptoCurrency.Btc]: 'BTC',
};

export const DEFAULT_CRYPTO_FRACTION = 9;
export const CRYPTO_FRACTION = {
  [CryptoCurrency.Ton]: 9,
  [CryptoCurrency.Usdt]: 6,
  [CryptoCurrency.Btc]: 8,
};

export const DEFAULT_FIAT_FRACTION = 2;

export const LANGS: Array<Langs> = [
  'en',
  'es',
  'fa',
  'id',
  'it',
  'ko',
  'ru',
  'tr',
  'uz',
  'zh-CN',
  'zh-TW',
  'bn',
  'hi',
];

export const P2P_FAQ_URLS: Record<Langs, string> = {
  ru: 'https://telegra.ph/FAQ-09-02-7',
  en: 'https://telegra.ph/FAQ-09-02-8',
  uz: 'https://telegra.ph/FAQ-04-11-13',
  'zh-CN': 'https://telegra.ph/常见问题-04-11',
  'zh-TW': 'https://telegra.ph/FAQ-04-11-9',
  es: 'https://telegra.ph/FAQ-04-11-12',
  fa: 'https://telegra.ph/سوالات-متداول-04-11',
  id: 'https://telegra.ph/FAQ-04-11-10',
  it: 'https://telegra.ph/FAQ-04-11-11',
  ko: 'https://telegra.ph/자주-묻는-질문-04-11',
  tr: 'https://telegra.ph/SSS-04-11-5',
  bn: 'https://telegra.ph/%E0%A6%B8%E0%A6%9A%E0%A6%B0%E0%A6%9A%E0%A6%B0-%E0%A6%9C%E0%A6%9C%E0%A6%9E%E0%A6%B8%E0%A6%AF-%E0%A6%AA%E0%A6%B0%E0%A6%B6%E0%A6%A8%E0%A6%97%E0%A6%B2-04-11',
  hi: 'https://telegra.ph/%E0%A4%85%E0%A4%95%E0%A4%B8%E0%A4%B0-%E0%A4%AA%E0%A4%9B-%E0%A4%9C%E0%A4%A8-%E0%A4%B5%E0%A4%B2-%E0%A4%AA%E0%A4%B0%E0%A4%B6%E0%A4%A8-06-19',
};

export const WALLET_SUPPORT_BOT_LINK =
  generateTelegramLink('wallet_supportbot');
export const TELEGRAM_UPDATE_LINK = 'https://telegram.org/update';
export const WALLET_TERMS_OF_USE_LINK = 'https://wallet.tg/Terms_of_use.pdf';
export const WALLET_TERMS_OF_USE_TON_SPACE_LINK =
  'https://wallet.tg/Terms_of_use_ton_space.pdf';
export const WALLET_USER_AGREEMENT_LINK =
  'https://wallet.tg/Terms_of_Use_Wallet_Privacy_Policy_AML_CTF_Policy.pdf';
export const WALLET_PAY_WEBSITE_LINK = 'https://pay.wallet.tg/';

export const TON_CENTER_API_ENDPOINT = 'https://toncenter.com/api/v2/jsonRPC';
export const TON_CENTER_API_KEY =
  '14e3fd4c868cf3d0efa66fbcaacafd0e8e853ddeef3158cd9107040fc0603775';

export const AMPLITUDE_NEW_PROJECT_INSTANCE_NAME = 'new';
export const REDUX_ROOT_PERSIST_KEY = 'wallet2.1';

export const WALLET_PROXY_API_ENDPOINT = 'https://proxy.walletbot.net';
