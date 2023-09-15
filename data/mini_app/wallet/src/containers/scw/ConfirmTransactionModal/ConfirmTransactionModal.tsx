import { useAccountJettons, useAccountTonAsset } from 'query/scw/account';
import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountEvent, ActionTypeEnum } from 'api/tonapi/generated/api';
import {
  FrontendCryptoCurrencyEnum,
  TransactionTypeEnum,
} from 'api/wallet/generated';

import { DEFAULT_FIAT_FRACTION } from 'config';

import { useAppSelector } from 'store';

import { TransactionRequest } from 'reducers/scw/scwSlice';

import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo, {
  OperationInfoSkeleton,
} from 'containers/common/OperationInfo/OperationInfo';
import { ActionSection } from 'containers/scw/ActionSection/ActionSection';

import { Cell } from 'components/Cells';
import InitialsAvatarSkeleton from 'components/InitialsAvatar/InitialsAvatarSkeleton';
import { MainButton } from 'components/MainButton/MainButton';
import { Modal } from 'components/Modal/Modal';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { multiply } from 'utils/common/math';
import {
  getActionAmount,
  getActionRecipient,
  isTransferAction,
} from 'utils/scw/actions';
import { emulateRequest } from 'utils/scw/ton';
import { convertToDecimal } from 'utils/scw/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ConfirmTransactionModal.module.scss';

const MODAL_AVATAR_SIZE = 32;

const TxSkeleton = () => {
  const { themeClassName } = useTheme(styles);
  return (
    <>
      <div className={styles.header}>
        <OperationInfoSkeleton
          avatar={<InitialsAvatarSkeleton size={MODAL_AVATAR_SIZE} />}
        />
      </div>
      <div className={themeClassName('balanceSkeleton')}>
        <div className={themeClassName('featuredBalanceSkeleton')} />
        <Text
          apple={{ variant: 'body', weight: 'regular', color: 'hint' }}
          material={{ variant: 'subtitle1', color: 'hint' }}
          align="center"
          skeleton
          skeletonWidth={100}
        />
      </div>
      <Section separator>
        <Cell.List>
          <Cell>
            <Cell.Text skeleton />
          </Cell>
          <Cell>
            <Cell.Text skeleton />
          </Cell>
        </Cell.List>
      </Section>

      <Section separator>
        <Cell.List>
          <Cell>
            <Cell.Text skeleton />
          </Cell>
        </Cell.List>
      </Section>
    </>
  );
};

const AmountRemainingCell: FC<{ currency: string; amount: number }> = ({
  currency,
  amount,
}) => {
  const { t } = useTranslation();
  const { languageCode } = useAppSelector((state) => state.settings);

  return (
    <Cell>
      <Cell.Text
        title={printCryptoAmount({
          languageCode,
          amount: amount,
          currency: currency,
          currencyDisplay: 'code',
        })}
        description={t('send_confirmation.balance_after')}
        inverted
      />
    </Cell>
  );
};

