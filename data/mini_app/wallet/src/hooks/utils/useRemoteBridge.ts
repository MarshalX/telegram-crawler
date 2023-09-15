import { useEffect } from 'react';

import { useAppSelector } from 'store';

import { selectSCWConnections } from 'reducers/scw/scwSlice';

import { TonConnectSSEBridge } from 'utils/scw/tonConnect/tonConnectSSEBridge';

export const useRemoteBridge = () => {
  const { address } = useAppSelector((state) => state.scw);
  const walletConnections = useAppSelector((state) =>
    selectSCWConnections(state, address),
  );
  const walletSessions = walletConnections
    .map((conn) => conn.clientSessionId)
    .join(',');

  useEffect(() => {
    TonConnectSSEBridge.open(walletConnections);
    return () => {
      TonConnectSSEBridge.close();
    };
  }, [address, walletSessions]);
};
