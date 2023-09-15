import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppRequest, RpcMethod } from '@tonconnect/protocol';

import { AccountEvent } from 'api/tonapi/generated/api';

import { select } from 'utils/common/redux';
import {
  IConnectedApp,
  IConnectedAppConnection,
} from 'utils/scw/tonConnect/types';

export interface TransactionRequest {
  clientSessionId: string;
  request: AppRequest<RpcMethod>;
}

interface SCWState {
  mnemonic: string[];
  privateKey: string;
  address: string;
  raw: string;
  publicKey: string;
  walletClass: string;
  setupComplete?: boolean;
  recoveryComplete?: boolean;
  // no need

  apps: IConnectedApp[];
  connections: IConnectedAppConnection[];
  transactionRequests: TransactionRequest[];
  pendingTransactions: AccountEvent[];
}

interface AddSCWConnectionState {
  appData: IConnectedApp;
  connection: IConnectedAppConnection;
}

interface RemoveSCWSSEConnectionState {
  appData: IConnectedApp;
  connection: IConnectedAppConnection;
}

export const initialState: SCWState = {
  mnemonic: [],
  privateKey: '',
  address: '',
  raw: '',
  publicKey: '',
  walletClass: '', // aka walletVersion
  setupComplete: undefined,
  recoveryComplete: undefined,
  // no need

  apps: [],
  connections: [],
  transactionRequests: [],
  pendingTransactions: [],
};

export const scwSlice = createSlice({
  name: 'scw',
  initialState,
  reducers: {
    updateSCW: (state, action: PayloadAction<Partial<SCWState>>) => {
      return { ...state, ...action.payload };
    },
    addSCWConnection: (state, action: PayloadAction<AddSCWConnectionState>) => {
      const { appData, connection } = action.payload;
      if (state.apps === undefined) {
        state.apps = [];
      }
      if (state.connections === undefined) {
        state.connections = [];
      }

      if (!state.apps.some((app) => app.url === appData.url)) {
        state.apps.push(appData);
      }
      if (
        !state.connections.some(
          (conn) => conn.clientSessionId === connection.clientSessionId,
        )
      ) {
        state.connections.push(connection);
      }
    },
    removeSSEConnection: (
      state,
      action: PayloadAction<RemoveSCWSSEConnectionState>,
    ) => {
      const { appData, connection } = action.payload;

      // remove connection
      const connIndex = state.connections.findIndex(
        (conn) => conn.clientSessionId === connection.clientSessionId,
      );
      if (connIndex !== -1) {
        state.connections.splice(connIndex, 1);
      }

      // check if dapp has other connections, and remove app if all connections were removed
      const isAppConnected = state.connections.some(
        (conn) => conn.url === appData.url,
      );
      if (!isAppConnected) {
        const appIndex = state.apps.findIndex((app) => app.url === appData.url);
        if (appIndex !== -1) {
          state.apps.splice(appIndex, 1);
        }
      }
    },
    addTransactionRequest: (
      state,
      action: PayloadAction<TransactionRequest>,
    ) => {
      if (state.transactionRequests === undefined) {
        state.transactionRequests = [];
      }
      state.transactionRequests.push(action.payload);
    },
    popTransactionRequest: (state) => {
      if (state.transactionRequests === undefined) {
        state.transactionRequests = [];
      }
      state.transactionRequests.splice(0, 1);
    },
    addPendingTransaction: (state, action: PayloadAction<AccountEvent>) => {
      if (state.pendingTransactions === undefined) {
        state.pendingTransactions = [];
      }
      state.pendingTransactions.push(action.payload);
    },
    removePendingTransaction: (state, action: PayloadAction<string>) => {
      if (state.pendingTransactions === undefined) {
        state.pendingTransactions = [];
      }
      state.pendingTransactions = state.pendingTransactions.filter((tx) => {
        tx.event_id !== action.payload;
      });
    },
  },
});

export const {
  updateSCW,
  addSCWConnection,
  removeSSEConnection,
  addTransactionRequest,
  popTransactionRequest,
  addPendingTransaction,
  removePendingTransaction,
} = scwSlice.actions;

export default scwSlice.reducer;

const scw = select((state) => state.scw);

// Get all tonconnect sessions for active address
export const selectSCWConnections = select((state, address: string) => {
  const scwState: SCWState = scw(state);
  return (scwState.connections || []).filter(
    (conn) => conn.address === address,
  );
});

// Get dapp information based on url
export const selectConnectedAppByUrl = select(
  (state, url: string): IConnectedApp | undefined => {
    const scwState: SCWState = scw(state);
    return (scwState.apps || []).find((app) => app.url === url);
  },
);

// Get tonconnect session and app by session Id
export const selectConnectedAppByClientSessionId = select(
  (
    state,
    clientSessionId: string,
  ): {
    connectedApp: IConnectedApp | null;
    connection: IConnectedAppConnection | null;
  } => {
    const scwState: SCWState = scw(state);
    const { apps, address, connections } = scwState;

    const connection =
      (connections || []).find(
        (conn) =>
          conn.clientSessionId === clientSessionId && conn.address === address,
      ) ?? null;

    const app =
      connection !== null
        ? (apps || []).find((app) => app.url === connection.url) ?? null
        : null;

    return { connectedApp: app, connection };
  },
);
