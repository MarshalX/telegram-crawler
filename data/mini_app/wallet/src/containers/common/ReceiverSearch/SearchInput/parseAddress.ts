import { divide } from 'utils/common/math';

export type ParsedAddress = {
  address: string;
  amount?: number;
};

export const KNOWN_ADDRESS_PREFIXES = [
  'ton://transfer/',
  'https://app.tonkeeper.com/transfer/',
  'https://tonhub.com/transfer/',
  'bitcoin:',
  'ton:',
];

/**
 * These prefixes work with '<nanocoins>'. It means that if address string contains amount, we need to divide it on 10^9
 * More info: https://github.com/tonkeeper/wallet-api#payment-urls
 */
export const TON_NANO_COINS_PREFIXES = [
  'ton://transfer/',
  'https://app.tonkeeper.com/transfer/',
  'https://tonhub.com/transfer/',
];

export function parseAddress(value: string): ParsedAddress {
  const result: ParsedAddress = { address: value };

  if (value.includes('?')) {
    result.address = value.split('?')[0];

    const params = new URLSearchParams(value.split('?')[1]);
    if (params.has('amount') && isFinite(Number(params.get('amount')))) {
      result.amount = Number(params.get('amount'));
    }
  }

  KNOWN_ADDRESS_PREFIXES.forEach((prefix) => {
    if (result.address.startsWith(prefix)) {
      result.address = result.address.replace(prefix, '');
      if (TON_NANO_COINS_PREFIXES.includes(prefix) && result.amount) {
        result.amount = divide(result.amount, Math.pow(10, 9));
      }
    }
  });

  return result;
}
