import {
  resetTransactions,
  updateTransaction,
} from 'query/wallet/transactions/useTransactions';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import API from 'api/wallet';

import routePaths from 'routePaths';

import { RootState } from 'store';

import { Amount } from 'containers/common/Amount/Amount';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, NewDetailCell } from 'components/Cells';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import { Notice } from 'components/Notice/Notice';
import Page from 'components/Page/Page';
import PasscodeVerify from 'components/PasscodeVerify/PasscodeVerify';
import Section from 'components/Section/Section';

import {
  getCurrencyName,
  printCryptoAmount,
  printFiatAmount,
} from 'utils/common/currency';
import { getNetworkTicker } from 'utils/common/network';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { refreshBalance } from 'utils/wallet/balance';
import { squashAddress } from 'utils/wallet/transactions';

import { useAssetCurrency } from 'hooks/common/useAssetCurrency';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TONSpaceSVG } from 'images/ton_space_circle.svg';

async function pollTransaction(id: number) {
  const { data: transaction } = await API.Transactions.getTransactionDetails(
    id,
  );

  if (transaction.status === 'success' || transaction.status === 'fail') {
    updateTransaction((transaction) => transaction.id === id, {
      status: transaction.status,
    });
  } else {
    setTimeout(() => pollTransaction(id), 1500);
  }
}

export const SendRequestConfirmation: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const assetCurrency = useAssetCurrency();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const sendRequest = useSelector((state: RootState) => state.sendRequest);
  const { passcodeType } = useSelector((state: RootState) => state.passcode);
  const scw = useSelector((state: RootState) => state.scw);

  const theme = useTheme();
  const [confirming, setConfirming] = useState(false);
  const [enterPasscode, setEnterPasscode] = useState(false);

  if (!sendRequest) {
    return null;
  }

  const networkName = getNetworkTicker(sendRequest.network);

  const isHighFeeNoticeVisible =
    assetCurrency === 'BTC' && sendRequest.fee.amount > 0.0004;

  const handleConfirmClick = async () => {
    if (passcodeType) {
      setEnterPasscode(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setEnterPasscode(false);
    if (!sendRequest.address) return;

    if (sendRequest?.uid) {
      setConfirming(true);
      // TODO: Add passcode to request, and handle failure scenario
      const response = await API.Withdrawals.processWithdrawRequest(
        sendRequest.uid,
        {},
      );
      refreshBalance();
      resetTransactions();

      navigate(
        {
          pathname: generatePath(routePaths.SEND_REQUEST_STATUS, {
            assetCurrency,
          }),
          search: createSearchParams({
            status: 'success',
          }).toString(),
        },
        {
          replace: true,
        },
      );
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      pollTransaction(response.data.transaction_id);
    }
  };

  const { address, senderAmount, recipientAmount, fee, balanceAfter } =
    sendRequest;

  let top;

  if (address && address === scw.address) {
    top = (
      <OperationInfo
        merchant={t('send.your_ton_space')}
        operation={t('send.operation')}
        avatar={
          <TONSpaceSVG
            width={theme === 'apple' ? 32 : 24}
            height={theme === 'apple' ? 32 : 24}
          />
        }
      />
    );
  } else if (address) {
    top = (
      <OperationInfo
        avatar={
          <OperationIcon
            gateway="withdraw_onchain"
            size={theme === 'apple' ? 32 : 24}
          />
        }
        operation={t('send.operation')}
        merchant={
          isTONDomain(address) || isWeb3Domain(address)
            ? address
            : squashAddress(address)
        }
      />
    );
  }

  const amount = (
    <Amount
      top={top}
      value={printCryptoAmount({
        amount: Number(recipientAmount.amount),
        currency: assetCurrency,
        languageCode,
      })}
      currency={assetCurrency}
    />
  );

  const highFeeNotice = (
    <InlineLayout
      style={{
        paddingTop:
          theme === 'material'
            ? 8
            : window.Telegram.WebApp.platform === 'macos'
            ? 12
            : 0,
      }}
    >
      <Notice>
        {t('send_confirmation.high_fee_notice', {
          currencyName: getCurrencyName({
            currency: assetCurrency,
            variant: 'complex',
            t,
          }),
          amount: printCryptoAmount({
            amount: fee.amount,
            currency: assetCurrency,
            languageCode,
            currencyDisplay: 'code',
          }),
          fiatAmount: printFiatAmount({
            amount: fee.fiat_amount,
            currency: fee.fiat_currency,
            languageCode,
          }),
        })}
      </Notice>
    </InlineLayout>
  );

  return (
    <Page mode="secondary">
      <BackButton
        onClick={() => {
          if (enterPasscode) {
            setEnterPasscode(false);
          } else {
            window.history.back();
          }
        }}
      />
      {theme === 'apple' ? (
        <>
          {isHighFeeNoticeVisible && highFeeNotice}
          {amount}
        </>
      ) : (
        <Section separator>
          {isHighFeeNoticeVisible && highFeeNotice}
          {amount}
        </Section>
      )}
      <Section
        separator
        material={{ descriptionLayout: 'outer' }}
        description={t('send_confirmation.description')}
      >
        <Cell.List>
          <NewDetailCell header={t('send_confirmation.address')}>
            <Mono>{address}</Mono>
          </NewDetailCell>
          <NewDetailCell header={t('send_confirmation.fee')}>
            ≈{' '}
            {printCryptoAmount({
              amount: fee.amount,
              currency: assetCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}{' '}
            {fee.fiat_amount > 0 && (
              <>
                (≈{' '}
                {printFiatAmount({
                  amount: fee.fiat_amount,
                  currency: fee.fiat_currency,
                  languageCode,
                })}
                )
              </>
            )}
          </NewDetailCell>
          <NewDetailCell header={t('send_confirmation.total')}>
            ≈{' '}
            {printCryptoAmount({
              amount: senderAmount.amount,
              currency: assetCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          </NewDetailCell>
          {networkName && (
            <NewDetailCell header={t('send_confirmation.network')}>
              {networkName}
            </NewDetailCell>
          )}
        </Cell.List>
      </Section>

      <Section separator>
        <NewDetailCell header={t('send_confirmation.balance_after')}>
          ≈{' '}
          {printCryptoAmount({
            amount: balanceAfter,
            currency: assetCurrency,
            languageCode,
            currencyDisplay: 'code',
          })}
        </NewDetailCell>
      </Section>
      {!enterPasscode && (
        <MainButton
          progress={confirming}
          onClick={handleConfirmClick}
          text={t('send_confirmation.submit').toLocaleUpperCase()}
        />
      )}
      {enterPasscode && <PasscodeVerify onSuccess={handleSubmit} />}
    </Page>
  );
};
