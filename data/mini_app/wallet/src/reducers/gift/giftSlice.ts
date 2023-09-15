import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CurrencyEnum, GiftStatusEnum } from '../../api/wallet/generated';

interface GiftSlice {
  amount?: number;
  currency?: CurrencyEnum;
  shareGiftCount?: number;
  isLastWave?: boolean;
  campaignEndDate?: string;
  status?: GiftStatusEnum;
}

const initialState: GiftSlice = {};

export const GiftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    openGift: (state) => {
      state.status = undefined;
      return state;
    },
    setGift: (
      state,
      action: PayloadAction<Pick<GiftSlice, 'amount' | 'currency' | 'status'>>,
    ) => {
      state.amount = action.payload.amount;
      state.currency = action.payload.currency;
      state.status = action.payload.status;
    },
    resetGift: (state) => {
      return {
        ...state,
        status: undefined,
        amount: undefined,
        currency: undefined,
      };
    },
    setCampaignParticipation: (
      state,
      action: PayloadAction<
        Pick<GiftSlice, 'isLastWave' | 'campaignEndDate' | 'shareGiftCount'>
      >,
    ) => {
      state.isLastWave = action.payload.isLastWave;
      state.campaignEndDate = action.payload.campaignEndDate;
      state.shareGiftCount = action.payload.shareGiftCount;
    },
    resetCampaignParticipation: (state) => {
      return {
        ...state,
        shareGiftCount: undefined,
        isLastWave: undefined,
        campaignEndDate: undefined,
      };
    },
  },
});

export const {
  setGift,
  resetGift,
  openGift,
  setCampaignParticipation,
  resetCampaignParticipation,
} = GiftSlice.actions;
export default GiftSlice.reducer;
