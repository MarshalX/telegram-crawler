import { AppRequest, DeviceInfo } from '@tonconnect/protocol';
import { mnemonicNew, mnemonicToPrivateKey } from 'ton-crypto';
import TonWeb, { Method } from 'tonweb';
import { Cell } from 'tonweb/dist/types/boc/cell';
import { WalletContract } from 'tonweb/dist/types/contract/wallet/wallet-contract';
import { encodeBase64 } from 'tweetnacl-util';

import API from 'api/tonapi';
import { AccountEvent, ActionTypeEnum } from 'api/tonapi/generated/api';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import {
  CRYPTO_FRACTION,
  TON_CENTER_API_ENDPOINT,
  TON_CENTER_API_KEY,
} from 'config';

import store from 'store';

import { NetworkType, SignRawParams } from './tonConnect/types';

export const DEFAULT_TON_WALLET_VERSION = 'v4R2';

export const AVERAGE_TON_TRANSFER_FEE = 0.0055;
export const AVERAGE_JETTON_TRANSFER_FEE = 0.1;
export const MAXIMUM_DECIMAL_PRECISION = 9;
export const MAX_EMULATE_ATTEMPTS = 3;
export const MAX_SEND_TRANSACTION_ATTEMPTS = 3;

export const MNEMONIC_LENGTH = 24;

export const MIN_TONCONNECT_PROTOCOL_VERSION = 2;

export const TON_BLOCK_TIME_MS = 5000;

export const INIT_DAPP_MANIFEST = {
  url: '',
  name: '',
  iconUrl: '',
};

export const tonConnectDeviceInfo: DeviceInfo = {
  platform: 'browser',
  appName: 'telegram-wallet',
  appVersion: '1',
  maxProtocolVersion: 2,
  features: ['SendTransaction', { name: 'SendTransaction', maxMessages: 4 }],
};

export function getTimeSec() {
  return Math.floor(Date.now() / 1000);
}

export const getDomainFromURL = (url: string): string => {
  return ((url || '').split('//')[1] || '').split('/')[0];
};

export const getNetwork = () => {
  return NetworkType.mainnet;
};

export const convertToDecimal = (
  value: number | string,
  decimal = CRYPTO_FRACTION[FrontendCryptoCurrencyEnum.Ton],
) => {
  return Number(value) * Math.pow(10, -decimal);
};

export const convertFromDecimal = (
  value: number | string,
  decimal = CRYPTO_FRACTION[FrontendCryptoCurrencyEnum.Ton],
) => {
  return Number(value) * Math.pow(10, decimal);
};

const base64ToCell = (base64?: string): Cell | undefined => {
  if (base64) {
    const bytes = new Uint8Array(Buffer.from(base64, 'base64'));
    return TonWeb.boc.Cell.oneFromBoc(bytes);
  }
};

export const getFriendlyAddress = (address: string) => {
  return new TonWeb.Address(address).toString(true, true, true);
};

export function encodeBytes(bytes: Uint8Array) {
  return encodeBase64(bytes);
}

export const getTonWebHttpProvider = () => {
  return new TonWeb.HttpProvider(TON_CENTER_API_ENDPOINT, {
    apiKey: TON_CENTER_API_KEY,
  });
};

export const getTonWebClient = () => {
  const httpProvider = getTonWebHttpProvider();
  return new TonWeb(httpProvider);
};

const signRawMethods = async (
  params: SignRawParams,
  sendMode = 3,
): Promise<Method> => {
  const { privateKey } = store.getState().scw;
  const secretKey = TonWeb.utils.hexToBytes(privateKey);

  const wallet = getWallet();

  const seqno = await wallet.methods.seqno().call();

  if (typeof seqno == 'undefined') {
    console.error('Unable to get scw seqno');
    throw new Error('Unable to get scw seqno');
  }

  // eslint-disable-next-line
  const signingMessage = (wallet as any).createSigningMessage(seqno);

  const messages = [...params.messages].splice(0, 4);
  for (const message of messages) {
    const order = TonWeb.Contract.createCommonMsgInfo(
      TonWeb.Contract.createInternalMessageHeader(
        new TonWeb.Address(message.address),
        new TonWeb.utils.BN(message.amount),
      ),
      base64ToCell(message.stateInit),
      base64ToCell(message.payload),
    );

    signingMessage.bits.writeUint8(sendMode);
    signingMessage.refs.push(order);
  }

  return TonWeb.Contract.createMethod(
    wallet.provider,
    // eslint-disable-next-line
    (wallet as any).createExternalMessage(
      signingMessage,
      secretKey,
      seqno,
      !secretKey,
    ),
  );
};

