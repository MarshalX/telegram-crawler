import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { LottieRefCurrentProps } from 'lottie-react';
import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Link } from 'react-router-dom';

import API from 'api/p2p';
import {
  RestDataResponseCreateOrderRestStatusOrderRestDto,
  RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum,
} from 'api/p2p/generated-common';
import {
  CryptoCurrency,
  CurrencyEnum,
  FiatCurrency,
} from 'api/wallet/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { CRYPTO_FRACTION, DEFAULT_FIAT_FRACTION } from 'config';

import { useAppDispatch, useAppSelector } from 'store';

import { setP2P } from 'reducers/p2p/p2pSlice';

import Form, { FormRefCurrentProps } from 'containers/common/Form/Form';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { BackButton } from 'components/BackButton/BackButton';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { CroppingText } from 'components/CroppingText/CroppingText';
import FitTextRow from 'components/FitTextRow/FitTextRow';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SelectList } from 'components/SelectList';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import {
  printCryptoAmount,
  printFiatAmount,
  printStringNumber,
  roundDownFractionalDigits,
} from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import { useGetPaymentMethodName, useSnackbarForBannedUser } from 'hooks/p2p';
import useABTests from 'hooks/p2p/useABTests';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useLocaleStrBigNumberToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SelectArrowSVG } from 'images/select-arrow.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { useOfferPageContext } from '../../OfferPage';
import { OfferSoldOut } from '../OfferSoldOut/OfferSoldOut';
import styles from './OfferForm.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

const InvertButtonAnimation = lazy(
  () =>
    import('components/animations/InvertButtonAnimation/InvertButtonAnimation'),
);

const MAX_NUMBER_BEFORE_DECIMAL_POINT = 999999999;

