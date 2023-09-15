import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/getGems';

export const useTransferCollectible = (
  collectibleAddress: string,
  recipientAddress: string,
) => {
  return useQuery({
    queryKey: queryKeys.getGems.transferCollectible(
      collectibleAddress,
      recipientAddress,
    ),
    queryFn: async () => {
      const collectible = await API.Collectibles.transferCollectible(
        collectibleAddress,
        recipientAddress,
      );
      return collectible.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
};
