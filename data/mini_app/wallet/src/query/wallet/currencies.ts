import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/wallet';

import { useAppSelector } from 'store';

const getCurrencies = () =>
  API.Currencies.getAvailableFiatCurrencies().then((response) => response.data);

export const useCurrencies = () => {
  return useQuery({
    queryKey: queryKeys.currencies(),
    queryFn: getCurrencies,
    refetchOnMount: false,
  });
};

export const useSupportedCurrencies = () => {
  const { authorized, id: userId } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: [`getWebviewFiatCurrency`, userId],
    queryFn: () =>
      API.Currencies.getWebviewFiatCurrency().then((response) => response.data),
    enabled: authorized,
  });
};

export const useCountryToCurrency = () => {
  const { authorized, id: userId } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: [`getCountryCurrency`, userId],
    queryFn: () =>
      API.Currencies.getCountryCurrency().then((response) => response.data),
    enabled: authorized,
  });
};

export const useAvailableFiatCurrencies = () => {
  const userId = useAppSelector((state) => state.user.id);

  return useQuery({
    queryKey: [`getWebviewAvailableFiatCurrencies`, userId],
    queryFn: () =>
      API.Purchases.getWebviewAvailableFiatCurrencies().then(
        (response) => response.data,
      ),
    enabled: !!userId,
  });
};
