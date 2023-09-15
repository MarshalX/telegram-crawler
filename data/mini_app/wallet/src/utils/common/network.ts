import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

const CRYPTO_BLOCKCHAIN_NAMES: Record<FrontendCryptoCurrencyEnum, string> = {
  TON: '',
  BTC: '',
  USDT: 'TRC20',
} as const;

export function getNetworkByCurrency(currency: FrontendCryptoCurrencyEnum) {
  return CRYPTO_BLOCKCHAIN_NAMES[currency];
}

export function getNetworkTicker(network: string) {
  switch (network) {
    case 'TRON (TRC20)':
      return CRYPTO_BLOCKCHAIN_NAMES.USDT;
  }
  return network;
}
