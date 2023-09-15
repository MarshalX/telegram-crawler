import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { KycStatusPublicDtoLevelEnum } from 'api/p2p/generated-userservice';

import {
  BotKycPollingQuery,
  CurrencyEnum,
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
  PaymentMethodEnum,
} from '../../api/wallet/generated';

interface KycSlice {
  btn_kyc_success_url: BotKycPollingQuery['btn_kyc_success_url'];
  btn_kyc_success_text: BotKycPollingQuery['btn_kyc_success_text'];
  btn_kyc_retry_url: BotKycPollingQuery['btn_kyc_retry_url'];
  baseCurrency: FiatCurrency | FrontendCryptoCurrencyEnum;
  inputNumValue: number;
  method: PaymentMethodEnum;
  id: string;
  secondaryCurrency: CurrencyEnum;
  kycUrl: string;

  nextLevel: KycStatusPublicDtoLevelEnum;
}

const initialState: Partial<KycSlice> = {};

export const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    updateKyc: (state, action: PayloadAction<Partial<KycSlice>>) => {
      return Object.assign(state, action.payload);
    },
    cleanKyc: () => initialState,
  },
});

export const { updateKyc, cleanKyc } = kycSlice.actions;

export default kycSlice.reducer;
