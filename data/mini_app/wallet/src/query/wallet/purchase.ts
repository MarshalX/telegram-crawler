import { useQuery } from '@tanstack/react-query';

import API from 'api/wallet';

import { useAppSelector } from 'store';

export const usePurchaseSettings = () => {
  const { authorized, id: userId } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: [`purchaseSettings`, userId],
    queryFn: () =>
      API.Purchases.purchaseSettings().then((response) => response.data),
    enabled: authorized,
  });
};
