import classNames from 'classnames';
import { LottieRefCurrentProps } from 'lottie-react';
import {
  FC,
  Suspense,
  lazy,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import API from 'api/wallet';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { CRYPTO_FRACTION, WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppSelector } from 'store';

import { updatePermissions } from 'reducers/user/userSlice';

import { CurrencySelect } from 'pages/wallet/Exchange/components/CurrencySelect/CurrencySelect';

import Form from 'containers/common/Form/Form';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { BackButton } from 'components/BackButton/BackButton';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { printNumber } from 'utils/common/currency';

import { useAsset } from 'hooks/common/useAsset';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useLocaleStrToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import { useTheme } from 'hooks/utils/useTheme';
import { useTimeout } from 'hooks/utils/useTimeout';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useBaseRate } from '../../../../query/wallet/rates/useBaseRate';
import { useExchangeRate } from '../../../../query/wallet/rates/useExchangeRate';
import { useExchangeContext } from '../Exchange';
import styles from './ExchangeForm.module.scss';

const InvertButtonAnimation = lazy(
  () =>
    import('components/animations/InvertButtonAnimation/InvertButtonAnimation'),
);

const bounceAnimation = [
  {
    transform: 'scale(1)',
  },
  {
    transform: 'scale(1.1)',
  },
  {
    transform: 'scale(0.95)',
  },
  {
    transform: 'scale(1)',
  },
];

const ExchangePairMap: Record<
  FrontendCryptoCurrencyEnum,
  FrontendCryptoCurrencyEnum
> = {
  [FrontendCryptoCurrencyEnum.Btc]: FrontendCryptoCurrencyEnum.Usdt,
  [FrontendCryptoCurrencyEnum.Usdt]: FrontendCryptoCurrencyEnum.Ton,
  [FrontendCryptoCurrencyEnum.Ton]: FrontendCryptoCurrencyEnum.Usdt,
};

