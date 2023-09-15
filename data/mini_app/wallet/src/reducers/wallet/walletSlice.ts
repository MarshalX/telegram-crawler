import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { config } from 'config';

export interface WalletAsset {
  currency: FrontendCryptoCurrencyEnum;
  balance: number;
  hasTransactions?: boolean;
  address?: string;
  network: string;
  fiatBalance: number;
  fiatCurrency: FiatCurrency;
}

interface WalletState {
  botUsername: string;
  totalFiatAmount: number;
  totalFiatCurrency: FiatCurrency;
  assets: WalletAsset[];
}

const initialState: WalletState = {
  botUsername: config.productionBotName,
  totalFiatAmount: 0,
  totalFiatCurrency: 'USD',
  assets: [],
};

export const userSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWallet: (state, action: PayloadAction<Partial<WalletState>>) => {
      return { ...state, ...action.payload };
    },
    updateWalletAsset: (state, action: PayloadAction<Partial<WalletAsset>>) => {
      if (state.assets) {
        state.assets = state.assets.map((asset) => {
          return asset.currency === action.payload.currency
            ? { ...asset, ...action.payload }
            : asset;
        });
      }
    },
  },
});

export const { updateWallet, updateWalletAsset } = userSlice.actions;

export default userSlice.reducer;
