import { useQuery } from '@tanstack/react-query';

import API from 'api/p2p';

import { useAppSelector } from 'store';

const useABTests = () => {
  const { userId, p2pInitialized } = useAppSelector((state) => state.p2pUser);

  const { data, isLoading } = useQuery({
    enabled: !!userId && p2pInitialized,
    queryKey: ['getABTests', userId],
    queryFn: async () => {
      const { data } = await API.UserSettings.getABTests();

      if (data.status !== 'SUCCESS') {
        console.error(data);
      }

      return data.data;
    },
  });

  return { data, isLoading };
};

export default useABTests;
