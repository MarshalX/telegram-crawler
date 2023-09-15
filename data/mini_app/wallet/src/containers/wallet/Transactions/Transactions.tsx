import { useTransactions } from 'query/wallet/transactions/useTransactions';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CryptoCurrency,
  FrontendCryptoCurrencyEnum,
} from 'api/wallet/generated';

import { WALLET_CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM } from 'config';

import { useAppSelector } from 'store';

import { ButtonCell, Cell } from 'components/Cells';
import Skeleton from 'components/Skeleton/Skeleton';

import { repeat } from 'utils/common/common';
import {
  printCryptoAmount,
  roundDownFractionalDigits,
} from 'utils/common/currency';
import { printDate } from 'utils/common/date';
import { isCheck, resolveStatus } from 'utils/wallet/transactions';

import TransactionCell from './components/TransactionCell/TransactionCell';
import TransactionCellSkeleton from './components/TransactionCell/TransactionCellSkeleton';

interface TransactionsProps {
  assetCurrency?: FrontendCryptoCurrencyEnum;
  fetchMode?: 'scroll' | 'button';
  pageSize?: number;
}

const Transactions: FC<TransactionsProps> = ({
  assetCurrency,
  fetchMode = 'scroll',
  pageSize,
}) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { languageCode } = useAppSelector((state) => state.settings);
  // const { shareGiftIsOver } = useAppSelector(
  //   (state) => state.warningsVisibility,
  // );
  const { assets } = useAppSelector((state) => state.wallet);

  const {
    transactions,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactions({
    assetCurrency: assetCurrency || assets.map((item) => item.currency),
    pageSize,
  });

  // const {
  //   currency: giftCurrency,
  //   shareGiftCount,
  //   isLastWave,
  //   status: giftStatus,
  // } = useSelector((state: RootState) => state.gift);
  // const { botUsername } = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    const onScroll = () => {
      if (
        fetchMode === 'scroll' &&
        !isFetchingNextPage &&
        window.scrollY >
          (document.documentElement.offsetHeight - window.innerHeight) / 2
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, isFetchingNextPage, fetchMode]);

  // useEffect(() => {
  //   if (shareGiftCount === 0) {
  //     API.WVSettings.setUserWvSettings({
  //       display_share_gift_is_over: false,
  //     });
  //   }
  // }, [shareGiftCount]);

  return (
    <Skeleton
      skeletonShown={isFetching && !isFetchingNextPage}
      skeleton={
        <Cell.List>
          {repeat((i) => {
            return <TransactionCellSkeleton key={i} />;
          }, 10)}
        </Cell.List>
      }
    >
      {/*{giftStatus !== 'sent' &&*/}
      {/*  !isLastWave &&*/}
      {/*  typeof shareGiftCount === 'number' &&*/}
      {/*  shareGiftCount > 0 && (*/}
      {/*    <GiftCell*/}
      {/*      title={t('transactions.send_gift_title', {*/}
      {/*        count: shareGiftCount,*/}
      {/*        currency: giftCurrency,*/}
      {/*      })}*/}
      {/*      buttonText={t('transactions.send_gift_button')}*/}
      {/*      onClick={() => {*/}
      {/*        window.Telegram.WebApp.openTelegramLink(*/}
      {/*          `https://t.me/${botUsername}?startattach=${generateStartAttach(*/}
      {/*            'send_gift',*/}
      {/*          )}&choose=users`,*/}
      {/*        );*/}
      {/*      }}*/}
      {/*      icon={<GiftAvatar mode="send" />}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*{giftStatus !== 'sent' &&*/}
      {/*  shareGiftCount === 0 &&*/}
      {/*  !isLastWave &&*/}
      {/*  shareGiftIsOver && (*/}
      {/*    <GiftCell*/}
      {/*      title={t('transactions.over_gift_title')}*/}
      {/*      icon={<GiftAvatar mode="send" />}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*{giftStatus === 'sent' && (*/}
      {/*  <GiftCell*/}
      {/*    title={t('transactions.open_gift_title')}*/}
      {/*    buttonText={t('transactions.open_gift_button')}*/}
      {/*    onClick={() => {*/}
      {/*      navigate(routePaths.OPEN_GIFT);*/}
      {/*    }}*/}
      {/*    icon={<GiftAvatar mode="open" />}*/}
      {/*  />*/}
      {/*)}*/}
      <div>
        <Cell.List>
          {transactions.map((transaction) => {
            let amount = printCryptoAmount({
              amount: roundDownFractionalDigits(
                transaction.amount.toFixed(10),
                WALLET_CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[
                  transaction.currency as FrontendCryptoCurrencyEnum
                ],
              ),
              // TODO: WT-3008
              currency: transaction.currency as CryptoCurrency,
              languageCode,
            });
            if (
              isCheck(transaction.gateway) &&
              transaction.gateway !== 'single_use' &&
              typeof transaction.activated_amount === 'number'
            ) {
              amount = `${printCryptoAmount({
                amount: roundDownFractionalDigits(
                  transaction.activated_amount.toFixed(10),
                  WALLET_CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[
                    transaction.currency as FrontendCryptoCurrencyEnum
                  ],
                ),
                // TODO: WT-3008
                currency: transaction.currency as CryptoCurrency,
                languageCode,
              })} / ${amount}`;
            }
            return (
              <TransactionCell
                recipientAddress={transaction.recipient_wallet_address}
                inputAddresses={transaction.input_addresses}
                gateway={transaction.gateway}
                transactionId={transaction.id}
                userId={transaction.tg_id}
                key={transaction.id}
                name={transaction.username}
                date={printDate({
                  value: new Date(transaction.created_at),
                  t,
                  languageCode,
                })}
                amount={amount}
                currency={transaction.currency as CryptoCurrency}
                type={transaction.type}
                status={resolveStatus(transaction.status)}
                giftType={transaction.gift_type}
                photoUrl={transaction.photo_url}
                detailsForUser={transaction.details_for_user}
                pairTransactionCurrency={
                  transaction.pair_transaction_currency as CryptoCurrency
                }
                isBlocked={transaction.is_blocked}
              />
            );
          })}
        </Cell.List>
        {fetchMode === 'button' && hasNextPage && (
          <ButtonCell onClick={() => fetchNextPage()}>
            {t('transactions.show_more')}
          </ButtonCell>
        )}
      </div>
    </Skeleton>
  );
};

export default Transactions;
