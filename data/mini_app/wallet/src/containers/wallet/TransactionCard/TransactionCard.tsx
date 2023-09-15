import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CryptoCurrency,
  GiftTypeEnum,
  TransactionGateway,
  TransactionTypeEnum,
} from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { Amount, AmountProps } from 'containers/common/Amount/Amount';
import { AmountSkeleton } from 'containers/common/Amount/AmountSkeleton';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo, {
  OperationInfoSkeleton,
} from 'containers/common/OperationInfo/OperationInfo';

import Avatar from 'components/Avatar/Avatar';
import InitialsAvatar from 'components/InitialsAvatar/InitialsAvatar';
import InitialsAvatarSkeleton from 'components/InitialsAvatar/InitialsAvatarSkeleton';

import { printCryptoAmount } from 'utils/common/currency';
import { printDate } from 'utils/common/date';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { TransactionStatus, squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TONSpaceSVG } from 'images/ton_space_circle.svg';

interface TransactionCardProps {
  name?: string;
  date: string;
  amount: number;
  currency: CryptoCurrency;
  type: TransactionTypeEnum;
  userId?: number;
  photoUrl?: string;
  gateway: TransactionGateway;
  status: TransactionStatus;
  recipientAddress?: string;
  inputAddresses?: string;
  giftType?: GiftTypeEnum;
  storeName?: string;
  storeId?: string;
  pairTransactionAmount?: number;
  pairTransactionCurrency?: CryptoCurrency;
}

const TransactionCard: FC<TransactionCardProps> = ({
  status,
  name,
  userId,
  photoUrl,
  amount,
  currency,
  date,
  type,
  gateway,
  recipientAddress,
  inputAddresses,
  giftType,
  storeName,
  storeId,
  pairTransactionCurrency,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { languageCode } = useAppSelector((state) => state.settings);
  const scw = useAppSelector((state) => state.scw);

  const formattedAmount = printCryptoAmount({
    amount,
    currency: currency,
    languageCode,
    currencyDisplay: false,
  });

  const isTONSpaceTransfer =
    gateway === 'withdraw_onchain' &&
    recipientAddress &&
    recipientAddress === scw.address;

  const mediaSize = theme === 'apple' ? 32 : 24;

  function renderMedia() {
    switch (gateway) {
      case 'tg_transfer':
      case 'internal':
        if (photoUrl) {
          return <Avatar size={mediaSize} src={photoUrl} />;
        } else if (name && userId) {
          return (
            <InitialsAvatar size={mediaSize} name={name} userId={userId} />
          );
        }
        break;
      case 'wpay_payment':
        return storeId && storeName ? (
          <InitialsAvatar
            size={mediaSize}
            userId={Number(storeId)}
            name={storeName}
          />
        ) : (
          <InitialsAvatarSkeleton size={mediaSize} />
        );
      case 'withdraw_onchain':
        return isTONSpaceTransfer ? (
          <TONSpaceSVG width={mediaSize} height={mediaSize} />
        ) : (
          <OperationIcon gateway={gateway} size={mediaSize} type={type} />
        );
      default:
        return <OperationIcon gateway={gateway} size={mediaSize} type={type} />;
    }
  }

  function renderOperation() {
    switch (gateway) {
      case 'top_up':
      case 'manual':
      case 'card':
      case 'wpay_payout':
        return t('transaction.top_up');
      case 'bonus_any':
        return t('marketing.award_transaction_name');
      case 'p2p_order':
        return type === 'withdraw'
          ? t('transactions.p2p_sale')
          : t('transactions.p2p_purchase');
      case 'withdraw_onchain':
        return isTONSpaceTransfer
          ? t('transaction.transfer')
          : t('transaction.withdraw_onchain');
      case 'tg_transfer':
      case 'internal':
        return type === 'deposit'
          ? t('transaction.received')
          : t('transaction.sent');
      case 'campaign':
        if (giftType === 'share') {
          return t('transactions.share_gift', { name: name });
        } else {
          return t('transactions.primary_gift');
        }
      case 'crypto_exchange':
        return t('transaction.exchange');
      case 'p2p_offer':
        return t(
          `transactions.${
            type === 'withdraw' ? 'create_ad_at_p2p' : 'cancel_ad_from_p2p'
          }`,
        );
      case 'p2p_refund':
        return t('transactions.p2p_refund');
      case 'wpay_payment':
        return t('transactions.paid');
      case 'payouts':
        return t('transaction.payout');
      case 'multi_use':
      case 'part_multi_use':
      case 'single_use':
        return t('transaction.cheque');
      default:
        return t('transaction.unrecognized_operation');
    }
  }

  function renderMerchant() {
    switch (gateway) {
      case 'top_up':
        return squashAddress(inputAddresses as string);
      case 'wpay_payout':
        return 'Wallet Pay';
      case 'manual':
        return t('transaction.wallet_support');
      case 'campaign':
      case 'p2p_order':
      case 'p2p_offer':
      case 'p2p_refund':
        return;
      case 'card':
        return t('transaction.card');
      case 'bonus_any':
        return;
      case 'bonus':
        return t('transaction.bonus');
      case 'multi_use':
      case 'part_multi_use':
      case 'single_use':
        return;
      case 'withdraw_onchain':
        return isTONSpaceTransfer
          ? t('common.ton_space')
          : isTONDomain(recipientAddress) || isWeb3Domain(recipientAddress)
          ? recipientAddress
          : squashAddress(recipientAddress as string);
      case 'tg_transfer':
      case 'internal':
        return name;
      case 'crypto_exchange':
        return t('transaction.exchange_merchant', {
          from: type === 'deposit' ? pairTransactionCurrency : currency,
          to: type === 'deposit' ? currency : pairTransactionCurrency,
        });
      case 'wpay_payment':
        return storeName;
      case 'payouts':
        return t('transaction.payment_card');
      default:
        return t('transaction.unrecognized_operation');
    }
  }

  function resolveAppearance(
    status: TransactionCardProps['status'],
    type: TransactionCardProps['type'],
  ): AmountProps['appearance'] {
    if (gateway === 'p2p_order' && type === 'withdraw' && status === 'fail') {
      return 'canceled';
    }

    if (type === 'deposit') {
      return 'success';
    }
    if (status === 'fail') {
      return 'error';
    }
    if (status === 'pending' || status === 'new') {
      return 'muted';
    }
    if (status === 'canceled') {
      return 'canceled';
    }
    return 'default';
  }

  return (
    <Amount
      appearance={resolveAppearance(status, type)}
      top={
        <OperationInfo
          avatar={renderMedia()}
          operation={renderOperation()}
          merchant={renderMerchant()}
        />
      }
      bottom={printDate({ value: new Date(date), t, languageCode })}
      value={
        <>
          {amount > 0 ? (type === 'deposit' ? '+' : '-') : ''}
          {formattedAmount}
        </>
      }
      currency={currency}
    />
  );
};

export const TransactionCardSkeleton = () => {
  const theme = useTheme();
  const mediaSize = theme === 'apple' ? 32 : 24;

  return (
    <AmountSkeleton
      top={
        <OperationInfoSkeleton
          avatar={<InitialsAvatarSkeleton size={mediaSize} />}
        />
      }
      bottom
    />
  );
};

export default TransactionCard;
