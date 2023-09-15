import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/getGems';

interface CollectibleGroupedParams {
  address: string;
  countColTotal: number;
  countRowPerCollection: number;
  countRowTotal: number;
}

export const useCollectiblesGrouped = (params: CollectibleGroupedParams) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: queryKeys.getGems.collectiblesGrouped(params.address),
    queryFn: async ({ pageParam }) => {
      const collectiblesGrouped = await API.Collectibles.collectiblesGrouped(
        params.address,
        params.countColTotal,
        params.countRowPerCollection,
        params.countRowTotal,
        pageParam,
      );
      return collectiblesGrouped.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.cursor) {
        return undefined;
      }
      return lastPage.cursor;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const items = data?.pages.map((page) => page.items).flat() || [];

  return {
    items,
    ...rest,
  };
};
