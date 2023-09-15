import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { getReceiverSearchPersistConfig } from 'reducers/receiverSearch/getReceiverSearchPersistConfig';

import { select } from 'utils/common/redux';

interface ReceiverSearchSlice {
  recentWithdrawsClearDate?: number;
}

const initialState: ReceiverSearchSlice = {};

export const collectibleReceiverSearchSlice = createSlice({
  name: 'collectiblesReceiverSearch',
  initialState,
  reducers: {
    setRecentWithdrawsClearDate: (state) => {
      state.recentWithdrawsClearDate = Date.now();
    },
  },
});

export const { setRecentWithdrawsClearDate } =
  collectibleReceiverSearchSlice.actions;

export const selectClearDate = select(
  (state) => state.collectibleReceiverSearch.recentWithdrawsClearDate,
);

export default persistReducer(
  getReceiverSearchPersistConfig('collectibles-receiver-search'),
  collectibleReceiverSearchSlice.reducer,
);
