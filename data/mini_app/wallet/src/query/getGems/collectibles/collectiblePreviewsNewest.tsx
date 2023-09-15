import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/getGems';

import { useAppSelector } from 'store';

export const useCollectiblePreviewsNewest = (userAddress: string) => {
  const { featureFlags } = useAppSelector((state) => state.user);
  return useQuery({
    queryKey: queryKeys.getGems.collectiblePreviewsNewest(userAddress),
    queryFn: async () => {
      const collectible = await API.Collectibles.collectiblePreviewsNewest(
        userAddress,
      );
      return collectible.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: featureFlags.collectibles,
  });
};
