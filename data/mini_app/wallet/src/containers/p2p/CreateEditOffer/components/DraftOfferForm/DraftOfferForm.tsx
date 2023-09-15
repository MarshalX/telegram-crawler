import BigNumber from 'bignumber.js';
import cn from 'classnames';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import API from 'api/p2p';
import { FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import {
  CRYPTO_FRACTION,
  DEFAULT_FIAT_FRACTION,
  P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
} from 'config';

import { RootState, useAppSelector } from 'store';

import { setDefaultCurrencies } from 'reducers/p2p/adFormSlice';
import { setP2P } from 'reducers/p2p/p2pSlice';

import { Cell, DetailCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Mono from 'components/Mono/Mono';
import { NumericInput } from 'components/NumericInput';
import Section from 'components/Section/Section';
import SegmentedControl from 'components/SegmentedControl/SegmentedControl';
import { SelectList } from 'components/SelectList';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Tabs } from 'components/Tabs/Tabs';

import { copyToClipboard } from 'utils/common/common';
import {
  printCryptoAmount,
  printFiatAmount,
  printNumber,
  roundDownFractionalDigits,
  roundUpFractionalDigits,
} from 'utils/common/currency';
import { printDuration } from 'utils/common/date';
import {
  formatBigNumberValue,
  formatValue,
} from 'utils/common/formatLocaleStrToNum';
import { logEvent } from 'utils/common/logEvent';
import { divide } from 'utils/common/math';

import { useKycPopup } from 'hooks/common/useKycPopup';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowsSVG } from 'images/arrows_vertical.svg';

import {
  DraftOffer,
  PaymentConfirmationTimeoutDuration,
  useCreateEditOfferPageContext,
} from '../../CreateEditOffer';
import InputCell from '../InputCell/InputCell';
import StepsTitle from '../StepsTitle/StepsTitle';
import styles from './DraftOfferForm.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

interface Errors {
  isFloatingPercentageError?: boolean;
  isMinOrderAmountError?: boolean;
  isAmountError?: boolean;
  isFixedPriceError?: boolean;
}

const PRICE_TYPE_LABELS = {
  fixed: 'p2p.create_offer_page.fixed',
  floating: 'p2p.create_offer_page.floating',
} as const;

const VALIDATION_TIMEOUT = 500;

const FIXED_PRICE_SNACKBAR_ID = 'fixed-price-snackbar';
const MIN_ORDER_LIMIT_SNACKBAR_ID = 'min-order-amount';
const AMOUNT_SNACKBAR_ID = 'amount-snackbar';
const FLOATING_PERCENTAGE_SNACKBAR_ID = 'floating-percentage-snackbar';

