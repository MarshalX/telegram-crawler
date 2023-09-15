import { ConnectItemReply, KeyPair } from '@tonconnect/protocol';

export interface DAppManifest {
  url: string;
  name: string;
  iconUrl: string;
  termsOfUseUrl?: string;
  privacyPolicyUrl?: string;
}

export enum NetworkType {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

export enum TonConnectBridgeType {
  Remote = 'remote',
  Injected = 'injected',
}

export interface IConnectedAppConnectionRemote {
  network: NetworkType;
  address: string;
  type: TonConnectBridgeType.Remote;
  url: string;
  sessionKeyPair: KeyPair;
  clientSessionId: string;
  replyItems: ConnectItemReply[];
}

export type IConnectedAppConnection = IConnectedAppConnectionRemote;

export type ReturnStrategy = 'back' | 'none' | string;

export interface IConnectedApp {
  name: string;
  url: string;
  icon: string;
  returnStrategy: ReturnStrategy;
}

export interface IConnectQrQuery {
  v: string;
  r: string;
  id: string;
  ret: ReturnStrategy;
}

export interface SignRawMessage {
  address: string;
  amount: string; // (decimal string): number of nanocoins to send.
  payload?: string; // (string base64, optional): raw one-cell BoC encoded in Base64.
  stateInit?: string; // (string base64, optional): raw once-cell BoC encoded in Base64.
}

export type SignRawParams = {
  source: string;
  valid_until: number;
  messages: SignRawMessage[];
};
