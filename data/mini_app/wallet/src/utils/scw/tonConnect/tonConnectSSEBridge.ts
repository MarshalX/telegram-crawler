import {
  AppRequest,
  Base64,
  ConnectEvent,
  ConnectRequest,
  DisconnectEvent,
  RpcMethod,
  SEND_TRANSACTION_ERROR_CODES,
  SessionCrypto,
  WalletResponse,
  hexToByteArray,
} from '@tonconnect/protocol';

import store from 'store';

import {
  addTransactionRequest,
  selectConnectedAppByClientSessionId,
} from 'reducers/scw/scwSlice';

import { debounceFunc } from 'utils/common/debounce';

import { TCEventID } from './eventId';
import { SendTransactionError } from './sendTransactionError';
import { TonConnect } from './tonConnect';
import {
  IConnectQrQuery,
  IConnectedAppConnection,
  IConnectedAppConnectionRemote,
  ReturnStrategy,
  TonConnectBridgeType,
} from './types';

class TonConnectSSEBridgeService {
  private readonly storeKey = 'ton-connect-http-bridge-lastEventId';

  private readonly bridgeUrl = 'https://bridge.tonapi.io/bridge';

  private readonly defaultTtl = 300;

  private eventSource: EventSource | null = null;

  private connections: IConnectedAppConnectionRemote[] = [];

  private activeRequests: { [from: string]: AppRequest<RpcMethod> } = {};

  async open(connections: IConnectedAppConnection[]) {
    this.close();

    this.connections = connections.filter(
      (item) => item.type === TonConnectBridgeType.Remote,
    ) as IConnectedAppConnectionRemote[];

    if (this.connections.length === 0) {
      return;
    }

    const walletSessionIds = this.connections
      .map((item) => new SessionCrypto(item.sessionKeyPair).sessionId)
      .join(',');

    let url = `${this.bridgeUrl}/events?client_id=${walletSessionIds}`;

    const lastEventId = await this.getLastEventId();

    if (lastEventId) {
      url += `&last_event_id=${lastEventId}`;
    }

    console.log('sse connect', url);

    this.eventSource = new EventSource(url);

    this.eventSource.addEventListener(
      'message',
      debounceFunc(this.handleMessage.bind(this), 200),
    );

    this.eventSource.addEventListener('open', () => {
      console.log('sse connect: opened');
    });

    this.eventSource.addEventListener('error', (event) => {
      console.error('sse connect: error', event);
    });
  }

  close() {
    if (this.eventSource) {
      this.eventSource.close();

      this.eventSource = null;

      console.log('sse close');
    }
  }

  private async setLastEventId(lastEventId: string) {
    localStorage.setItem(this.storeKey, lastEventId);
  }

  private async getLastEventId() {
    return localStorage.getItem(this.storeKey);
  }

  private async send<T extends RpcMethod>(
    response: WalletResponse<T> | ConnectEvent | DisconnectEvent,
    sessionCrypto: SessionCrypto,
    clientSessionId: string,
    ttl?: number,
  ): Promise<void> {
    try {
      const url = `${this.bridgeUrl}/message?client_id=${
        sessionCrypto.sessionId
      }&to=${clientSessionId}&ttl=${ttl || this.defaultTtl}`;

      const encodedResponse = sessionCrypto.encrypt(
        JSON.stringify(response),
        hexToByteArray(clientSessionId),
      );

      await fetch(url, {
        body: Base64.encode(encodedResponse),
        method: 'POST',
      });
    } catch (e) {
      console.log('send fail', e);
    }
  }

  async handleConnectDeeplink(query: IConnectQrQuery) {
    const protocolVersion = Number(query.v);
    const request = JSON.parse(decodeURIComponent(query.r)) as ConnectRequest;
    const clientSessionId = query.id;
    const returnStrategy =
      (query.ret &&
        query.ret !== 'undefined' &&
        decodeURIComponent(query.ret)) ||
      'back';

    console.log('handleConnectDeeplink request', request);

    const sessionCrypto = new SessionCrypto();

    const response = await TonConnect.connect(
      protocolVersion,
      request,
      returnStrategy,
      sessionCrypto,
      clientSessionId,
    );

    console.log('handleConnectDeeplink response', response);

    await this.send(response, sessionCrypto, clientSessionId);
    this.handleRedirect(clientSessionId, returnStrategy);
  }

