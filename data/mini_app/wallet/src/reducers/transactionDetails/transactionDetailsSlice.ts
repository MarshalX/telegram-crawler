import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  TransactionDetails,
  TransactionStatusEnum,
} from '../../api/wallet/generated';

type TransactionDetailsSlice = TransactionDetails | null;

export const transactionDetailsSlice = createSlice({
  name: 'transactionDetails',
  initialState: null as TransactionDetailsSlice,
  reducers: {
    setData: (state, action: PayloadAction<TransactionDetails>) => {
      return action.payload;
    },
    updateStatus: (state, action: PayloadAction<TransactionStatusEnum>) => {
      if (state) {
        state.status = action.payload;
      }
      return state;
    },
  },
});

export const { setData, updateStatus } = transactionDetailsSlice.actions;

export default transactionDetailsSlice.reducer;
