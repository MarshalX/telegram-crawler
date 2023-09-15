import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { WithdrawRequestData } from 'api/wallet/generated';

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K];
};

export type SendRequestSlice = KeysToCamelCase<
  Omit<WithdrawRequestData, 'address'> & WithdrawRequestData['address']
> | null;

const initialState = null;

export const sendRequestSlice = createSlice({
  name: 'sendRequest',
  initialState: initialState as SendRequestSlice,
  reducers: {
    create: (state, action: PayloadAction<WithdrawRequestData>) => {
      return {
        uid: action.payload.uid,
        balanceAfter: action.payload.balance_after,
        senderAmount: action.payload.sender_amount,
        recipientAmount: action.payload.recipient_amount,
        fee: action.payload.fee,
        address: action.payload.address.address,
        network: action.payload.address.network,
      };
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { create, reset } = sendRequestSlice.actions;

export default sendRequestSlice.reducer;
