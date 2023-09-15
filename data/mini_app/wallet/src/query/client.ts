import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
});

export const queryPersister = createSyncStoragePersister({
  storage: window.localStorage,
});
