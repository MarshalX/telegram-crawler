import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';
import { DEFAULT_STALE_TIME } from 'query/scw/account';

import API from 'api/getGems';

export const useCollectible = (address: string) => {
  return useQuery({
    queryKey: queryKeys.getGems.collectible(address),
    queryFn: async () => {
      const collectible = await API.Collectibles.collectible(address);
      return collectible.data;
    },
    staleTime: DEFAULT_STALE_TIME,
  });
};
