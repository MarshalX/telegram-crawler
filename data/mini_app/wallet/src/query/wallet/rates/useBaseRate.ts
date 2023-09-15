import { useQuery } from '@tanstack/react-query';

import API from 'api/wallet';
import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

export const getBaseRate = ({
  currency,
  fiatCurrency,
}: {
  currency: FrontendCryptoCurrencyEnum;
  fiatCurrency: FiatCurrency;
}) => {
  return API.Transfers.getPriceForFiat(currency, fiatCurrency, 1).then(
    ({ data }) => data.rate,
  );
};

export const useBaseRate = (currency: FrontendCryptoCurrencyEnum) => {
  const fiatCurrency = useAppSelector((state) => state.settings.fiatCurrency);
  const { data, ...rest } = useQuery({
    queryKey: [`baseRate`, { currency, fiatCurrency }],
    queryFn: () => getBaseRate({ currency, fiatCurrency }),
    enabled: !!fiatCurrency,
    refetchOnMount: false,
  });

  return { baseRate: data, ...rest };
};
