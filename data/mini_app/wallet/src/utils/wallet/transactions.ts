import {
  PaymentMethodEnum,
  TransactionGateway,
  TransactionStatusEnum,
} from 'api/wallet/generated';

export type TransactionStatus =
  | 'pending'
  | 'canceled'
  | 'success'
  | 'fail'
  | 'filled'
  | 'partially_filled'
  | 'new';

export const resolveStatus = (
  status: TransactionStatusEnum,
): TransactionStatus => {
  switch (status) {
    case 'new':
    case 'created':
      return 'new';
    case 'pending':
      return 'pending';
    case 'void':
    case 'canceled':
      return 'canceled';
    case 'success':
      return 'success';
    case 'fail':
      return 'fail';
    case 'filled':
      return 'filled';
    case 'partially_filled':
      return 'partially_filled';
  }
};

export function squashAddress(
  address: string,
  { start = 2, end = 4 } = {},
): string {
  return address.length <= 6
    ? address
    : `${address.slice(0, start)}...${address.slice(address.length - end)}`;
}

export function isCheck(
  gateway: TransactionGateway | PaymentMethodEnum,
): boolean {
  return ['single_use', 'part_multi_use', 'multi_use'].includes(gateway);
}
