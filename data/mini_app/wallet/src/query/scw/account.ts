import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import TonWeb from 'tonweb';

import API from 'api/tonapi';
import { AccountEvent, ActionTypeEnum } from 'api/tonapi/generated/api';
import { CryptoCurrency, CurrencyEnum } from 'api/wallet/generated';

import { DEFAULT_FIAT_FRACTION } from 'config';

import store, { useAppSelector } from 'store';

import { removePendingTransaction } from 'reducers/scw/scwSlice';

import { getCurrencyName } from 'utils/common/currency';
import { multiply } from 'utils/common/math';
import { convertToDecimal, getFriendlyAddress, getWallet } from 'utils/scw/ton';

import TonImage from 'images/ton.png';

import { useJettonBalances } from './jettons';

export const DEFAULT_STALE_TIME = 10 * 1000;
const SHORT_REFETCH_TIME = 5 * 1000;
const LONG_REFETCH_TIME = 30 * 1000;

export const getAccount = async ({ accountId }: { accountId: string }) => {
  const result = await API.Accounts.getAccount(accountId);

  return result.data;
};

export const useAccount = (address?: string) => {
  const userAddress = useAppSelector((state) => state.scw.address);
  const resolvedAddress = address || userAddress;

  return useQuery({
    queryKey: ['scw', 'getAccount', resolvedAddress],
    queryFn: () =>
      getAccount({
        accountId: resolvedAddress,
      }),
    staleTime: DEFAULT_STALE_TIME,
  });
};

export interface SCWAsset {
  name: string;
  currency: string;
  balance: number;
  tonBalance?: number;
  address: string;
  image: string;
  decimals: number;
  walletAddress: string;
}

export const useAccountJettons = (address?: string) => {
  const userAddress = useAppSelector((state) => state.scw.address);
  const resolvedAddress = address || userAddress;

  const { data: jettonsBalances, refetch: refetchJettonBalances } =
    useJettonBalances(resolvedAddress);

  const fetchAssets = async (): Promise<SCWAsset[]> => {
    try {
      if (!jettonsBalances) {
        return [];
      }

      const Address = TonWeb.utils.Address;

      const jettonsAddress = jettonsBalances.balances
        .map((item) =>
          new Address(item.jetton.address).toString(true, true, true),
        )
        .toString();

      let rates: { [key: string]: object } = {};

      if (jettonsAddress) {
        const { data } = await API.Rates.getRates(
          jettonsAddress,
          CryptoCurrency.Ton,
        );
        rates = data.rates as { [key: string]: object };
      }

      const assets = jettonsBalances.balances.map((balance) => {
        const jettonBalance = convertToDecimal(
          balance.balance,
          balance.jetton.decimals,
        );

        const jettonAddress = getFriendlyAddress(balance.jetton.address);

        let tonBalance;

        if (
          rates &&
          jettonAddress in rates &&
          'prices' in rates[jettonAddress]
        ) {
          const rate = rates[jettonAddress] as { prices: { TON: number } };

          tonBalance = multiply(
            rate.prices[CurrencyEnum.Ton] || 0,
            jettonBalance,
            DEFAULT_FIAT_FRACTION,
          );
        }

        return {
          name: balance.jetton.name,
          image: balance.jetton.image,
          currency: balance.jetton.symbol,
          balance: convertToDecimal(balance.balance, balance.jetton.decimals),
          address: jettonAddress,
          decimals: balance.jetton.decimals,
          walletAddress: getFriendlyAddress(balance.wallet_address.address),
          tonBalance,
        };
      });

      return assets;
    } catch (error) {
      console.error(error);
    }

    return [];
  };

  const { data, ...other } = useQuery({
    enabled: !!jettonsBalances,
    queryKey: [
      'scw',
      'getAccountAssets',
      jettonsBalances?.balances,
      resolvedAddress,
    ],
    queryFn: fetchAssets,
    staleTime: DEFAULT_STALE_TIME,
  });

  return {
    ...other,
    data: data || [],
    refetchJettonBalances,
  };
};

export const useAccountTonAsset = (address?: string) => {
  const userAddress = useAppSelector((state) => state.scw.address);
  const resolvedAddress = address || userAddress;

  const { data, ...other } = useAccount(address);

  if (data) {
    const balance = convertToDecimal(data.balance);

    const asset: SCWAsset = {
      name: getCurrencyName({
        currency: CryptoCurrency.Ton,
      }),
      image: TonImage,
      currency: CryptoCurrency.Ton,
      balance: balance,
      address: resolvedAddress,
      tonBalance: balance,
      decimals: 9,
      walletAddress: getFriendlyAddress(resolvedAddress),
    };

    return {
      data: asset,
      ...other,
    };
  } else {
    return { data, ...other };
  }
};

export const useDeployAccount = () => {
  const { privateKey, address } = useAppSelector((state) => state.scw);

  const deploy = useCallback(async () => {
    try {
      const account = await getAccount({ accountId: address });

      const isAccountInactive = account.status === 'uninit';

      if (!isAccountInactive) {
        return;
      }

      const wallet = await getWallet();

      const deploy = wallet.deploy(TonWeb.utils.hexToBytes(privateKey));
      const fees = await deploy.estimateFee();
      const sourceFees = fees.source_fees;
      const resolvedFee =
        sourceFees.gas_fee + sourceFees.in_fwd_fee + sourceFees.storage_fee;

      const tonBalance = account.balance;

      if (resolvedFee > tonBalance) {
        throw new Error(
          `Not enough balance to deploy account. Required fee: ${resolvedFee}. Current TON balance: ${tonBalance}`,
        );
      }

      await deploy.send();
    } catch (error) {
      console.error(error);
    }
  }, [address, privateKey]);

  return { deploy };
};

const EVENT_HISTORY_LIMIT = 50;

export const useAccountEvents = (refetchFast = false) => {
  const { address, pendingTransactions = [] } = useAppSelector(
    (state) => state.scw,
  );

  return useQuery({
    queryKey: [`walletEvents`, address],
    queryFn: () =>
      API.Accounts.getEventsByAccount(address, EVENT_HISTORY_LIMIT).then(
        (response) => response.data,
      ),
    staleTime: DEFAULT_STALE_TIME,
    onSuccess: (data) => {
      pendingTransactions.forEach((tx) => {
        // emulated event_id not same as finalized event_id
        // best way to get comparison is comparing actions
        const transactionComplete = data.events.find((event) => {
          return (
            event.timestamp > tx.timestamp &&
            JSON.stringify(event.actions) === JSON.stringify(tx.actions)
          );
        });
        if (transactionComplete) {
          store.dispatch(removePendingTransaction(tx.event_id));
        }
      });
    },
    refetchInterval:
      pendingTransactions.length > 0 || refetchFast
        ? SHORT_REFETCH_TIME
        : LONG_REFETCH_TIME,
  });
};

export const useAccountEventsByCurrency = (
  currency: string,
): AccountEvent[] => {
  const { data } = useAccountEvents();
  return useMemo(() => {
    if (data === undefined) {
      return [];
    }

    if (currency === 'TON') {
      return data.events.filter(
        (event) => event.actions[0].type === ActionTypeEnum.TonTransfer,
      );
    } else {
      return data.events.filter(
        (event) =>
          event.actions[0].type === ActionTypeEnum.JettonTransfer &&
          event.actions[0].JettonTransfer?.jetton?.symbol === currency,
      );
    }
  }, [currency, data]);
};
