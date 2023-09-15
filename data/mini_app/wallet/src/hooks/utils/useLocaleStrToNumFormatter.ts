import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useRef } from 'react';

import {
  formatBigNumberValue,
  formatValue,
} from 'utils/common/formatLocaleStrToNum';

export const useLocaleStrToNumFormatter = (value: string) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const format = useCallback(
    (
      value: string,
      {
        locale,
        isAllowed,
        maximumFractionDigits,
      }: {
        locale: string;
        isAllowed: (value: number) => boolean;
        maximumFractionDigits: number;
      },
    ) =>
      formatValue(value, {
        locale,
        isAllowed,
        prevValue: valueRef.current,
        maximumFractionDigits,
      }),
    [],
  );

  return format;
};

export const useLocaleStrBigNumberToNumFormatter = (value: string) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const format = useCallback(
    (
      value: string,
      {
        locale,
        isAllowed,
        maximumFractionDigits,
      }: {
        locale: string;
        isAllowed: (value: BigNumber) => boolean;
        maximumFractionDigits: number;
      },
    ) =>
      formatBigNumberValue(value, {
        locale,
        isAllowed,
        prevValue: valueRef.current,
        maximumFractionDigits,
      }),
    [],
  );

  return format;
};