  sendDisconnectEvent(connection: IConnectedAppConnectionRemote) {
    console.log('sse sending disconnect event');
    const sessionCrypto = new SessionCrypto(connection.sessionKeyPair);

    const event: DisconnectEvent = {
      id: TCEventID.getId(),
      event: 'disconnect',
      payload: {},
    };

    this.send(event, sessionCrypto, connection.clientSessionId);
  }

  async signTransactionRequest(
    clientSessionId: string,
    request: AppRequest<RpcMethod>,
  ) {
    try {
      console.log('signTransactionRequest start', clientSessionId, request);

      const sessionCrypto = this.getCryptoSession(clientSessionId);

      const response = await TonConnect.handleRequestFromRemoteBridge(
        request,
        clientSessionId,
      );

      delete this.activeRequests[clientSessionId];

      console.log('signTransactionRequest response', response);

      if (response instanceof SendTransactionError) {
        throw 'Unable to generate transaction response';
      }

      await this.send(response, sessionCrypto, clientSessionId);

      // TODO: Handle redirect
    } catch (e) {
      console.log('signTransactionRequest error');
      console.error(e);
      throw e;
    }
  }

  async rejectTransactionRequest(
    clientSessionId: string,
    request: AppRequest<RpcMethod>,
  ) {
    const sessionCrypto = this.getCryptoSession(clientSessionId);

    delete this.activeRequests[clientSessionId];

    await this.send(
      {
        error: {
          code: SEND_TRANSACTION_ERROR_CODES.USER_REJECTS_ERROR,
          message: 'Wallet declined the request',
        },
        id: request.id,
      },
      sessionCrypto,
      clientSessionId,
    );

    // TODO: Handle redirect
  }

  private getCryptoSession(clientSessionId: string) {
    const connection = this.connections.find(
      (item) => item.clientSessionId === clientSessionId,
    );

    if (!connection) {
      throw new Error(
        `connection with clientId "${clientSessionId}" not found!`,
      );
    }

    return new SessionCrypto(connection.sessionKeyPair);
  }

  private async handleMessage(event: MessageEvent) {
    try {
      if (event.lastEventId) {
        this.setLastEventId(event.lastEventId);
      }

      const { from, message } = JSON.parse(event.data!);

      const sessionCrypto = this.getCryptoSession(from);

      const request: AppRequest<RpcMethod> = JSON.parse(
        sessionCrypto.decrypt(
          Base64.decode(message).toUint8Array(),
          hexToByteArray(from),
        ),
      );

      if (this.activeRequests[from]) {
        await this.send(
          {
            error: {
              code: SEND_TRANSACTION_ERROR_CODES.USER_REJECTS_ERROR,
              message: 'User has already opened the previous request',
            },
            id: request.id,
          },
          sessionCrypto,
          from,
        );

        return;
      }

      this.activeRequests[from] = request;

      console.log(
        'handleMessage request',
        request,
        from,
        message,
        event.data,
        event,
      );

      if (request.method === 'sendTransaction') {
        window.Telegram.WebApp.expand();
        store.dispatch(
          addTransactionRequest({
            clientSessionId: from,
            request,
          }),
        );
      }

      // TODO: handle signData method

      if (request.method === 'disconnect') {
        await TonConnect.handleRequestFromRemoteBridge(request, from);
      }
    } catch (e) {
      console.log('handleMessage error');
      console.error(e);
    }
  }

  handleRedirect(
    clientSessionId: string,
    returnStrategyOverride?: ReturnStrategy,
  ) {
    const { connectedApp } = selectConnectedAppByClientSessionId(
      store.getState(),
      clientSessionId,
    );
    const returnStrategy =
      returnStrategyOverride || connectedApp?.returnStrategy;

    if (returnStrategy) {
      if (returnStrategy === 'back') {
        // TODO: If/when TG offers back navigation for TWAs, add here.
        if (connectedApp && connectedApp.url) {
          window.Telegram.WebApp.openLink(connectedApp.url);
        }
      } else if (
        returnStrategy &&
        returnStrategy !== 'none' &&
        (returnStrategy.startsWith('https://') ||
          returnStrategy.startsWith('http://'))
      ) {
        window.Telegram.WebApp.openLink(returnStrategy);
      }
    }
  }
}

export const TonConnectSSEBridge = new TonConnectSSEBridgeService();