const OfferForm: FC = () => {
  const {
    offer,
    isLoading,
    setInputNum,
    setInputValue,
    inputValueNum,
    inputValue,
    inputRef,
    selectedPayment,
    onPaymentSelect,
  } = useOfferPageContext();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const { languageCode } = useAppSelector((state) => state.settings);
  const { userId, canUseP2p, isBanned } = useAppSelector(
    (state) => state.p2pUser,
  );
  const snackbarContext = useContext(SnackbarContext);
  const formatStrToNum = useLocaleStrBigNumberToNumFormatter(inputValue);
  const {
    defaultCurrencyForSaleOfferCreation,
    defaultCurrencyForPurchaseOfferCreation,
  } = useAppSelector((state) => state.p2p);
  const dispatch = useAppDispatch();
  const getPaymentMethodName = useGetPaymentMethodName();
  const formRef = useRef<FormRefCurrentProps>(null);
  const [error, setError] = useState<ReactNode>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const exchangeRef = useRef<LottieRefCurrentProps>(null);

  const abTests = useABTests();

  const {
    baseCurrencyCode: cryptoCurrency,
    quoteCurrencyCode: fiatCurrency,
    estimated: baseRate,
  } = (offer && offer.price) || {
    estimated: '0',
    baseCurrencyCode: 'TON',
    quoteCurrencyCode: 'EUR',
  };

  const isCryptoCurrency =
    offer?.type === 'SALE'
      ? defaultCurrencyForSaleOfferCreation === 'crypto'
      : defaultCurrencyForPurchaseOfferCreation === 'crypto';

  const fiatMinLimit = offer?.orderAmountLimits?.min;
  const fiatMaxLimit = offer?.orderAmountLimits?.max;

  const cryptoMinLimit = offer?.orderVolumeLimits?.min;
  const cryptoMaxLimit = offer?.orderVolumeLimits?.max;

  const cryptoValue = isCryptoCurrency
    ? inputValueNum
    : inputValueNum.dividedBy(Number(baseRate));
  const fiatValue = isCryptoCurrency
    ? inputValueNum.multipliedBy(Number(baseRate))
    : inputValueNum;

  const isDisabled =
    cryptoValue.isLessThanOrEqualTo(BigNumber(0)) || error !== null;
  const isError = error !== null;

  const maxInputValueNum = isCryptoCurrency ? cryptoMaxLimit : fiatMaxLimit;
  const isOfferCanBeFullyFulfilled = BigNumber(
    cryptoMaxLimit || 0,
  ).isGreaterThan(BigNumber(0));

  const isOfferSoldOut = useMemo(() => {
    if (!offer) return false;

    if (!offer.orderVolumeLimits?.max) return false;
    if (!offer.orderAmountLimits?.max) return false;

    return (
      offer.orderVolumeLimits.max === '0' ||
      offer.orderAmountLimits.max === '0' ||
      Number(offer.orderVolumeLimits.max) <
        Number(offer.orderVolumeLimits.min) ||
      Number(offer.orderAmountLimits.max) < Number(offer.orderAmountLimits.min)
    );
  }, [offer]);

  const { maxLimit, minLimit, maxLimitValue, minLimitValue } = useMemo(() => {
    if (isCryptoCurrency) {
      return {
        maxLimitValue: offer?.orderVolumeLimits?.max,
        minLimitValue: offer?.orderVolumeLimits?.min,
        maxLimit: printCryptoAmount({
          amount: Number(offer?.orderVolumeLimits?.max),
          currency: cryptoCurrency as CryptoCurrency,
          languageCode,
          currencyDisplay: 'code',
        }),
        minLimit: printCryptoAmount({
          amount: Number(offer?.orderVolumeLimits?.min),
          currency: cryptoCurrency as CryptoCurrency,
          languageCode,
        }),
      };
    } else {
      return {
        maxLimitValue: offer?.orderAmountLimits?.max,
        minLimitValue: offer?.orderAmountLimits?.min,
        maxLimit: printFiatAmount({
          amount: Number(offer?.orderAmountLimits?.max),
          currency: fiatCurrency as FiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        }),
        minLimit: printFiatAmount({
          amount: Number(offer?.orderAmountLimits?.min),
          currency: fiatCurrency as FiatCurrency,
          languageCode,
          currencyDisplay: false,
        }),
      };
    }
  }, [
    isCryptoCurrency,
    offer?.orderVolumeLimits?.min,
    offer?.orderVolumeLimits?.max,
    offer?.orderAmountLimits?.min,
    offer?.orderAmountLimits?.max,
    cryptoCurrency,
    languageCode,
    fiatCurrency,
  ]);

  const paymentOptionsForBuyOffer: { value: string; label: string }[] =
    useMemo(() => {
      return offer && 'paymentDetails' in offer
        ? [
            ...new Map(
              offer.paymentDetails.map((detail) => {
                const { paymentMethod, id } = detail;

                return [
                  paymentMethod.code,
                  {
                    value: String(id),
                    label: getPaymentMethodName(paymentMethod),
                  },
                ];
              }),
            ).values(),
          ]
        : [];
    }, [getPaymentMethodName, offer]);

  const limitsCanBeShown = useMemo(() => {
    if (isCryptoCurrency) {
      return !!offer?.orderVolumeLimits?.max;
    } else {
      return !!offer?.orderAmountLimits?.max;
    }
  }, [isCryptoCurrency, offer?.orderVolumeLimits, offer?.orderAmountLimits]);

  const printBottom = () => {
    if (isError) {
      return <span className={styles.errMessage}>{error}</span>;
    } else if (inputValueNum.isGreaterThan(BigNumber(0))) {
      const maximumFractionDigits =
        CRYPTO_FRACTION[cryptoCurrency as keyof typeof CRYPTO_FRACTION];

      return (
        <div className={styles.estimate}>
          <span>
            {isCryptoCurrency
              ? printFiatAmount({
                  amount: roundDownFractionalDigits(
                    fiatValue.toString(),
                    DEFAULT_FIAT_FRACTION,
                  ),
                  currency: fiatCurrency as FiatCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                })
              : printCryptoAmount({
                  amount: roundDownFractionalDigits(
                    cryptoValue.toString(),
                    maximumFractionDigits,
                  ),
                  currency: cryptoCurrency as CryptoCurrency,
                  languageCode,
                  currencyDisplay: 'code',
                  maximumFractionDigits,
                })}
          </span>
        </div>
      );
    } else {
      return (
        <div className={styles.estimate}>
          <span>
            {t('p2p.offer_page.form_estimate', {
              cryptoCurrency,
              fiatValue: printFiatAmount({
                amount: Number(baseRate),
                currency: fiatCurrency as FiatCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
            })}
          </span>
        </div>
      );
    }
  };

  const handleInputChange = useCallback(
    (value: string) => {
      if (!offer) return;

      const [strNum, num] = formatStrToNum(value, {
        locale: languageCode,
        isAllowed: (value) =>
          value.isLessThanOrEqualTo(
            BigNumber(`${MAX_NUMBER_BEFORE_DECIMAL_POINT}.999999999`),
          ) && value.isGreaterThanOrEqualTo(BigNumber('0')),
        maximumFractionDigits: isCryptoCurrency
          ? CRYPTO_FRACTION[
              offer.price.baseCurrencyCode as keyof typeof CRYPTO_FRACTION
            ]
          : DEFAULT_FIAT_FRACTION,
      });

      if (strNum === null || num === null) return;

      setInputValue(strNum);
      setInputNum(num);
    },
    [
      formatStrToNum,
      isCryptoCurrency,
      languageCode,
      offer,
      setInputNum,
      setInputValue,
    ],
  );

  const handleChangePaymentMethod = (id: string) => {
    if (!offer || !('paymentDetails' in offer)) {
      return;
    }

    const payment = offer.paymentDetails.find(
      (item) => String(item.id) === String(id),
    );

    if (!payment) return;

    onPaymentSelect({
      id: String(id),
      name: payment.paymentMethod.name,
      code: payment.paymentMethod.code,
      originNameLocale: payment.paymentMethod.originNameLocale,
      nameEng: payment.paymentMethod.nameEng,
      attributes: payment.attributes,
    });
  };

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const createOrder = async () => {
    try {
      setIsSubmitting(true);

      if (!offer || !userId) {
        throw new Error('UserId or offer not found');
      }

      let order: RestDataResponseCreateOrderRestStatusOrderRestDto;

      const isCreateByVolume = isCryptoCurrency;

      if (isCreateByVolume) {
        const { data } = await API.Order.createOrderByVolumeV2({
          offerId: offer.id,
          paymentDetailsId: Number(selectedPayment?.id),
          volume: {
            currencyCode: offer.price.baseCurrencyCode,
            amount: inputValueNum.toString(),
          },
          type: offer.type,
        });

        order = data;
      } else {
        const { data } = await API.Order.createOrderByAmountV2({
          offerId: offer.id,
          paymentDetailsId: Number(selectedPayment?.id),
          amount: {
            currencyCode: offer.price.quoteCurrencyCode,
            amount: inputValueNum.toString(),
          },
          type: offer.type,
        });

        order = data;
      }

      if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.Success
      ) {
        const searchParams = isCreateByVolume
          ? createSearchParams({
              volume: inputValueNum.toString(),
              backButton: generatePath(routePaths.P2P_OFFERS, {
                type: offer.type,
                '*': '',
              }),
              previousPrice: offer?.price?.estimated
                ? String(offer.price.estimated)
                : '',
            }).toString()
          : createSearchParams({
              amount: inputValueNum.toString(),
              backButton: generatePath(routePaths.P2P_OFFERS, {
                type: offer.type,
                '*': '',
              }),
              previousPrice: offer?.price?.estimated
                ? String(offer.price.estimated)
                : '',
            }).toString();

        navigate({
          pathname: generatePath(routePaths.P2P_ORDER, {
            id: String(order.data?.id),
          }),
          search: searchParams,
        });

        const logEventParams = isCreateByVolume
          ? { volume: inputValueNum }
          : { amount: inputValueNum };

        logEvent('Taker. Buy/sell button clicked', {
          category: 'p2p.buyer.order',
          payment_method: order.data?.paymentDetails.paymentMethod.code,
          seller_id: order.data?.seller?.userId,
          ad_id: order.data?.offerId,
          order_id: order.data?.id,
          type: offer?.type === 'SALE' ? 'sell' : 'buy',
          ...logEventParams,
        });
      } else if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.OfferIllegalState
      ) {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t('p2p.offer_page.offer_unavailable'),
        });
      } else if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.BiddingIsDisabled
      ) {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t('p2p.offer_page.bidding_disabled'),
        });
      } else if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.AccessDeniedForBuyer
      ) {
        if (offer.type === 'SALE') {
          showSnackbarForBannedUser();
        } else {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_buyer'),
          });
        }
      } else if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.AccessDeniedForSeller
      ) {
        if (offer.type === 'SALE') {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_seller'),
          });
        } else {
          showSnackbarForBannedUser();
        }
      } else if (
        order.status ===
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.AmountIsOutOfLimits
      ) {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t('p2p.offer_page.amount_is_out_of_limits'),
        });
      } else {
        console.error(order);
      }

      if (
        order.status !==
        RestDataResponseCreateOrderRestStatusOrderRestDtoStatusEnum.Success
      ) {
        logEvent('Order creation failed', {
          error_type: order.status,
        });
      }
    } catch (error) {
      logEvent('Order creation failed', {
        error_type: 'INTERNAL_ERROR',
      });
    }

    setIsSubmitting(false);
  };

  const { data: availableBalance, isLoading: isLoadingUserBalance } = useQuery({
    queryKey: ['getUserAvailableBalanceWithoutBuyOrderFeeV2', cryptoCurrency],
    queryFn: async () => {
      const { data } =
        await API.Order.getUserAvailableBalanceWithoutBuyOrderFeeV2({
          currencyCode: cryptoCurrency,
        });

      if (data.status === 'SUCCESS') {
        return BigNumber(data.data?.balance?.amount || 0).toString();
      }

      return;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchInterval: 7000,
    onError: (error) => {
      console.error(error);
      Sentry.captureException(error);
    },
    enabled: offer?.type === 'PURCHASE',
  });

  const handleSubmit = async () => {
    if (isError) {
      return;
    }

    const isUserBlocked = userId && (!canUseP2p || isBanned);

    if (isUserBlocked) {
      showSnackbarForBannedUser();
      return;
    }

    if (!selectedPayment?.id) {
      window.Telegram.WebApp.showPopup(
        {
          message: t('p2p.offer_page.you_dont_have_payment_methods'),
          buttons: [
            {
              id: 'cancel',
              text: t('common.cancel'),
            },
            {
              id: 'add',
              text: t('common.add'),
            },
          ],
        },
        (id: string) => {
          if (id === 'add') {
            // Prevents Telegram WebZ from navigating back to the same page
            // Remove when WT-2269 is fixed
            setTimeout(() => {
              navigate(
                generatePath(routePaths.P2P_OFFER_SELECT_PAYMENT, {
                  id: String(offer?.id),
                }),
              );
            }, 100);
          }
        },
      );

      return;
    }

    await createOrder();
  };

  const goToOfferDetails = useCallback(() => {
    if (!offer) return;

    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_DETAILS, {
        id: String(offer.id),
      }),
    });
  }, [offer, navigate]);

  const validateTimeout = useRef<number>();

  const handleBackClick = useCallback(() => {
    const navigateBack = () => {
      const isRestorePrevStateOnOffersPage = searchParams.get(
        'isRestorePrevStateOnOffersPage',
      );

      navigate({
        pathname: generatePath(routePaths.P2P_OFFERS, {
          type: String(offer?.type),
          '*': '',
        }),
        search: isRestorePrevStateOnOffersPage
          ? createSearchParams({
              isRestorePrevStateOnOffersPage: String(true),
            }).toString()
          : '',
      });
    };

    navigateBack();
  }, [navigate, offer, searchParams]);

  useEffect(() => {
    clearTimeout(validateTimeout.current);

    validateTimeout.current = window.setTimeout(() => {
      const value = isCryptoCurrency ? cryptoValue : fiatValue;

      const balanceBN = isCryptoCurrency
        ? BigNumber(availableBalance || 0)
        : BigNumber(availableBalance || 0).multipliedBy(Number(baseRate));

      const max = isCryptoCurrency ? cryptoMaxLimit : fiatMaxLimit;
      const min = isCryptoCurrency ? cryptoMinLimit : fiatMinLimit;

      const getErrorValue = (value: string | number) => {
        if (isCryptoCurrency) {
          return printCryptoAmount({
            amount: value,
            currency: cryptoCurrency as CryptoCurrency,
            languageCode,
            currencyDisplay: 'code',
          });
        }

        return printFiatAmount({
          amount: value,
          currency: fiatCurrency as FiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        });
      };

      if (
        value.isGreaterThan(BigNumber(0)) &&
        value.isLessThan(BigNumber(min || 0))
      ) {
        setError(
          t('p2p.offer_page.invalid_min', { value: getErrorValue(min || 0) }),
        );
      } else if (
        value.isGreaterThan(BigNumber(0)) &&
        value.isGreaterThan(BigNumber(max || 0))
      ) {
        setError(
          t('p2p.offer_page.invalid_max', {
            value: getErrorValue(max || 0),
          }),
        );
      } else if (
        value.isGreaterThan(BigNumber(0)) &&
        offer?.type === 'PURCHASE' &&
        (balanceBN.isLessThan(value) || balanceBN.isLessThan(min || 0))
      ) {
        setError(t('p2p.offer_page.insufficient_balance'));
      } else {
        setError(null);
      }
    }, 350);

    return () => {
      clearTimeout(validateTimeout.current);
    };
  }, [
    fiatValue,
    fiatMaxLimit,
    fiatMinLimit,
    t,
    isCryptoCurrency,
    cryptoValue,
    cryptoMaxLimit,
    cryptoMinLimit,
    fiatCurrency,
    languageCode,
    cryptoCurrency,
    baseRate,
    availableBalance,
    offer?.type,
  ]);

  useEffect(() => {
    inputRef.current?.focus();

    if (
      offer &&
      !selectedPayment?.id &&
      offer.type === 'SALE' &&
      'paymentDetails' in offer
    ) {
      const filterPaymentMethodCode =
        searchParams.get('chosenMethod') ||
        searchParams.get('paymentMethodCode');

      const filterPaymentDetails = offer.paymentDetails.find(
        (item) => item.paymentMethod.code === filterPaymentMethodCode,
      );

      const payment = filterPaymentDetails || offer.paymentDetails[0];

      onPaymentSelect({
        id: String(filterPaymentDetails?.id || offer.paymentDetails[0]?.id),
        name: payment.paymentMethod.name,
        code: payment.paymentMethod.code,
        originNameLocale: payment.paymentMethod.originNameLocale,
        nameEng: payment.paymentMethod.nameEng,
        attributes: payment.attributes,
      });
    }
  }, [inputRef, offer, onPaymentSelect, searchParams, selectedPayment?.id]);

  useEffect(() => {
    if (isError) {
      formRef.current?.shake();
    }
  }, [isError]);

  useEffect(() => {
    const isUserEnteredSmth = inputValueNum.gt(0);

    if (isUserEnteredSmth) {
      window.Telegram.WebApp.enableClosingConfirmation();
    } else {
      window.Telegram.WebApp.disableClosingConfirmation();
    }

    return () => {
      window.Telegram.WebApp.disableClosingConfirmation();
    };
  }, [inputValueNum]);

  const operationText = useMemo(() => {
    if (isCryptoCurrency) {
      if (offer?.type === 'SALE') {
        return t('p2p.offer_page.you_buying_from');
      } else {
        return t('p2p.offer_page.you_selling_to');
      }
    } else {
      if (offer?.type === 'SALE') {
        return t('p2p.offer_page.you_sending_to');
      } else {
        return t('p2p.offer_page.you_receiving_from');
      }
    }
  }, [isCryptoCurrency, offer?.type, t]);

  const fulfillOfferText = useMemo(() => {
    if (offer?.type === 'SALE') {
      return t('p2p.offer_page.buy_all');
    } else {
      return t('p2p.offer_page.sell_all');
    }
  }, [offer?.type, t]);

  const mainButtonText = useMemo(() => {
    if (offer?.type === 'SALE') {
      return t('p2p.offer_page.buy');
    } else {
      return t('p2p.offer_page.check_sale_order');
    }
  }, [offer?.type, t]);

  const selectedPaymentBank = useMemo(() => {
    if (!selectedPayment || !selectedPayment.attributes) return;

    const bankAttribute = selectedPayment.attributes.values.find(
      (value) => value.name === 'BANKS',
    );

    if (bankAttribute && Array.isArray(bankAttribute.value)) {
      return bankAttribute.value;
    }
  }, [selectedPayment]);

  if (isOfferSoldOut) {
    return <OfferSoldOut onBack={handleBackClick} />;
  }

  return (
    <Page>
      <BackButton onClick={handleBackClick} />
      <Form
        data-testid="tgcrawl"
        formRef={formRef}
        currency={
          isLoading
            ? null
            : ((isCryptoCurrency
                ? cryptoCurrency
                : fiatCurrency) as CurrencyEnum)
        }
        hasError={isError}
        ref={inputRef}
        autoFocus
        top={
          <OperationInfo
            operation={
              isLoading ? (
                <div className={styles.skeleton}>
                  <p className={classNames(themeClassName('name'))}></p>
                </div>
              ) : (
                operationText
              )
            }
            merchant={offer?.user.nickname}
            avatar={
              <AliasAvatar
                size={theme === 'apple' ? 32 : 24}
                id={offer?.user.userId}
                avatarCode={offer?.user.avatarCode}
                loading={isLoading}
              />
            }
            isVerifiedMerchant={
              abTests.data?.verifiedMerchantBadge && offer?.user.isVerified
            }
          />
        }
        onChange={handleInputChange}
        value={inputValue}
        after={
          <Suspense fallback={<div style={{ width: 40, height: 40 }} />}>
            <InvertButtonAnimation
              data-testid="tgcrawl"
              lottieRef={exchangeRef}
              onClick={() => {
                if (!offer) return;

                exchangeRef.current?.goToAndPlay(0);
                const nextIsCryptoCurrency = !isCryptoCurrency;

                if (offer.type === 'SALE') {
                  dispatch(
                    setP2P({
                      defaultCurrencyForSaleOfferCreation: nextIsCryptoCurrency
                        ? 'crypto'
                        : 'fiat',
                    }),
                  );
                } else {
                  dispatch(
                    setP2P({
                      defaultCurrencyForPurchaseOfferCreation:
                        nextIsCryptoCurrency ? 'crypto' : 'fiat',
                    }),
                  );
                }

                const [strNum, num] = formatStrToNum(
                  inputValue === '0' ? '' : inputValue,
                  {
                    locale: languageCode,
                    isAllowed: (value: BigNumber) =>
                      value.isLessThanOrEqualTo(
                        BigNumber(
                          `${MAX_NUMBER_BEFORE_DECIMAL_POINT}.999999999`,
                        ),
                      ) && value.isGreaterThanOrEqualTo(BigNumber('0')),
                    maximumFractionDigits: nextIsCryptoCurrency
                      ? CRYPTO_FRACTION[
                          offer.price
                            .baseCurrencyCode as keyof typeof CRYPTO_FRACTION
                        ]
                      : DEFAULT_FIAT_FRACTION,
                  },
                );

                if (strNum === null || num === null) return;

                setInputValue(strNum);
                setInputNum(num);
                inputRef.current?.focus();
              }}
            />
          </Suspense>
        }
        bottom={
          <Skeleton
            skeleton={
              <div className={styles.skeleton}>
                <p className={classNames(themeClassName('estimate'))}></p>
                <p className={themeClassName('buy')}></p>
              </div>
            }
            skeletonShown={isLoading}
          >
            {printBottom()}
            <p
              className={classNames(
                styles.linkButton,
                themeClassName('buy'),
                themeClassName('text'),
              )}
              onClick={() => {
                if (!offer) return;

                if (
                  offer.type === 'PURCHASE' &&
                  (!availableBalance || availableBalance === '0')
                ) {
                  return;
                }

                if (
                  isOfferCanBeFullyFulfilled &&
                  maxLimitValue &&
                  minLimitValue
                ) {
                  const allAmountToSell = (() => {
                    const balanceBN = isCryptoCurrency
                      ? BigNumber(availableBalance || 0)
                      : BigNumber(availableBalance || 0).multipliedBy(
                          Number(baseRate),
                        );

                    return balanceBN.gte(maxLimitValue)
                      ? maxLimitValue
                      : balanceBN.toString();
                  })();

                  const allAmountToBuy = maxInputValueNum;

                  const maximumFractionDigits = isCryptoCurrency
                    ? CRYPTO_FRACTION[
                        offer.price
                          .baseCurrencyCode as keyof typeof CRYPTO_FRACTION
                      ]
                    : DEFAULT_FIAT_FRACTION;

                  const allAmount =
                    offer.type === 'SALE'
                      ? printStringNumber({
                          value: roundDownFractionalDigits(
                            allAmountToBuy || '0',
                            maximumFractionDigits,
                          ),
                          languageCode,
                          options: {
                            maximumFractionDigits,
                          },
                        })
                      : printStringNumber({
                          value:
                            roundDownFractionalDigits(
                              allAmountToSell,
                              maximumFractionDigits,
                            ) || '0',
                          languageCode,
                          options: {
                            maximumFractionDigits,
                          },
                        });

                  const [strNum, num] = formatStrToNum(allAmount, {
                    locale: languageCode,
                    isAllowed: (value: BigNumber) =>
                      value.isLessThanOrEqualTo(
                        BigNumber(
                          `${MAX_NUMBER_BEFORE_DECIMAL_POINT}.999999999`,
                        ),
                      ) && value.isGreaterThanOrEqualTo(BigNumber('0')),
                    maximumFractionDigits,
                  });

                  if (strNum === null || num === null) return;

                  setInputValue(strNum);
                  setInputNum(num);
                }
              }}
            >
              {isOfferCanBeFullyFulfilled &&
                ((offer?.type === 'PURCHASE' &&
                  availableBalance !== '0' &&
                  availableBalance) ||
                  offer?.type === 'SALE') &&
                fulfillOfferText}
            </p>
          </Skeleton>
        }
        onSubmit={handleSubmit}
        isDisabled={isSubmitting || isDisabled}
      />
      <div className={themeClassName('details')}>
        <Section apple={{ fill: 'secondary' }}>
          <Skeleton
            skeleton={
              <div className={styles.skeleton}>
                <ListItemCell
                  after={
                    <div
                      style={{ width: 101 }}
                      className={styles.listItemAfter}
                    />
                  }
                >
                  <div
                    style={{ width: 120 }}
                    className={styles.listItemChildren}
                  />
                </ListItemCell>
                <ListItemCell
                  after={
                    <div
                      style={{ width: 120 }}
                      className={styles.listItemAfter}
                    />
                  }
                >
                  <div
                    style={{ width: 81 }}
                    className={styles.listItemChildren}
                  />
                </ListItemCell>
                <ListItemCell
                  after={
                    <div
                      style={{ width: 54 }}
                      className={styles.listItemAfter}
                    />
                  }
                >
                  <div
                    style={{ width: 101 }}
                    className={styles.listItemChildren}
                  />
                </ListItemCell>
              </div>
            }
            skeletonShown={isLoading}
          >
            {offer?.type === 'PURCHASE' && (
              <ListItemCell
                after={
                  <Skeleton
                    className={styles.availableBalanceSkeleton}
                    skeletonShown={isLoadingUserBalance}
                    skeleton={
                      <div className={styles.skeleton}>
                        <div
                          style={{ width: 101 }}
                          className={styles.listItemAfter}
                        />
                      </div>
                    }
                  >
                    <div className={themeClassName('detailCellAfter')}>
                      {printCryptoAmount({
                        amount: availableBalance || '0',
                        currency: cryptoCurrency as CryptoCurrency,
                        languageCode,
                        currencyDisplay: 'code',
                      })}
                    </div>
                  </Skeleton>
                }
              >
                <div className={themeClassName('detailCellText')}>
                  {t('p2p.offer_page.available_balance')}
                </div>
              </ListItemCell>
            )}
            {offer?.type === 'SALE' ? (
              <SelectList
                value={selectedPayment?.id || ''}
                options={paymentOptionsForBuyOffer}
                onChange={handleChangePaymentMethod}
                floatingShiftPadding={theme === 'apple' ? 28 : 14}
                placement="bottom-end"
              >
                <ListItemCell
                  after={
                    <CroppingText
                      value={
                        selectedPayment
                          ? getPaymentMethodName(selectedPayment)
                          : ''
                      }
                      languageCode={languageCode}
                      className={styles.selectButton}
                    >
                      {theme === 'apple' && (
                        <SelectArrowSVG className={styles.selectTextIcon} />
                      )}
                    </CroppingText>
                  }
                >
                  <p className={themeClassName('text')}>
                    {t('p2p.offer_page.payment_method')}
                  </p>
                </ListItemCell>
              </SelectList>
            ) : (
              <ListItemCell
                after={
                  <Link
                    to={generatePath(routePaths.P2P_OFFER_SELECT_PAYMENT, {
                      id: String(offer?.id),
                    })}
                  >
                    <CroppingText
                      value={
                        selectedPayment?.id
                          ? getPaymentMethodName(
                              selectedPayment,
                              selectedPaymentBank,
                            )
                          : t(`p2p.offer_page.add_payment_method`)
                      }
                      languageCode={languageCode}
                      className={styles.selectButton}
                    />
                  </Link>
                }
              >
                <p className={themeClassName('text')}>
                  {t('p2p.offer_page.payment_method')}
                </p>
              </ListItemCell>
            )}
            {limitsCanBeShown ? (
              <ListItemCell
                containerClassName={styles.limitsContainer}
                afterClassName={styles.limitsValueContainer}
                after={
                  <div className={themeClassName('detailCellAfter')}>
                    <FitTextRow>{`${minLimit} ~ ${maxLimit}`}</FitTextRow>
                  </div>
                }
              >
                <div className={themeClassName('detailCellText')}>
                  {t('p2p.offer_page.limits')}
                </div>
              </ListItemCell>
            ) : (
              <div className={styles.skeleton}>
                <ListItemCell
                  after={
                    <div
                      style={{ width: 120 }}
                      className={styles.listItemAfter}
                    />
                  }
                >
                  <div className={themeClassName('detailCellText')}>
                    {t('p2p.offer_page.limits')}
                  </div>
                </ListItemCell>
              </div>
            )}
            <ListItemCell perenniallyÐ¡hevron onClick={goToOfferDetails}>
              <div className={themeClassName('detailCellText')}>
                {t('p2p.offer_page.ad_details')}
              </div>
            </ListItemCell>
          </Skeleton>
        </Section>
      </div>

      <MainButton
        data-testid="tgcrawl"
        text={(t(mainButtonText) as string).toLocaleUpperCase()}
        disabled={isDisabled}
        color={
          isDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : button_color
        }
        textColor={
          isDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : button_text_color
        }
        progress={isSubmitting}
        onClick={handleSubmit}
      />
    </Page>
  );
};

export default OfferForm;
