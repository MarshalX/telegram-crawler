import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PaymentMethodRestDto } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import { P2P_CRYPTO_CURRENCIES_MULTICURRENCY } from 'config';

interface InitialState {
  defaultCurrencies: {
    fiat?: FiatCurrency;
    crypto?: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
  };
  chosenPaymentMethods: {
    [key: string]: PaymentMethodRestDto[];
  };
}

const initialState: InitialState = {
  chosenPaymentMethods: {},
  defaultCurrencies: {},
};

export const adFormSlice = createSlice({
  name: 'p2pAdForm',
  initialState,
  reducers: {
    setChosenPaymentMethods: (
      state,
      action: PayloadAction<{
        currency: string;
        paymentMethods: PaymentMethodRestDto[];
      }>,
    ) => {
      return (state = {
        ...state,
        chosenPaymentMethods: {
          ...state.chosenPaymentMethods,
          [action.payload.currency]: action.payload.paymentMethods,
        },
      });
    },
    setDefaultCurrencies: (
      state,
      action: PayloadAction<InitialState['defaultCurrencies']>,
    ) => {
      state.defaultCurrencies = {
        ...state.defaultCurrencies,
        ...action.payload,
      };
    },
  },
});

export const { setChosenPaymentMethods, setDefaultCurrencies } =
  adFormSlice.actions;

export default adFormSlice.reducer;
