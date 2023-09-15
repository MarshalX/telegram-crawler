import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { OfferTypeEnum } from 'api/p2p/generated-common';
import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

export interface P2PState {
  homePageLastYScrollPosition?: number;
  profilePageLastYScrollPosition?: number;
  isUserClickedContinueOnNotSupportedCountryPage: boolean;
  isUserDismissedStartTradesModal?: boolean;

  chosenCryptoCurrencyOnAssetPageForDom?: FrontendCryptoCurrencyEnum;
  chosenCryptoCurrencyOnAssetPageForAdForm?: FrontendCryptoCurrencyEnum;

  defaultCurrencyForSaleOfferCreation: 'crypto' | 'fiat';
  defaultCurrencyForPurchaseOfferCreation: 'crypto' | 'fiat';

  createOfferTypeInUserProfile: OfferTypeEnum;

  lastFiatCurrencyChooseToCreatePaymentMethod?: FiatCurrency;
  orderHistoryStatus: 'active' | 'completed';

  isWhyUsdtCalloutShown: boolean;
  isP2pOnboardingShown: boolean;
}

const initialState: P2PState = {
  isUserClickedContinueOnNotSupportedCountryPage: false,
  defaultCurrencyForSaleOfferCreation: 'fiat',
  defaultCurrencyForPurchaseOfferCreation: 'crypto',
  createOfferTypeInUserProfile: 'PURCHASE',
  orderHistoryStatus: 'active',
  isWhyUsdtCalloutShown: false,
  isP2pOnboardingShown: false,
};

export const p2pSlice = createSlice({
  name: 'p2p',
  initialState,
  reducers: {
    setP2P: (state, action: PayloadAction<Partial<P2PState>>) => {
      return (state = { ...state, ...action.payload });
    },
    hideWhyUsdtCallout: (state) => {
      return (state = { ...state, isWhyUsdtCalloutShown: true });
    },
    setOnboardingShown: (state) => {
      return (state = { ...state, isP2pOnboardingShown: true });
    },
  },
});

export const { setP2P, hideWhyUsdtCallout, setOnboardingShown } =
  p2pSlice.actions;

export default p2pSlice.reducer;
