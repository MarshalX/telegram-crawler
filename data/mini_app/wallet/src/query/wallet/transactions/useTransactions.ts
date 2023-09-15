import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import API from 'api/wallet';
import {
  FrontendCryptoCurrencyEnum,
  ReturnTransactions,
  Transaction,
} from 'api/wallet/generated';

import { queryClient } from '../../client';
import { queryKeys } from '../../queryKeys';

const getTransactions = ({
  assetCurrency,
  limit,
  lastId,
}: {
  assetCurrency?: FrontendCryptoCurrencyEnum;
  limit?: number;
  lastId?: number;
}) => {
  return API.Transactions.getTransactions(
    assetCurrency,
    undefined,
    limit,
    lastId,
  ).then((response) => {
    return response.data;
  });
};

export const useTransactions = ({
  assetCurrency,
  pageSize = 70,
}: {
  assetCurrency: FrontendCryptoCurrencyEnum | FrontendCryptoCurrencyEnum[];
  pageSize?: number;
}) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: Array.isArray(assetCurrency)
      ? queryKeys.transactions.all
      : queryKeys.transactions.byCurrency(assetCurrency),
    queryFn: ({ pageParam }) => {
      return getTransactions({
        assetCurrency: Array.isArray(assetCurrency) ? undefined : assetCurrency,
        limit: pageSize,
        lastId: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.size < lastPage.limit) {
        return undefined;
      } else {
        return lastPage.transactions[lastPage.transactions.length - 1].id;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const transactions =
    data?.pages.map((page) => page.transactions).flat() || [];

  return {
    transactions: Array.isArray(assetCurrency)
      ? transactions.filter((item) =>
          assetCurrency.includes(item.currency as FrontendCryptoCurrencyEnum),
        )
      : transactions,
    ...rest,
  };
};

export const updateTransaction = (
  findFunction: (transaction: Transaction) => boolean,
  transactionData: Partial<Transaction>,
) => {
  queryClient.setQueriesData(
    { queryKey: queryKeys.transactions.all },
    (data: InfiniteData<ReturnTransactions> | undefined) => {
      const pages = data?.pages || [];
      return {
        pageParams: data?.pageParams || [],
        pages: pages.map((page) => {
          const targetTransaction = page.transactions.find(findFunction);
          if (targetTransaction) {
            return {
              ...page,
              transactions: page.transactions.map((transaction) => {
                if (targetTransaction.id === transaction.id) {
                  return { ...transaction, ...transactionData };
                } else {
                  return transaction;
                }
              }),
            };
          } else {
            return page;
          }
        }),
      };
    },
  );
};

export const getTransaction = (
  findFunction: (transaction: Transaction) => boolean,
) => {
  const transactionQueries = queryClient.getQueriesData<
    InfiniteData<ReturnTransactions> | undefined
  >({
    queryKey: queryKeys.transactions.all,
  });

  for (const key in transactionQueries) {
    const transactionQuery = transactionQueries[key][1];

    if (transactionQuery) {
      for (const pageKey in transactionQuery.pages) {
        const page = transactionQuery.pages[pageKey];
        const transaction = page.transactions.find(findFunction);

        if (transaction) {
          return transaction;
        }
      }
    }
  }
  return null;
};

export const resetTransactions = () => {
  queryClient.removeQueries({
    queryKey: queryKeys.transactions.all,
  });
};
