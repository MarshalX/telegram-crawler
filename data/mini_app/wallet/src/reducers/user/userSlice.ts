import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FeatureFlags, Permission } from 'api/wallet/generated';

import { WebViewUser } from 'types/webViewUser';

export interface UserState extends Partial<WebViewUser> {
  authorized: boolean;
  purchaseByCard?: {
    available: boolean;
    code?: string;
  };
  featureFlags: {
    paymentByCard: boolean;
    wpayAsMerchant: boolean;
    wpayAsPayer: boolean;
    usdtRuffle: boolean;
    passcode: boolean;
    multicurrency: boolean;
    scw: boolean;
    rcards: boolean;
    p2pExpress: boolean;
    collectibles: boolean;
    scwBetaWaitlist: boolean;
    usdtTransfer: boolean;
    kyc: boolean;
  };
  permissions: {
    canReceive: boolean;
    canWithdrawOuter: boolean;
    canWithdrawInner: boolean;
    canUserWpayAsPayer: boolean;
    canExchange: boolean;
    canUsdtRuffle: boolean;
  };
  isRussian: boolean;
}

const initialState: UserState = {
  authorized: false,
  featureFlags: {
    paymentByCard: false,
    wpayAsMerchant: false,
    wpayAsPayer: false,
    usdtRuffle: false,
    passcode: false,
    multicurrency: false,
    scw: false,
    rcards: false,
    p2pExpress: false,
    collectibles: false,
    scwBetaWaitlist: false,
    usdtTransfer: false,
    kyc: false,
  },
  purchaseByCard: {
    available: false,
  },
  permissions: {
    canReceive: false,
    canWithdrawOuter: false,
    canWithdrawInner: false,
    canUserWpayAsPayer: false,
    canExchange: false,
    canUsdtRuffle: false,
  },
  isRussian: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePurchaseByCard: (
      state,
      action: PayloadAction<UserState['purchaseByCard']>,
    ) => {
      state.purchaseByCard = action.payload;
    },
    updatePermissions: (state, action: PayloadAction<Partial<Permission>>) => {
      const { permissions } = state;
      const { payload } = action;
      permissions.canExchange = payload.can_exchange ?? permissions.canExchange;
      permissions.canReceive = payload.can_top_up ?? permissions.canReceive;
      permissions.canWithdrawOuter =
        payload.can_withdraw_outer ?? permissions.canWithdrawOuter;
      permissions.canWithdrawInner =
        payload.can_withdraw_inner ?? permissions.canWithdrawInner;
      permissions.canUserWpayAsPayer =
        payload.can_use_wpay_as_payer ?? permissions.canUserWpayAsPayer;
      permissions.canUsdtRuffle =
        payload.can_usdt_raffle ?? permissions.canUsdtRuffle;
    },
    updateFeatureFlags: (state, action: PayloadAction<FeatureFlags>) => {
      const {
        tg_payments: paymentByCard,
        wpay_as_merchant: wpayAsMerchant,
        wpay_as_payer: wpayAsPayer,
        usdt_raffle: usdtRuffle,
        passcode,
        multicurrency,
        scw,
        rcards,
        p2p_express: p2pExpress,
        collectibles,
        scw_beta_waitlist: scwBetaWaitlist,
        usdt_transfer: usdtTransfer,
        kyc,
      } = action.payload;
      state.featureFlags = {
        paymentByCard,
        wpayAsMerchant,
        wpayAsPayer,
        usdtRuffle,
        passcode,
        multicurrency,
        scw,
        rcards,
        p2pExpress,
        collectibles,
        scwBetaWaitlist,
        usdtTransfer,
        kyc,
      };
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setIsRussian: (state, action: PayloadAction<boolean>) => {
      state.isRussian = action.payload;
    },
    setUser: (state, action: PayloadAction<WebViewUser | undefined>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  updatePurchaseByCard,
  updateFeatureFlags,
  updatePermissions,
  setAuthorized,
  setIsRussian,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