export const ConfirmTransactionModaInner: FC<{
  event: AccountEvent;
  estimateFee: number;
  onConfirm: VoidFunction;
  isConfirming: boolean;
  isRejecting: boolean;
}> = ({ event, estimateFee, onConfirm, isConfirming, isRejecting }) => {
  const { t } = useTranslation();
  const { baseRate = 0 } = useBaseRate(FrontendCryptoCurrencyEnum.Ton);
  const { data: jettons } = useAccountJettons();
  const { data: tonAsset } = useAccountTonAsset();
  const { themeClassName } = useTheme(styles);

  const { fiatCurrency, languageCode } = useAppSelector(
    (state) => state.settings,
  );

  const primaryAction = event.actions[0];
  const actionAmount = getActionAmount(primaryAction);
  const hasOneAction = event.actions.length === 1;
  const jetton = jettons.find(
    (jetton) => jetton.currency === actionAmount.currency,
  );
  const jettonRate =
    jetton && jetton.tonBalance && jetton.balance !== 0
      ? jetton.tonBalance / jetton.balance
      : 1;
  const fiatAmount = multiply(
    baseRate,
    jettonRate * convertToDecimal(actionAmount.amount, actionAmount.decimals),
    DEFAULT_FIAT_FRACTION,
  );
  const hasPrice =
    actionAmount.currency === FrontendCryptoCurrencyEnum.Ton ||
    jetton?.tonBalance;

  const feeAmount = estimateFee
    ? printCryptoAmount({
        amount: convertToDecimal(estimateFee),
        currency: FrontendCryptoCurrencyEnum.Ton,
        languageCode,
        currencyDisplay: 'code',
      })
    : undefined;

  // used incase multiple actions send ton or same jetton
  const transferTotals = useMemo(() => {
    const initAgg: { [currency: string]: number } = {};
    return event.actions.reduce((agg, val) => {
      const total = getActionAmount(val);
      if (total.currency) {
        if (!(total.currency in agg)) {
          agg[total.currency] = 0;
        }
        agg[total.currency] += total.amount;
      }
      return agg;
    }, initAgg);
  }, [event.actions]);

  const remainingBalances = useMemo(() => {
    const initAgg: { [currency: string]: number } = {};
    return Object.entries(transferTotals).reduce((agg, [currency, total]) => {
      const targetJetton = jettons.find(
        (jetton) => jetton.currency === currency,
      );
      if (currency === FrontendCryptoCurrencyEnum.Ton) {
        agg[currency] = (tonAsset?.balance || 0) - convertToDecimal(total);
        if (estimateFee) {
          agg[currency] -= convertToDecimal(estimateFee);
        }
      } else if (targetJetton) {
        agg[currency] =
          targetJetton.balance -
          convertToDecimal(total, targetJetton?.decimals);
      }
      return agg;
    }, initAgg);
  }, [transferTotals, estimateFee, tonAsset, jettons]);

  const operation = useMemo(() => {
    if (event.actions.length > 1) {
      return 'scw.confirm_modal.multiple_transactions';
    }
    if (event.actions.length === 0) {
      return 'errors.unknown';
    }
    if (isTransferAction(event.actions[0])) {
      return 'transaction.transfer';
    }
    return event.actions[0].simple_preview.name;
  }, [event]);

  const recipient = getActionRecipient(primaryAction);

  const hasNegativeBalance = Object.values(remainingBalances).some(
    (balance) => balance < 0,
  );

  const fiatAmountText = printFiatAmount({
    amount: fiatAmount,
    languageCode: languageCode,
    currency: fiatCurrency,
  });

  const cryptoAmountText = printCryptoAmount({
    languageCode,
    amount: convertToDecimal(actionAmount.amount, actionAmount.decimals),
    currency: actionAmount.currency,
    currencyDisplay: 'code',
  });

  return (
    <>
      <div className={styles.header}>
        <OperationInfo
          avatar={
            <OperationIcon
              gateway={'top_up'}
              size={MODAL_AVATAR_SIZE}
              type={TransactionTypeEnum.Withdraw}
            />
          }
          operation={t(operation)}
          merchant={
            isTransferAction(primaryAction)
              ? recipient.name ||
                squashAddress(recipient.address, { start: 4, end: 4 })
              : undefined
          }
        />
      </div>
      {hasOneAction && (
        <div className={styles.priceContainer}>
          <div className={themeClassName('featuredAmount')}>
            {hasPrice ? fiatAmountText : cryptoAmountText}
          </div>
          {hasPrice ? (
            <Text
              apple={{ variant: 'body', weight: 'regular', color: 'hint' }}
              material={{ variant: 'subtitle1', color: 'hint' }}
              align="center"
            >
              {cryptoAmountText}
            </Text>
          ) : undefined}
        </div>
      )}
      {event.actions.map((action, i) => (
        <ActionSection
          key={i}
          action={action}
          hasOneAction={hasOneAction}
          fee={feeAmount}
        />
      ))}
      <Section separator>
        <Cell.List>
          {!hasOneAction && feeAmount && (
            <Cell>
              <Cell.Text
                title={`≈ ${feeAmount}`}
                description={t('send_confirmation.fee')}
                inverted
              />
            </Cell>
          )}
          {remainingBalances[FrontendCryptoCurrencyEnum.Ton] && (
            <AmountRemainingCell
              currency={FrontendCryptoCurrencyEnum.Ton}
              amount={remainingBalances[FrontendCryptoCurrencyEnum.Ton]}
            />
          )}
          {Object.keys(remainingBalances)
            .filter((currency) => currency !== FrontendCryptoCurrencyEnum.Ton)
            .map((currency) => (
              <AmountRemainingCell
                key={currency}
                currency={currency}
                amount={remainingBalances[currency]}
              />
            ))}
        </Cell.List>
      </Section>
      <MainButton
        onClick={onConfirm}
        disabled={hasNegativeBalance || isConfirming || isRejecting}
        progress={isConfirming || isRejecting}
        text={
          hasNegativeBalance
            ? t('p2p.order_detail.insufficient_funds')
            : t('p2p.user_agreement.confirm_button')
        }
      />
    </>
  );
};

