import BigNumber from 'bignumber.js';
import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import { FC, memo, useContext, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import {
  CryptoCurrency,
  CurrencyEnum,
  FrontendCryptoCurrencyEnum,
} from 'api/wallet/generated';
import API from 'api/wpay';
import {
  OrderPaymentDto,
  RestDataResponseInitiatePaymentStatusOrderPaymentDtoStatusEnum,
  RestResponseProceedPaymentStatusStatusEnum,
} from 'api/wpay/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { WALLET_PAY_WEBSITE_LINK, WALLET_SUPPORT_BOT_LINK } from 'config';

import { RootState } from 'store';

import {
  setOrderError,
  setOrderPayment,
  setOrderStatus,
} from 'reducers/wpay/wpaySlice';

import { Amount } from 'containers/common/Amount/Amount';

import { Cell } from 'components/Cells';
import NewDetailCell from 'components/Cells/NewDetailCell/NewDetailCell';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import InitialsAvatar from 'components/InitialsAvatar/InitialsAvatar';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard, isTelegramLink } from 'utils/common/common';
import {
  getCurrencyName,
  isFiat,
  printCryptoAmount,
  printFiatAmount,
} from 'utils/common/currency';
import { minus } from 'utils/common/math';
import { refreshBalance } from 'utils/wallet/balance';

import { useAsset } from 'hooks/common/useAsset';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useTheme } from 'hooks/utils/useTheme';
import { useTimeout } from 'hooks/utils/useTimeout';

import styles from './OrderPayment.module.scss';
import { WPAYOrderPaymentSkeleton } from './OrderPaymentSkeleton';
import { PaymentStatus } from './components/PaymentStatus/PaymentStatus';
import { ReactComponent as CryptoEquivalentSVG } from './crypto_equivalent.svg';
import { ReactComponent as DisclaimerChevronSVG } from './disclaimer_chevron.svg';
import { ReactComponent as FiatEquivalentSVG } from './fiat_equivalent.svg';
import { ReactComponent as NetworkFeeSVG } from './network_fee.svg';

