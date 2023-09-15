import { useQuery } from '@tanstack/react-query';

import API from 'api/p2p';

import { DEPRECATED_P2P_PAYMENT_METHODS } from 'config';

import { useAppSelector } from 'store';

export const useUserPayments = ({ enabled }: { enabled?: boolean } = {}) => {
  const { userId, p2pInitialized } = useAppSelector((state) => state.p2pUser);

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    enabled: enabled && !!userId && p2pInitialized,
    queryKey: ['findPaymentDetailsByUserId', userId],
    queryFn: async () => {
      const { data } = await API.PaymentDetails.findPaymentDetailsByUserIdV2();

      if (data.status !== 'SUCCESS') {
        return [];
      }

      return (
        data.data
          ?.filter((item) => {
            return !DEPRECATED_P2P_PAYMENT_METHODS.includes(
              item.paymentMethod.code,
            );
          })
          // TODO: remove after backend will remove USD WT-3664
          ?.filter((item) => item.currency !== 'USD')
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { data, isLoading, isFetching, refetch };
};
