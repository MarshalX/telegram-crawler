import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from 'query/client';
import { queryKeys } from 'query/queryKeys';

import API from 'api/getGems';
import {
  CollectiblePreviewsByCollectionResponse,
  CollectiblesGroupedResponse,
} from 'api/getGems/generated';

const SINGLE_NFT_COLLECTION_ADDRESS = '';

export const useCollectiblePreviewsByCollection = (
  params: {
    userAddress: string;
    collectionAddress: string;
    count: number;
  },
  options: {
    useCachedInitialData?: boolean;
    enabled?: boolean;
  },
) => {
  const isInfiniteData = (data: unknown): data is InfiniteData<unknown> => {
    return (
      data !== null &&
      typeof data === 'object' &&
      'pages' in data &&
      Array.isArray(data.pages)
    );
  };

  const isCollectibleGroupResponse = (
    data: unknown,
  ): data is CollectiblesGroupedResponse => {
    return (
      data !== null &&
      typeof data === 'object' &&
      'items' in data &&
      'collectibleCount' in data
    );
  };

  const getInitialDataFromCache = ():
    | CollectiblePreviewsByCollectionResponse
    | undefined => {
    const cache = queryClient.getQueryData(
      queryKeys.getGems.collectiblesGrouped(params.userAddress),
    );
    if (!isInfiniteData(cache)) {
      return;
    }
    for (let i = 0; i < cache.pages.length; i++) {
      const page = cache.pages[i];
      if (!isCollectibleGroupResponse(page)) {
        return;
      }
      const collection = page.items.find(
        (item) => item.collectionPreview.address === params.collectionAddress,
      );
      if (collection) {
        return {
          collectibles: collection.collectiblePreviews.items,
          collectibleCount: collection.collectibleCount,
          cursor: collection.collectiblePreviews.cursor,
        };
      }
    }
    return;
  };

  const { data, ...rest } = useInfiniteQuery({
    queryKey: queryKeys.getGems.collectiblePreviewsByCollection(
      params.userAddress,
      params.collectionAddress,
    ),
    queryFn: async ({ pageParam }) => {
      const previews = await API.Collectibles.collectiblePreviewsByCollection(
        params.userAddress,
        params.collectionAddress !== SINGLE_NFT_COLLECTION_ADDRESS
          ? params.collectionAddress
          : undefined,
        params.count,
        pageParam,
      );
      return previews.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.cursor) {
        return undefined;
      }
      return lastPage.cursor;
    },
    initialData: () => {
      if (!options.useCachedInitialData) {
        return undefined;
      }
      const initialData = getInitialDataFromCache();
      if (!initialData) {
        return undefined;
      }
      return {
        pages: [initialData],
        pageParams: [undefined],
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: options.enabled,
  });

  const collectiblePreviews =
    data?.pages.map((page) => page.collectibles).flat() || [];

  return {
    collectiblePreviews,
    ...rest,
  };
};
