import { queryClient } from 'query/client';
import { queryKeys } from 'query/queryKeys';

import APIRuffle from 'api/usdtRuffle';
import API from 'api/wallet';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import store from 'store';

import { updateWallet } from 'reducers/wallet/walletSlice';

export function refreshBalance(
  assetCurrency?: FrontendCryptoCurrencyEnum,
  signal?: AbortSignal,
) {
  const { featureFlags, permissions, id } = store.getState().user;

  if (permissions.canUsdtRuffle && featureFlags.usdtRuffle) {
    queryClient.prefetchQuery({
      queryKey: queryKeys.UsdtRuffle.tickets(id),
      queryFn: () =>
        APIRuffle.Tickets.getCurrentTicketCount({ signal }).then(
          (response) => response.data.data,
        ),
    });
  }

  return API.AccountsApi.accountsData({ signal }).then(({ data }) => {
    store.dispatch(
      updateWallet({
        totalFiatAmount: data.available_balance_total_fiat_amount,
        totalFiatCurrency: data.available_balance_total_fiat_currency,
        assets: data.accounts.map((account) => ({
          address: account.addresses[0].address,
          network: account.addresses[0].network,
          hasTransactions: account.has_transactions,
          balance: account.available_balance,
          currency: account.currency as FrontendCryptoCurrencyEnum,
          fiatBalance: account.available_balance_fiat_amount!,
          fiatCurrency: account.available_balance_fiat_currency,
        })),
      }),
    );
    return (
      data.accounts.find((account) => account.currency === assetCurrency)
        ?.available_balance ?? 0
    );
  });
}
