import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';
import {
  OrderPaymentDto,
  RestDataResponseInitiatePaymentStatusOrderPaymentDtoStatusEnum,
} from 'api/wpay/generated';

import { withUserId } from 'utils/common/persist';

type WPAYState = {
  fetching?: boolean;
  orderError?: boolean;
  status?: RestDataResponseInitiatePaymentStatusOrderPaymentDtoStatusEnum;
  entity?: OrderPaymentDto;
  paymentCurrency: FrontendCryptoCurrencyEnum;
};

const initialState: WPAYState = {
  fetching: true,
  paymentCurrency: FrontendCryptoCurrencyEnum.Ton,
};

const persistConfig = {
  key: withUserId('wallet-wpay'),
  keyPrefix: '',
  version: 1,
  storage,
  whitelist: ['paymentCurrency'],
};

export const wpaySlice = createSlice({
  name: 'wpay',
  initialState,
  reducers: {
    setOrderPayment: (state, action: PayloadAction<OrderPaymentDto>) => {
      const doesPaymentOptionsIncludePaymentCurrency =
        action.payload.currentPayment?.paymentOptions
          .map((paymentOption) => paymentOption.amount.currencyCode)
          .includes(state.paymentCurrency);

      state.fetching = false;
      state.orderError = false;
      state.entity = action.payload;
      if (!doesPaymentOptionsIncludePaymentCurrency) {
        state.paymentCurrency = FrontendCryptoCurrencyEnum.Ton;
      }
    },
    setPaymentCurrency: (
      state,
      action: PayloadAction<FrontendCryptoCurrencyEnum>,
    ) => {
      return {
        ...initialState,
        paymentCurrency: action.payload,
      };
    },
    setOrderError: (state, action: PayloadAction<boolean>) => {
      state.fetching = false;
      state.orderError = action.payload;
    },
    setOrderStatus: (
      state,
      action: PayloadAction<OrderPaymentDto['status']>,
    ) => {
      if (state.entity) {
        state.entity.status = action.payload;
      }
    },
  },
});

export const {
  setOrderPayment,
  setOrderError,
  setPaymentCurrency,
  setOrderStatus,
} = wpaySlice.actions;

export default persistReducer(persistConfig, wpaySlice.reducer);