const DraftOfferForm = () => {
  const {
    draftOffer,
    setDraftOffer,
    userBalance,
    exchangePricePerUnitOfBaseCurrency,
    approximateAdPrice,
    mode,
    rates,
    isSettingsLoading,
    isRatesLoading,
    isUserBalanceLoading,
    isOfferLoading,
    offerId,
    handleFieldEdit,
    offerType,
    setOfferType,
    setIsFormWasUsed,
    settings,
    fixedPriceLimits,
    initialOfferToEdit,
  } = useCreateEditOfferPageContext();

  const CRYPTO_CURRENCIES_OPTIONS = Object.keys(
    P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
  ).map((key) => ({
    value: key as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
    label: key as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
  }));

  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const chosenCryptoCurrencyOnAssetPageForAdForm = useAppSelector(
    (state) => state.p2p.chosenCryptoCurrencyOnAssetPageForAdForm,
  );
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const navigate = useNavigate();
  const showKycPopup = useKycPopup();

  const [errors, setErrors] = useState<Errors>({});
  const [isCheckKycPromotion, setIsCheckKycPromotion] = useState(false);

  const amountInputTimeoutId = useRef<NodeJS.Timeout | null>();
  const minOrderAmountInputTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const floatingPercentageInputTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const priceInputTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const marginFieldRef = useRef<HTMLInputElement>(null);
  const priceFieldRef = useRef<HTMLInputElement>(null);
  const amountFieldRef = useRef<HTMLInputElement>(null);
  const minOrderAmountFieldRef = useRef<HTMLInputElement>(null);

  // VALIDATIONS

  const getIsMinOrderAmountMoreThanMaxAvailableVolume = useCallback(
    (draftOffer: DraftOffer) => {
      const {
        minOrderAmount,
        priceType,
        floatingPercentage,
        floatingPercentageValue,
        price,
        priceValue,
        amount,
        amountValue,
        baseCurrencyCode,
        quoteCurrencyCode,
      } = draftOffer;

      const exchangePricePerUnitOfBaseCurrency =
        Number(
          rates.find(
            (item) =>
              item.base === baseCurrencyCode &&
              item.quote === quoteCurrencyCode,
          )?.rate,
        ) || 0;

      const approximateAdPrice = exchangePricePerUnitOfBaseCurrency
        ? (Number(exchangePricePerUnitOfBaseCurrency) *
            Number(floatingPercentage || 0)) /
          100
        : 0;

      const isUserEnterValueInMarginField =
        priceType === 'floating' && floatingPercentageValue.length;

      const isUserEnterValueInPriceField =
        priceType === 'fixed' && priceValue.length;

      const P2P_SELL_OFFER_FEE = divide(
        Number(settings?.fee?.sellOfferForMakerPercent || 0),
        100,
      );

      const isAmountLessThanMinOrderAmount =
        offerType === 'SALE'
          ? amount
              .multipliedBy(priceType === 'fixed' ? price : approximateAdPrice)
              .multipliedBy(1 - P2P_SELL_OFFER_FEE)
              .isLessThan(minOrderAmount)
          : amount
              .multipliedBy(priceType === 'fixed' ? price : approximateAdPrice)
              .isLessThan(minOrderAmount);

      return (
        ((isUserEnterValueInMarginField &&
          exchangePricePerUnitOfBaseCurrency) ||
          isUserEnterValueInPriceField) &&
        amountValue.length &&
        isAmountLessThanMinOrderAmount
      );
    },
    [offerType, rates, settings?.fee?.sellOfferForMakerPercent],
  );

  const hideAmountError = useCallback(() => {
    snackbarContext.hideSnackbar(AMOUNT_SNACKBAR_ID);
    setErrors((prevState) => ({ ...prevState, isAmountError: false }));
  }, [snackbarContext]);

  const validateAmount = useCallback(
    (
      amount: BigNumber,
      amountValue: string,
      baseCurrencyCode?: DraftOffer['baseCurrencyCode'],
    ) => {
      const baseCurrency = baseCurrencyCode ?? draftOffer.baseCurrencyCode;

      const fee = BigNumber(
        initialOfferToEdit?.fee?.availableVolume?.amount || 0,
      );

      const initialOfferToEditAmount = BigNumber(
        initialOfferToEdit?.amount || 0,
      );

      const initialOfferToEditAmountWithFee =
        initialOfferToEditAmount.plus(fee);

      const balance = BigNumber(
        userBalance ? userBalance[baseCurrency] || 0 : 0,
      );

      const availableBalanceToFulfillOffer =
        mode === 'create'
          ? balance
          : balance.plus(initialOfferToEditAmountWithFee);

      const minOfferVolumeLimits = settings
        ? Number(
            settings.offerSettings?.offerVolumeLimitsByCurrencyCode[
              baseCurrency
            ].minInclusive,
          )
        : 0;

      const maxOfferVolumeLimits = settings
        ? Number(
            settings.offerSettings?.offerVolumeLimitsByCurrencyCode[
              baseCurrency
            ].maxInclusive,
          )
        : 0;

      const minVolumeLimit = minOfferVolumeLimits;
      const maxVolumeLimit = maxOfferVolumeLimits;

      const isNeedToStopAdToEditVolume =
        mode === 'edit' &&
        offerType === 'SALE' &&
        initialOfferToEdit?.status === 'ACTIVE' &&
        amount.isLessThan(initialOfferToEditAmountWithFee);

      const isAmountExceedsUserBalance =
        offerType === 'SALE' &&
        (amount.isGreaterThan(availableBalanceToFulfillOffer) || !userBalance);

      const isAmountExceedsMinLimit =
        minVolumeLimit && amount.isLessThan(minVolumeLimit);
      const isAmountExceedsMaxLimit =
        maxVolumeLimit && amount.isGreaterThan(maxVolumeLimit);
      const isAmountIsEmpty = !amountValue;

      if (
        isAmountExceedsUserBalance ||
        isAmountExceedsMinLimit ||
        isAmountExceedsMaxLimit ||
        isAmountIsEmpty ||
        isNeedToStopAdToEditVolume
      ) {
        setErrors((prevState) => ({ ...prevState, isAmountError: true }));
      }

      if (isAmountExceedsUserBalance) {
        snackbarContext.showSnackbar({
          snackbarId: AMOUNT_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.not_enough_coins_error'),
        });
      } else if (
        isAmountExceedsMinLimit ||
        isAmountExceedsMaxLimit ||
        isAmountIsEmpty
      ) {
        snackbarContext.showSnackbar({
          snackbarId: AMOUNT_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.wrong_amount_error', {
            min: minVolumeLimit,
            max: maxVolumeLimit,
          }),
        });
      } else if (isNeedToStopAdToEditVolume) {
        snackbarContext.showSnackbar({
          snackbarId: AMOUNT_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.stop_ad_to_reduce_volume'),
        });
      } else {
        hideAmountError();
        return true;
      }

      return false;
    },
    [
      mode,
      draftOffer.baseCurrencyCode,
      settings,
      initialOfferToEdit,
      userBalance,
      offerType,
      snackbarContext,
      t,
      hideAmountError,
    ],
  );

  const validateFloatingPercentage = useCallback(
    ({ floatingPercentage }: { floatingPercentage: number }) => {
      const floatingMin = settings
        ? Number(settings.offerSettings.floatingPriceLimits.minInclusive)
        : 0;
      const floatingMax = settings
        ? Number(settings.offerSettings.floatingPriceLimits.maxInclusive)
        : 0;

      const isFloatingPercentageExceedsMinOrMaxLimit =
        (settings &&
          (floatingPercentage < floatingMin ||
            floatingPercentage > floatingMax)) ||
        !settings;

      if (isFloatingPercentageExceedsMinOrMaxLimit) {
        setErrors((prevState) => ({
          ...prevState,
          isFloatingPercentageError: true,
        }));
      }

      if (isFloatingPercentageExceedsMinOrMaxLimit) {
        snackbarContext.showSnackbar({
          snackbarId: FLOATING_PERCENTAGE_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.wrong_margin_error', {
            min: floatingMin,
            max: floatingMax,
          }),
        });
      } else {
        snackbarContext.hideSnackbar(FLOATING_PERCENTAGE_SNACKBAR_ID);
        setErrors((prevState) => ({
          ...prevState,
          isFloatingPercentageError: false,
        }));
        return true;
      }

      return false;
    },
    [settings, snackbarContext, t],
  );

  const validateFixedPrice = useCallback(
    ({ price, priceValue }: { price: number; priceValue: string }) => {
      const isEmptyLength = !priceValue;

      const maxPriceInclusive = fixedPriceLimits?.maxPriceInclusive || 0;
      const minPriceInclusive = fixedPriceLimits?.minPriceInclusive || 0;
      const maxPriceInclusiveRoundedDown = roundDownFractionalDigits(
        maxPriceInclusive || '0',
        2,
      );
      const minPriceInclusiveRoundedUp = roundUpFractionalDigits(
        Number(minPriceInclusive),
        2,
      );

      const isPriceExceedsMinLimit =
        !!minPriceInclusiveRoundedUp &&
        BigNumber(price).isLessThan(minPriceInclusiveRoundedUp);

      const isPriceExceedsMaxLimit =
        !!maxPriceInclusiveRoundedDown &&
        BigNumber(price).isGreaterThan(maxPriceInclusiveRoundedDown);

      if (isEmptyLength || isPriceExceedsMinLimit || isPriceExceedsMaxLimit) {
        setErrors((prevState) => ({
          ...prevState,
          isFixedPriceError: true,
        }));
      }

      if (isEmptyLength) {
        snackbarContext.showSnackbar({
          snackbarId: FIXED_PRICE_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.unit_price_is_empty'),
        });
      } else if (
        minPriceInclusiveRoundedUp &&
        maxPriceInclusiveRoundedDown &&
        (isPriceExceedsMaxLimit || isPriceExceedsMinLimit)
      ) {
        snackbarContext.showSnackbar({
          snackbarId: FIXED_PRICE_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.wrong_unit_price_error', {
            min: printFiatAmount({
              amount: minPriceInclusiveRoundedUp,
              currency: draftOffer.quoteCurrencyCode as FiatCurrency,
              languageCode,
              currencyDisplay: 'code',
            }),
            max: printFiatAmount({
              amount: maxPriceInclusiveRoundedDown,
              currency: draftOffer.quoteCurrencyCode as FiatCurrency,
              languageCode,
              currencyDisplay: 'code',
            }),
          }),
        });
      } else {
        snackbarContext.hideSnackbar(FIXED_PRICE_SNACKBAR_ID);
        setErrors((prevState) => ({ ...prevState, isFixedPriceError: false }));
        return true;
      }

      return false;
    },
    [
      draftOffer,
      fixedPriceLimits?.maxPriceInclusive,
      fixedPriceLimits?.minPriceInclusive,
      languageCode,
      snackbarContext,
      t,
    ],
  );

  const hideMinOrderAmountExceedsMaxAvailableVolumeError = useCallback(() => {
    snackbarContext.hideSnackbar(MIN_ORDER_LIMIT_SNACKBAR_ID);
    setErrors((prevState) => ({
      ...prevState,
      isMinOrderAmountError: false,
    }));
  }, [snackbarContext]);

  const isMinLimitErrorExists = useRef(false);

  useEffect(() => {
    const isMinLimitError =
      getIsMinOrderAmountMoreThanMaxAvailableVolume(draftOffer);

    if (!isMinLimitError && isMinLimitErrorExists.current) {
      hideMinOrderAmountExceedsMaxAvailableVolumeError();
      isMinLimitErrorExists.current = false;
    }

    if (isMinLimitError) {
      isMinLimitErrorExists.current = true;
    }
  }, [
    draftOffer,
    getIsMinOrderAmountMoreThanMaxAvailableVolume,
    hideMinOrderAmountExceedsMaxAvailableVolumeError,
  ]);

  const validateMinOrderAmount = useCallback(
    (draftOffer: DraftOffer) => {
      const { minOrderAmount, quoteCurrencyCode } = draftOffer;

      const minOrderAmountLimit = settings
        ? Number(
            settings.offerSettings.minOrderAmountByCurrencyCode[
              quoteCurrencyCode
            ],
          )
        : 0;

      const isMinOrderAmountExceedsMinLimit =
        minOrderAmountLimit && minOrderAmount < minOrderAmountLimit;

      const isMinOrderAmountMoreThanMaxAvailableVolume =
        getIsMinOrderAmountMoreThanMaxAvailableVolume(draftOffer);

      if (
        isMinOrderAmountExceedsMinLimit ||
        isMinOrderAmountMoreThanMaxAvailableVolume
      ) {
        setErrors((prevState) => ({
          ...prevState,
          isMinOrderAmountError: true,
        }));
      }

      if (isMinOrderAmountMoreThanMaxAvailableVolume) {
        snackbarContext.showSnackbar({
          snackbarId: MIN_ORDER_LIMIT_SNACKBAR_ID,
          icon: 'warning',
          text: t(
            'p2p.create_offer_page.min_order_more_than_max_available_volume',
          ),
        });
      } else if (isMinOrderAmountExceedsMinLimit) {
        snackbarContext.showSnackbar({
          snackbarId: MIN_ORDER_LIMIT_SNACKBAR_ID,
          icon: 'warning',
          text: t('p2p.create_offer_page.min_order_limit_error', {
            count: minOrderAmountLimit,
          }),
        });
      } else {
        hideMinOrderAmountExceedsMaxAvailableVolumeError();
        return true;
      }

      return false;
    },
    [
      getIsMinOrderAmountMoreThanMaxAvailableVolume,
      hideMinOrderAmountExceedsMaxAvailableVolumeError,
      settings,
      snackbarContext,
      t,
    ],
  );

  // HANDLERS

  const isAlreadySentEventOnCryptoCurrencyChange = useRef(false);

  const handleBaseCurrencyChange = useCallback(
    (value) => {
      dispatch(
        setDefaultCurrencies({
          crypto: value as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
        }),
      );

      setDraftOffer((offer) => ({
        ...offer,
        baseCurrencyCode: value,
      }));

      dispatch(
        setP2P({
          chosenCryptoCurrencyOnAssetPageForAdForm: undefined,
        }),
      );

      if (
        chosenCryptoCurrencyOnAssetPageForAdForm &&
        !isAlreadySentEventOnCryptoCurrencyChange.current
      ) {
        logEvent('Change crypto currency from asset page on offer form', {
          asset: chosenCryptoCurrencyOnAssetPageForAdForm,
          changeTo: value,
        });

        isAlreadySentEventOnCryptoCurrencyChange.current = true;
      }

      hideAmountError();
    },
    [
      chosenCryptoCurrencyOnAssetPageForAdForm,
      dispatch,
      hideAmountError,
      setDraftOffer,
    ],
  );

  const handlePriceTypeChange = useCallback(
    (value) => {
      setDraftOffer((offer) => ({
        ...offer,
        priceType: value,
      }));
    },
    [setDraftOffer],
  );

  const handleAmountChange = useCallback(
    (value: string) => {
      const [strNum, num] = formatBigNumberValue(value, {
        locale: languageCode,
        isAllowed: (value) =>
          value.isLessThanOrEqualTo(BigNumber('999999.999999999')) &&
          value.isGreaterThanOrEqualTo(BigNumber('0')),
        prevValue: draftOffer.amountValue,
        maximumFractionDigits: CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
      });

      if (strNum === null || num === null) return;

      setDraftOffer((offer) => ({
        ...offer,
        amount: num,
        amountValue: strNum,
      }));

      setIsFormWasUsed(true);

      if (amountInputTimeoutId.current) {
        clearTimeout(amountInputTimeoutId.current);
      }

      amountInputTimeoutId.current = setTimeout(() => {
        validateAmount(num, strNum);
      }, VALIDATION_TIMEOUT);
    },
    [draftOffer, languageCode, setDraftOffer, setIsFormWasUsed, validateAmount],
  );

  const handlePriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const [strNum, num] = formatBigNumberValue(value, {
        locale: languageCode,
        isAllowed: (value) =>
          value.isLessThanOrEqualTo(BigNumber('999999999.99')) &&
          value.isGreaterThanOrEqualTo(BigNumber('0')),
        prevValue: draftOffer.priceValue,
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      });

      if (strNum === null || num === null) return;

      handleFieldEdit({
        field: 'price',
        numValue: num,
      });

      setDraftOffer((offer) => ({
        ...offer,
        price: num.toNumber(),
        priceValue: strNum,
      }));

      setIsFormWasUsed(true);

      if (priceInputTimeoutId.current) {
        clearTimeout(priceInputTimeoutId.current);
      }

      priceInputTimeoutId.current = setTimeout(() => {
        validateFixedPrice({
          price: num.toNumber(),
          priceValue: strNum,
        });
      }, VALIDATION_TIMEOUT);
    },
    [
      languageCode,
      draftOffer,
      handleFieldEdit,
      setDraftOffer,
      setIsFormWasUsed,
      validateFixedPrice,
    ],
  );

  const handleFloatingPercentageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const [strNum, num] = formatBigNumberValue(value, {
        locale: languageCode,
        isAllowed: (value) =>
          value.isLessThanOrEqualTo(BigNumber('999.99')) &&
          value.isGreaterThanOrEqualTo(BigNumber('0')),
        prevValue: draftOffer.floatingPercentageValue,
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      });

      if (strNum === null || num === null) return;

      handleFieldEdit({
        field: 'floatingPercentage',
        numValue: num,
      });

      setDraftOffer((offer) => ({
        ...offer,
        floatingPercentage: num.toNumber(),
        floatingPercentageValue: strNum,
      }));

      setIsFormWasUsed(true);

      if (floatingPercentageInputTimeoutId.current) {
        clearTimeout(floatingPercentageInputTimeoutId.current);
      }

      floatingPercentageInputTimeoutId.current = setTimeout(() => {
        validateFloatingPercentage({
          floatingPercentage: num.toNumber(),
        });
      }, VALIDATION_TIMEOUT);
    },
    [
      draftOffer.floatingPercentageValue,
      handleFieldEdit,
      languageCode,
      setDraftOffer,
      setIsFormWasUsed,
      validateFloatingPercentage,
    ],
  );

  const handleMinOrderAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const [strNum, num] = formatValue(value, {
        locale: languageCode,
        isAllowed: (value) => value <= 999999999.99 && value >= 0,
        prevValue: draftOffer.minOrderAmountValue,
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      });

      if (strNum === null || num === null) return;

      handleFieldEdit({
        field: 'minOrderAmount',
        numValue: BigNumber(num),
      });

      setDraftOffer((offer) => ({
        ...offer,
        minOrderAmount: num,
        minOrderAmountValue: strNum,
      }));

      setIsFormWasUsed(true);

      if (minOrderAmountInputTimeoutId.current) {
        clearTimeout(minOrderAmountInputTimeoutId.current);
      }

      minOrderAmountInputTimeoutId.current = setTimeout(() => {
        validateMinOrderAmount({
          ...draftOffer,
          minOrderAmount: num,
          minOrderAmountValue: strNum,
        });
      }, VALIDATION_TIMEOUT);
    },
    [
      draftOffer,
      handleFieldEdit,
      languageCode,
      setDraftOffer,
      setIsFormWasUsed,
      validateMinOrderAmount,
    ],
  );

  const handlePaymentConfirmationTimeoutChange = useCallback(
    (value) => {
      setDraftOffer((offer) => ({
        ...offer,
        paymentConfirmationTimeout: value,
      }));

      setIsFormWasUsed(true);
    },
    [setDraftOffer, setIsFormWasUsed],
  );

  const handleComplete = useCallback(
    async (event?: React.FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      if (draftOffer.priceType === 'floating') {
        const isFloatingPercentageValid =
          draftOffer.priceType === 'floating' &&
          validateFloatingPercentage({
            floatingPercentage: draftOffer.floatingPercentage,
          });

        if (!isFloatingPercentageValid) {
          marginFieldRef.current?.focus();
          return;
        }
      } else if (draftOffer.priceType === 'fixed') {
        const isFixedPriceValid =
          draftOffer.priceType === 'fixed' &&
          validateFixedPrice({
            price: draftOffer.price,
            priceValue: draftOffer.priceValue,
          });

        if (!isFixedPriceValid) {
          priceFieldRef.current?.focus();
          return;
        }
      }

      const isAmountValid = validateAmount(
        draftOffer.amount,
        draftOffer.amountValue,
      );

      if (!isAmountValid) {
        amountFieldRef.current?.focus();
        return;
      }

      const isMinOrderAmountValid = validateMinOrderAmount(draftOffer);

      if (!isMinOrderAmountValid) {
        minOrderAmountFieldRef.current?.focus();
        return;
      }

      if (offerType === 'PURCHASE') {
        setIsCheckKycPromotion(true);

        const response = await API.Offer.checkMakerLimitsToBuyOffer({
          volume: {
            currencyCode: draftOffer.baseCurrencyCode,
            amount: draftOffer.amount.toString(),
          },
          ...(offerId ? { excludeOfferId: Number(offerId) } : {}),
        });

        if (response.data.status === 'KYC_PROMOTION_REQUIRED') {
          showKycPopup(response.data.errorDetails?.promotionKYCLevel);
          setIsCheckKycPromotion(false);
          return;
        }

        setIsCheckKycPromotion(false);
      }

      const nextRoute = (() => {
        if (mode === 'create' && offerType === 'SALE') {
          return routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS;
        } else if (mode === 'create' && offerType === 'PURCHASE') {
          return routePaths.P2P_OFFER_CREATE_CHOOSE_PAYMENT_METHODS;
        } else if (mode === 'edit' && offerType === 'SALE') {
          return generatePath(routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS, {
            id: offerId!,
          });
        } else {
          return generatePath(
            routePaths.P2P_OFFER_EDIT_CHOOSE_PAYMENT_METHODS,
            {
              id: offerId!,
            },
          );
        }
      })();

      navigate(nextRoute);

      if (mode === 'create') {
        logEvent('Maker. Creation step 1 completed', {
          category: 'p2p.merchant.ad',
          type: offerType === 'SALE' ? 'sell' : 'buy',
        });
      }
    },
    [
      draftOffer,
      mode,
      navigate,
      offerId,
      offerType,
      validateAmount,
      validateFixedPrice,
      validateFloatingPercentage,
      validateMinOrderAmount,
    ],
  );

  const handleOfferTypeChange = (index: number) => {
    const isSelectingPurchase = index === 0;

    setOfferType(isSelectingPurchase ? 'PURCHASE' : 'SALE');
    hideAmountError();
    hideMinOrderAmountExceedsMaxAvailableVolumeError();
  };

  // LIFECYCLE HOOKS

  useEffect(() => {
    if (chosenCryptoCurrencyOnAssetPageForAdForm) {
      logEvent('Set crypto currency from asset page on offer form', {
        asset: chosenCryptoCurrencyOnAssetPageForAdForm,
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (amountInputTimeoutId.current) {
        clearTimeout(amountInputTimeoutId.current);
      }

      if (priceInputTimeoutId.current) {
        clearTimeout(priceInputTimeoutId.current);
      }

      if (floatingPercentageInputTimeoutId.current) {
        clearTimeout(floatingPercentageInputTimeoutId.current);
      }

      if (minOrderAmountInputTimeoutId.current) {
        clearTimeout(minOrderAmountInputTimeoutId.current);
      }
    };
  }, []);

  // COMPUTATIONS

  const handleOrderIdClick = () => {
    if (!draftOffer.number) return;

    copyToClipboard(draftOffer.number).then(() => {
      snackbarContext.showSnackbar({
        text: t('common.copied_to_clipboard'),
      });
    });
  };

  const floatingShiftPadding = theme === 'apple' ? 28 : 14;

  const firstSectionTitle = useMemo(() => {
    if (draftOffer.priceType === 'floating') {
      return theme === 'material'
        ? t('p2p.create_offer_page.margin')
        : t('p2p.create_offer_page.margin').toLocaleUpperCase();
    } else {
      return theme === 'material'
        ? t('p2p.create_offer_page.fixed_price')
        : t('p2p.create_offer_page.fixed_price').toLocaleUpperCase();
    }
  }, [draftOffer.priceType, t, theme]);

  const isFormCompleted = useMemo(() => {
    if (
      mode === 'edit' &&
      !isOfferLoading &&
      (draftOffer.priceType === 'floating'
        ? !!draftOffer.floatingPercentage
        : !!draftOffer.price) &&
      draftOffer.amount &&
      draftOffer.minOrderAmount
    ) {
      return true;
    } else if (
      mode === 'create' &&
      !isSettingsLoading &&
      !isRatesLoading &&
      !isUserBalanceLoading
    ) {
      return true;
    }

    return false;
  }, [
    mode,
    isOfferLoading,
    draftOffer.priceType,
    draftOffer.floatingPercentage,
    draftOffer.price,
    draftOffer.amount,
    draftOffer.minOrderAmount,
    isSettingsLoading,
    isRatesLoading,
    isUserBalanceLoading,
  ]);

  const makeInputWideOnIos = languageCode === 'uz' || languageCode === 'it';
  const userBalancePerBaseCurrency = userBalance?.[draftOffer.baseCurrencyCode];
  const paymentConfirmationTimeoutOptions = useMemo(() => {
    const durations: PaymentConfirmationTimeoutDuration[] = [
      'PT15M',
      'PT30M',
      'PT45M',
      'PT1H',
      'PT2H',
      'PT3H',
    ];

    return durations.map((duration) => ({
      label: printDuration(duration),
      value: duration,
    }));
  }, []);

  const handleSellMaxBalanceClick = () => {
    const maxAmount = userBalancePerBaseCurrency;

    if (!maxAmount || maxAmount === '0') return;

    const maxLimit =
      settings?.offerSettings?.offerVolumeLimitsByCurrencyCode?.[
        draftOffer.baseCurrencyCode
      ]?.maxInclusive || 0;

    const finalValue = BigNumber(maxAmount).gt(BigNumber(maxLimit))
      ? maxLimit
      : maxAmount;

    const maxAmountInLocaleStr = printNumber({
      value: Number(finalValue),
      languageCode,
      options: {
        maximumFractionDigits: CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
      },
    });

    handleAmountChange(maxAmountInLocaleStr);
  };

  const availableAmount = useMemo(() => {
    if (!userBalancePerBaseCurrency) return null;

    const fee = BigNumber(
      initialOfferToEdit?.fee?.availableVolume?.amount || 0,
    );
    const initialOfferToEditAmount = BigNumber(initialOfferToEdit?.amount || 0);
    const initialOfferToEditAmountWithFee = initialOfferToEditAmount.plus(fee);
    const balance = BigNumber(userBalancePerBaseCurrency);

    const availableBalanceToFulfillOffer =
      initialOfferToEdit?.status === 'INACTIVE'
        ? balance
        : balance.plus(initialOfferToEditAmountWithFee);

    return availableBalanceToFulfillOffer.toString();
  }, [initialOfferToEdit, userBalancePerBaseCurrency]);

  const handleSellMaxVolumeClick = () => {
    if (!availableAmount || availableAmount === '0') return;

    const maxLimit =
      settings?.offerSettings.offerVolumeLimitsByCurrencyCode[
        draftOffer.baseCurrencyCode
      ].maxInclusive || 0;

    const finalValue = BigNumber(availableAmount).gt(BigNumber(maxLimit))
      ? maxLimit
      : availableAmount;

    const maxAmountInLocaleStr = printNumber({
      value: Number(finalValue),
      languageCode,
      options: {
        maximumFractionDigits: CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
      },
    });

    handleAmountChange(maxAmountInLocaleStr);
  };

  const amountPlaceholder = useMemo(() => {
    const fee = BigNumber(
      initialOfferToEdit?.fee?.availableVolume?.amount || 0,
    );
    const initialOfferToEditAmount = BigNumber(initialOfferToEdit?.amount || 0);
    const initialOfferToEditAmountWithFee = initialOfferToEditAmount.plus(fee);

    if (mode === 'edit') {
      return printNumber({
        value: Number(initialOfferToEditAmountWithFee),
        languageCode,
        options: {
          maximumFractionDigits: CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
        },
      });
    }

    return t('p2p.create_offer_page.amount');
  }, [draftOffer.baseCurrencyCode, initialOfferToEdit, languageCode, mode, t]);

  return (
    <form className={themeClassName('root')} onSubmit={handleComplete}>
      <StepsTitle
        title={
          mode === 'create' ? (
            t('p2p.create_offer_page.create_an_ad')
          ) : (
            <Trans
              values={{ orderId: draftOffer.number }}
              i18nKey={'p2p.create_offer_page.your_order'}
              t={t}
              components={[
                <Mono
                  key="orderId"
                  className={themeClassName('orderId')}
                  onClick={handleOrderIdClick}
                />,
              ]}
            />
          )
        }
        step={1}
        total={4}
      />
      {isOfferLoading ? (
        <Section separator>
          <DetailCell after fetching />
          <DetailCell after fetching />
          <DetailCell after fetching />
        </Section>
      ) : (
        <>
          <Section separator={theme === 'material'}>
            <Cell
              end={
                theme === 'apple' ? (
                  <Cell.Part type="segmentedControl">
                    <SegmentedControl
                      disabled={mode === 'edit'}
                      items={[t('p2p.buy'), t('p2p.sell')]}
                      onChange={handleOfferTypeChange}
                      activeItemIndex={offerType === 'PURCHASE' ? 0 : 1}
                      data-testid="tgcrawl"
                    />
                  </Cell.Part>
                ) : (
                  <Cell.Part type="tabs">
                    <Tabs
                      disabled={mode === 'edit'}
                      tabs={[t('p2p.buy'), t('p2p.sell')]}
                      activeTabIndex={offerType === 'PURCHASE' ? 0 : 1}
                      onChange={handleOfferTypeChange}
                      data-testid="tgcrawl"
                    />
                  </Cell.Part>
                )
              }
              separator
            >
              <Cell.Text title={t('p2p.create_offer_page.i_want_to')} />
            </Cell>

            <SelectList
              data-testid="tgcrawl"
              value={draftOffer.baseCurrencyCode}
              options={CRYPTO_CURRENCIES_OPTIONS}
              onChange={handleBaseCurrencyChange}
              floatingShiftPadding={floatingShiftPadding}
              placement="bottom-end"
              disabled={mode === 'edit'}
            >
              <DetailCell
                before={
                  offerType === 'PURCHASE'
                    ? t('p2p.create_offer_page.buy_crypto')
                    : t('p2p.create_offer_page.sell_crypto')
                }
                after={
                  <div
                    className={cn(
                      themeClassName('selectContainer'),
                      mode === 'edit' && styles.disabled,
                    )}
                  >
                    <div>
                      {
                        P2P_CRYPTO_CURRENCIES_MULTICURRENCY[
                          draftOffer.baseCurrencyCode
                        ]
                      }
                    </div>
                    <ArrowsSVG className={themeClassName('selectArrows')} />
                  </div>
                }
              />
            </SelectList>
            <DetailCell
              onClick={
                mode === 'create'
                  ? () => {
                      navigate(routePaths.P2P_OFFER_CREATE_SELECT_CURRENCY);
                    }
                  : undefined
              }
              before={t('p2p.create_offer_page.fiat_currency')}
              after={
                <div
                  className={cn(
                    themeClassName('selectContainer'),
                    mode === 'edit' && styles.disabled,
                  )}
                >
                  <div>{draftOffer.quoteCurrencyCode}</div>
                  <ArrowsSVG className={themeClassName('selectArrows')} />
                </div>
              }
            />

            <SelectList
              data-testid="tgcrawl"
              value={draftOffer.priceType}
              options={[
                {
                  value: 'floating',
                  label: t(PRICE_TYPE_LABELS.floating),
                },
                {
                  value: 'fixed',
                  label: t(PRICE_TYPE_LABELS.fixed),
                },
              ]}
              onChange={handlePriceTypeChange}
              floatingShiftPadding={floatingShiftPadding}
              placement="bottom-end"
            >
              <DetailCell
                before={t('p2p.create_offer_page.price_type')}
                after={
                  <div className={themeClassName('selectContainer')}>
                    <div>{t(PRICE_TYPE_LABELS[draftOffer.priceType])}</div>
                    <ArrowsSVG className={themeClassName('selectArrows')} />
                  </div>
                }
              />
            </SelectList>
          </Section>

          <Section
            separator={theme === 'material'}
            title={firstSectionTitle}
            material={{ descriptionLayout: 'outer' }}
            description={
              <>
                <div className={styles.flexAlignCenter}>
                  <div className={styles.descriptionLabel}>
                    {t('p2p.create_offer_page.market_price')}:
                  </div>
                  <Skeleton
                    skeletonShown={
                      isRatesLoading || exchangePricePerUnitOfBaseCurrency === 0
                    }
                    skeleton={<div className={themeClassName('skeleton')} />}
                    skeletonClassName={styles.skeletonContainer}
                  >
                    {exchangePricePerUnitOfBaseCurrency !== 0 && (
                      <span
                        className={themeClassName('cellDescriptionPrice')}
                        data-testid="tgcrawl"
                      >
                        {printFiatAmount({
                          amount: exchangePricePerUnitOfBaseCurrency,
                          currency:
                            draftOffer.quoteCurrencyCode as FiatCurrency,
                          languageCode,
                        })}
                      </span>
                    )}
                  </Skeleton>
                </div>
                {draftOffer.priceType === 'floating' && (
                  <div className={styles.flexAlignCenter}>
                    <div
                      className={cn(
                        styles.descriptionLabel,
                        styles.textMainColor,
                      )}
                    >
                      {t('p2p.create_offer_page.your_ad_price')}:
                    </div>
                    <span className={themeClassName('cellDescriptionPrice')}>
                      {printFiatAmount({
                        amount: approximateAdPrice,
                        currency: draftOffer.quoteCurrencyCode as FiatCurrency,
                        languageCode,
                      })}
                    </span>
                  </div>
                )}
              </>
            }
          >
            <InputCell>
              <div
                className={cn(
                  themeClassName('inputContainer'),
                  themeClassName('materialInput'),
                  themeClassName('firstInputContainer'),
                  themeClassName('lastInputContainer'),
                  makeInputWideOnIos && themeClassName('wideInput'),
                  ((draftOffer.priceType === 'floating' &&
                    errors.isFloatingPercentageError) ||
                    (draftOffer.priceType === 'fixed' &&
                      errors.isFixedPriceError)) &&
                    themeClassName('inputError'),
                )}
              >
                {draftOffer.priceType === 'floating' ? (
                  <>
                    <NumericInput
                      ref={marginFieldRef}
                      id="tgcrawl"
                      data-testid="tgcrawl"
                      autoComplete="off"
                      inputMode="decimal"
                      placeholder={
                        settings?.offerSettings?.floatingPriceLimits
                          ?.minInclusive
                          ? `${settings.offerSettings.floatingPriceLimits.minInclusive} ~ ${settings.offerSettings.floatingPriceLimits.maxInclusive}`
                          : '30 ~ 170'
                      }
                      onChange={handleFloatingPercentageChange}
                      value={draftOffer.floatingPercentageValue}
                      className={themeClassName('input')}
                    />
                    <label
                      htmlFor="margin"
                      className={themeClassName('inputCurrencyLabel')}
                    >
                      %
                    </label>
                  </>
                ) : (
                  <>
                    <NumericInput
                      ref={priceFieldRef}
                      id="tgcrawl"
                      data-testid="tgcrawl"
                      autoComplete="off"
                      inputMode="decimal"
                      placeholder={t(
                        'p2p.create_offer_page.price_per_one_unit',
                      )}
                      onChange={handlePriceChange}
                      value={draftOffer.priceValue}
                      className={themeClassName('input')}
                    />
                    <label
                      htmlFor="price"
                      className={themeClassName('inputCurrencyLabel')}
                    >
                      {draftOffer.quoteCurrencyCode}
                    </label>
                  </>
                )}
              </div>
            </InputCell>
          </Section>

          <Section
            separator={theme === 'material'}
            title={
              theme === 'material'
                ? t('p2p.create_offer_page.amount')
                : t('p2p.create_offer_page.amount').toLocaleUpperCase()
            }
            material={{ descriptionLayout: 'outer' }}
            description={
              <div>
                <div className={styles.flexAlignCenter}>
                  <div className={styles.descriptionLabel}>
                    {t('p2p.create_offer_page.your_balance')}:
                  </div>
                  <Skeleton
                    skeletonShown={
                      isUserBalanceLoading ||
                      userBalancePerBaseCurrency === undefined
                    }
                    skeleton={<div className={themeClassName('skeleton')} />}
                    skeletonClassName={styles.skeletonContainer}
                  >
                    {userBalancePerBaseCurrency !== undefined && (
                      <div>
                        <span
                          className={themeClassName('cellDescriptionPrice')}
                          data-testid="tgcrawl"
                        >
                          {printCryptoAmount({
                            amount: userBalancePerBaseCurrency || 0,
                            currency: draftOffer.baseCurrencyCode,
                            languageCode,
                            currencyDisplay: 'code',
                            maximumFractionDigits:
                              CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
                          })}
                        </span>
                        {offerType === 'SALE' && mode === 'create' && (
                          <>
                            {' '}
                            ·{' '}
                            <button
                              className={themeClassName('maxBalance')}
                              type="button"
                              onClick={handleSellMaxBalanceClick}
                            >
                              {t('p2p.create_offer_page.max')}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </Skeleton>
                </div>
                {mode === 'edit' && offerType === 'SALE' && (
                  <div className={styles.flexAlignCenter}>
                    <div
                      className={cn(
                        styles.descriptionLabel,
                        styles.textMainColor,
                      )}
                    >
                      {t('p2p.create_offer_page.available_amount')}:
                    </div>
                    <Skeleton
                      skeletonShown={isUserBalanceLoading}
                      skeleton={<div className={themeClassName('skeleton')} />}
                      skeletonClassName={styles.skeletonContainer}
                    >
                      <div>
                        <span
                          className={themeClassName('cellDescriptionPrice')}
                        >
                          {printCryptoAmount({
                            amount: availableAmount || 0,
                            currency: draftOffer.baseCurrencyCode,
                            languageCode,
                            currencyDisplay: 'code',
                            maximumFractionDigits:
                              CRYPTO_FRACTION[draftOffer.baseCurrencyCode],
                          })}
                        </span>
                        {offerType === 'SALE' && (
                          <>
                            {' '}
                            ·{' '}
                            <button
                              className={themeClassName('maxBalance')}
                              type="button"
                              onClick={handleSellMaxVolumeClick}
                            >
                              {t('p2p.create_offer_page.max')}
                            </button>
                          </>
                        )}
                      </div>
                    </Skeleton>
                  </div>
                )}
              </div>
            }
          >
            <InputCell>
              <div
                className={cn(
                  themeClassName('inputContainer'),
                  themeClassName('materialInput'),
                  themeClassName('firstInputContainer'),
                  themeClassName('lastInputContainer'),
                  makeInputWideOnIos && themeClassName('wideInput'),
                  errors.isAmountError && themeClassName('inputError'),
                )}
              >
                <NumericInput
                  ref={amountFieldRef}
                  id="tgcrawl"
                  data-testid="tgcrawl"
                  autoComplete="off"
                  inputMode="decimal"
                  placeholder={amountPlaceholder}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleAmountChange(event.target.value);
                  }}
                  value={draftOffer.amountValue}
                  className={themeClassName('input')}
                />
                <label
                  htmlFor="amount"
                  className={themeClassName('inputCurrencyLabel')}
                >
                  {
                    P2P_CRYPTO_CURRENCIES_MULTICURRENCY[
                      draftOffer.baseCurrencyCode
                    ]
                  }
                </label>
              </div>
            </InputCell>
          </Section>

          <Section
            title={
              theme === 'material'
                ? t('p2p.create_offer_page.order_limit')
                : t('p2p.create_offer_page.order_limit').toLocaleUpperCase()
            }
            separator={theme === 'material'}
          >
            <InputCell>
              <div
                className={cn(
                  themeClassName('inputContainer'),
                  themeClassName('materialInput'),
                  themeClassName('firstInputContainer'),
                  themeClassName('lastInputContainer'),
                  makeInputWideOnIos && themeClassName('wideInput'),
                  errors.isMinOrderAmountError && themeClassName('inputError'),
                )}
              >
                <NumericInput
                  ref={minOrderAmountFieldRef}
                  id="tgcrawl"
                  data-testid="tgcrawl"
                  autoComplete="off"
                  inputMode="decimal"
                  placeholder={t('p2p.create_offer_page.min')}
                  onChange={handleMinOrderAmountChange}
                  value={draftOffer.minOrderAmountValue}
                  className={themeClassName('input')}
                />
                <label
                  data-testid="tgcrawl"
                  htmlFor="minLimit"
                  className={themeClassName('inputCurrencyLabel')}
                >
                  {draftOffer.quoteCurrencyCode}
                </label>
              </div>
            </InputCell>
          </Section>

          <Section
            separator
            className={themeClassName('paymentConfirmationTimeoutContainer')}
          >
            <DetailCell
              header=""
              before={t('p2p.create_offer_page.payment_timeout')}
              after={
                <SelectList
                  data-testid="tgcrawl"
                  value={draftOffer.paymentConfirmationTimeout}
                  options={paymentConfirmationTimeoutOptions}
                  onChange={handlePaymentConfirmationTimeoutChange}
                  floatingShiftPadding={floatingShiftPadding}
                  popoverClassName={themeClassName(
                    'paymentConfirmationTimeoutPopover',
                  )}
                  childrenClassNameOnOpen={
                    styles.paymentConfirmationTimeoutBtnActive
                  }
                >
                  <div
                    className={styles.paymentConfirmationTimeoutBtnContainer}
                  >
                    <button
                      type="button"
                      data-testid="tgcrawl"
                      className={cn(
                        themeClassName('paymentConfirmationTimeoutBtn'),
                      )}
                    >
                      {printDuration(draftOffer.paymentConfirmationTimeout)}
                    </button>
                  </div>
                </SelectList>
              }
            />
          </Section>
        </>
      )}
      <MainButton
        type="submit"
        color={
          isFormCompleted
            ? button_color
            : customPalette[theme][colorScheme].button_disabled_color
        }
        textColor={
          isFormCompleted
            ? button_text_color
            : customPalette[theme][colorScheme].button_disabled_text_color
        }
        text={t('p2p.create_offer_page.continue').toLocaleUpperCase()}
        progress={isCheckKycPromotion}
        disabled={!isFormCompleted || isCheckKycPromotion}
        onClick={handleComplete}
        data-testid="tgcrawl"
      />
    </form>
  );
};

export default DraftOfferForm;
