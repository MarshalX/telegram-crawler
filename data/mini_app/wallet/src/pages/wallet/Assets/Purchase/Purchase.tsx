import classNames from 'classnames';
import { LottieRefCurrentProps } from 'lottie-react';
import { usePurchaseSettings } from 'query/wallet/purchase';
import { useBuyRate } from 'query/wallet/rates/useBuyRate';
import { resetTransactions } from 'query/wallet/transactions/useTransactions';
import { useLastUsedPaymentCurrencies } from 'query/wallet/user';
import {
  FC,
  Suspense,
  lazy,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import API from 'api/wallet';
import {
  CurrencyEnum,
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
  PaymentMethodEnum,
} from 'api/wallet/generated';

import { InvoiceStatus } from 'types/webApp';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import {
  CRYPTO_FRACTION,
  DEFAULT_FIAT_FRACTION,
  TELEGRAM_UPDATE_LINK,
} from 'config';

import { useAppSelector } from 'store';

import { updateKyc } from 'reducers/kyc/kycSlice';
import { createPurchase } from 'reducers/purchase/purchaseSlice';
import { updateWarningsVisibility } from 'reducers/warningsVisibility/warningsVisibilitySlice';

import Form, { FormRefCurrentProps } from 'containers/common/Form/Form';
import { SelectPaymentCurrency } from 'containers/wallet/SelectPaymentCurrency/SelectPaymentCurrency';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { CellText } from 'components/Cells/Cell/components/CellText/CellText';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import {
  generateTelegramLink,
  isAndroid,
  isIOS,
  isWindows,
} from 'utils/common/common';
import {
  isFiat,
  printCryptoAmount,
  printFiatAmount,
} from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';
import {
  generateStartAttach,
  parseStartAttach,
} from 'utils/common/startattach';

import { useAssetCurrency } from 'hooks/common/useAssetCurrency';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useLocaleStrToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import { useTheme } from 'hooks/utils/useTheme';
import { usePurchase } from 'hooks/wallet/usePurchase';

import { ReactComponent as CardSVG } from 'images/credit_card.svg';
import { ReactComponent as SelectArrowSVG } from 'images/select-arrow.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './Purchase.module.scss';
import { ReactComponent as CardWarningSVG } from './card_warning.svg';
import { ReactComponent as CloseSVG } from './close.svg';

const InvertButtonAnimation = lazy(
  () =>
    import('components/animations/InvertButtonAnimation/InvertButtonAnimation'),
);

function isValidAmount(value: number): boolean {
  return isFinite(value) && value > 0;
}

function getEstimatePrice({
  amount,
  baseCurrency,
  secondaryCurrency,
  method,
  signal,
}: {
  amount: number;
  baseCurrency: CurrencyEnum;
  secondaryCurrency: CurrencyEnum;
  method: PaymentMethodEnum;
  signal?: AbortController['signal'];
}) {
  return API.Prices.getEstimatePrice(
    {
      base_amount: amount || 1,
      base_currency: baseCurrency,
      secondary_currency: secondaryCurrency,
      payment_method: method,
    },
    { signal },
  ).then((response) => {
    if (isFiat(baseCurrency)) {
      return response.data.requested_amount;
    } else {
      return response.data.payable_amount;
    }
  });
}

const getBaseLimit = ({
  baseCurrency,
  secondaryCurrency,
  paymentMethod,
  signal,
}: {
  baseCurrency: CurrencyEnum;
  secondaryCurrency: CurrencyEnum;
  paymentMethod: PaymentMethodEnum;
  signal?: AbortController['signal'];
}) => {
  return API.Currencies.getCurrencyLimits(
    baseCurrency,
    secondaryCurrency,
    paymentMethod,
    { signal },
  ).then((response) => {
    return response.data;
  });
};

interface FormState {
  estimateTexts: [string, string];
  buttonAmount: number;
  error: null | string;
}

interface ReducerAction extends Partial<FormState> {
  type: 'update';
}

function stateReducer(state: FormState, { type, ...data }: ReducerAction) {
  switch (type) {
    case 'update':
      return { ...state, ...data };
  }
}

const Purchase: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const assetCurrency = useAssetCurrency();
  const initialValue = search.get('value')
    ? Number(search.get('value'))
    : undefined;
  const paymentCurrency = useAppSelector(
    (state) => state.settings.paymentCurrency || 'EUR',
  );

  // To refetch last used payment currencies
  useLastUsedPaymentCurrencies();
  const returnPath = decodeURIComponent(search.get('returnPath') || '');

  const { data: settings } = usePurchaseSettings();

  const purchaseByCard = useAppSelector((state) => state.user.purchaseByCard);
  const { startParam } = useAppSelector((state) => state.session);
  const { languageCode, fiatCurrency: userFiatCurrency } = useAppSelector(
    (state) => state.settings,
  );
  const { isRussian, featureFlags } = useAppSelector((state) => state.user);
  const { userId } = useAppSelector((state) => state.p2pUser);
  const { botUsername } = useAppSelector((state) => state.wallet);
  const { russianCardRestriction } = useAppSelector(
    (state) => state.warningsVisibility,
  );
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const kyc = useAppSelector((state) => state.kyc);
  const { data: recentlyUsedCurrencies = [] } = useLastUsedPaymentCurrencies();
  const recentlyUsedCurrency = recentlyUsedCurrencies[0];
  const { buyRate = 0 } = useBuyRate({
    currency: assetCurrency,
    fiatCurrency: featureFlags.multicurrency ? recentlyUsedCurrency : undefined,
  });
  const { purchase_id } = useAppSelector((state) => state.purchase);

  const initial = useRef(!!initialValue);

  const defaultCurrencyValue =
    settings &&
    settings.find(({ currency }) => currency === assetCurrency)?.default_value;

  const [inputNumValue, setInputNumValue] = useState<number>(
    typeof initialValue === 'number' ? initialValue : defaultCurrencyValue || 0,
  );

  const [inputValue, setInputValue] = useState(
    typeof initialValue === 'number'
      ? printCryptoAmount({
          amount: initialValue,
          currency: assetCurrency,
          languageCode,
        })
      : defaultCurrencyValue
      ? printCryptoAmount({
          amount: defaultCurrencyValue,
          currency: assetCurrency,
          languageCode,
        })
      : '',
  );
  const [creatingPurchase, setCreatingPurchase] = useState<boolean>();
  const [calculatingEstimate, setCalculatingEstimate] = useState(false);
  const [estimate, setEstimate] = useState(buyRate);
  const [baseCurrency, setBaseCurrency] = useState<
    FiatCurrency | FrontendCryptoCurrencyEnum
  >(assetCurrency);
  const formatStrToNum = useLocaleStrToNumFormatter(inputValue);

  const snackbarContext = useContext(SnackbarContext);

  const deprecatedFiatCurrency =
    userFiatCurrency === FiatCurrency.Eur ? FiatCurrency.Eur : FiatCurrency.Usd;

  const fiatCurrency = featureFlags.multicurrency
    ? paymentCurrency || FiatCurrency.Eur
    : deprecatedFiatCurrency;

  const secondaryCurrency =
    baseCurrency === assetCurrency ? fiatCurrency : assetCurrency;
  const cryptoAmount =
    baseCurrency === assetCurrency ? inputNumValue : estimate;

  const inputElement = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormRefCurrentProps>(null);
  const changed = useRef(false);
  const invertButton = useRef<LottieRefCurrentProps>(null);
  const [{ error, buttonAmount, estimateTexts }, dispatchState] = useReducer(
    stateReducer,
    {
      error: null,
      buttonAmount: 0,
      estimateTexts: [
        printCryptoAmount({
          amount: 1,
          currency: assetCurrency,
          languageCode,
          currencyDisplay: 'code',
        }),
        printFiatAmount({
          amount: estimate,
          currency: fiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        }),
      ],
    },
  );
  const estimateTimeout = useRef<number>();
  const estimateRequestController = useRef<AbortController>();
  const limitsRequestController = useRef<AbortController>();
  const buttonDisabled =
    !isValidAmount(inputNumValue) || error !== null || initial.current;

  useEffect(() => {
    clearTimeout(estimateTimeout.current);
    estimateRequestController.current?.abort();
    limitsRequestController.current?.abort();
    if (!isValidAmount(inputNumValue)) {
      dispatchState({
        type: 'update',
        buttonAmount: 0,
        error: null,
      });
      initial.current = false;
    }
    setCalculatingEstimate(true);
    estimateRequestController.current = new AbortController();
    limitsRequestController.current = new AbortController();
    estimateTimeout.current = window.setTimeout(() => {
      Promise.allSettled([
        getBaseLimit({
          baseCurrency,
          secondaryCurrency,
          paymentMethod: 'card_default',
          signal: limitsRequestController.current?.signal,
        }),
        getEstimatePrice({
          amount: inputNumValue,
          baseCurrency,
          secondaryCurrency,
          method: 'card_default',
          signal: estimateRequestController.current?.signal,
        }),
      ]).then(([limits, estimate]) => {
        if (
          (limits.status === 'rejected' &&
            limits.reason.message === 'canceled') ||
          (estimate.status === 'rejected' &&
            estimate.reason.message === 'canceled')
        ) {
          console.info('canceled');
        } else {
          const error =
            limits.status === 'fulfilled'
              ? validate(
                  inputNumValue,
                  baseCurrency,
                  limits.value.min_amount,
                  limits.value.max_amount,
                )
              : false;
          if (error && limits.status === 'fulfilled') {
            dispatchState({
              type: 'update',
              error,
              buttonAmount: 0,
            });
            initial.current = false;
            if (inputNumValue > limits.value.max_amount) {
              formRef.current?.shake();
            }
          } else if (estimate.status === 'fulfilled') {
            const valueForPrint =
              baseCurrency === assetCurrency
                ? printFiatAmount({
                    amount: estimate.value,
                    currency: fiatCurrency,
                    languageCode,
                    currencyDisplay: 'code',
                  })
                : printCryptoAmount({
                    amount: estimate.value,
                    currency: assetCurrency,
                    languageCode,
                    currencyDisplay: 'code',
                  });
            let estimateTexts: [string, string];
            if (inputNumValue) {
              estimateTexts = ['', valueForPrint];
            } else if (secondaryCurrency === assetCurrency) {
              estimateTexts = [
                printFiatAmount({
                  amount: 1,
                  currency: fiatCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                }),
                valueForPrint,
              ];
            } else {
              estimateTexts = [
                printCryptoAmount({
                  amount: 1,
                  currency: assetCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                }),
                valueForPrint,
              ];
            }
            let buttonAmount;
            if (baseCurrency === assetCurrency) {
              buttonAmount = inputNumValue;
            } else {
              buttonAmount =
                inputNumValue === 0 ? inputNumValue : estimate.value;
            }
            dispatchState({
              type: 'update',
              error: null,
              estimateTexts,
              buttonAmount,
            });
            initial.current = false;
            setEstimate(estimate.value);
          }
          setCalculatingEstimate(false);
        }
      });
    }, 350);
  }, [baseCurrency, secondaryCurrency, inputNumValue, fiatCurrency]);

  const validate = (
    value: number,
    currency: CurrencyEnum,
    min: number,
    max: number,
  ): string | null => {
    if (value > 0 && value < min) {
      return t('buy.invalid_min', {
        value:
          currency === fiatCurrency
            ? printFiatAmount({
                amount: min,
                currency: fiatCurrency,
                languageCode,
                currencyDisplay: 'code',
              })
            : printCryptoAmount({
                amount: min,
                currency: assetCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
      });
    } else if (value > 0 && value > max) {
      return t('buy.invalid_max', {
        value:
          currency === fiatCurrency
            ? printFiatAmount({
                amount: max,
                currency: fiatCurrency,
                languageCode,
                currencyDisplay: 'code',
              })
            : printCryptoAmount({
                amount: max,
                currency: assetCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
      });
    } else {
      return null;
    }
  };

  useEffect(() => {
    logEvent('Opened buy screen');
  }, []);

  useEffect(() => {
    if (
      kyc.method &&
      kyc.baseCurrency &&
      kyc.inputNumValue &&
      startParam &&
      parseStartAttach(startParam).operation === 'kyc_success'
    ) {
      setInputNumValue(kyc.inputNumValue);
      setBaseCurrency(kyc.baseCurrency);
      setInputValue(`${kyc.inputNumValue}`);
    }
    //eslint-disable-next-line
  }, []);

  const isNewPurchaseFlow = featureFlags.rcards;
  const makePurchase = usePurchase();

  const createTelegramPurchase = async () => {
    setCreatingPurchase(true);

    try {
      const purchase = await makePurchase({
        baseAmount: inputNumValue,
        baseCurrency,
        secondaryCurrency,
      });

      if (!purchase) {
        return;
      }

      dispatch(
        createPurchase({
          method: 'card_default',
          status: 'pending',
          returnPath,
          assetCurrency,
          ...purchase,
        }),
      );

      resetTransactions();
      snackbarContext.hideSnackbar('kyc');

      window.Telegram.WebApp.openInvoice(
        purchase.payment_url,
        openInvoiceCallback,
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setCreatingPurchase(false);
      const code = error?.response?.data?.code;
      const id = error?.response?.data?.detail;

      if (code === 'user_needs_kyc') {
        getKycIframeUrl(id).then((url) => {
          const dataKyc = {
            btn_kyc_success_url: generateTelegramLink(botUsername, {
              startattach: generateStartAttach('kyc_success', {
                assetCurrency,
              }),
            }),
            btn_kyc_success_text: getButtonText(),
            btn_kyc_retry_url: generateTelegramLink(botUsername, {
              startattach: generateStartAttach('kyc_retry'),
            }),
            kycUrl: url.kyc_url,
            inputNumValue,
            baseCurrency,
            method: PaymentMethodEnum.CardDefault,
            id,
            secondaryCurrency,
          };

          dispatch(updateKyc(dataKyc));

          snackbarContext.showSnackbar({
            showDuration: 4000,
            snackbarId: 'kyc',
            before: <WarningSVG />,
            actionPosition: 'bottom',
            action: (
              <Link to={routePaths.KYC}>{t('buy.kyc_get_verified')}</Link>
            ),
            text: t('buy.kyc_confirm', {
              amount: printCryptoAmount({
                amount: cryptoAmount,
                currency: assetCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
            }),
          });
        });
      } else if (code === 'payment_method_not_available') {
        snackbarContext.showSnackbar({
          snackbarId: 'purchase_unavailable',
          before: <WarningSVG />,
          text: t('buy.unavailable'),
        });
      }
    }
  };

  const getKycIframeUrl = (purchaseId: string) => {
    const kycData = {
      postmessage_target: location.origin,
      custom_body_class: `color-scheme-${colorScheme}-sumsub theme-${theme}-sumsub`,
      custom_css_url:
        process.env.NODE_ENV === 'development'
          ? `${location.origin}/css/sumsub.css`
          : '',
    };

    if (isNewPurchaseFlow && purchase_id) {
      return API.Purchases.getKycUrlOfPurchase({
        ...kycData,
        purchase_internal_id: purchase_id,
      }).then((response) => {
        return response.data;
      });
    } else {
      return API.Users.getKycUrl({
        ...kycData,
        purchase_id: purchaseId,
      }).then((response) => {
        return response.data;
      });
    }
  };

  const openInvoiceCallback = (status: InvoiceStatus) => {
    setCreatingPurchase(false);

    if (status === 'paid' || status === 'pending') {
      navigate(routePaths.PURCHASE_STATUS);
    } else if (status === 'cancelled') {
      // На версиях ниже 6.2 в iOS клиенте есть баг из-за которого инвойс всегда закрывается со статусом cancelled
      // Редиректим таких юзеров на главную, где они будут видеть платеж с поллингом
      isIOS() &&
        !window.Telegram.WebApp.isVersionAtLeast('6.2') &&
        navigate(routePaths.MAIN);
    }
  };

  const handlePurchaseClick = async () => {
    logEvent('Submitted buy', {
      payment_method: 'card',
      crypto: !isFiat(baseCurrency) ? baseCurrency : secondaryCurrency,
      fiat: isFiat(baseCurrency) ? baseCurrency : secondaryCurrency,
      amount_crypto: !isFiat(baseCurrency) ? inputNumValue : estimate,
      amount_fiat: isFiat(baseCurrency) ? inputNumValue : estimate,
    });

    /* StartBlock:  Temporary fix until Telegram repairs the payment form. */
    setCreatingPurchase(true);

    await API.Purchases.redirectToTextBot({
      crypto_amount: !isFiat(baseCurrency) ? inputNumValue : estimate,
      crypto_currency: !isFiat(baseCurrency)
        ? baseCurrency
        : (secondaryCurrency as FrontendCryptoCurrencyEnum),
    });

    setCreatingPurchase(false);
    window.Telegram.WebApp.openTelegramLink(generateTelegramLink(botUsername));
    return;
    /* EndBlock: Temporary fix until Telegram repairs the payment form. */

    if (
      window.Telegram.WebView?.initParams?.tgWebAppNeedNameInvoiceBug === '1' &&
      isAndroid() &&
      // Hack for old clients https://wallet-bot.atlassian.net/browse/WAL-344
      Number(userId) < 2415212
    ) {
      snackbarContext.showSnackbar({
        showDuration: 4000,
        snackbarId: 'old_client',
        before: <WarningSVG />,
        title: t('buy.old_client_title'),
        text: t('buy.old_client_text'),
        action: (
          <a target="_blank" href={TELEGRAM_UPDATE_LINK} rel="noreferrer">
            {t('buy.old_client_link')}
          </a>
        ),
      });

      return;
    }

    createTelegramPurchase();
  };

  const getButtonText = () => {
    if (isValidAmount(buttonAmount)) {
      return t('buy.button', {
        value: printCryptoAmount({
          amount: buttonAmount,
          currency: assetCurrency,
          languageCode,
          currencyDisplay: 'code',
        }),
      });
    } else {
      return t('buy.button_empty', {
        currency: assetCurrency,
      });
    }
  };

  const getLabel = () => {
    if (!error) {
      return (
        <span
          className={classNames(
            styles.estimate,
            calculatingEstimate && styles.calculating,
          )}
          data-testid="tgcrawl"
        >
          {estimateTexts[0] ? (
            <>
              <span>{estimateTexts[0]}</span>&nbsp;≈&nbsp;
              <span>{estimateTexts[1]}</span>
            </>
          ) : (
            <>
              ≈&nbsp;<span>{estimateTexts[1]}</span>
            </>
          )}
        </span>
      );
    } else {
      return error;
    }
  };

  const isSubmitting =
    creatingPurchase ||
    (calculatingEstimate && !isWindows()) ||
    initial.current;

  const backPath = search.get('backPath');

  const isSelectPaymentCurrencyShouldBeOpenedByDefault =
    featureFlags.multicurrency && !recentlyUsedCurrencies.length;

  const [
    isSelectPaymentCurrencyOpenedOnMount,
    setIsSelectPaymentCurrencyOpenedOnMount,
  ] = useState(isSelectPaymentCurrencyShouldBeOpenedByDefault);

  const [isSelectPaymentCurrencyOpen, setIsSelectPaymentCurrencyOpen] =
    useState(isSelectPaymentCurrencyOpenedOnMount);

  const handleChangePaymentCurrencyClick = () => {
    setIsSelectPaymentCurrencyOpen(true);
    setIsSelectPaymentCurrencyOpenedOnMount(false);
  };

  const presets = useMemo(() => {
    if (settings) {
      const CURRENCIES_TO_SHOW_PRESETS = ['EUR', 'USD', 'USDT', 'TON'];

      const presets =
        settings.find(
          ({ currency }) =>
            currency === baseCurrency &&
            CURRENCIES_TO_SHOW_PRESETS.includes(currency),
        )?.preset_values || [];

      return presets.map((value) => {
        return {
          label: isFiat(baseCurrency)
            ? printFiatAmount({
                amount: value.toString(),
                currency: baseCurrency,
                languageCode,
                currencyDisplay: 'code',
              })
            : printCryptoAmount({
                amount: value.toString(),
                currency: baseCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
          value: value,
        };
      });
    }

    return [];
  }, [settings, baseCurrency, languageCode]);

  if (isSelectPaymentCurrencyOpen) {
    return (
      <Page mode="secondary">
        <BackButton
          onClick={() => {
            if (isSelectPaymentCurrencyOpenedOnMount) {
              window.history.back();
            } else {
              setIsSelectPaymentCurrencyOpen(false);
            }
          }}
        />
        <SelectPaymentCurrency
          cryptoCurrency={assetCurrency}
          onChoose={(currency) => {
            if (isFiat(baseCurrency)) {
              setBaseCurrency(currency);
            }

            setIsSelectPaymentCurrencyOpen(false);
          }}
        />
      </Page>
    );
  }

  return (
    <Page>
      <BackButton
        onClick={() => {
          if (
            startParam &&
            parseStartAttach(startParam).operation === 'kyc_success'
          ) {
            navigate(routePaths.MAIN);
          } else if (backPath) {
            navigate(backPath);
          } else {
            window.history.back();
          }
        }}
      />
      {purchaseByCard ? (
        <>
          {isRussian && russianCardRestriction && (
            <div className={themeClassName('container')}>
              <div
                className={themeClassName('warning')}
                onClick={() => inputElement.current?.focus()}
              >
                <div className={themeClassName('warningIcon')}>
                  <CardWarningSVG />
                </div>
                <div className={themeClassName('warningText')}>
                  {t('buy.russian_restrictions')}
                </div>
                <button
                  className={themeClassName('warningClose')}
                  onClick={() => {
                    dispatch(
                      updateWarningsVisibility({
                        russianCardRestriction: false,
                      }),
                    );
                    API.WVSettings.setUserWvSettings({
                      display_ru_card_restriction: false,
                    });
                  }}
                >
                  <CloseSVG />
                </button>
              </div>
            </div>
          )}
          <Form
            className={themeClassName('form')}
            presets={presets}
            autoFocus
            formRef={formRef}
            currency={baseCurrency}
            top={
              featureFlags.multicurrency ? (
                <div className={themeClassName('topWrapper')}>
                  {baseCurrency === fiatCurrency
                    ? t('buy.you_pay_in')
                    : t('buy.you_buy_in')}
                  <button
                    type="button"
                    onClick={handleChangePaymentCurrencyClick}
                    className={styles.topPaymentCurrency}
                  >
                    <span>{paymentCurrency}</span>
                    <SelectArrowSVG
                      onClick={handleChangePaymentCurrencyClick}
                    />
                  </button>
                </div>
              ) : baseCurrency === fiatCurrency ? (
                t('buy.fiat_label')
              ) : (
                t('buy.crypto_label')
              )
            }
            ref={inputElement}
            value={inputValue}
            hasError={error !== null}
            onChange={(value) => {
              changed.current = true;
              const [strNum, num] = formatStrToNum(value, {
                locale: languageCode,
                isAllowed: (value: number) =>
                  value <= 999_999.999999999 && value >= 0,
                maximumFractionDigits: !isFiat(baseCurrency)
                  ? CRYPTO_FRACTION[baseCurrency]
                  : DEFAULT_FIAT_FRACTION,
              });

              if (strNum === null || num === null) return;

              setInputValue(strNum);
              setInputNumValue(num);
              initial.current = false;
            }}
            after={
              <Suspense fallback={<div style={{ width: 40, height: 40 }} />}>
                <InvertButtonAnimation
                  lottieRef={invertButton}
                  data-testid="tgcrawl"
                  onClick={() => {
                    invertButton.current?.goToAndPlay(0);
                    inputElement.current?.focus();

                    const nextBaseCurrent =
                      baseCurrency === assetCurrency
                        ? fiatCurrency
                        : assetCurrency;

                    setBaseCurrency(nextBaseCurrent);

                    const isNextCurrencyFiat = isFiat(nextBaseCurrent);

                    const isSetAmountToZero =
                      isNextCurrencyFiat && inputNumValue < 1;

                    const [strNum, num] = formatStrToNum(
                      isSetAmountToZero ? '' : inputValue,
                      {
                        locale: languageCode,
                        isAllowed: (value: number) =>
                          value <= 999_999.999999999 && value >= 0,
                        maximumFractionDigits: !isFiat(nextBaseCurrent)
                          ? CRYPTO_FRACTION[nextBaseCurrent]
                          : DEFAULT_FIAT_FRACTION,
                      },
                    );

                    if (strNum === null || num === null) return;

                    setInputValue(strNum);
                    setInputNumValue(num);
                  }}
                />
              </Suspense>
            }
            bottom={getLabel()}
            onSubmit={handlePurchaseClick}
            isDisabled={isSubmitting || buttonDisabled}
          />

          <Cell
            onClick={() => inputElement.current?.focus()}
            className={styles.paymentMethod}
            start={
              <Cell.Part type="roundedIcon">
                <RoundedIcon backgroundColor="button">
                  <CardSVG />
                </RoundedIcon>
              </Cell.Part>
            }
          >
            <CellText
              inverted
              bold
              title={t('buy.card')}
              description={t('buy.method')}
            />
          </Cell>
          <MainButton
            text={getButtonText()}
            disabled={buttonDisabled}
            color={
              buttonDisabled
                ? customPalette[theme][colorScheme].button_disabled_color
                : customPalette[theme][colorScheme].button_confirm_color
            }
            textColor={
              buttonDisabled
                ? customPalette[theme][colorScheme].button_disabled_text_color
                : customPalette[theme][colorScheme].button_confirm_text_color
            }
            progress={isSubmitting} // Из-за бага телеги на винде сбрасывается фокус на инпуте при переводе кнопки в progress
            onClick={handlePurchaseClick}
          />
        </>
      ) : null}
    </Page>
  );
};

export default Purchase;
