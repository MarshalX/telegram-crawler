import BigNumber from 'bignumber.js';
import { TFunction } from 'i18next';

import {
  CryptoCurrency,
  CurrencyEnum,
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
} from 'api/wallet/generated';

import { DEFAULT_CRYPTO_FRACTION, DEFAULT_FIAT_FRACTION } from 'config';

import { UserState } from 'reducers/user/userSlice';

export function doesBrowserSupportNarrowSymbol() {
  try {
    Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    });
  } catch (e) {
    return false;
  }
  return true;
}

export function resolveLanguageCode(languageCode?: string): string | undefined {
  switch (languageCode) {
    case 'fa':
      return 'en';
    case 'bn':
      return 'en';
    case 'hi':
      return 'en';
    default:
      return languageCode;
  }
}

export function getDecimal(languageCode: string) {
  const parts = Intl.NumberFormat(
    resolveLanguageCode(languageCode),
  ).formatToParts(10000.1);
  return parts.find((part) => part.type === 'decimal')?.value || '';
}

export function getGroup(languageCode: string) {
  const parts = Intl.NumberFormat(
    resolveLanguageCode(languageCode),
  ).formatToParts(10000.1);
  return parts.find((part) => part.type === 'group')?.value || '';
}

export function isFiat(currency: CurrencyEnum): currency is FiatCurrency {
  return Object.values(FiatCurrency).includes(currency as FiatCurrency);
}

export function isCrypto(currency: CurrencyEnum): currency is CryptoCurrency {
  return Object.values(CryptoCurrency).includes(currency as CryptoCurrency);
}

export function printNumber({
  value,
  languageCode,
  options,
}: {
  value: number;
  languageCode: string;
  options?: { maximumFractionDigits?: number; minimumFractionDigits?: number };
}) {
  return Intl.NumberFormat(resolveLanguageCode(languageCode), options).format(
    value,
  );
}

export function printStringNumber({
  value,
  languageCode,
  options,
}: {
  value: string;
  languageCode: string;
  options?: Intl.NumberFormatOptions;
}) {
  const [main, decimal = 0] = value.split('.');

  const mainNumber = new BigNumber(main).toNumber();
  const decimalNumber = new BigNumber('0.' + decimal).toNumber();

  const start = Intl.NumberFormat(resolveLanguageCode(languageCode)).format(
    mainNumber,
  );
  const end = Intl.NumberFormat(resolveLanguageCode(languageCode), options)
    .format(decimalNumber)
    .slice(1);

  return start + end;
}

export function printFiatAmount({
  amount,
  currency,
  languageCode,
  currencyDisplay = 'narrowSymbol',
}: {
  amount: string | number;
  currency: FiatCurrency;
  languageCode: string;
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | false;
}) {
  const print = typeof amount === 'string' ? printStringNumber : printNumber;

  if (currencyDisplay === 'symbol' || currencyDisplay === 'narrowSymbol') {
    return print({
      languageCode,
      value: amount as never,
      options: {
        style: 'currency',
        currency,
        currencyDisplay:
          currencyDisplay === 'narrowSymbol' &&
          !doesBrowserSupportNarrowSymbol()
            ? 'symbol'
            : currencyDisplay,
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      },
    });
  } else if (currencyDisplay === 'code') {
    return `${print({
      value: amount as never,
      languageCode,
      options: {
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      },
    })}\xa0${currency}`;
  } else {
    return print({
      value: amount as never,
      languageCode,
      options: {
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      },
    });
  }
}

export function printCryptoAmount({
  amount,
  currency,
  languageCode,
  currencyDisplay = false,
  maximumFractionDigits = DEFAULT_CRYPTO_FRACTION,
}: {
  amount: string | number;
  currency: CryptoCurrency | string;
  languageCode: string;
  currencyDisplay?: 'code' | false;
  maximumFractionDigits?: number;
}) {
  const print = typeof amount === 'string' ? printStringNumber : printNumber;
  const value = print({
    value: amount as never,
    languageCode,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits,
    },
  });
  switch (currencyDisplay) {
    case 'code':
      return `${value}\xa0${currency}`;
    default:
      return value;
  }
}

const CURRENCY_NAMES: Record<FrontendCryptoCurrencyEnum, string> = {
  [FrontendCryptoCurrencyEnum.Ton]: 'Toncoin',
  [FrontendCryptoCurrencyEnum.Usdt]: 'USD Tether',
  [FrontendCryptoCurrencyEnum.Btc]: 'Bitcoin',
};

export function getCurrencyName({
  currency,
  variant = 'simple',
  t,
}: {
  currency: CryptoCurrency;
  variant?: 'simple' | 'complex';
  t?: TFunction;
}) {
  if (variant === 'simple' && currency === 'USDT' && t) {
    return t('common.dollars');
  }
  return CURRENCY_NAMES[currency as FrontendCryptoCurrencyEnum] || currency;
}

export function isTgTransferAllowed(
  currency: FrontendCryptoCurrencyEnum,
  featureFlags: UserState['featureFlags'],
) {
  return (
    currency === FrontendCryptoCurrencyEnum.Ton ||
    (currency === FrontendCryptoCurrencyEnum.Usdt && featureFlags.usdtTransfer)
  );
}

function firstSignificantNumberPrecision(number: string) {
  const decimalIndex = number.indexOf('.');

  if (decimalIndex === -1 || decimalIndex !== 1 || number[0] !== '0') {
    return 0;
  }

  for (let i = decimalIndex + 1; i < number.length; i++) {
    if (number[i] !== '0') {
      return i - decimalIndex;
    }
  }

  return 0;
}

/**
 * Rounds down a given number to the specified number of fractional digits.
 *
 * @param {string} number - The number to round down.
 * @param {number} fractionalDigits - The number of fractional digits to preserve.
 *
 * @returns {string} The rounded down number.
 *
 * @example
 *
 * const formatter = new Intl.NumberFormat('en-US', {
 *   maximumFractionDigits: 9
 * });
 *
 * roundDownFractionalDigits(0.99999, 4); // Returns: 0.9999
 * formatter.format(roundDownFractionalDigits(0.006393555, 4)); // Returns: "0.0063"
 * formatter.format(roundDownFractionalDigits(0.9972620384752073, 4)); // Returns: "0.9972"
 */
export function roundDownFractionalDigits(
  number: string,
  fractionalDigits: number,
) {
  const decimalIndex = number.indexOf('.');

  if (decimalIndex === -1) {
    return number;
  }

  const precision = Math.max(
    firstSignificantNumberPrecision(number),
    fractionalDigits,
  );

  return number.slice(0, decimalIndex + precision + 1);
}

/**
 * Rounds up a given number to the specified number of fractional digits.
 *
 * @param {string} number - The number to round down.
 * @param {number} fractionalDigits - The number of fractional digits to preserve.
 *
 * @returns {number}
 *
 * @example
 *
 * const formatter = new Intl.NumberFormat('en-US', {
 *   maximumFractionDigits: 9
 * });
 *
 * roundUpFractionalDigits(0.99999, 4); // Returns: 0.1
 * formatter.format(roundUpFractionalDigits(0.006393555, 4)); // Returns: "0.0064"
 * formatter.format(roundUpFractionalDigits(0.9972620384752073, 4)); // Returns: "0.9973"
 */
export function roundUpFractionalDigits(
  number: number,
  fractionalDigits: number,
) {
  const multiplier = Math.pow(10, fractionalDigits);
  return Math.ceil(number * multiplier) / multiplier;
}
