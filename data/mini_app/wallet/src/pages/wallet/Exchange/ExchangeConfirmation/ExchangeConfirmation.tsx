import { resetTransactions } from 'query/wallet/transactions/useTransactions';
import { FC, Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Link,
  Navigate,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/wallet';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppSelector } from 'store';

import { setData } from 'reducers/transactionDetails/transactionDetailsSlice';
import { updatePermissions } from 'reducers/user/userSlice';

import { ExchangePreview } from 'containers/common/ExchangePreview/ExchangePreview';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, NewDetailCell } from 'components/Cells';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { refreshBalance } from 'utils/wallet/balance';

import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useTheme } from 'hooks/utils/useTheme';
import { useTimeout } from 'hooks/utils/useTimeout';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useExchangeContext } from '../Exchange';
import styles from './ExchangeConfirmation.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

export const ExchangeConfirmation: FC = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get('uid');
  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [confirming, setConfirming] = useState(false);
  const [transactionId, setTransactionId] = useState<number>();
  const { exchange, setExchange } = useExchangeContext();
  const [setTTLTimeout] = useTimeout();
  const [refreshing, setRefreshing] = useState(false);
  const { fiatCurrency, languageCode } = useAppSelector(
    (state) => state.settings,
  );
  const hasExchangeData = !!exchange && exchange.uid === exchangeId;

  useDidUpdate(() => {
    if (status === 'success') {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
  }, [status]);

  function getExchange(exchangeId: string) {
    return API.Exchange.getExchange(exchangeId, fiatCurrency)
      .then(({ data }) => {
        setExchange(data);
      })
      .catch(() => {
        window.history.back();
      });
  }

  useEffect(() => {
    if (exchangeId && !hasExchangeData) {
      getExchange(exchangeId);
    }
  }, [exchangeId, dispatch, fiatCurrency, hasExchangeData]);

  useEffect(() => {
    if (exchangeId && exchange?.ttl) {
      setTTLTimeout(() => {
        setRefreshing(true);
        getExchange(exchangeId).finally(() => {
          setRefreshing(false);
        });
      }, exchange.ttl * 1000);
    }
  }, [exchange?.ttl]);

  if (!exchangeId) {
    return <Navigate to={routePaths.EXCHANGE} replace />;
  } else if (exchange && exchange.uid === exchangeId) {
    return (
      <Page mode={status === 'pending' ? 'secondary' : 'primary'}>
        <BackButton
          onClick={() => {
            status === 'success'
              ? navigate(routePaths.MAIN, { replace: true })
              : navigate(-1);
          }}
        />
        {status === 'success' && (
          <PagePlaceholder
            media={
              <Suspense fallback={<BoomstickSVG />}>
                <BoomstickAnimation />
              </Suspense>
            }
            text={
              <Trans
                values={{
                  amount: printCryptoAmount({
                    amount: exchange.to_amount,
                    currency: exchange.to_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  }),
                }}
                i18nKey={'exchange.success_text'}
                t={t}
                components={[<b key="successText" />]}
              />
            }
            title={t('exchange.success_title')}
            bottom={
              <Link
                replace
                to={{
                  pathname: routePaths.TRANSACTION,
                  search: createSearchParams({
                    from: 'exchange',
                    transactionId: `${transactionId}`,
                  }).toString(),
                }}
              >
                {t('exchange.view_transaction')}
              </Link>
            }
          />
        )}
        {status === 'pending' && (
          <>
            <InlineLayout className={themeClassName('root')}>
              <ExchangePreview
                fromAmount={exchange.from_amount}
                toAmount={exchange.to_amount}
                fromCurrency={exchange.from_currency}
                toCurrency={exchange.to_currency}
                fromIcon={
                  <CurrencyLogo
                    style={{ width: 36, height: 36 }}
                    currency={exchange.from_currency}
                  />
                }
                toIcon={
                  <CurrencyLogo
                    style={{ width: 36, height: 36 }}
                    currency={exchange.to_currency}
                  />
                }
              />
            </InlineLayout>
            <Section title={t('exchange.details')} separator>
              <Cell.List>
                <NewDetailCell header={t('exchange.rate')}>
                  {printCryptoAmount({
                    amount: 1,
                    currency: exchange.from_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  })}{' '}
                  ≈{' '}
                  {printCryptoAmount({
                    amount: exchange.rate,
                    currency: exchange.to_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  })}
                </NewDetailCell>
                {typeof exchange.to_fiat_amount === 'number' &&
                  exchange.to_fiat_currency && (
                    <NewDetailCell header={t('exchange.fiat_equivalent')}>
                      ≈{' '}
                      {printFiatAmount({
                        amount: exchange.to_fiat_amount,
                        currency: exchange.to_fiat_currency,
                        currencyDisplay: 'code',
                        languageCode,
                      })}
                    </NewDetailCell>
                  )}
              </Cell.List>
            </Section>
            <Section>
              <Cell.List>
                <NewDetailCell
                  header={t('exchange.balance_after', {
                    currencyCode: exchange.from_currency,
                  })}
                >
                  {printCryptoAmount({
                    amount: exchange.from_balance_after,
                    currency: exchange.from_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  })}
                </NewDetailCell>
                <NewDetailCell
                  header={t('exchange.balance_after', {
                    currencyCode: exchange.to_currency,
                  })}
                >
                  {printCryptoAmount({
                    amount: exchange.to_balance_after,
                    currency: exchange.to_currency,
                    currencyDisplay: 'code',
                    languageCode,
                  })}
                </NewDetailCell>
              </Cell.List>
            </Section>
          </>
        )}
        <MainButton
          progress={confirming || refreshing}
          onClick={() => {
            if (status === 'success') {
              navigate(routePaths.MAIN, { replace: true });
            } else {
              setConfirming(true);
              API.Exchange.submitExchange(exchange.uid)
                .then((result) => {
                  setTransactionId(result.data.transaction_id);
                  return API.Transactions.getTransactionDetails(
                    result.data.transaction_id,
                  );
                })
                .then((result) => {
                  resetTransactions();
                  refreshBalance();
                  setStatus('success');
                  dispatch(setData(result.data));
                  return result;
                })
                .catch((error) => {
                  if (error.response.data.code === 'exchange_forbidden') {
                    dispatch(
                      updatePermissions({
                        can_exchange: false,
                      }),
                    );
                    snackbarContext.showSnackbar({
                      snackbarId: 'exchange',
                      before: <WarningSVG />,
                      text: t('common.feature_is_blocked'),
                      action: (
                        <a href={WALLET_SUPPORT_BOT_LINK}>
                          {t('common.contact_support')}
                        </a>
                      ),
                      actionPosition: 'bottom',
                    });
                  }
                })
                .finally(() => {
                  setConfirming(false);
                });
            }
          }}
          text={t(
            status === 'success' ? 'exchange.done' : 'exchange.confirm',
          ).toLocaleUpperCase()}
        />
      </Page>
    );
  } else {
    return null;
  }
};
