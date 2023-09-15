import BigNumber from 'bignumber.js';

import {
  getDecimal,
  getGroup,
  printNumber,
  printStringNumber,
} from 'utils/common/currency';

export function formatValue(
  value: string,
  {
    locale,
    isAllowed,
    prevValue,
    maximumFractionDigits,
  }: {
    locale: string;
    isAllowed: (value: number) => boolean;
    prevValue: string;
    maximumFractionDigits: number;
  },
): [formattedValue: string | null, numValue: number | null] {
  const decimal = getDecimal(locale);
  const group = getGroup(locale);

  if (value.length === 0) {
    return ['', 0];
  } else if (value.length === 1 && ['.', ','].includes(value[0])) {
    return [`0${decimal}`, 0];
  } else if (value === '0') {
    if (prevValue === `0${decimal}`) {
      return ['0', 0];
    } else {
      return [`0${decimal}`, 0];
    }
  } else {
    let numberValue = value
      .replace(new RegExp(`\\${group}`, 'g'), '')
      .replace(new RegExp(`\\${decimal}`), '.');
    const int = numberValue.split('.')[0];
    const fraction = numberValue.split('.')[1] || '';

    numberValue =
      fraction.length <= maximumFractionDigits
        ? numberValue
        : `${int}.${fraction.slice(0, maximumFractionDigits)}`;

    if (isAllowed(+numberValue)) {
      let formattedNumber = printNumber({
        value: +numberValue,
        languageCode: locale,
        options: {
          maximumFractionDigits,
          minimumFractionDigits: Math.min(
            fraction.length,
            maximumFractionDigits,
          ),
        },
      });

      if ([',', '.'].includes(value[value.length - 1]) && !fraction.length) {
        formattedNumber += decimal;
      }

      return [formattedNumber, +numberValue];
    }
  }

  return [null, null];
}

export function formatBigNumberValue(
  value: string,
  {
    locale,
    isAllowed,
    prevValue,
    maximumFractionDigits,
  }: {
    locale: string;
    isAllowed: (value: BigNumber) => boolean;
    prevValue: string;
    maximumFractionDigits: number;
  },
): [formattedValue: string | null, numValue: null | BigNumber] {
  const decimal = getDecimal(locale);
  const group = getGroup(locale);

  if (value.length === 0) {
    return ['', BigNumber(0)];
  } else if (value.length === 1 && ['.', ','].includes(value[0])) {
    return [`0${decimal}`, BigNumber(0)];
  } else if (value === '0') {
    if (prevValue === `0${decimal}`) {
      return ['0', BigNumber(0)];
    } else {
      return [`0${decimal}`, BigNumber(0)];
    }
  } else {
    const numberValue = value
      .replace(new RegExp(`\\${group}`, 'g'), '')
      .replace(new RegExp(`\\${decimal}`), '.');
    const fraction = numberValue.split('.')[1] || '';

    const bnValue = new BigNumber(numberValue).decimalPlaces(
      maximumFractionDigits,
      1,
    );

    if (isAllowed(bnValue)) {
      let formattedNumber = printStringNumber({
        value: bnValue.toString(),
        languageCode: locale,
        options: {
          maximumFractionDigits,
          minimumFractionDigits: Math.min(
            fraction.length,
            maximumFractionDigits,
          ),
        },
      });

      if ([',', '.'].includes(value[value.length - 1]) && !fraction.length) {
        formattedNumber += decimal;
      }

      return [formattedNumber, bnValue];
    }
  }

  return [null, null];
}
