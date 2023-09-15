import storage from 'redux-persist/lib/storage';

import { withUserId } from 'utils/common/persist';

export const getReceiverSearchPersistConfig = (key: string) => {
  return {
    key: withUserId(key),
    keyPrefix: '',
    version: 1,
    storage,
    whitelist: ['recentWithdrawsClearDate'],
  };
};
