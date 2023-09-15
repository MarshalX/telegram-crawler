import { useQuery } from '@tanstack/react-query';

import API from 'api/p2p';

import { useAppSelector } from 'store';

const useSupportedFiatCurrencies = () => {
  const { userId, p2pInitialized } = useAppSelector((state) => state.p2pUser);

  const { data = [], isLoading } = useQuery({
    enabled: !!userId && p2pInitialized,
    queryKey: ['findAllSupportedFiatV2', userId],
    queryFn: async () => {
      const { data } = await API.Currency.findAllSupportedFiatV2();

      if (data.status !== 'SUCCESS') {
        return [];
      }

      // TODO: remove after backend will remove USD WT-3664
      return data.data?.filter((currency) => currency !== 'USD');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { data, isLoading };
};

export default useSupportedFiatCurrencies;
