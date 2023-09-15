import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, createSearchParams } from 'react-router-dom';

import {
  CryptoCurrency,
  GiftTypeEnum,
  TransactionGateway,
  TransactionTypeEnum,
  WPayListDetails,
} from 'api/wallet/generated';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import OperationIcon from 'containers/common/OperationIcon/OperationIcon';

import Avatar from 'components/Avatar/Avatar';
import { Cell } from 'components/Cells';
import InitialsAvatar from 'components/InitialsAvatar/InitialsAvatar';

import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { TransactionStatus, squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TONSpaceSVG } from 'images/ton_space_circle.svg';

interface TransactionCellProps {
  name?: string;
  date: string;
  amount: string;
  currency: CryptoCurrency;
  type: TransactionTypeEnum;
  userId?: number;
  gateway: TransactionGateway;
  giftType?: GiftTypeEnum;
  status?: TransactionStatus;
  transactionId: number;
  recipientAddress?: string;
  inputAddresses?: string;
  photoUrl?: string;
  detailsForUser?: WPayListDetails;
  pairTransactionCurrency?: CryptoCurrency;
  isBlocked?: boolean;
}

const TransactionCell: FC<TransactionCellProps> = (props) => {
  const {
    recipientAddress,
    inputAddresses,
    transactionId,
    name,
    userId,
    amount,
    currency,
    date,
    type,
    status,
    gateway,
    giftType,
    photoUrl,
    detailsForUser,
    pairTransactionCurrency,
    isBlocked,
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const scw = useAppSelector((state) => state.scw);

  const isTONSpaceTransfer =
    gateway === 'withdraw_onchain' &&
    recipientAddress &&
    recipientAddress === scw.address;

  const beforeSize = theme === 'apple' ? 40 : 46;

  function renderMeta() {
    const result = [];
    switch (gateway) {
      case 'crypto_exchange':
      case 'internal':
      case 'tg_transfer':
      case 'withdraw_onchain':
      case 'bonus':
      case 'bonus_any':
      case 'card':
      case 'manual':
      case 'top_up':
      case 'payouts':
        if (status === 'fail') {
          result.push(t(`transactions.canceled`));
        } else if (
          (status === 'pending' && !isBlocked) ||
          status === 'canceled'
        ) {
          result.push(t(`transactions.${status}`));
        } else if (status === 'pending' && isBlocked) {
          result.push(t(`transactions.deposit`));
          result.push(t('transactions.hold'));
        } else {
          result.push(t(`transactions.${type}`));
        }
        break;
      case 'single_use':
      case 'campaign':
      case 'part_multi_use':
      case 'multi_use':
        if (type === 'deposit') {
          result.push(t(`transactions.deposit`));
        } else {
          result.push(t(`transactions.${status!}` as const));
        }
        break;
      case 'p2p_order':
        // if type "withdraw" – it's seller
        // if type "deposit" – it's buyer
        if (type === 'withdraw') {
          if (status === 'success') {
            result.push(t(`transactions.withdraw`));
          } else if (status === 'fail') {
            result.push(t(`transactions.canceled`));
          } else {
            result.push(t(`transactions.${status!}`));
          }
        } else {
          result.push(t('transactions.deposit'));
        }

        break;
      case 'p2p_offer':
        result.push(
          t(`transactions.${type === 'withdraw' ? 'filled' : 'returned'}`),
        );
        break;
      case 'p2p_refund':
        result.push(t(`transactions.${status === 'fail' ? status : type}`));
        break;
      case 'wpay_payment':
        result.push(t('transactions.withdraw'));
        break;
      case 'wpay_payout':
        result.push(t('transactions.deposit'));
    }
    return result.join(' · ');
  }

  function renderBefore() {
    switch (gateway) {
      case 'tg_transfer':
      case 'internal':
        if (photoUrl) {
          return (
            <Cell.Part type="avatar">
              <Avatar size={beforeSize} src={photoUrl} />
            </Cell.Part>
          );
        } else if (name && userId) {
          return (
            <Cell.Part type="avatar">
              <InitialsAvatar size={beforeSize} name={name} userId={userId} />
            </Cell.Part>
          );
        }
        break;
      case 'wpay_payment':
        return (
          <Cell.Part type="avatar">
            <InitialsAvatar
              size={beforeSize}
              userId={Number(detailsForUser?.store_id as string)}
              name={detailsForUser?.store_name as string}
            />
          </Cell.Part>
        );
      case 'withdraw_onchain':
        return (
          <Cell.Part type="roundedIcon">
            {isTONSpaceTransfer ? (
              <TONSpaceSVG width={beforeSize} height={beforeSize} />
            ) : (
              <OperationIcon gateway={gateway} size={beforeSize} type={type} />
            )}
          </Cell.Part>
        );
      default:
        return (
          <Cell.Part type="roundedIcon">
            <OperationIcon gateway={gateway} size={beforeSize} type={type} />
          </Cell.Part>
        );
    }
  }

  function renderText(): string {
    switch (gateway) {
      case 'internal':
      case 'tg_transfer':
        return name as string;
      case 'part_multi_use':
      case 'single_use':
      case 'multi_use':
        return t('transactions.cheques_gateway');
      case 'withdraw_onchain':
        return isTONSpaceTransfer
          ? t('transactions.ton_space_transfer')
          : t('transactions.withdraw_onchain_gateway', {
              address:
                isTONDomain(recipientAddress) || isWeb3Domain(recipientAddress)
                  ? recipientAddress
                  : squashAddress(recipientAddress as string),
            });
      case 'card':
        return t('transactions.top_up_card_gateway');
      case 'bonus':
        return t('transactions.bonus_gateway');
      case 'bonus_any':
        return t('marketing.award_transaction_name');
      case 'manual':
        return t('transactions.top_up_manual_gateway');
      case 'campaign':
        if (giftType === 'share') {
          return t('transactions.share_gift', { name });
        } else {
          return t('transactions.primary_gift');
        }
      case 'top_up':
        return t('transactions.top_up_gateway', {
          entity: squashAddress(inputAddresses as string),
        });
      case 'p2p_order':
        return type === 'withdraw'
          ? t('transactions.p2p_sale')
          : t('transactions.p2p_purchase');
      case 'p2p_offer':
        return t(
          `transactions.${
            type === 'withdraw' ? 'create_ad_at_p2p' : 'cancel_ad_from_p2p'
          }`,
        );
      case 'p2p_refund':
        return t('transactions.p2p_refund');
      case 'wpay_payment':
        return detailsForUser?.store_name || '';
      case 'crypto_exchange':
        return t('transactions.exchange_gateway', {
          from: type === 'deposit' ? pairTransactionCurrency : currency,
          to: type === 'deposit' ? currency : pairTransactionCurrency,
        });
      case 'payouts':
        return t('transactions.payout_gateway');
      case 'wpay_payout':
        return t('transactions.top_up_gateway', { entity: 'Wallet Pay' });
      default:
        return t('transaction.unrecognized_operation');
    }
  }

  const amountAppearance = useMemo(() => {
    if (type === 'deposit' && (status === 'filled' || status === 'success')) {
      return 'success';
    }

    if (
      status === 'pending' ||
      status === 'partially_filled' ||
      status === 'new' ||
      (gateway === 'p2p_order' && type === 'withdraw' && status === 'fail')
    ) {
      return 'muted';
    }

    if (status === 'fail' || status === 'canceled') {
      return 'danger';
    }

    return 'default';
  }, [gateway, status, type]);

  const typeAppearance = useMemo(() => {
    if (type === 'deposit' && (status === 'filled' || status === 'success')) {
      return 'success';
    }

    if (gateway === 'p2p_order' && type === 'withdraw' && status === 'fail') {
      return 'default';
    }

    if (status === 'fail' || status === 'canceled') {
      return 'danger';
    }

    return 'default';
  }, [gateway, status, type]);

  return (
    <Cell
      Component={Link}
      to={{
        pathname: routePaths.TRANSACTION,
        search: createSearchParams({
          transactionId: `${transactionId}`,
        }).toString(),
      }}
      start={renderBefore()}
      end={
        <Cell.Text
          align="end"
          titleAppearance={amountAppearance}
          title={
            <span data-testid={`tx-${transactionId}-amount}`}>
              {type === TransactionTypeEnum.Deposit && '+'}
              {amount} {currency}
            </span>
          }
          descriptionAppearance={typeAppearance}
          description={
            <span data-testid={`tx-${transactionId}-status}`}>
              {renderMeta()}
            </span>
          }
        />
      }
      tappable
    >
      <Cell.Text
        bold
        title={
          <span data-testid={`tx-${transactionId}-action}`}>
            {renderText()}
          </span>
        }
        description={
          <span data-testid={`tx-${transactionId}-date}`}>{date}</span>
        }
      />
    </Cell>
  );
};

export default TransactionCell;
