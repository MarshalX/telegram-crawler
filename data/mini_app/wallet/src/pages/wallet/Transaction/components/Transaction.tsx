import { FC, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { KycStatusPublicDtoLevelEnum } from 'api/p2p/generated-userservice';
import API from 'api/wallet';
import { TransactionDetails } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { updateStatus } from 'reducers/transactionDetails/transactionDetailsSlice';

import { Action as KycAction } from 'pages/wallet/KYC/components/Action/Action';
import { ReactComponent as CancelSuccessSVG } from 'pages/wallet/Transaction/cancel_success.svg';

import TransactionCard, {
  TransactionCardSkeleton,
} from 'containers/wallet/TransactionCard/TransactionCard';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { ButtonCell, Cell, NewDetailCell } from 'components/Cells';
import InitialsAvatar from 'components/InitialsAvatar/InitialsAvatar';
import Mono from 'components/Mono/Mono';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard, generateTelegramLink } from 'utils/common/common';
import { confirm } from 'utils/common/confirm';
import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { divide, minus } from 'utils/common/math';
import { generateStartAttach } from 'utils/common/startattach';
import { refreshBalance } from 'utils/wallet/balance';
import { isCheck, resolveStatus } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { updateTransaction } from '../../../../query/wallet/transactions/useTransactions';
import { RootState } from '../../../../store';