const OrderPayment: FC = () => {
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [setCloseTimeout] = useTimeout();
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const orderId = searchParams.get('order_id');
  const {
    fetching: fetchingOrderPayment,
    entity: orderPayment,
    orderError,
    paymentCurrency,
  } = useSelector((state: RootState) => state.wpay);
  const { languageCode, fiatCurrency } = useSelector(
    (state: RootState) => state.settings,
  );
  const { permissions } = useSelector((state: RootState) => state.user);
  const { balance = 0 } = useAsset(paymentCurrency);
  const { featureFlags } = useSelector((state: RootState) => state.user);
  const [setPaymentTimeout, paymentTimeout] = useTimeout();
  const [setRefreshBalanceTimeout, refreshBalanceTimeout] = useTimeout();
  const [refreshingPrice, setRefreshingPrice] = useState(false);
  const { baseRate = 0 } = useBaseRate(paymentCurrency);

  const chatBotUsername =
    window.Telegram.WebApp.initDataUnsafe.receiver?.username ||
    window.Telegram.WebApp.initDataUnsafe.chat_bot_username;

  const [initPaymentStatus, setInitPaymentStatus] =
    useState<RestDataResponseInitiatePaymentStatusOrderPaymentDtoStatusEnum | null>(
      null,
    );
  const [paymentStatus, setPaymentStatus] =
    useState<RestResponseProceedPaymentStatusStatusEnum | null>(null);

  const cryptoEquivalent = orderPayment?.currentPayment?.paymentOptions.find(
    (option) => {
      return option.amount.currencyCode === paymentCurrency;
    },
  );

  const insufficientBalance =
    !!cryptoEquivalent && balance < Number(cryptoEquivalent.amount.amount);

  const mainButtonDisabled = refreshingPrice || paymentStatus === 'UNKNOWN';

  function refreshAssetsBalance(
    assetCurrency: FrontendCryptoCurrencyEnum,
    requiredAmount: number,
  ) {
    setRefreshBalanceTimeout(() => {
      refreshBalance(assetCurrency).then((assetBalance) => {
        if (assetBalance < requiredAmount) {
          refreshAssetsBalance(assetCurrency, requiredAmount);
        }
      });
    }, 2000);
  }

  async function pay() {
    if (orderId && orderPayment?.currentPayment?.id && cryptoEquivalent) {
      try {
        const response = await API.Payment.proceedPayment({
          orderId,
          paymentId: orderPayment.currentPayment.id,
          currencyCode: cryptoEquivalent.amount.currencyCode,
          telegramBotUsername: chatBotUsername,
        });
        const status = response.data.status;
        switch (status) {
          case 'UNKNOWN':
            setTimeout(pay, 2000);
            break;
          case 'ACCESS_DENIED':
          case 'FAILED':
          case 'PAYER_IS_NOT_ORDER_CUSTOMER':
          case 'TELEGRAM_BOT_USERNAME_MISMATCH':
            setPaymentStatus(status);
            dispatch(setOrderError(true));
            break;
          case 'EXPIRED':
            dispatch(setOrderStatus('EXPIRED'));
            break;
          case 'SUCCESS':
            setPaymentStatus(status);
        }
      } catch {
        setPaymentStatus('FAILED');
      }
    }
  }

  async function initiate() {
    if (orderId) {
      try {
        setRefreshingPrice(false);
        const response = await API.Payment.initiatePayment({
          orderId,
          telegramBotUsername: chatBotUsername,
        });
        switch (response.data.status) {
          case 'SUCCESS':
            if (response.data.data) {
              dispatch(setOrderPayment(response.data.data));
              if (response.data.data.currentPayment) {
                const ttl =
                  new Date(
                    response.data.data.currentPayment.paymentDueDateTime,
                  ).getTime() -
                  new Date(
                    response.data.data.currentPayment.createdDateTime,
                  ).getTime();
                setPaymentTimeout(() => {
                  setRefreshingPrice(true);
                  initiate();
                }, ttl);
              }
            } else {
              setInitPaymentStatus(response.data.status);
              dispatch(setOrderError(true));
            }
            break;
          case 'NOT_ACTIVE_ORDER':
            if (response.data.data) {
              dispatch(setOrderPayment(response.data.data));
            } else {
              setInitPaymentStatus(response.data.status);
              dispatch(setOrderError(true));
            }
            break;
          case 'ACCESS_DENIED':
          case 'PAYER_IS_NOT_ORDER_CUSTOMER':
          case 'TELEGRAM_BOT_USERNAME_MISMATCH':
            setInitPaymentStatus(response.data.status);
            dispatch(setOrderError(true));
            break;
        }
      } catch {
        dispatch(setOrderError(true));
      }
    }
  }

  useEffect(() => {
    clearTimeout(refreshBalanceTimeout);
    if (cryptoEquivalent && balance < Number(cryptoEquivalent.amount.amount)) {
      const { currencyCode, amount } = cryptoEquivalent.amount;
      refreshAssetsBalance(
        currencyCode as FrontendCryptoCurrencyEnum,
        minus(Number(amount), balance),
      );
    }
  }, [cryptoEquivalent, balance]);

  useEffect(() => {
    if (paymentStatus || orderError) {
      clearTimeout(paymentTimeout);
    }
  }, [orderError, paymentStatus]);

  useDidUpdate(() => {
    if (paymentStatus === 'SUCCESS') {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      setCloseTimeout(() => {
        if (orderPayment?.returnUrl) {
          isTelegramLink(orderPayment.returnUrl)
            ? window.Telegram.WebApp.openTelegramLink(orderPayment.returnUrl)
            : window.Telegram.WebApp.openLink(orderPayment.returnUrl);
        }
        window.Telegram.WebApp.close();
      }, 1500);
    }
  }, [paymentStatus]);

  useEffect(() => {
    initiate();
  }, [dispatch, orderId]);

  const onPayClick = async () => {
    if (!permissions.canUserWpayAsPayer) {
      snackbarContext.showSnackbar({
        onShow: () =>
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('error'),
        showDuration: 2000,
        snackbarId: 'feature_is_blocked',
        text: t('common.feature_is_blocked'),
        action: (
          <button
            onClick={() => {
              window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK);
            }}
          >
            {t('common.contact')}
          </button>
        ),
      });
    } else if (insufficientBalance) {
      navigate({
        pathname: routePaths.WPAY_CHOOSE_DEPOSIT_TYPE,
        search: createSearchParams({
          returnPath: window.location.pathname + window.location.search,
          assetCurrency: paymentCurrency,
          amount: BigNumber(cryptoEquivalent.amount.amount)
            .minus(balance)
            .toString(),
        }).toString(),
      });
    } else if (paymentStatus === 'SUCCESS') {
      window.Telegram.WebApp.close();
    } else if (paymentStatus !== 'UNKNOWN' && cryptoEquivalent && orderId) {
      setPaymentStatus('UNKNOWN');
      const balance = await refreshBalance(paymentCurrency);
      if (balance >= Number(cryptoEquivalent.amount.amount)) {
        pay();
      } else {
        setPaymentStatus(null);
      }
    }
  };

  function renderInactiveTitle(
    status: Omit<OrderPaymentDto['status'], 'ACTIVE'>,
    orderNumber: string,
  ) {
    const title = (() => {
      switch (status) {
        case 'PAID':
          return 'wpay.paid_title';
        case 'CANCELLED':
          return 'wpay.canceled_title';
        case 'EXPIRED':
          return 'wpay.expired_title';
      }
    })();

    return (
      <Trans
        values={{
          order_id: orderNumber,
        }}
        i18nKey={title}
        t={t}
        components={[
          <Mono
            onClick={() => {
              copyToClipboard(orderNumber).then(() => {
                snackbarContext.showSnackbar({
                  onShow: () =>
                    window.Telegram.WebApp.HapticFeedback.notificationOccurred(
                      'success',
                    ),
                  showDuration: 2000,
                  snackbarId: 'order_id_copied',
                  text: t('common.copied_to_clipboard'),
                });
              });
            }}
            className={themeClassName('orderId')}
            key="span"
          />,
        ]}
      />
    );
  }

  function renderOrderPayment(orderPayment: OrderPaymentDto) {
    const { amount, storeName, description, storeId } = orderPayment;

    if (!orderId) {
      return <Navigate to={routePaths.MAIN} replace />;
    } else if (orderPayment.status !== 'ACTIVE') {
      return (
        <PagePlaceholder
          title={renderInactiveTitle(orderPayment.status, orderPayment.number)}
          text={
            <Trans
              i18nKey="wpay.contact_seller"
              t={t}
              components={[<span key="span" />]}
            />
          }
          bottom={
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.Telegram.WebApp.close();
              }}
            >
              {t('wpay.back')}
            </a>
          }
        />
      );
    } else if (cryptoEquivalent) {
      const equivalent = isFiat(amount.currencyCode as CurrencyEnum)
        ? Number(cryptoEquivalent.amount.amount)
        : Number(cryptoEquivalent.amount.amount) * baseRate;

      const hasMultiplePaymentOptions =
        orderPayment.currentPayment?.paymentOptions &&
        orderPayment.currentPayment.paymentOptions.length > 1;

      return (
        <>
          <Amount
            fill={theme === 'apple' ? 'primary' : 'secondary'}
            refreshing={refreshingPrice}
            size={theme === 'apple' ? 'small' : 'medium'}
            value={printCryptoAmount({
              amount: amount.amount,
              languageCode,
              currency: amount.currencyCode as FrontendCryptoCurrencyEnum,
            })}
            currency={amount.currencyCode}
            top={
              <div className={themeClassName('total')}>{t('wpay.total')}</div>
            }
          />
          <div
            className={themeClassName('details')}
            data-testid="tgcrawl"
          >
            <div className={themeClassName('detail')}>
              <NewDetailCell
                before={
                  <Cell.Part type="avatar">
                    <InitialsAvatar name={storeName} userId={Number(storeId)} />
                  </Cell.Part>
                }
                header={storeName}
              >
                {description || storeName}
              </NewDetailCell>
            </div>
            {equivalent && (
              <div className={themeClassName('detail')}>
                {isFiat(amount.currencyCode as CurrencyEnum) ? (
                  <NewDetailCell
                    before={
                      <Cell.Part type="avatar">
                        <CryptoEquivalentSVG />
                      </Cell.Part>
                    }
                    header={t('wpay.crypto_equivalent')}
                  >
                    ≈{' '}
                    {printCryptoAmount({
                      amount: equivalent,
                      currency: paymentCurrency,
                      languageCode,
                      currencyDisplay: 'code',
                    })}
                  </NewDetailCell>
                ) : (
                  <NewDetailCell
                    before={
                      <Cell.Part type="avatar">
                        <FiatEquivalentSVG />
                      </Cell.Part>
                    }
                    header={t('wpay.fiat_equivalent')}
                  >
                    ≈{' '}
                    {printFiatAmount({
                      amount: equivalent,
                      currency: fiatCurrency,
                      languageCode,
                      currencyDisplay: 'code',
                    })}
                  </NewDetailCell>
                )}
              </div>
            )}
            <div className={themeClassName('detail')}>
              <NewDetailCell
                before={
                  <Cell.Part type="avatar">
                    <NetworkFeeSVG />
                  </Cell.Part>
                }
                header={t('wpay.network_fee')}
              >
                {printCryptoAmount({
                  amount: 0,
                  currency: paymentCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })}
              </NewDetailCell>
            </div>
          </div>
          <div className={themeClassName('disclaimer')}>
            <a target="_blank" rel="noreferrer" href={WALLET_PAY_WEBSITE_LINK}>
              <span>{t('wpay.disclaimer')}</span>
              <DisclaimerChevronSVG />
            </a>
          </div>
          <div className={themeClassName('balance')}>
            {(paymentStatus === 'UNKNOWN' ||
              paymentStatus === 'SUCCESS' ||
              paymentStatus === 'FAILED') && (
              <PaymentStatus
                className={styles.paymentStatus}
                status={paymentStatus}
              />
            )}
            <NewDetailCell
              bold
              before={
                <Cell.Part type="avatar">
                  <CurrencyLogo
                    currency={paymentCurrency}
                    className={styles.balanceIcon}
                  />
                </Cell.Part>
              }
              onClick={
                hasMultiplePaymentOptions
                  ? () => {
                      navigate(routePaths.WPAY_CHOOSE_PAYMENT_ASSET);
                    }
                  : undefined
              }
              chevron={hasMultiplePaymentOptions}
              header={
                insufficientBalance ? t('wpay.you_pay_with') : t('wpay.balance')
              }
            >
              {insufficientBalance
                ? getCurrencyName({
                    currency: paymentCurrency,
                    t,
                  })
                : printCryptoAmount({
                    amount: balance,
                    currency: paymentCurrency,
                    languageCode,
                    currencyDisplay: 'code',
                  })}
            </NewDetailCell>
          </div>
          <MainButton
            data-testid="tgcrawl"
            disabled={mainButtonDisabled}
            onClick={onPayClick}
            text={renderButtonText()}
            color={
              mainButtonDisabled
                ? customPalette[theme][colorScheme].button_disabled_color
                : window.Telegram.WebApp.themeParams.button_color
            }
            textColor={
              mainButtonDisabled
                ? customPalette[theme][colorScheme].button_disabled_text_color
                : window.Telegram.WebApp.themeParams.button_text_color
            }
          />
        </>
      );
    }
  }

  function renderButtonText() {
    if (insufficientBalance) {
      return t('common.continue');
    } else if (paymentStatus === 'SUCCESS') {
      return t('wpay.done');
    } else if (paymentStatus === 'FAILED') {
      return t('wpay.try_again');
    }
    return t('wpay.pay', {
      value: cryptoEquivalent
        ? printCryptoAmount({
            amount: Number(cryptoEquivalent.amount.amount),
            currency: cryptoEquivalent.amount.currencyCode as CryptoCurrency,
            languageCode,
            currencyDisplay: 'code',
          })
        : paymentCurrency,
    });
  }

  function renderErrorTitle() {
    const getTitleByStatus = (status: string) => {
      switch (status) {
        case 'ACCESS_DENIED':
          return t('wpay.access_denied_title');
        case 'PAYER_IS_NOT_ORDER_CUSTOMER':
          return t('wpay.payer_is_not_order_customer_title');
        case 'TELEGRAM_BOT_USERNAME_MISMATCH':
          return t('wpay.telegram_bot_username_mismatch_title');
        default:
          return t('wpay.generic_error_title');
      }
    };

    if (paymentStatus) {
      return getTitleByStatus(paymentStatus);
    } else if (initPaymentStatus) {
      return getTitleByStatus(initPaymentStatus);
    } else {
      return t('wpay.generic_error_title');
    }
  }

  if (!featureFlags.wpayAsPayer) {
    return <Navigate to={routePaths.MAIN} replace />;
  } else {
    return (
      <Page mode={theme === 'apple' ? 'secondary' : 'primary'}>
        <Skeleton
          skeleton={<WPAYOrderPaymentSkeleton />}
          skeletonShown={fetchingOrderPayment}
        >
          {orderError || !orderPayment ? (
            <PagePlaceholder
              title={renderErrorTitle()}
              bottom={
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.Telegram.WebApp.close();
                  }}
                >
                  {t('wpay.back')}
                </a>
              }
            />
          ) : (
            renderOrderPayment(orderPayment)
          )}
        </Skeleton>
      </Page>
    );
  }
};

export default memo(OrderPayment);
