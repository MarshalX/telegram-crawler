import { useQuery } from '@tanstack/react-query';

import API from 'api/p2p';

import { useAppSelector } from 'store';

const useUserStats = () => {
  const { userId } = useAppSelector((state) => state.p2pUser);

  const { data, isLoading } = useQuery({
    queryKey: ['getUserStatistics', userId],
    queryFn: async () => {
      const { data } = await API.UserStatistics.getUserStatisticsV2();

      if (data.status !== 'SUCCESS') {
        console.error(data);
      }

      return {
        totalOrdersCount: data.data?.totalOrdersCount || 0,
        successPercent: data.data?.successPercent || 0,
      };
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    data: data || {
      totalOrdersCount: 0,
      successPercent: 0,
    },
    isLoading,
  };
};

export default useUserStats;
