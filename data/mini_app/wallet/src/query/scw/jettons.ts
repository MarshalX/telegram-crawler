import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from 'query/scw/account';

import API from 'api/tonapi';

import { useAppSelector } from 'store';

export const useJettonBalances = (address?: string) => {
  const userAddress = useAppSelector((state) => state.scw.address);
  const resolvedAddress = address || userAddress;

  return useQuery({
    queryKey: ['scw', 'getJettonsBalances', resolvedAddress],
    queryFn: () =>
      API.Accounts.getJettonsBalances(resolvedAddress).then((response) => {
        return (
          response?.data || {
            balances: [],
          }
        );
      }),
    staleTime: DEFAULT_STALE_TIME,
  });
};
