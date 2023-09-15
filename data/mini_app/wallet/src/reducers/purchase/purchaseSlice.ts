import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  FrontendCryptoCurrencyEnum,
  PaymentMethodEnum,
  PurchaseInfoResponse,
  TelegramPaymentResponse,
} from 'api/wallet/generated';

interface PurchaseSlice extends Partial<TelegramPaymentResponse> {
  status?: PurchaseInfoResponse['status'];
  method?: PaymentMethodEnum;
  returnPath?: string;
  assetCurrency?: FrontendCryptoCurrencyEnum;
}

const initialState: PurchaseSlice = {};

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    createPurchase: (state, action: PayloadAction<PurchaseSlice>) => {
      return action.payload;
    },
    updatePurchase: (state, action: PayloadAction<Partial<PurchaseSlice>>) => {
      return { ...state, ...action.payload };
    },
    cleanPurchase: () => initialState,
  },
});

export const { updatePurchase, cleanPurchase, createPurchase } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
