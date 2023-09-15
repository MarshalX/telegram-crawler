import { Address, Cell as TonCoreCell, beginCell } from 'ton-core';

import { AccountEvent } from 'api/tonapi/generated/api';

import store from 'store';

import { emulateTransaction, sendTransaction } from 'utils/scw/ton';

import { SignRawParams } from './tonConnect/types';

interface JettonTransferParams {
  queryId?: bigint;
  amount: bigint;
  destination: Address;
  sendExcessTo?: Address;
  customPayload?: TonCoreCell;
  forwardAmount?: number;
  forwardPayload?: TonCoreCell;
}

const makeJettonTransferPayload = (params: JettonTransferParams) => {
  return beginCell()
    .storeUint(0x0f8a7ea5, 32)
    .storeUint(params.queryId ?? 0, 64)
    .storeCoins(params.amount)
    .storeAddress(params.destination)
    .storeAddress(params.sendExcessTo)
    .storeMaybeRef(params.customPayload)
    .storeCoins(params.forwardAmount ?? 0)
    .storeMaybeRef(params.forwardPayload)
    .endCell()
    .toBoc()
    .toString('base64');
};

const makeJettonTransferSignParams = (
  senderJettonAddress: string,
  amount: number,
  recipientTonAddress: string,
): SignRawParams => {
  const currentWalletAddress = store.getState().scw?.address;

  const payload = makeJettonTransferPayload({
    amount: BigInt(amount),
    destination: Address.parse(recipientTonAddress),
    sendExcessTo: Address.parse(currentWalletAddress),
  });

  return {
    source: currentWalletAddress,
    valid_until: Date.now() + 60 * 1000,
    messages: [
      {
        address: senderJettonAddress,
        // fixed amount to pay tx gas fees with excess which is refunded to sendExcessTo
        // excess should be about 0.04 - 0.06 TON
        amount: '100000000',
        payload: payload,
      },
    ],
  };
};

export const emulateSendJettonAddress = async (
  senderJettonAddress: string,
  amount: number,
  recipientTonAddress: string,
): Promise<{ event: AccountEvent; estimateFee: number }> => {
  const signParams = makeJettonTransferSignParams(
    senderJettonAddress,
    amount,
    recipientTonAddress,
  );
  return emulateTransaction(signParams);
};

export const sendJettonAddress = async (
  senderJettonAddress: string,
  amount: number,
  recipientTonAddress: string,
): Promise<string | undefined> => {
  const signParams = makeJettonTransferSignParams(
    senderJettonAddress,
    amount,
    recipientTonAddress,
  );
  const boc = await sendTransaction(signParams);
  return boc;
};
