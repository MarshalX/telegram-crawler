import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'query/queryKeys';

import API from 'api/wallet';

const getTransaction = async (
  props:
    | {
        transactionId: number;
      }
    | { correspondingTransactionId: number },
) => {
  if ('transactionId' in props) {
    const response = await API.Transactions.getTransactionDetails(
      props.transactionId,
    );
    return response.data;
  } else {
    const response = await API.Transactions.getReferenceTransactionDetails(
      props.correspondingTransactionId,
    );
    return response.data;
  }
};

export const useTransaction = (
  props:
    | {
        transactionId: number;
      }
    | { correspondingTransactionId: number },
) => {
  let queryKey;

  if ('transactionId' in props) {
    queryKey = queryKeys.transaction(props.transactionId);
  } else {
    queryKey = queryKeys.correspondingTransaction(
      props.correspondingTransactionId,
    );
  }

  return useQuery({
    queryKey,
    queryFn: () => getTransaction(props),
    refetchOnMount: false,
  });
};
