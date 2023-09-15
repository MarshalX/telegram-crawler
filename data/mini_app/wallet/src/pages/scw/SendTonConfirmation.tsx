import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import TonWeb from 'tonweb';

import { AccountEvent } from 'api/tonapi/generated';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { addPendingTransaction } from 'reducers/scw/scwSlice';

import { Amount } from 'containers/common/Amount/Amount';
import OperationIcon from 'containers/common/OperationIcon/OperationIcon';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, NewDetailCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printCryptoAmount } from 'utils/common/currency';
import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import {
  MAXIMUM_DECIMAL_PRECISION,
  convertToDecimal,
  emulateSendTonAddress,
  sendTonAddress,
} from 'utils/scw/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

const SendTonConfirmation: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const snackbarContext = useContext(SnackbarContext);

  const { languageCode } = useAppSelector((state) => state.settings);
  const { privateKey } = useAppSelector((state) => state.scw);

  const amount = Number(searchParams.get('amount'));
  const receiverAddress = searchParams.get('address');
  const assetCurrency = FrontendCryptoCurrencyEnum.Ton;

  const decimalAmount = convertToDecimal(amount);

  const [sending, setSending] = useState(false);
  const [emulating, setEmulating] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState<number>();
  const [emulatedEvent, setEmulatedEvent] = useState<AccountEvent>();
  const [emulationError, setEmuationError] = useState(false);

  const hasFee = estimatedFee !== undefined;

  const tryEmulate = () => {
    if (receiverAddress) {
      setEmulating(true);
      emulateSendTonAddress(
        TonWeb.utils.toNano(decimalAmount.toFixed(MAXIMUM_DECIMAL_PRECISION)),
        receiverAddress,
      )
        .then((result) => {
          setEmulatedEvent(result.event);
          setEstimatedFee(result.estimateFee);
        })
        .catch(() => {
          setEmuationError(true);
          snackbarContext.showSnackbar({
            icon: 'warning',
            text: t('scw.confirm_modal.unable_to_simulate_transaction'),
          });
        })
        .finally(() => {
          setEmulating(false);
        });
    }
  };

  useEffect(() => {
    tryEmulate();
  }, [receiverAddress, decimalAmount, privateKey]);

  const onSendClick = async () => {
    if (receiverAddress && assetCurrency) {
      setSending(true);
      sendTonAddress(
        TonWeb.utils.toNano(decimalAmount.toFixed(MAXIMUM_DECIMAL_PRECISION)),
        receiverAddress,
      )
        .then(() => {
          if (emulatedEvent) {
            dispatch(addPendingTransaction(emulatedEvent));
          }
          navigate(
            {
              pathname: routePaths.SCW_SEND_SUCCESS,
              search: createSearchParams({
                assetCurrency,
                address: receiverAddress,
                amount: amount.toString(),
              }).toString(),
            },
            { replace: true },
          );
        })
        .catch(() => {
          snackbarContext.showSnackbar({
            icon: 'warning',
            text: t('scw.failed_to_send_transaction'),
          });
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  if (receiverAddress && assetCurrency) {
    const amountElement = (
      <Amount
        top={
          <OperationInfo
            avatar={
              <OperationIcon
                gateway="withdraw_onchain"
                size={theme === 'apple' ? 32 : 24}
              />
            }
            operation={t('send.operation')}
            merchant={
              isTONDomain(receiverAddress) || isWeb3Domain(receiverAddress)
                ? receiverAddress
                : squashAddress(receiverAddress)
            }
          />
        }
        value={printCryptoAmount({
          amount: decimalAmount,
          currency: assetCurrency,
          languageCode,
        })}
        currency={assetCurrency}
      />
    );

    return (
      <Page mode="secondary">
        <BackButton />
        {theme === 'apple' ? (
          amountElement
        ) : (
          <Section separator>{amountElement}</Section>
        )}
        <Section separator>
          <Cell.List>
            <NewDetailCell header={t('send_confirmation.address')}>
              <Mono>{receiverAddress}</Mono>
            </NewDetailCell>
            {!emulationError && (
              <NewDetailCell
                header={t('send_confirmation.fee')}
                fetching={!estimatedFee}
              >
                {estimatedFee && (
                  <>
                    ≈{' '}
                    {printCryptoAmount({
                      amount: convertToDecimal(estimatedFee),
                      currency: assetCurrency,
                      languageCode,
                      currencyDisplay: 'code',
                    })}
                  </>
                )}
              </NewDetailCell>
            )}
            {!emulationError && (
              <NewDetailCell
                header={t('send_confirmation.total')}
                fetching={!estimatedFee}
              >
                {estimatedFee && (
                  <>
                    ≈{' '}
                    {printCryptoAmount({
                      amount: convertToDecimal(amount + estimatedFee),
                      currency: assetCurrency,
                      languageCode,
                      currencyDisplay: 'code',
                    })}
                  </>
                )}
              </NewDetailCell>
            )}
            {emulationError && (
              <NewDetailCell header={t('scw.tx.status')}>
                {t('scw.confirm_modal.unable_to_simulate_transaction')}
              </NewDetailCell>
            )}
          </Cell.List>
        </Section>
        <MainButton
          progress={emulating || sending}
          text={t(
            hasFee
              ? 'send_confirmation.submit'
              : 'scw.confirm_modal.simulate_transaction',
          ).toLocaleUpperCase()}
          onClick={hasFee ? onSendClick : tryEmulate}
        />
      </Page>
    );
  } else {
    return null; // TODO understand what to do in this case
  }
};

export default SendTonConfirmation;
