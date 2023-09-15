import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/usdtRuffle';

import { useAppSelector } from 'store';

export const useUsdtRuffleTotalTickets = () => {
  const { id } = useAppSelector((state) => state.user);

  const { data: totalTickets, ...rest } = useQuery(
    queryKeys.UsdtRuffle.tickets(id),
    () =>
      API.Tickets.getCurrentTicketCount().then(
        (response) => response.data.data,
      ),
  );

  return { totalTickets, ...rest };
};
