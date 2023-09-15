import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { getReceiverSearchPersistConfig } from 'reducers/receiverSearch/getReceiverSearchPersistConfig';

import { select } from 'utils/common/redux';

interface ReceiverSearchSlice {
  recentWithdrawsClearDate: Partial<Record<FrontendCryptoCurrencyEnum, number>>;
}

const initialState: ReceiverSearchSlice = {
  recentWithdrawsClearDate: {},
};

export const receiverSearchSlice = createSlice({
  name: 'receiverSearch',
  initialState,
  reducers: {
    setRecentWithdrawsClearDate: (
      state,
      action: PayloadAction<FrontendCryptoCurrencyEnum>,
    ) => {
      state.recentWithdrawsClearDate = {
        ...state.recentWithdrawsClearDate,
        [action.payload]: Date.now(),
      };
    },
  },
});

export const { setRecentWithdrawsClearDate } = receiverSearchSlice.actions;

export const selectClearDateByCurrency = select(
  (state, currency: FrontendCryptoCurrencyEnum) =>
    state.receiverSearch.recentWithdrawsClearDate[currency],
);

export default persistReducer(
  getReceiverSearchPersistConfig('wallet-receiver-search'),
  receiverSearchSlice.reducer,
);