export const ExchangeForm: FC = () => {
  const { setExchange } = useExchangeContext();

  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);
  const { languageCode, fiatCurrency } = useAppSelector(
    (state) => state.settings,
  );
  const { assets } = useAppSelector((state) => state.wallet);

  const payCurrency =
    (searchParams.get('payCurrency') as
      | FrontendCryptoCurrencyEnum
      | undefined) || FrontendCryptoCurrencyEnum.Ton;
  const receiveCurrency =
    (searchParams.get('receiveCurrency') as
      | FrontendCryptoCurrencyEnum
      | undefined) || ExchangePairMap[payCurrency];
  const exchangeMode = searchParams.get('exchangeMode') || '';
  const payValue = Number(searchParams.get('payValue')) || 0;
  const receiveValue = Number(searchParams.get('receiveValue')) || 0;

  const payValueFormatted = useRef(
    payValue
      ? printNumber({
          value: payValue,
          languageCode,
          options: {
            maximumFractionDigits: CRYPTO_FRACTION[payCurrency],
          },
        })
      : '',
  );
  const formatPayValueToNum = useLocaleStrToNumFormatter(
    payValueFormatted.current,
  );
  const receiveValueFormatted = useRef(
    receiveValue
      ? printNumber({
          value: receiveValue,
          languageCode,
          options: {
            maximumFractionDigits: CRYPTO_FRACTION[receiveCurrency],
          },
        })
      : '',
  );
  const formatReceiveValueToNum = useLocaleStrToNumFormatter(
    receiveValueFormatted.current,
  );

  const [creating, setCreating] = useState(false);
  const [converting, setConverting] = useState(false);
  const invertRef = useRef<LottieRefCurrentProps>(null);
  const payInputRef = useRef<HTMLInputElement>(null);
  const receiveInputRef = useRef<HTMLInputElement>(null);
  const [setConvertTimeout, convertTimeout] = useTimeout();
  const convertAbortController = useRef<AbortController>();

  const payCurrencyLogoRef = useRef<SVGSVGElement>(null);
  const receiveCurrencyLogoRef = useRef<SVGSVGElement>(null);
  const resolvedExchangeMode: 'pay' | 'receive' =
    exchangeMode === 'pay' || exchangeMode === 'receive' ? exchangeMode : 'pay';

  const { balance: payBalance } = useAsset(payCurrency);
  const [{ min, max }, setLimits] = useState<{ min: number; max?: number }>({
    min: 0,
    max: payBalance,
  });

  const [activeInput, setActiveInput] = useState<'pay' | 'receive'>(
    resolvedExchangeMode,
  );

  const { exchangeRate } = useExchangeRate(
    payCurrency,
    receiveCurrency,
    activeInput,
  );

  const balanceOverflow = payValue > payBalance;
  const minOverflow = payValue < min;
  const maxOverflow = typeof max === 'number' && payValue > max;

  const hasError =
    payValue > 0 && (balanceOverflow || minOverflow || maxOverflow);
  const isFormEmpty = receiveValue === 0 && payValue === 0;

  const buttonDisabled = hasError || !payValue || !receiveValue;
  const { baseRate: fiatRate } = useBaseRate(
    activeInput === 'pay' ? payCurrency : receiveCurrency,
  );

  const updateQueryString = (value: Record<string, string | undefined>) => {
    const queryString = new URLSearchParams(location.search);

    Object.entries(value)
      .filter(([, value]) => {
        return value !== undefined;
      })
      .forEach(([key, value]) => {
        queryString.set(key, value as string);
      });

    setSearchParams(queryString, { replace: true });
  };

  function setPayValue(value: string | number, updateExchangeMode = false) {
    value =
      typeof value === 'string'
        ? value
        : printNumber({
            value,
            languageCode,
            options: {
              maximumFractionDigits: CRYPTO_FRACTION[payCurrency],
            },
          });
    const [valueFormatted, valueNumber] = formatPayValueToNum(value, {
      locale: languageCode,
      isAllowed: (value: number) => value <= 999_999.999999999 && value >= 0,
      maximumFractionDigits: CRYPTO_FRACTION[payCurrency],
    });
    if (valueFormatted !== null && valueNumber !== null) {
      payValueFormatted.current = valueFormatted;
      updateQueryString({
        payValue: `${valueNumber}`,
        exchangeMode: updateExchangeMode ? 'pay' : undefined,
      });
    }
  }

  function setReceiveValue(value: string | number, updateExchangeMode = false) {
    value =
      typeof value === 'string'
        ? value
        : printNumber({
            value,
            languageCode,
            options: {
              maximumFractionDigits: CRYPTO_FRACTION[receiveCurrency],
            },
          });
    const [valueFormatted, valueNumber] = formatReceiveValueToNum(value, {
      locale: languageCode,
      isAllowed: (value: number) => value <= 999_999.999999999 && value >= 0,
      maximumFractionDigits: CRYPTO_FRACTION[receiveCurrency],
    });
    if (valueFormatted !== null && valueNumber !== null) {
      receiveValueFormatted.current = valueFormatted;
      updateQueryString({
        receiveValue: `${valueNumber}`,
        exchangeMode: updateExchangeMode ? 'receive' : undefined,
      });
    }
  }

  const restoreFocus = (exchangeMode: 'pay' | 'receive') => {
    if (exchangeMode === 'pay') {
      payInputRef.current?.focus();
    } else {
      receiveInputRef.current?.focus();
    }
  };

  useDidUpdate(() => {
    // We reformat value to correct fraction
    // For instance, user typed 2.12345678 BTC and then switch currency to USDT where max fraction digits is 6.
    payValue > 0 && setPayValue(payValue);
    if (payCurrencyLogoRef.current) {
      payCurrencyLogoRef.current.animate(bounceAnimation, 350).play();
    }
  }, [payCurrency]);

  useDidUpdate(() => {
    // We reformat value to correct fraction
    // For instance, user typed 2.12345678 BTC and then switch currency to USDT where max fraction digits is 6.
    receiveValue > 0 && setReceiveValue(receiveValue);
    if (receiveCurrencyLogoRef.current) {
      receiveCurrencyLogoRef.current.animate(bounceAnimation, 350).play();
    }
  }, [receiveCurrency]);

  useEffect(() => {
    if (resolvedExchangeMode === 'pay' && payValue) {
      convertAbortController.current?.abort();
      setConverting(true);
      setConvertTimeout(() => {
        convertAbortController.current = new AbortController();
        API.Exchange.convert(
          {
            from_amount: payValue,
            to_amount: undefined,
            from_currency: payCurrency,
            to_currency: receiveCurrency,
          },
          { signal: convertAbortController.current?.signal },
        )
          .then((result) => {
            setReceiveValue(result.data.to_amount);
          })
          .finally(() => {
            setConverting(false);
          });
      }, 500);
    }
  }, [payValue, resolvedExchangeMode, payCurrency, receiveCurrency]);

  useEffect(() => {
    if (resolvedExchangeMode === 'receive' && receiveValue) {
      convertAbortController.current?.abort();
      setConverting(true);
      setConvertTimeout(() => {
        convertAbortController.current = new AbortController();
        API.Exchange.convert(
          {
            from_amount: undefined,
            to_amount: receiveValue,
            from_currency: payCurrency,
            to_currency: receiveCurrency,
          },
          { signal: convertAbortController.current?.signal },
        )
          .then((result) => {
            setPayValue(result.data.from_amount);
          })
          .finally(() => {
            setConverting(false);
          });
      }, 500);
    }
  }, [receiveValue, resolvedExchangeMode, payCurrency, receiveCurrency]);

  useEffect(() => {
    API.Exchange.getAmountInterval({
      from_currency: payCurrency,
      to_currency: receiveCurrency,
    }).then((result) => {
      setLimits({
        min: result.data.amount_min,
        max: result.data.amount_max,
      });
    });
  }, [payCurrency, receiveCurrency]);

  useDidUpdate(() => {
    if (payValue === 0) {
      clearTimeout(convertTimeout);
      convertAbortController.current?.abort();
      setConverting(false);
      if (receiveValue > 0) {
        setReceiveValue('');
      }
    }
  }, [payValue]);

  useDidUpdate(() => {
    if (receiveValue === 0) {
      clearTimeout(convertTimeout);
      convertAbortController.current?.abort();
      setConverting(false);
      if (payValue > 0) {
        setPayValue('');
      }
    }
  }, [receiveValue]);

  useEffect(() => {
    return () => {
      convertAbortController.current?.abort();
    };
  }, []);

  const printPayBottom = () => {
    if (hasError) {
      if (balanceOverflow) {
        return (
          <span>
            {t('exchange.not_enough_balance')}
            {payBalance > 0 && (
              <a
                onClick={(e) => {
                  setPayValue(payBalance, true);
                  restoreFocus('pay');
                  e.preventDefault();
                }}
                href="#"
              >
                &nbsp;{t('exchange.not_enough_balance_max')}
              </a>
            )}
          </span>
        );
      } else if (minOverflow) {
        return t('exchange.invalid_min', {
          value: printCryptoAmount({
            amount: min,
            languageCode,
            currency: payCurrency,
            currencyDisplay: 'code',
          }),
        });
      } else if (maxOverflow) {
        return t('exchange.invalid_max', {
          value: printCryptoAmount({
            amount: max,
            languageCode,
            currency: payCurrency,
            currencyDisplay: 'code',
          }),
        });
      }
    } else if (payValue === 0 && exchangeRate) {
      return (
        <>
          <span>
            {printCryptoAmount({
              amount: 1,
              currency: payCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          </span>
          &nbsp;≈&nbsp;
          <span>
            {printCryptoAmount({
              amount: exchangeRate,
              currency: receiveCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          </span>
        </>
      );
    } else if (fiatRate && payValue > 0) {
      return (
        <>
          ≈&nbsp;
          <span>
            {printFiatAmount({
              amount: fiatRate * payValue,
              currency: fiatCurrency,
              languageCode,
            })}
          </span>
        </>
      );
    }
  };

  const printReceiveBottom = () => {
    if (receiveValue === 0 && exchangeRate) {
      return (
        <>
          <span>
            {printCryptoAmount({
              amount: 1,
              currency: receiveCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          </span>
          &nbsp;≈&nbsp;
          <span>
            {printCryptoAmount({
              amount: exchangeRate,
              currency: payCurrency,
              languageCode,
              currencyDisplay: 'code',
            })}
          </span>
        </>
      );
    } else if (fiatRate && receiveValue > 0) {
      return (
        <>
          ≈&nbsp;
          <span>
            {printFiatAmount({
              amount: fiatRate * receiveValue,
              currency: fiatCurrency,
              languageCode,
            })}
          </span>
        </>
      );
    }
  };

  return (
    <Page>
      <BackButton />
      <div className={styles.root}>
        <Form
          fill="primary"
          refreshing={resolvedExchangeMode === 'receive' && converting}
          onFocus={() => {
            setActiveInput('pay');
          }}
          align="space-between"
          autoFocus={resolvedExchangeMode === 'pay'}
          ref={payInputRef}
          value={payValueFormatted.current}
          hasError={hasError}
          currency={
            assets.length > 2 ? (
              <CurrencySelect
                value={payCurrency}
                onChange={(value) => {
                  setLimits({
                    min: 0,
                    max: undefined,
                  });
                  updateQueryString({
                    payCurrency: value,
                    receiveCurrency:
                      value === receiveCurrency ? payCurrency : receiveCurrency,
                    exchangeMode: isFormEmpty ? 'pay' : undefined,
                  });
                  restoreFocus(isFormEmpty ? 'pay' : activeInput);
                }}
              />
            ) : (
              payCurrency
            )
          }
          onChange={(value) => {
            setPayValue(value, true);
          }}
          top={
            <div className={themeClassName('payTop')}>
              <OperationInfo
                avatar={
                  <CurrencyLogo
                    ref={payCurrencyLogoRef}
                    style={{ width: 32, height: 32 }}
                    currency={payCurrency}
                  />
                }
                operation={t('exchange.you_pay')}
              />

              <a
                href="#"
                className={styles.max}
                onClick={(e) => {
                  setPayValue(payBalance || '', true);
                  restoreFocus('pay');
                  e.preventDefault();
                }}
              >
                <Trans
                  values={{
                    amount: printCryptoAmount({
                      amount: payBalance,
                      currency: payCurrency,
                      currencyDisplay: 'code',
                      languageCode,
                    }),
                  }}
                  i18nKey="exchange.max"
                  t={t}
                  components={[
                    <span
                      key="maxAmount"
                      className={themeClassName('maxAmount')}
                    />,
                  ]}
                />
              </a>
            </div>
          }
          bottom={
            <div
              className={classNames(
                themeClassName('bottom'),
                converting && !hasError && styles.fetching,
              )}
            >
              {(activeInput === 'pay' || hasError) && printPayBottom()}
            </div>
          }
        />
        <div className={themeClassName('separator')}>
          <div className={styles.invert}>
            <Suspense fallback={<div className={styles.invertFallback} />}>
              <InvertButtonAnimation
                lottieRef={invertRef}
                onClick={() => {
                  invertRef.current?.goToAndPlay(0);
                  window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                  setLimits({
                    min: 0,
                    max: undefined,
                  });
                  updateQueryString({
                    receiveCurrency: payCurrency,
                    payCurrency: receiveCurrency,
                  });
                  restoreFocus(activeInput);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Form
          fill="primary"
          refreshing={resolvedExchangeMode === 'pay' && converting}
          onFocus={() => {
            setActiveInput('receive');
          }}
          autoFocus={resolvedExchangeMode === 'receive'}
          value={receiveValueFormatted.current}
          ref={receiveInputRef}
          align="space-between"
          currency={
            assets.length > 2 ? (
              <CurrencySelect
                value={receiveCurrency}
                onChange={(value) => {
                  setLimits({
                    min: 0,
                    max: undefined,
                  });
                  updateQueryString({
                    receiveCurrency: value,
                    payCurrency:
                      value === payCurrency ? receiveCurrency : payCurrency,
                    exchangeMode: isFormEmpty ? 'receive' : undefined,
                  });
                  restoreFocus(isFormEmpty ? 'receive' : activeInput);
                }}
              />
            ) : (
              receiveCurrency
            )
          }
          onChange={(value) => {
            setReceiveValue(value, true);
          }}
          top={
            <OperationInfo
              avatar={
                <CurrencyLogo
                  ref={receiveCurrencyLogoRef}
                  style={{ width: 32, height: 32 }}
                  currency={receiveCurrency}
                />
              }
              operation={t('exchange.you_receive')}
            />
          }
          bottom={
            <div className={themeClassName('bottom')}>
              {activeInput === 'receive' && printReceiveBottom()}
            </div>
          }
        />
      </div>
      <MainButton
        disabled={buttonDisabled}
        color={
          buttonDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : window.Telegram.WebApp.themeParams.button_color
        }
        textColor={
          buttonDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : window.Telegram.WebApp.themeParams.button_text_color
        }
        progress={creating || converting}
        text={t('exchange.review').toLocaleUpperCase()}
        onClick={() => {
          setCreating(true);
          API.Exchange.createExchange({
            from_amount: payValue,
            from_currency: payCurrency,
            to_currency: receiveCurrency,
            local_currency: fiatCurrency,
          })
            .then((result) => {
              setExchange(result.data);
              navigate(
                `${routePaths.EXCHANGE_CONFIRMATION}?uid=${result.data.uid}`,
              );
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
              setCreating(false);
            });
        }}
      />
    </Page>
  );
};
