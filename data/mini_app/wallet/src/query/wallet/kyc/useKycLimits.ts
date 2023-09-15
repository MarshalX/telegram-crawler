import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/p2p';
import { FiatCurrency } from 'api/wallet/generated';

import { useAppSelector } from 'store';

export const getKycLimits = () => {
  return API.User.getLimits().then(({ data }) => data.data);
};

export const useKycLimits = () => {
  const { authorized, id: userId } = useAppSelector((state) => state.user);

  const { data, ...rest } = useQuery({
    queryKey: queryKeys.kyc.limits(userId),
    queryFn: () => getKycLimits(),
    enabled: !authorized,
  });

  const limits = { ...data };

  if (limits && limits.currencyCode) {
    delete limits.currencyCode;
  }

  return { currency: data?.currencyCode as FiatCurrency, limits, ...rest };
};