export const Transaction: FC<TransactionDetails> = ({
  id: transactionId,
  gateway,
  type,
  status,
  created_at: createdAt,
  username,
  tg_id: tgId,
  mention,
  photo_url: photoUrl,
  amount_of_activations: amountOfActivations,
  crypto_amount: cryptoAmount,
  remaining_amount: remainingAmount,
  crypto_currency: currency,
  recipient_wallet_address: recipientAddress,
  input_addresses: inputAddresses,
  gift_type: giftType,
  pair_transaction_amount: pairTransactionAmount,
  pair_transaction_currency: pairTransactionCurrency,
  details_for_user: detailsForUser,
  check_url: checkUrl,
  fee_amount: feeAmount,
  fee_currency: feeCurrency,
  fiat_amount: fiatAmount,
  fiat_currency: fiatCurrency,
  number_of_activations: numberOfActivations,
  full_number_of_activations: fullNumberOfActivations,
  buyer,
  avatar_code: avatarCode,
  seller,
  transaction_link: transactionLink,
  block,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { botUsername } = useSelector((state: RootState) => state.wallet);
  const { permissions } = useSelector((state: RootState) => state.user);
  const { receiver } = useSelector((state: RootState) => state.session);
  const snackbarContext = useContext(SnackbarContext);
  const dispatch = useDispatch();

  let amount = cryptoAmount;

  if (
    isCheck(gateway) &&
    status === 'canceled' &&
    typeof remainingAmount === 'number'
  ) {
    amount = remainingAmount;
  } else if (isCheck(gateway) && typeof amountOfActivations === 'number') {
    amount = amountOfActivations;
  }

  const transactionStatus = useMemo(() => {
    if (gateway === 'p2p_offer') {
      return type === 'withdraw'
        ? t('transactions.filled')
        : t('transactions.returned');
    }

    if (gateway && isCheck(gateway) && status === 'filled') {
      return t(`transactions.success`);
    }

    if (gateway === 'p2p_order' && type === 'withdraw' && status === 'fail') {
      return t(`transactions.canceled`);
    }

    return status ? t(`transactions.${resolveStatus(status)}`) : '';
  }, [gateway, status, t, type]);

  const transactionCard = (
    <TransactionCard
      date={createdAt}
      gateway={gateway}
      type={type}
      name={username}
      userId={tgId}
      photoUrl={photoUrl}
      amount={amount}
      currency={currency}
      status={resolveStatus(status)}
      recipientAddress={recipientAddress}
      inputAddresses={inputAddresses}
      giftType={giftType}
      storeName={detailsForUser?.store_name}
      storeId={detailsForUser?.store_id}
      pairTransactionAmount={pairTransactionAmount}
      pairTransactionCurrency={pairTransactionCurrency}
    />
  );

  const canCancel =
    gateway === 'tg_transfer' && (status === 'pending' || status === 'new');
  const showCheckLink =
    isCheck(gateway) &&
    type === 'withdraw' &&
    !['filled', 'canceled'].includes(status);
  const canRepeat =
    type === 'withdraw' &&
    status === 'success' &&
    ['tg_transfer', 'internal', 'withdraw_onchain'].includes(gateway);

  const isBlocked = block && block.type === 'kyc_required';

  const hasActions = showCheckLink || canCancel || canRepeat || isBlocked;
  const actions = (
    <>
      {canCancel && !isBlocked && (
        <ButtonCell
          mode="danger"
          onClick={() => {
            confirm(t('transaction.cancel_confirm_text')).then(() => {
              API.Transactions.cancelTgtransferTransaction(transactionId).then(
                (response) => {
                  if (response.data.value) {
                    refreshBalance();
                    updateTransaction(
                      (transaction) => transaction.id === transactionId,
                      { status: 'canceled' },
                    );
                    window.history.back();
                    snackbarContext.showSnackbar({
                      showDuration: 2000,
                      text: t('transaction.cancel_success'),
                      before: <CancelSuccessSVG />,
                    });
                    dispatch(updateStatus('canceled'));
                  }
                },
              );
            });
          }}
        >
          {t('transaction.cancel_button')}
        </ButtonCell>
      )}
      {showCheckLink && (
        <ButtonCell
          onClick={() => {
            if (checkUrl) {
              copyToClipboard(checkUrl).then(() => {
                snackbarContext.showSnackbar({
                  text: t('transaction.link_copied'),
                });
              });
            }
          }}
        >
          {t('transaction.copy_link')}
        </ButtonCell>
      )}
      {canRepeat && (
        <ButtonCell
          onClick={() => {
            const sendAmount =
              gateway === 'withdraw_onchain' && amount && feeAmount
                ? minus(amount, feeAmount)
                : amount;

            if (
              !permissions.canWithdrawInner &&
              !permissions.canWithdrawOuter
            ) {
              snackbarContext.showSnackbar({
                snackbarId: 'send_unavailable',
                before: <WarningSVG />,
                text: t('common.feature_is_blocked'),
                action: (
                  <a href={WALLET_SUPPORT_BOT_LINK}>
                    {t('common.contact_support')}
                  </a>
                ),
                actionPosition: 'bottom',
              });
            } else if (tgId === receiver?.id) {
              navigate(
                `${generatePath(
                  routePaths.SEND,
                )}?value=${sendAmount}&assetCurrency=${currency}`,
              );
            } else if (mention) {
              window.Telegram.WebApp.openTelegramLink(
                generateTelegramLink(mention, {
                  attach: botUsername,
                  startattach: generateStartAttach('send', {
                    assetCurrency: currency,
                    value: sendAmount,
                  }),
                }),
              );
            } else if (recipientAddress) {
              navigate(
                `${generatePath(
                  routePaths.SEND,
                )}?address=${recipientAddress}&value=${sendAmount}&assetCurrency=${currency}`,
              );
            } else {
              window.Telegram.WebApp.openTelegramLink(
                generateTelegramLink(botUsername, {
                  attach: botUsername,
                  startattach: generateStartAttach('send', {
                    assetCurrency: currency,
                    value: sendAmount,
                  }),
                  choose: 'users',
                }),
              );
            }
          }}
        >
          {t('transaction.repeat')}
        </ButtonCell>
      )}
      {isBlocked && (
        <KycAction
          nextLevel={block?.kyc_level as KycStatusPublicDtoLevelEnum}
        />
      )}
    </>
  );

  return (
    <>
      {theme === 'material' ? (
        <Section separator>
          {transactionCard}
          {theme === 'material' && hasActions && (
            <Cell.List>{actions}</Cell.List>
          )}
        </Section>
      ) : (
        <section>{transactionCard}</section>
      )}
      {theme === 'apple' && hasActions && (
        <Section>
          <Cell.List>{actions}</Cell.List>
        </Section>
      )}
      <Section
        separator
        title={
          hasActions || theme !== 'apple' ? t('transaction.details') : undefined
        }
      >
        <Cell.List>
          <NewDetailCell header={t('transaction.status')}>
            {transactionStatus}
          </NewDetailCell>
          {gateway === 'wpay_payment' && (
            <NewDetailCell header={t('transaction.item')}>
              {detailsForUser?.description}
            </NewDetailCell>
          )}
          {gateway === 'wpay_payout' && (
            <>
              <NewDetailCell header={t('transaction.wpay_from_store')}>
                {detailsForUser?.store_name}
              </NewDetailCell>
              <NewDetailCell
                header={t('transaction.wpay_payout_id')}
                onClick={() =>
                  detailsForUser?.payout_id &&
                  copyToClipboard(detailsForUser.payout_id).then(() => {
                    snackbarContext.showSnackbar({
                      text: t('common.copied_to_clipboard'),
                    });
                  })
                }
              >
                <Mono>{detailsForUser?.payout_id}</Mono>
              </NewDetailCell>
            </>
          )}
          {gateway === 'card' && !inputAddresses && (
            <NewDetailCell
              header={t('transaction.fiat_at_the_time', {
                fiat: fiatCurrency,
              })}
            >
              {typeof fiatAmount === 'number' &&
                fiatCurrency &&
                `≈ ${printFiatAmount({
                  amount: fiatAmount,
                  currency: fiatCurrency,
                  languageCode,
                })}`}
            </NewDetailCell>
          )}
          {status === 'success' && gateway === 'withdraw_onchain' && (
            <NewDetailCell header={t('transaction.withdraw_fee')}>
              {typeof feeAmount === 'number' &&
                feeCurrency &&
                printCryptoAmount({
                  amount: feeAmount,
                  currency: feeCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
            </NewDetailCell>
          )}
          {recipientAddress && gateway === 'withdraw_onchain' && (
            <NewDetailCell
              onClick={() =>
                copyToClipboard(recipientAddress).then(() => {
                  snackbarContext.showSnackbar({
                    text: t('transaction.address_copied'),
                  });
                })
              }
              header={t('transaction.to')}
            >
              <Mono>{recipientAddress}</Mono>
            </NewDetailCell>
          )}
          {inputAddresses && gateway === 'top_up' && (
            <NewDetailCell
              onClick={() =>
                copyToClipboard(inputAddresses).then(() => {
                  snackbarContext.showSnackbar({
                    text: t('transaction.address_copied'),
                  });
                })
              }
              header={t('transaction.from')}
            >
              <Mono>{inputAddresses}</Mono>
            </NewDetailCell>
          )}
          {gateway === 'single_use' && username && tgId && (
            <NewDetailCell
              header={t(
                `transaction.${type === 'deposit' ? 'owner' : 'recipient'}`,
              )}
              after={
                <Cell.Part type="avatar">
                  <InitialsAvatar userId={tgId} name={username} />
                </Cell.Part>
              }
            >
              {username}
            </NewDetailCell>
          )}
          {isCheck(gateway) &&
            gateway !== 'single_use' &&
            type === 'deposit' &&
            username &&
            tgId && (
              <NewDetailCell
                header={t('transaction.owner')}
                after={
                  <Cell.Part type="avatar">
                    <InitialsAvatar userId={tgId} name={username} />
                  </Cell.Part>
                }
              >
                {username}
              </NewDetailCell>
            )}
          {isCheck(gateway) &&
            gateway !== 'single_use' &&
            type === 'withdraw' && (
              <NewDetailCell header={t('transaction.max_amount')}>
                {printCryptoAmount({
                  amount: cryptoAmount,
                  currency: currency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
              </NewDetailCell>
            )}
          {isCheck(gateway) &&
            gateway !== 'single_use' &&
            type === 'withdraw' && (
              <NewDetailCell header={t('transaction.number_of_activations')}>
                {t('transaction.number_of_activations_value', {
                  number: numberOfActivations,
                  total: fullNumberOfActivations,
                })}
              </NewDetailCell>
            )}
          {gateway === 'p2p_order' &&
            (type === 'deposit' ||
              (type === 'withdraw' &&
                status !== 'pending' &&
                buyer &&
                buyer !== 'None')) && (
              <NewDetailCell
                header={
                  type === 'withdraw'
                    ? t('transaction.buyer')
                    : t('transaction.seller')
                }
                after={
                  avatarCode && (
                    <Cell.Part type="avatar">
                      <AliasAvatar size={40} id={0} avatarCode={avatarCode} />
                    </Cell.Part>
                  )
                }
              >
                {type === 'withdraw' ? buyer : seller}
              </NewDetailCell>
            )}
        </Cell.List>
      </Section>
      {transactionLink && (
        <Section separator>
          <ButtonCell
            onClick={() => {
              if (transactionLink) {
                window.Telegram.WebApp.openLink(transactionLink);
              }
            }}
          >
            {t('transaction.view')}
          </ButtonCell>
        </Section>
      )}
      {detailsForUser?.order_number && (
        <Section separator>
          <ButtonCell
            onClick={() => {
              if (detailsForUser?.order_number) {
                copyToClipboard(detailsForUser.order_number).then(() => {
                  snackbarContext.showSnackbar({
                    onShow: () =>
                      window.Telegram.WebApp.HapticFeedback.notificationOccurred(
                        'success',
                      ),
                    showDuration: 2000,
                    snackbarId: 'order_number_copied',
                    text: t('common.copied_to_clipboard'),
                  });
                });
              }
            }}
          >
            {t('transaction.copy_order_id')}
          </ButtonCell>
        </Section>
      )}

      {gateway === 'crypto_exchange' &&
        typeof pairTransactionAmount === 'number' &&
        pairTransactionCurrency && (
          <Section separator>
            <Cell.List>
              <NewDetailCell
                header={t(
                  `transaction.exchange_${
                    type === 'deposit' ? 'paid' : 'received'
                  }`,
                )}
              >
                {printCryptoAmount({
                  amount: pairTransactionAmount,
                  currency: pairTransactionCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
              </NewDetailCell>
              <NewDetailCell header={t(`transaction.exchange_rate`)}>
                {`${printCryptoAmount({
                  amount: 1,
                  currency,
                  languageCode,
                  currencyDisplay: 'code',
                })} ≈ ${printCryptoAmount({
                  amount: divide(pairTransactionAmount, amount),
                  currency: pairTransactionCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}`}
              </NewDetailCell>
            </Cell.List>
          </Section>
        )}
    </>
  );
};

export const TransactionSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      {theme === 'material' ? (
        <Section separator>
          <TransactionCardSkeleton />
        </Section>
      ) : (
        <section>
          <TransactionCardSkeleton />
        </section>
      )}
      <Section separator>
        <Cell.List>
          <Cell>
            <Cell.Text skeleton description inverted />
          </Cell>
          <Cell>
            <Cell.Text skeleton description inverted />
          </Cell>
        </Cell.List>
      </Section>
    </>
  );
};
