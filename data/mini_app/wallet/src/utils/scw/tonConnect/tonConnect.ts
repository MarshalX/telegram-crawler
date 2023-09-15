import {
  AppRequest,
  CONNECT_EVENT_ERROR_CODES,
  ConnectEvent,
  ConnectRequest,
  RpcMethod,
  SEND_TRANSACTION_ERROR_CODES,
  SessionCrypto,
  WalletResponse,
} from '@tonconnect/protocol';
import axios from 'axios';
import TonWeb from 'tonweb';

import { WALLET_PROXY_API_ENDPOINT } from 'config';

import store from 'store';

import {
  addSCWConnection,
  removeSSEConnection,
  selectConnectedAppByClientSessionId,
} from 'reducers/scw/scwSlice';

import {
  MIN_TONCONNECT_PROTOCOL_VERSION,
  getTimeSec,
  sendTransaction,
  tonConnectDeviceInfo,
} from '../ton';
import { ConnectEventError } from './connectEventError';
import { ConnectReplyBuilder } from './connectReplyBuilder';
import { TCEventID } from './eventId';
import { SendTransactionError } from './sendTransactionError';
import { TonConnectSSEBridge } from './tonConnectSSEBridge';
import {
  DAppManifest,
  IConnectedApp,
  IConnectedAppConnection,
  IConnectedAppConnectionRemote,
  NetworkType,
  ReturnStrategy,
  SignRawParams,
  TonConnectBridgeType,
} from './types';

class TonConnectService {
  checkProtocolVersionCapability(protocolVersion: number) {
    if (
      typeof protocolVersion !== 'number' ||
      protocolVersion < MIN_TONCONNECT_PROTOCOL_VERSION
    ) {
      throw new ConnectEventError(
        CONNECT_EVENT_ERROR_CODES.BAD_REQUEST_ERROR,
        `Protocol version ${String(
          protocolVersion,
        )} is not supported by the wallet app`,
      );
    }
  }

  verifyConnectRequest(request: ConnectRequest) {
    if (!(request && request.manifestUrl && request.items?.length)) {
      throw new ConnectEventError(
        CONNECT_EVENT_ERROR_CODES.BAD_REQUEST_ERROR,
        'Wrong request data',
      );
    }
  }

