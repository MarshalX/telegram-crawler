import { OfferTypeEnum } from 'api/p2p/generated-common';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

export const queryKeys = {
  transactions: {
    all: ['transactions'],
    byCurrency: (assetCurrency: FrontendCryptoCurrencyEnum) => [
      ...queryKeys.transactions.all,
      assetCurrency,
    ],
  },
  transaction: (id: number) => ['transaction', id],
  correspondingTransaction: (id: number) => ['correspondingTransaction', id],
  currencies: () => ['currencies'],
  recentReceivers: {
    all: ['recentReceivers'],
    byCurrency: (assetCurrency: FrontendCryptoCurrencyEnum, filterDate = 0) => [
      ...queryKeys.recentReceivers.all,
      { assetCurrency, filterDate },
    ],
  },
  kyc: {
    limits: (userId?: number) => ['kycLimits', userId],
    status: (userId?: number) => ['kycStatus', userId],
  },
  UsdtRuffle: {
    base: ['UsdtRuffle'],
    tickets: (userId?: number) => [
      ...queryKeys.UsdtRuffle.base,
      'tickets',
      userId,
    ],
    ticketsByPeriod: (userId?: number) => [
      ...queryKeys.UsdtRuffle.base,
      'ticketsByPeriod',
      userId,
    ],
    settings: (userId?: number) => [
      ...queryKeys.UsdtRuffle.base,
      'settings',
      userId,
    ],
  },
  getOffersByUserIdQueryKey: ({
    userId,
    offerType,
  }: {
    userId?: number;
    offerType: OfferTypeEnum;
  }) => ['getOffersByUserId', userId, offerType],
  getGems: {
    base: ['GetGems'],
    collectiblesGrouped: (address: string) => [
      ...queryKeys.getGems.base,
      'collectiblesGrouped',
      address,
    ],
    collectible: (address: string) => [
      ...queryKeys.getGems.base,
      'collectible',
      address,
    ],
    collectiblePreviewsByCollection: (
      userAddress: string,
      collectionAddress?: string,
    ) => [
      ...queryKeys.getGems.base,
      'collectiblePreviewsByCollection',
      userAddress,
      collectionAddress,
    ],
    transferCollectible: (
      collectibleAddress: string,
      recipientAddress: string,
    ) => [
      ...queryKeys.getGems.base,
      'transferCollectible',
      collectibleAddress,
      recipientAddress,
    ],
    collectibleRecentReceivers: (userAddress: string, filterDate = 0) => [
      ...queryKeys.getGems.base,
      'collectibleRecentReceivers',
      userAddress,
      filterDate,
    ],
    collectiblePreviewsNewest: (userAddress: string) => [
      ...queryKeys.getGems.base,
      'collectiblePreviewsNewest',
      userAddress,
    ],
  },
  scw: {
    base: ['scw'],
    rate: (fiatCurrency: string, token?: string) => [
      ...queryKeys.scw.base,
      'rate',
      token,
      fiatCurrency,
    ],
    account: (address: string) => [...queryKeys.scw.base, 'account', address],
    jetton: (address: string, jettonSymbol: string) => [
      ...queryKeys.scw.base,
      'jetton',
      address,
      jettonSymbol,
    ],
    events: (address: string) => [...queryKeys.scw.base, 'events', address],
    sendAsset: (address: string, cryptoCurrency: string) => [
      ...queryKeys.scw.base,
      'sendAsset',
      address,
      cryptoCurrency,
    ],
  },
};