export const emulateTransaction = async (
  params: SignRawParams,
  sendMode = 3,
): Promise<{ event: AccountEvent; estimateFee: number }> => {
  const { address } = store.getState().scw;
  const methods = await signRawMethods(params, sendMode);

  const queryMsg = await methods.getQuery();
  const boc = encodeBytes(await queryMsg.toBoc(false));
  const fees = await methods.estimateFee();
  const totalFee =
    fees.source_fees.fwd_fee +
    fees.source_fees.gas_fee +
    fees.source_fees.in_fwd_fee +
    fees.source_fees.storage_fee;

  let emulatedEvent = undefined;

  for (let i = 0; i < MAX_EMULATE_ATTEMPTS; i++) {
    try {
      const emulatedEventAttempt =
        await API.Emulation.emulateMessageToAccountEvent(address, { boc: boc });
      if (
        emulatedEventAttempt !== undefined &&
        emulatedEventAttempt.status === 200 &&
        emulatedEventAttempt.data.actions.length > 0 &&
        emulatedEventAttempt.data.actions[0].status === 'ok' &&
        emulatedEventAttempt.data.actions[0].type !== ActionTypeEnum.Unknown
      ) {
        emulatedEvent = emulatedEventAttempt;
        break;
      }
    } catch {
      console.error(`Failed to emulate transaction (attempt ${i + 1})`);
    }
    // skip timeout after last attempt failed
    if (i < MAX_EMULATE_ATTEMPTS - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }

  if (emulatedEvent === undefined) {
    throw new Error('Unable to emulate boc');
  }

  return {
    event: emulatedEvent.data,
    estimateFee: totalFee,
  };
};

export const emulateRequest = async (
  request: AppRequest<'sendTransaction'>,
) => {
  const params = JSON.parse(request.params[0]) as SignRawParams;
  return emulateTransaction(params);
};

export const sendTransaction = async (
  params: SignRawParams,
  sendMode = 3,
): Promise<string> => {
  const methods = await signRawMethods(params, sendMode);
  let boc: string | null = null;
  for (let i = 0; i < MAX_SEND_TRANSACTION_ATTEMPTS; i++) {
    try {
      const queryMsg = await methods.getQuery();
      const bocAttempt = encodeBytes(await queryMsg.toBoc(false));
      await methods.estimateFee();
      await methods.send();
      if (bocAttempt) {
        boc = bocAttempt;
        break;
      }
    } catch {
      console.error(`Failed to send transaction (attempt ${i + 1})`);
    }
    // skip timeout after last attempt failed
    if (i < MAX_SEND_TRANSACTION_ATTEMPTS - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  if (!boc) {
    const error = 'Failed to send transaction';
    console.error(error);
    throw new Error(error);
  }
  return boc;
};

export const createWallet = async () => {
  // generate mnemonic and keypair
  const mnemonic = await mnemonicNew(MNEMONIC_LENGTH);
  const keyPair = await mnemonicToPrivateKey(mnemonic);

  // generate wallet contract and address
  const tonWebClient = getTonWebClient();
  const walletClass = tonWebClient.wallet.all[DEFAULT_TON_WALLET_VERSION];
  const walletContract = new walletClass(tonWebClient.provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const address = await walletContract.getAddress();

  return {
    mnemonic,
    privateKey: TonWeb.utils.bytesToHex(keyPair.secretKey),
    address: address.toString(true, true, true),
    raw: address.toString(false),
    publicKey: TonWeb.utils.bytesToHex(keyPair.publicKey),
    walletClass: walletContract.getName(),
  };
};

export const getWalletFromMnemonic = async (mnemonic: string[]) => {
  const keyPair = await mnemonicToPrivateKey(mnemonic);
  const tonWebClient = getTonWebClient();

  let activeAddress = null;
  let activeRaw: string | null = null;
  let activeWalletClass = null;

  // loop all wallet versions to find active wallet (non-zero balance)
  for (const WalletClass of tonWebClient.wallet.list) {
    const wallet = new WalletClass(tonWebClient.provider, {
      publicKey: keyPair.publicKey,
      wc: 0,
    });
    const walletAddress = await wallet.getAddress();
    const friendlyAddress = walletAddress.toString(true, true, true);
    const walletInfo = await tonWebClient.provider.getWalletInfo(
      friendlyAddress,
    );
    const walletBalance = walletInfo.balance;

    // wallet has non-zero balance and is active
    if (walletBalance !== 0) {
      activeAddress = friendlyAddress;
      activeRaw = walletAddress.toString(false);
      activeWalletClass = wallet.getName();
      break;
      // If/when we support multi-wallet, import all
      // TODO: In short-term, consider using wallet with highest balance instead
      // of first non-zero balance
    }
  }

  // If mnemonic does not have active wallet, use default wallet version
  if (!activeAddress || !activeRaw || !activeWalletClass) {
    const walletClass = tonWebClient.wallet.all[DEFAULT_TON_WALLET_VERSION];

    const walletContract = new walletClass(tonWebClient.provider, {
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const newAddress = await walletContract.getAddress();
    activeAddress = newAddress.toString(true, true, true);
    activeRaw = newAddress.toString(false);
    activeWalletClass = walletContract.getName();
  }

  return {
    mnemonic,
    privateKey: TonWeb.utils.bytesToHex(keyPair.secretKey),
    address: activeAddress,
    raw: activeRaw,
    publicKey: TonWeb.utils.bytesToHex(keyPair.publicKey),
    walletClass: activeWalletClass,
  };
};

export const getWallet = (): WalletContract => {
  const tonweb = getTonWebClient();
  const { publicKey, walletClass } = store.getState().scw;
  let activeWalletClass = null;

  const walletClassInfo = Object.entries(TonWeb.Wallets.all).find(
    ([version]) => version === walletClass,
  );

  if (walletClassInfo) {
    activeWalletClass = walletClassInfo[1];
  }

  // backwards compatability
  if (!activeWalletClass) {
    activeWalletClass = TonWeb.Wallets.list.find(
      (wClass) => wClass.name === walletClass,
    );
  }

  if (!activeWalletClass) {
    throw new Error('Unable to get wallet');
  }

  const walletContract: WalletContract = new activeWalletClass(
    tonweb.provider,
    {
      publicKey: TonWeb.utils.hexToBytes(publicKey),
      wc: 0,
    },
  );
  return walletContract;
};

const makeTonTranserPayload = (
  amount: number,
  recipientTonAddress: string,
): SignRawParams => {
  const currentWalletAddress = store.getState().scw?.address;
  return {
    source: currentWalletAddress,
    valid_until: Date.now() + 60 * 1000,
    messages: [
      {
        address: recipientTonAddress,
        amount: amount.toString(),
      },
    ],
  };
};

// amount is integer of nanotons
export const emulateSendTonAddress = async (
  amount: number,
  recipientTonAddress: string,
): Promise<{ event: AccountEvent; estimateFee: number }> => {
  const payload = makeTonTranserPayload(amount, recipientTonAddress);
  return emulateTransaction(payload);
};

// amount is integer of nanotons
export const sendTonAddress = async (
  amount: number,
  recipientTonAddress: string,
): Promise<string | undefined> => {
  const payload = makeTonTranserPayload(amount, recipientTonAddress);
  const boc = await sendTransaction(payload);
  return boc;
};
