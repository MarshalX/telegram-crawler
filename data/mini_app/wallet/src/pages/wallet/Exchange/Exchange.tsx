import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { Exchange as ExchangeI } from 'api/wallet/generated';

interface Context {
  exchange?: ExchangeI;
  setExchange: (exchange: ExchangeI) => void;
}

export function useExchangeContext() {
  return useOutletContext<Context>();
}

export const Exchange = () => {
  const [exchange, setExchange] = useState<Context['exchange']>();

  return (
    <Outlet
      context={{
        exchange,
        setExchange: (exchange: ExchangeI) => setExchange(exchange),
      }}
    />
  );
};