  async getManifest(request: ConnectRequest) {
    try {
      console.log('request.manifestUrl', request.manifestUrl);
      const { manifestUrl } = request;
      let manifest: DAppManifest | null = null;

      try {
        const { data } = await axios.get<DAppManifest>(manifestUrl);
        manifest = data;
      } catch {
        if (
          manifestUrl.startsWith('https://') ||
          manifestUrl.startsWith('http://')
        ) {
          // request manifest through self-hosted proxy using cors-anywhere to avoid CORS issues
          const proxyUrl = WALLET_PROXY_API_ENDPOINT.concat('/', manifestUrl);
          const { data } = await axios.get<DAppManifest>(proxyUrl);
          manifest = data;
        }
      }

      const isValid =
        manifest &&
        typeof manifest.url === 'string' &&
        typeof manifest.name === 'string' &&
        typeof manifest.iconUrl === 'string';

      if (!isValid || !manifest) {
        throw new ConnectEventError(
          CONNECT_EVENT_ERROR_CODES.MANIFEST_CONTENT_ERROR,
          'Manifest is not valid',
        );
      }

      return manifest;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ConnectEventError(
          CONNECT_EVENT_ERROR_CODES.MANIFEST_NOT_FOUND_ERROR,
          `Can't get ${request.manifestUrl}`,
        );
      }

      throw error;
    }
  }

  async connect(
    protocolVersion: number,
    request: ConnectRequest,
    returnStrategy: ReturnStrategy,
    sessionCrypto?: SessionCrypto,
    clientSessionId?: string,
  ): Promise<ConnectEvent> {
    try {
      this.checkProtocolVersionCapability(protocolVersion);
      this.verifyConnectRequest(request);

      const manifest = await this.getManifest(request);

      const storeState = store.getState();
      const { address, privateKey, publicKey } = storeState.scw;

      const replyBuilder = new ConnectReplyBuilder(request, manifest);
      const replyItems = await replyBuilder.createReplyItems(
        address,
        TonWeb.utils.hexToBytes(privateKey),
        TonWeb.utils.hexToBytes(publicKey),
        '', // walletStateInit
      );

      try {
        store.dispatch(
          addSCWConnection({
            appData: {
              name: manifest.name,
              url: manifest.url,
              icon: manifest.iconUrl,
              returnStrategy: returnStrategy,
            },
            connection: {
              network: NetworkType.mainnet,
              address,
              type: TonConnectBridgeType.Remote,
              url: manifest.url,
              sessionKeyPair: sessionCrypto!.stringifyKeypair(),
              clientSessionId: clientSessionId!,
              replyItems,
            },
          }),
        );

        return {
          id: TCEventID.getId(),
          event: 'connect',
          payload: {
            items: replyItems,
            device: tonConnectDeviceInfo,
          },
        };
      } catch (error) {
        console.error('connect error', error);
        throw new ConnectEventError(
          CONNECT_EVENT_ERROR_CODES.USER_REJECTS_ERROR,
          'Wallet declined the request',
        );
      }
    } catch (error) {
      if (error instanceof ConnectEventError) {
        return error;
      }

      return new ConnectEventError(
        CONNECT_EVENT_ERROR_CODES.UNKNOWN_ERROR,
        error instanceof Error ? error?.message : '',
      );
    }
  }

  async handleDisconnectRequest(
    request: AppRequest<'disconnect'>,
    connectedApp: IConnectedApp,
    connection: IConnectedAppConnection,
  ): Promise<WalletResponse<'disconnect'>> {
    if (connection.type === TonConnectBridgeType.Remote) {
      store.dispatch(
        removeSSEConnection({ appData: connectedApp, connection }),
      );
    }

    return {
      id: request.id,
      result: {},
    };
  }

  private async handleRequest<T extends RpcMethod>(
    request: AppRequest<T>,
    connectedApp: IConnectedApp | null,
    connection: IConnectedAppConnection | null,
  ): Promise<WalletResponse<T>> {
    if (!connectedApp || !connection) {
      return {
        error: {
          code: SEND_TRANSACTION_ERROR_CODES.UNKNOWN_APP_ERROR,
          message: 'Unknown app',
        },
        id: request.id,
      };
    }

    if (request.method === 'sendTransaction') {
      return this.sendTransaction(request);
    }

    if (request.method === 'disconnect') {
      return this.handleDisconnectRequest(request, connectedApp, connection);
    }

    return {
      error: {
        code: SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR,
        message: `Method "${request.method}" does not supported by the wallet app`,
      },
      id: request.id,
    };
  }

  async sendTransaction(
    request: AppRequest<'sendTransaction'>,
  ): Promise<WalletResponse<'sendTransaction'>> {
    try {
      const params = JSON.parse(request.params[0]) as SignRawParams;

      const isValidRequest =
        params &&
        typeof params.valid_until === 'number' &&
        Array.isArray(params.messages) &&
        params.messages.every((msg) => !!msg.address && !!msg.amount);

      if (!isValidRequest) {
        throw new SendTransactionError(
          request.id,
          SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR,
          'Bad request',
        );
      }

      const { valid_until, messages } = params;

      if (valid_until < getTimeSec()) {
        throw new SendTransactionError(
          request.id,
          SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR,
          'Request timed out',
        );
      }

      const currentWalletAddress = store.getState().scw?.address;

      const txParams: SignRawParams = {
        valid_until,
        messages,
        source: currentWalletAddress,
      };

      const boc = await sendTransaction(txParams);

      if (!boc) {
        return new SendTransactionError(
          request.id,
          SEND_TRANSACTION_ERROR_CODES.UNKNOWN_ERROR,
          'Unable to generate BOC',
        );
      }

      return {
        result: boc,
        id: request.id,
      };
    } catch (error) {
      if (error instanceof SendTransactionError) {
        return error;
      }

      return new SendTransactionError(
        request.id,
        SEND_TRANSACTION_ERROR_CODES.UNKNOWN_ERROR,
        error instanceof Error ? error?.message : '',
      );
    }
  }

  async handleRequestFromRemoteBridge<T extends RpcMethod>(
    request: AppRequest<T>,
    clientSessionId: string,
  ): Promise<WalletResponse<T>> {
    const { connectedApp, connection } = selectConnectedAppByClientSessionId(
      store.getState(),
      clientSessionId,
    );

    return this.handleRequest(request, connectedApp, connection);
  }

  async disconnect(url: string) {
    const { connections } = store.getState().scw;

    const remoteConnections = connections.filter(
      (connection) =>
        connection.type === TonConnectBridgeType.Remote &&
        connection.url === url,
    ) as IConnectedAppConnectionRemote[];

    remoteConnections.forEach((connection) =>
      TonConnectSSEBridge.sendDisconnectEvent(connection),
    );
  }
}

export const TonConnect = new TonConnectService();
