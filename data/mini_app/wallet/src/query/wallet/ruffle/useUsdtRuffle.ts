import { useQueries } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/usdtRuffle';

import { useAppSelector } from 'store';

export const getUsdtRuffleSettings = () => {
  return API.Settings.getSettings().then(({ data }) => data.data);
};

export const getTicketsByPeriod = () => {
  return API.Tickets.getTicketNumbersInAllPeriods().then(
    ({ data }) => data.data,
  );
};

export const useUsdtRuffle = (enabled = true) => {
  const { id } = useAppSelector((state) => state.user);

  const [settings, tickets] = useQueries({
    queries: [
      {
        enabled,
        queryKey: queryKeys.UsdtRuffle.settings(id),
        queryFn: () => getUsdtRuffleSettings(),
      },
      {
        enabled,
        queryKey: queryKeys.UsdtRuffle.ticketsByPeriod(id),
        queryFn: () => getTicketsByPeriod(),
      },
    ],
  });

  return {
    settings,
    tickets,
  };
};
