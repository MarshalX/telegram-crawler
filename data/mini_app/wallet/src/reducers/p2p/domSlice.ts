import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  DomOfferRestDto,
  PaymentMethodRestDto,
} from 'api/p2p/generated-common';

import { P2P_CRYPTO_CURRENCIES_MULTICURRENCY } from 'config';

interface InitialState {
  lastYScrollPosition?: number;
  filters?: {
    cryptoCurrency?: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
    fiatCurrency?: string;
    amountValue?: string;
    amount?: string;
    paymentMethods?: string[];
  };
  offers?: DomOfferRestDto[];
  offset?: number;
  paymentMethods?: PaymentMethodRestDto[];
}

const initialState: InitialState = {};

export const domSlice = createSlice({
  name: 'p2pDom',
  initialState,
  reducers: {
    setDom: (state, action: PayloadAction<Partial<InitialState>>) => {
      return (state = { ...state, ...action.payload });
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<InitialState['filters']>>,
    ) => {
      return (state = {
        ...state,
        filters: { ...state.filters, ...action.payload },
      });
    },
  },
});

export const { setFilters, setDom } = domSlice.actions;

export default domSlice.reducer;
