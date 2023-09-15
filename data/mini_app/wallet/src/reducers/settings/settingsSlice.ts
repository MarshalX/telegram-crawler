import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { Langs } from 'utils/common/lang';

import { FALLBACK_LANGUAGE } from '../../i18n';

interface SettingsState {
  languageCode: Langs;
  fiatCurrency: FiatCurrency;
  preferredAsset: FrontendCryptoCurrencyEnum;
  preferFiat?: boolean;
  paymentCurrency?: FiatCurrency;
}

const initialState: SettingsState = {
  languageCode: FALLBACK_LANGUAGE,
  fiatCurrency: 'USD',
  preferredAsset: FrontendCryptoCurrencyEnum.Ton,
  preferFiat: false,
};

export const userSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Langs>) => {
      state.languageCode = action.payload;
    },
    updateFiatCurrency: (state, action: PayloadAction<FiatCurrency>) => {
      state.fiatCurrency = action.payload;
    },
    updatePreferredAsset: (
      state,
      action: PayloadAction<FrontendCryptoCurrencyEnum>,
    ) => {
      state.preferredAsset = action.payload;
    },
    updatePreferFiat: (state, action: PayloadAction<boolean>) => {
      state.preferFiat = action.payload;
    },
    setPaymentCurrency: (state, action: PayloadAction<FiatCurrency>) => {
      state.paymentCurrency = action.payload;
    },
  },
});

export const {
  updateFiatCurrency,
  updateLanguage,
  updatePreferredAsset,
  updatePreferFiat,
  setPaymentCurrency,
} = userSlice.actions;

export default userSlice.reducer;
