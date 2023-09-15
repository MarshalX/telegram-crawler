import { useQuery } from '@tanstack/react-query';

import API from 'api/p2p';

import { useAppSelector } from 'store';

const useSettings = () => {
  const { userId, p2pInitialized } = useAppSelector((state) => state.p2pUser);

  const { data, isLoading } = useQuery({
    enabled: !!userId && p2pInitialized,
    queryKey: ['getSettings', userId],
    queryFn: async () => {
      const { data } = await API.Offer.getSettings();

      if (data.status !== 'SUCCESS') {
        console.error(data);
      }

      return data.data;
    },
  });

  return { data, isLoading };
};

export default useSettings;
