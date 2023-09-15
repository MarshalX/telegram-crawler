import { useQuery } from '@tanstack/react-query';

import API from 'api/wallet';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { divide } from 'utils/common/math';

import { useAppSelector } from '../../../store';

const getExchangeRate = ({
  fromCurrency,
  toCurrency,
  exchangeMode,
}: {
  fromCurrency: FrontendCryptoCurrencyEnum;
  toCurrency: FrontendCryptoCurrencyEnum;
  exchangeMode: 'pay' | 'receive';
}) => {
  return API.Exchange.convert({
    from_amount: exchangeMode === 'pay' ? 1 : undefined,
    to_amount: exchangeMode === 'receive' ? 1 : undefined,
    from_currency: fromCurrency,
    to_currency: toCurrency,
  }).then((response) => {
    return response.data;
  });
};

export const useExchangeRate = (
  fromCurrency: FrontendCryptoCurrencyEnum,
  toCurrency: FrontendCryptoCurrencyEnum,
  exchangeMode: 'pay' | 'receive',
) => {
  const fiatCurrency = useAppSelector((state) => state.settings.fiatCurrency);
  const { data, ...rest } = useQuery({
    queryKey: [
      'exchangeRate',
      { fromCurrency, toCurrency, exchangeMode, fiatCurrency },
    ],
    queryFn: () => {
      return getExchangeRate({ fromCurrency, toCurrency, exchangeMode }).then(
        (convertResult) =>
          exchangeMode === 'pay'
            ? convertResult.rate
            : divide(1, convertResult.rate),
      );
    },
    enabled: !!fromCurrency && !!toCurrency,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    exchangeRate: data,
    ...rest,
  };
};
