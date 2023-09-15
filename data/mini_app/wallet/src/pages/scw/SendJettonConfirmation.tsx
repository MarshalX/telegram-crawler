import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

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
import { emulateSendJettonAddress, sendJettonAddress } from 'utils/scw/jettons';
import { AVERAGE_JETTON_TRANSFER_FEE, convertToDecimal } from 'utils/scw/ton';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

const SendJettonConfirmation: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const snackbarContext = useContext(SnackbarContext);

  const { languageCode } = useAppSelector((state) => state.settings);

  const amount = Number(searchParams.get('amount'));
  const decimals = Number(searchParams.get('decimals'));
  const address = searchParams.get('address');
  const jettonSymbol = searchParams.get('jettonSymbol');
  const senderJettonAddress = searchParams.get('senderJettonAddress');

  const decimalAmount = convertToDecimal(amount, decimals);

  const [sending, setSending] = useState(false);

  const onSendClick = async () => {
    if (address && jettonSymbol && senderJettonAddress) {
      setSending(true);
      emulateSendJettonAddress(senderJettonAddress, amount, address)
        .then((emulateResp) => {
          sendJettonAddress(senderJettonAddress, amount, address)
            .then(() => {
              if (emulateResp && emulateResp.event) {
                dispatch(addPendingTransaction(emulateResp.event));
              }
              navigate(
                {
                  pathname: routePaths.SCW_SEND_SUCCESS,
                  search: createSearchParams({
                    assetCurrency: jettonSymbol,
                    address,
                    decimals: decimals.toString(),
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
        })
        .catch(() => {
          snackbarContext.showSnackbar({
            icon: 'warning',
            text: t('scw.confirm_modal.unable_to_simulate_transaction'),
          });
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  if (address && jettonSymbol) {
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
              isTONDomain(address) || isWeb3Domain(address)
                ? address
                : squashAddress(address)
            }
          />
        }
        value={printCryptoAmount({
          amount: decimalAmount,
          currency: jettonSymbol,
          languageCode,
        })}
        currency={jettonSymbol}
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
        <Section
          separator
          description={t('scw.send_confirmation.jetton_fee_hint')}
          material={{ descriptionLayout: 'outer' }}
        >
          <Cell.List>
            <NewDetailCell header={t('send_confirmation.address')}>
              <Mono>{address}</Mono>
            </NewDetailCell>
            <NewDetailCell header={t('send_confirmation.fee')}>
              ≈{' '}
              {printCryptoAmount({
                amount: AVERAGE_JETTON_TRANSFER_FEE,
                currency: FrontendCryptoCurrencyEnum.Ton,
                languageCode,
                currencyDisplay: 'code',
              })}
            </NewDetailCell>
          </Cell.List>
        </Section>
        <MainButton
          progress={sending}
          text={t('send_confirmation.submit').toLocaleUpperCase()}
          onClick={onSendClick}
        />
      </Page>
    );
  } else {
    return null; // TODO understand what to do in this case
  }
};

export default SendJettonConfirmation;