export const ConfirmTransactionModal: FC<{
  onClose: VoidFunction;
  onConfirm: (event: AccountEvent) => void;
  transactionRequest: TransactionRequest;
  isConfirming: boolean;
  isRejecting: boolean;
}> = ({
  onClose,
  onConfirm,
  transactionRequest,
  isConfirming,
  isRejecting,
}) => {
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);
  const { isLoading: isJettonsLoading } = useAccountJettons();
  const { isLoading: isTonLoading } = useAccountTonAsset();
  const [event, setEvent] = useState<AccountEvent | undefined>(undefined);
  const [estimateFee, setEstimateFee] = useState<number | undefined>(undefined);
  const [emulating, setEmulating] = useState(false);
  const [hasEmulated, setHasEmulated] = useState(false);

  const emulateTransaction = () => {
    setEmulating(true);
    if (transactionRequest.request.method === 'sendTransaction') {
      emulateRequest(transactionRequest.request)
        .then((resp) => {
          if (resp.event.actions[0].type === ActionTypeEnum.Unknown) {
            snackbarContext.showSnackbar({
              icon: 'warning',
              text: t('scw.confirm_modal.simulated_transaction_failed'),
            });
            onClose();
          } else {
            setEvent(resp.event);
            setEstimateFee(resp.estimateFee);
          }
        })
        .catch((error) => {
          console.error(
            'Failed to emulate transaction request: ',
            error.message,
          );
          snackbarContext.showSnackbar({
            icon: 'warning',
            text: t('scw.confirm_modal.unable_to_simulate_transaction'),
          });
        })
        .finally(() => {
          setHasEmulated(true);
          setEmulating(false);
        });
    } else {
      console.error('Tried to confirm and emulate non-transaction request');
      snackbarContext.showSnackbar({
        icon: 'warning',
        text: t('scw.confirm_modal.unsupported_transaction_type'),
      });
      setHasEmulated(true);
      setEmulating(false);
    }
  };

  useEffect(() => {
    emulateTransaction();
  }, [transactionRequest]);

  return (
    <Modal onClose={onClose} mode="secondary">
      <div className={styles.root}>
        <Skeleton
          skeletonShown={isTonLoading || isJettonsLoading || !event}
          skeleton={<TxSkeleton />}
        >
          {event !== undefined && estimateFee !== undefined && (
            <ConfirmTransactionModaInner
              event={event}
              estimateFee={estimateFee}
              onConfirm={() => {
                onConfirm(event);
              }}
              isConfirming={isConfirming}
              isRejecting={isRejecting}
            />
          )}
        </Skeleton>
        {!event && hasEmulated && (
          <MainButton
            onClick={emulateTransaction}
            progress={emulating}
            text={t('scw.confirm_modal.simulate_transaction')}
          />
        )}
      </div>
    </Modal>
  );
};
