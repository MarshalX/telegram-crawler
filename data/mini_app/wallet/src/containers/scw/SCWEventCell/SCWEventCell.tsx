import { useCollectible } from 'query/getGems/collectibles/collectible';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { AccountEvent, Action, ActionTypeEnum } from 'api/tonapi/generated/api';
import { TransactionTypeEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { CRYPTO_FRACTION } from 'config';

import { useAppSelector } from 'store';

import OperationIcon from 'containers/common/OperationIcon/OperationIcon';

import Avatar from 'components/Avatar/Avatar';
import { AvatarSkeleton } from 'components/AvatarSkeleton/AvatarSkeleton';
import { Cell } from 'components/Cells';

import { printCryptoAmount } from 'utils/common/currency';
import { printDate } from 'utils/common/date';
import { getHttpImageUrl } from 'utils/common/image';
import { convertToDecimal, getFriendlyAddress } from 'utils/scw/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import TonImage from 'images/ton.png';

export interface EventCellInfo {
  title: string;
  isSender: boolean;
  success: boolean;
  amount?: number;
  nftAddress?: string;
  currency?: string;
  address?: string;
  image?: string;
  comment?: string;
}

export const getEventCellInfo = (
  action: Action,
  walletAddress: string,
): EventCellInfo => {
  let isSender, address;
  switch (action.type) {
    case ActionTypeEnum.TonTransfer:
      isSender = action.TonTransfer?.sender?.address === walletAddress;
      address = isSender
        ? action.TonTransfer?.recipient.address
        : action.TonTransfer?.sender.address;
      return {
        title: isSender ? 'scw.sent_ton' : 'scw.received_ton',
        amount: convertToDecimal(
          action.TonTransfer?.amount || 0,
          CRYPTO_FRACTION['TON'],
        ),
        currency: 'TON',
        address: getFriendlyAddress(address || ''),
        image: TonImage,
        comment: action.TonTransfer?.comment,
        isSender,
        success: action.status === 'ok',
      };
    case ActionTypeEnum.JettonTransfer:
      isSender = action.JettonTransfer?.sender?.address === walletAddress;
      address = isSender
        ? action.JettonTransfer?.recipient?.address
        : action.JettonTransfer?.sender?.address;
      return {
        title: isSender ? 'scw.sent_tokens' : 'scw.received_tokens',
        amount: convertToDecimal(
          action.JettonTransfer?.amount || 0,
          action.JettonTransfer?.jetton?.decimals,
        ),
        currency: action.JettonTransfer?.jetton?.symbol,
        address: getFriendlyAddress(address || ''),
        image: action.JettonTransfer?.jetton.image,
        comment: action.JettonTransfer?.comment,
        isSender,
        success: action.status === 'ok',
      };
    case ActionTypeEnum.NftItemTransfer:
      isSender = action.NftItemTransfer?.sender?.address === walletAddress;
      address = isSender
        ? action.NftItemTransfer?.recipient?.address
        : action.NftItemTransfer?.sender?.address;
      return {
        title: action.simple_preview.name,
        address: getFriendlyAddress(address || ''),
        nftAddress: getFriendlyAddress(action.NftItemTransfer?.nft || ''),
        comment: action.NftItemTransfer?.comment,
        isSender,
        success: action.status === 'ok',
      };
    default:
      isSender = false;
      if (
        action.simple_preview &&
        action.simple_preview.accounts &&
        action.simple_preview.accounts.length > 0 &&
        action.simple_preview.accounts[0].address === walletAddress
      ) {
        isSender = true;
      }
      return {
        title: action.simple_preview.name,
        isSender: isSender,
        success: action.status === 'ok',
      };
  }
};

export interface SCWEventCellProps {
  event: AccountEvent;
  pending?: boolean;
}

export const SCWEventCellCollectibleImage: React.FC<{
  nftAddress: string;
}> = ({ nftAddress }) => {
  const theme = useTheme();

  const collectibleResponse = useCollectible(nftAddress);
  const collectible = collectibleResponse?.data?.collectible;

  const httpImageUrl =
    collectible?.content?.typename === 'Image'
      ? getHttpImageUrl(collectible?.content?.image)
      : collectible?.content?.preview
      ? getHttpImageUrl(collectible?.content?.preview)
      : undefined;

  if (!httpImageUrl) {
    return (
      <Cell.Part type={'avatar'}>
        <AvatarSkeleton size={theme === 'apple' ? 40 : 46} />
      </Cell.Part>
    );
  }

  return (
    <Cell.Part type={'avatar'}>
      <Avatar src={httpImageUrl} size={theme === 'apple' ? 40 : 46} />
    </Cell.Part>
  );
};

export const SCWEventCell: React.FC<
  React.PropsWithChildren<SCWEventCellProps>
> = ({ event, pending = false }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { raw } = useAppSelector((state) => state.scw);

  const eventCellInfo = getEventCellInfo(event.actions[0], raw);
  const { languageCode } = useAppSelector((state) => state.settings);
  const isPending = pending || event.in_progress;
  const toLink = isPending
    ? undefined
    : generatePath(routePaths.SCW_TX, {
        id: event.event_id,
      });
  const httpImageUrl = eventCellInfo.image
    ? getHttpImageUrl(eventCellInfo.image)
    : undefined;

  const endTitle = useMemo(() => {
    if (eventCellInfo?.success) {
      if (eventCellInfo?.amount) {
        const prefix = eventCellInfo?.isSender ? '' : '+';
        const printedAmount = printCryptoAmount({
          amount: eventCellInfo?.amount || 0,
          currency: eventCellInfo?.currency || '',
          languageCode,
        });
        return `${prefix}${printedAmount} ${eventCellInfo?.currency}`;
      }
      if (eventCellInfo.nftAddress) {
        return t('scw.collectible');
      }
    }
  }, [eventCellInfo]);

  return (
    <Cell
      Component={toLink ? Link : undefined}
      to={toLink}
      start={
        eventCellInfo.image ? (
          <Cell.Part type={'avatar'}>
            <Avatar src={httpImageUrl} size={theme === 'apple' ? 40 : 46} />
          </Cell.Part>
        ) : eventCellInfo.nftAddress ? (
          <SCWEventCellCollectibleImage
            nftAddress={eventCellInfo?.nftAddress}
          />
        ) : (
          <Cell.Part type="roundedIcon">
            <OperationIcon
              gateway="top_up"
              size={theme === 'apple' ? 40 : 46}
              type={
                eventCellInfo?.isSender
                  ? TransactionTypeEnum.Withdraw
                  : TransactionTypeEnum.Deposit
              }
            />
          </Cell.Part>
        )
      }
      end={
        eventCellInfo?.amount || eventCellInfo?.nftAddress ? (
          <Cell.Text
            align="end"
            titleAppearance={!eventCellInfo?.isSender ? 'success' : undefined}
            title={endTitle}
            descriptionAppearance={
              !eventCellInfo?.isSender ? 'success' : undefined
            }
            description={
              isPending
                ? t('transactions.pending')
                : eventCellInfo?.success
                ? eventCellInfo.isSender
                  ? t('transactions.withdraw')
                  : t('transactions.deposit')
                : t('transactions.fail')
            }
          />
        ) : (
          ''
        )
      }
      tappable
    >
      <Cell.Text
        bold
        title={
          squashAddress(eventCellInfo?.address || '', { start: 4, end: 4 }) ||
          eventCellInfo.title
        }
        description={printDate({
          value: new Date(event.timestamp * 1000),
          t,
          languageCode,
        })}
      />
    </Cell>
  );
};
