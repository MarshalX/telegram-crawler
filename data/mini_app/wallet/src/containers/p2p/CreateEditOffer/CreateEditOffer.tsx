import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line
// @ts-ignore
// This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Outlet,
  createSearchParams,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { concat, uniqBy } from 'remeda';

import API from 'api/p2p';
import {
  BaseOfferRestDto,
  BaseOfferRestDtoTypeEnum,
  OfferFixedPriceLimitsRestDto,
  PaymentDetailsRestDto,
  PaymentMethodRestDto,
  SellOfferRestDto,
  SettingsRestDto,
} from 'api/p2p/generated-common';
import { RateDto } from 'api/p2p/generated-exchange';
import WalletAPI from 'api/wallet';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import {
  CRYPTO_FRACTION,
  DEFAULT_FIAT_FRACTION,
  DEPRECATED_P2P_PAYMENT_METHODS,
  P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
} from 'config';

import { RootState, useAppDispatch } from 'store';

import { setChosenPaymentMethods } from 'reducers/p2p/adFormSlice';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import {
  printNumber,
  printStringNumber,
  roundDownFractionalDigits,
} from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import {
  useAntifraudStatus,
  useSettings,
  useSnackbarForBannedUser,
} from 'hooks/p2p';
import { useUserDefaultFiatCurrency } from 'hooks/p2p/useUserDefaultFiatCurrency';
import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useIsPageReloaded } from 'hooks/utils/useIsPageReloaded';
import { useLanguage } from 'hooks/utils/useLanguage';

export type UserPaymentDetails = PaymentDetailsRestDto & {
  isEnabled: boolean;
};

export type PaymentConfirmationTimeoutDuration =
  | 'PT15M'
  | 'PT30M'
  | 'PT45M'
  | 'PT1H'
  | 'PT2H'
  | 'PT3H';

export interface DraftOffer {
  baseCurrencyCode: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
  quoteCurrencyCode: string;
  priceType: 'fixed' | 'floating';
  price: number;
  priceValue: string;
  amount: BigNumber;
  amountValue: string;
  floatingPercentage: number;
  floatingPercentageValue: string;
  minOrderAmount: number;
  minOrderAmountValue: string;
  minOrderVolumeLimit?: string;
  maxOrderVolumeLimit?: string;
  paymentConfirmationTimeout: PaymentConfirmationTimeoutDuration;
  comment: string;
  paymentDetails: UserPaymentDetails[];
  number?: string;
}

interface LoadingStates {
  isRatesLoading: boolean;
  isUserBalanceLoading: boolean;
  isPaymentMethodsLoading: boolean;
  isUserPaymentDetailsLoading: boolean;
  isOfferLoading: boolean;
}

type CameFrom = 'home' | 'profile' | 'dom';

interface FieldsUserEdited {
  price: boolean;
  floatingPercentage: boolean;
  minOrderAmount: boolean;
}

export interface CreateEditOfferOutletContext {
  mode: 'create' | 'edit';
  draftOffer: DraftOffer;
  setDraftOffer: React.Dispatch<React.SetStateAction<DraftOffer>>;
  userBalance?: {
    [key in keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY]?: string;
  };
  exchangePricePerUnitOfBaseCurrency: number;
  approximateAdPrice: number;
  rates: RateDto[];
  offerId: string | undefined;
  isSettingsLoading: boolean;
  isRatesLoading: boolean;
  isUserBalanceLoading: boolean;
  isPaymentMethodsLoading: boolean;
  isUserPaymentDetailsLoading: boolean;
  isOfferLoading: boolean;
  paymentMethods: PaymentMethodRestDto[];
  setLoadingStates: React.Dispatch<React.SetStateAction<LoadingStates>>;
  selectedPaymentMethodToAdd: PaymentMethodRestDto;
  setSelectedPaymentMethodToAdd: React.Dispatch<
    React.SetStateAction<
      CreateEditOfferOutletContext['selectedPaymentMethodToAdd']
    >
  >;
  cameFrom: CameFrom;
  fieldsUserEdited: FieldsUserEdited;
  handleFieldEdit: ({
    field,
    numValue,
  }: {
    field: keyof FieldsUserEdited;
    numValue: BigNumber;
  }) => void;
  offerType: BaseOfferRestDtoTypeEnum;
  setOfferType: React.Dispatch<React.SetStateAction<BaseOfferRestDtoTypeEnum>>;
  setIsFormWasUsed: React.Dispatch<React.SetStateAction<boolean>>;
  settings?: SettingsRestDto;
  fixedPriceLimits?: OfferFixedPriceLimitsRestDto;
  initialOfferToEdit?: DraftOffer & {
    status: BaseOfferRestDto['status'];
    fee?: SellOfferRestDto['fee'];
  };
}

export function useCreateEditOfferPageContext() {
  return useOutletContext<CreateEditOfferOutletContext>();
}

interface Props {
  mode: 'create' | 'edit';
  offerId?: string;
}

const ROUTES_PATTERNS_TO_RESET_FORM = [
  routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS,
  routePaths.P2P_OFFER_CREATE_NEW_PAYMENT_METHOD,
  routePaths.P2P_OFFER_CREATE_ADD_COMMENT,
  routePaths.P2P_OFFER_CREATE_PREVIEW_OFFER,
  routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS,
  routePaths.P2P_OFFER_EDIT_NEW_PAYMENT_METHOD,
  routePaths.P2P_OFFER_EDIT_ADD_COMMENT,
  routePaths.P2P_OFFER_EDIT_PREVIEW_OFFER,
  routePaths.P2P_OFFER_CREATE_CHOOSE_PAYMENT_METHODS,
  routePaths.P2P_OFFER_EDIT_CHOOSE_PAYMENT_METHODS,
];

const ROUTES_PATTERNS_TO_RESET_FORM_ON_REFRESH = [
  routePaths.P2P_OFFER_CREATE_SELECT_CURRENCY,
];

const CREATE_SEL_OFFER_BACK_ROUTE_MAP = {
  [routePaths.P2P_OFFER_CREATE_SELECT_CURRENCY]: routePaths.P2P_OFFER_CREATE,
  [routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS]:
    routePaths.P2P_OFFER_CREATE,
  [routePaths.P2P_OFFER_CREATE_NEW_PAYMENT_METHOD]:
    routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_CREATE_ADD_COMMENT]:
    routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_CREATE_PREVIEW_OFFER]:
    routePaths.P2P_OFFER_CREATE_ADD_COMMENT,
};

const CREATE_BUY_OFFER_BACK_ROUTE_MAP = {
  [routePaths.P2P_OFFER_CREATE_SELECT_CURRENCY]: routePaths.P2P_OFFER_CREATE,
  [routePaths.P2P_OFFER_CREATE_CHOOSE_PAYMENT_METHODS]:
    routePaths.P2P_OFFER_CREATE,
  [routePaths.P2P_OFFER_CREATE_ADD_COMMENT]:
    routePaths.P2P_OFFER_CREATE_CHOOSE_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_CREATE_PREVIEW_OFFER]:
    routePaths.P2P_OFFER_CREATE_ADD_COMMENT,
};

const EDIT_SELL_OFFER_BACK_ROUTE_MAP = {
  [routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS]: routePaths.P2P_OFFER_EDIT,
  [routePaths.P2P_OFFER_EDIT_NEW_PAYMENT_METHOD]:
    routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_EDIT_ADD_COMMENT]:
    routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_EDIT_PREVIEW_OFFER]:
    routePaths.P2P_OFFER_EDIT_ADD_COMMENT,
} as const;

const EDIT_BUY_OFFER_BACK_ROUTE_MAP = {
  [routePaths.P2P_OFFER_EDIT_CHOOSE_PAYMENT_METHODS]: routePaths.P2P_OFFER_EDIT,
  [routePaths.P2P_OFFER_EDIT_ADD_COMMENT]:
    routePaths.P2P_OFFER_EDIT_CHOOSE_PAYMENT_METHODS,
  [routePaths.P2P_OFFER_EDIT_PREVIEW_OFFER]:
    routePaths.P2P_OFFER_EDIT_ADD_COMMENT,
};

const getIsOfferEdited = (
  draftOffer: DraftOffer,
  editedOffer: DraftOffer & {
    fee?: SellOfferRestDto['fee'];
  },
) => {
  const editOffer = {
    price: editedOffer.price,
    amount: editedOffer.amount.plus(
      editedOffer.fee ? editedOffer.fee.availableVolume.amount : 0,
    ),
    floatingPercentage: editedOffer.floatingPercentage,
    minOrderAmount: editedOffer.minOrderAmount,
    minOrderVolumeLimit: editedOffer.minOrderVolumeLimit,
    maxOrderVolumeLimit: editedOffer.maxOrderVolumeLimit,
    paymentConfirmationTimeout: editedOffer.paymentConfirmationTimeout,
    comment: editedOffer.comment,
    paymentDetails: editedOffer.paymentDetails,
    number: editedOffer.number,
  };

  const initialOffer = {
    price: draftOffer.price,
    amount: draftOffer.amount,
    floatingPercentage: draftOffer.floatingPercentage,
    minOrderAmount: draftOffer.minOrderAmount,
    minOrderVolumeLimit: draftOffer.minOrderVolumeLimit,
    maxOrderVolumeLimit: draftOffer.maxOrderVolumeLimit,
    paymentConfirmationTimeout: draftOffer.paymentConfirmationTimeout,
    comment: draftOffer.comment,
    paymentDetails: draftOffer.paymentDetails,
    number: draftOffer.number,
  };

  return isEqual(editOffer, initialOffer);
};

const CreateEditOffer: FC<Props> = ({ mode, offerId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [cameFrom] = useState<CameFrom>(
    (searchParams.get('cameFrom') as CameFrom) || 'home',
  );
  const [offerTypeFromPath] = useState<BaseOfferRestDtoTypeEnum>(
    (searchParams.get('offerType') as BaseOfferRestDtoTypeEnum) || 'SALE',
  );
  const [offerType, setOfferType] =
    useState<BaseOfferRestDtoTypeEnum>(offerTypeFromPath);
  const languageCode = useLanguage();

  const { data: antifraudStatus, showShareNumberModal } = useAntifraudStatus();
  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  useEffect(() => {
    if (antifraudStatus === 'PHONE_NUMBER_REQUIRED') {
      showShareNumberModal({
        onCancel: () => {
          // Prevents Telegram WebZ from navigating back to create offer page
          setTimeout(() => {
            navigate(
              cameFrom === 'home'
                ? routePaths.P2P_HOME
                : routePaths.P2P_USER_PROFILE,
            );
          }, 100);
        },
      });
    } else if (antifraudStatus === 'ACCESS_DENIED') {
      showSnackbarForBannedUser();
    }
  }, [antifraudStatus]);

  // Initialization

  const { userId } = useSelector((state: RootState) => state.p2pUser);
  const { defaultCurrencies } = useSelector(
    (state: RootState) => state.p2pAdForm,
  );
  const { chosenCryptoCurrencyOnAssetPageForAdForm } = useSelector(
    (state: RootState) => state.p2p,
  );

  const userDefaultCurrency = useUserDefaultFiatCurrency();

  const defaultFiatCurrency = defaultCurrencies.fiat
    ? defaultCurrencies.fiat
    : userDefaultCurrency;

  const defaultCryptoCurrency =
    chosenCryptoCurrencyOnAssetPageForAdForm ||
    defaultCurrencies.crypto ||
    'TON';

  const [draftOffer, setDraftOffer] = useState<DraftOffer>({
    baseCurrencyCode: defaultCryptoCurrency,
    quoteCurrencyCode: defaultFiatCurrency,
    priceType: 'floating',
    price: 0,
    priceValue: '',
    amount: BigNumber(0),
    amountValue: '',
    floatingPercentage: 0,
    floatingPercentageValue: '',
    minOrderAmount: 0,
    minOrderAmountValue: '',
    paymentConfirmationTimeout: 'PT15M',
    comment: '',
    paymentDetails: [],
  });

  const [initialOfferToEdit, setInitialOfferToEdit] =
    useState<CreateEditOfferOutletContext['initialOfferToEdit']>();

  const [selectedPaymentMethodToAdd, setSelectedPaymentMethodToAdd] =
    useState<CreateEditOfferOutletContext['selectedPaymentMethodToAdd']>();

  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    isRatesLoading: true,
    isUserBalanceLoading: true,
    isPaymentMethodsLoading: true,
    isUserPaymentDetailsLoading: true,
    isOfferLoading: mode === 'edit',
  });

  const [fieldsUserEdited, setFieldsUserEdited] = useState({
    price: false,
    floatingPercentage: false,
    minOrderAmount: false,
  });

  const [rates, setRates] = useState<RateDto[]>([]);
  // isFormWasUsed used to know when user has changed any field during offer creation
  const [isFormWasUsed, setIsFormWasUsed] = useState<boolean>(false);

  const [paymentMethods, setPaymentMethods] = useState<{
    [key: string]: CreateEditOfferOutletContext['paymentMethods'];
  }>();

  const [userBalance, setUserBalance] =
    useState<CreateEditOfferOutletContext['userBalance']>();

  // Fetch methods

  const { data: fixedPriceLimits } = useQuery({
    queryKey: [
      'getOfferFixedPriceLimitsByCurrencyPair',
      draftOffer.baseCurrencyCode,
      draftOffer.quoteCurrencyCode,
    ],
    queryFn: async () => {
      const { data } = await API.Offer.getOfferFixedPriceLimitsByCurrencyPair({
        baseCurrencyCode: draftOffer.baseCurrencyCode,
        quoteCurrencyCode: draftOffer.quoteCurrencyCode,
      });

      if (data.status !== 'SUCCESS') {
        console.error(data);
      }

      return data.data;
    },
  });

  const { data: settings, isLoading: isSettingsLoading } = useSettings();

  const fetchUserBalance = useCallback(
    async (currencyCode: FrontendCryptoCurrencyEnum) => {
      try {
        const balance = await WalletAPI.AccountsApi.getAccount(currencyCode);

        setUserBalance((prevUserBalance) => ({
          ...prevUserBalance,
          [currencyCode]: roundDownFractionalDigits(
            BigNumber(balance.data.available_balance).toString(),
            CRYPTO_FRACTION[currencyCode as keyof typeof CRYPTO_FRACTION],
          ),
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const fetchUserPaymentDetails = useCallback(async () => {
    try {
      if (!userId) {
        return;
      }

      const { data } = await API.PaymentDetails.findPaymentDetailsByUserIdV2();

      if (data.data) {
        const paymentDetails = data.data.map((paymentDetails) => ({
          ...paymentDetails,
          isEnabled: false,
        }));

        setDraftOffer({
          ...draftOffer,
          paymentDetails,
        });

        return paymentDetails;
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [draftOffer, userId]);

  const fetchPaymentMethodsByCurrencyCode = useCallback(
    async (currencyCode) => {
      try {
        const { data } =
          await API.PaymentDetails.findAllPaymentMethodsByCurrencyCodeV2({
            currencyCode,
          });

        if (data.status === 'SUCCESS') {
          setPaymentMethods((prevPaymentMethods) => ({
            ...prevPaymentMethods,
            [currencyCode]: data.data?.filter(
              ({ code }) => !DEPRECATED_P2P_PAYMENT_METHODS.includes(code),
            ),
          }));
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const fetchRates = useCallback(async () => {
    try {
      const { data } = await API.Rate.getRate1(
        draftOffer.baseCurrencyCode,
        draftOffer.quoteCurrencyCode,
      );

      if (data.status === 'SUCCESS' && data.data) {
        // Find and replace rate with new data if it already exists
        setRates((prev) =>
          prev.find(
            (rate) =>
              rate.base === draftOffer.baseCurrencyCode &&
              rate.quote === draftOffer.quoteCurrencyCode,
          )
            ? prev.map((rate) => {
                if (
                  rate.base === draftOffer.baseCurrencyCode &&
                  rate.quote === draftOffer.quoteCurrencyCode &&
                  data.data
                ) {
                  return data.data;
                }

                return rate;
              })
            : data.data
            ? [...prev, data.data]
            : prev,
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, [draftOffer.baseCurrencyCode, draftOffer.quoteCurrencyCode]);

  const fetchOffer = useCallback(
    async ({ paymentDetails }: { paymentDetails?: UserPaymentDetails[] }) => {
      try {
        if (!offerId) {
          return;
        }

        setLoadingStates((prev) => ({ ...prev, isOfferLoading: true }));

        const { data } = await API.Offer.getOfferV2({
          offerId: Number(offerId),
        });

        if (data.status === 'SUCCESS' && data.data) {
          const price = Number(data.data?.price.value);
          const minOrderAmount = Number(data.data?.orderAmountLimits.min);
          const amount = BigNumber(data.data?.availableVolume.amount);
          const amountWithFee = BigNumber(
            data.data?.availableVolume.amount,
          ).plus('fee' in data.data ? data.data.fee.availableVolume.amount : 0);

          let userPaymentDetails: UserPaymentDetails[] = [];
          if ('paymentDetails' in data.data) {
            userPaymentDetails = data.data?.paymentDetails.map(
              (paymentDetails) => ({
                id: paymentDetails.id,
                userId: paymentDetails.userId,
                paymentMethod: {
                  code: paymentDetails.paymentMethod.code,
                  name: paymentDetails.paymentMethod.name,
                  nameEng: paymentDetails.paymentMethod.nameEng,
                  originNameLocale:
                    paymentDetails.paymentMethod.originNameLocale,
                },
                currency: paymentDetails.currency,
                name: paymentDetails.name,
                attributes: paymentDetails.attributes,
                isEnabled: true,
              }),
            );
          }

          if (userPaymentDetails.length) {
            userPaymentDetails = uniqBy(
              concat(userPaymentDetails, paymentDetails ?? []),
              (entry) => entry.id,
            )
              .map((paymentDetails: UserPaymentDetails) => ({
                ...paymentDetails,
                isEnabled: paymentDetails?.isEnabled,
              }))
              .map((paymentDetails: UserPaymentDetails) => {
                if (
                  data.data &&
                  'paymentDetails' in data.data &&
                  data.data?.paymentDetails.find(
                    (details) => details.id === paymentDetails.id,
                  )
                ) {
                  return {
                    ...paymentDetails,
                    isEnabled: true,
                  };
                }

                return paymentDetails;
              });
          }

          let chosenPaymentMethodsFromOffer: PaymentMethodRestDto[] = [];

          if ('paymentMethods' in data.data) {
            chosenPaymentMethodsFromOffer = data.data.paymentMethods;
          }

          const priceType: 'fixed' | 'floating' =
            data.data?.price.type === 'FIXED' ? 'fixed' : 'floating';

          const baseCurrencyCode = data.data?.price
            .baseCurrencyCode as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;

          const amountStr = printStringNumber({
            value: amount.toString(),
            languageCode,
            options: {
              maximumFractionDigits: CRYPTO_FRACTION[baseCurrencyCode],
            },
          });

          const amountWithFeeStr = printStringNumber({
            value: amountWithFee.toString(),
            languageCode,
            options: {
              maximumFractionDigits: CRYPTO_FRACTION[baseCurrencyCode],
            },
          });

          const priceStr = printNumber({
            value: price,
            languageCode,
            options: {
              maximumFractionDigits: DEFAULT_FIAT_FRACTION,
            },
          });

          const minOrderAmountStr = printNumber({
            value: minOrderAmount,
            languageCode,
            options: {
              maximumFractionDigits: DEFAULT_FIAT_FRACTION,
            },
          });

          const quoteCurrencyCode = data.data?.price.quoteCurrencyCode;

          const draftOffer = {
            baseCurrencyCode,
            quoteCurrencyCode,
            priceType,
            price: priceType === 'fixed' ? price : 0,
            priceValue: priceType === 'fixed' && priceStr ? priceStr : '',
            amount: amountWithFee,
            amountValue: amountWithFeeStr,
            floatingPercentage: priceType === 'floating' ? price : 0,
            floatingPercentageValue:
              priceType === 'floating' && priceStr ? priceStr : '',
            minOrderAmount,
            minOrderAmountValue: minOrderAmountStr || '',
            minOrderVolumeLimit: data.data?.orderVolumeLimits?.min,
            maxOrderVolumeLimit: data.data?.orderVolumeLimits?.max,
            paymentConfirmationTimeout: data.data
              ?.paymentConfirmTimeout as PaymentConfirmationTimeoutDuration,
            comment: data.data?.comment || '',
            paymentDetails: userPaymentDetails,
            number: data.data?.number,
          };

          dispatch(
            setChosenPaymentMethods({
              currency: quoteCurrencyCode,
              paymentMethods: chosenPaymentMethodsFromOffer,
            }),
          );

          setOfferType(data.data.type);
          setDraftOffer(draftOffer);
          setInitialOfferToEdit({
            ...draftOffer,
            amount,
            amountValue: amountStr || '',
            status: data.data.status,
            fee: 'fee' in data.data ? data.data.fee : undefined,
          });
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, isOfferLoading: false }));
      }
    },
    [dispatch, languageCode, offerId],
  );

  const openDeletePopup = useCallback(() => {
    window.Telegram.WebApp.showPopup(
      {
        message: t('p2p.user_profile.do_you_want_to_delete'),
        buttons: [
          { id: 'cancel', text: t('common.cancel') },
          { id: 'confirm', text: t('common.delete') },
        ],
      },
      (id: string) => {
        if (id === 'confirm') {
          // Prevents Telegram WebZ from navigating back to create offer page
          setTimeout(() => {
            navigate(
              cameFrom === 'home'
                ? routePaths.P2P_HOME
                : routePaths.P2P_USER_PROFILE,
            );
          }, 100);
        }
      },
    );
  }, [cameFrom, navigate, t]);

  const handleBackButtonClick = useCallback(() => {
    const isFirstCreateStep = location.pathname === routePaths.P2P_OFFER_CREATE;
    const isFirstEditStep = matchPath(
      { path: routePaths.P2P_OFFER_EDIT },
      location.pathname,
    );

    if (isFirstEditStep && initialOfferToEdit) {
      const isOfferEdited =
        mode === 'edit' && !getIsOfferEdited(draftOffer, initialOfferToEdit);

      if (isFirstEditStep && isOfferEdited) {
        openDeletePopup();
        return;
      }
    }

    if (isFirstCreateStep && isFormWasUsed) {
      openDeletePopup();
      return;
    }

    if (mode === 'edit') {
      const routerMap =
        offerType === 'PURCHASE'
          ? EDIT_BUY_OFFER_BACK_ROUTE_MAP
          : EDIT_SELL_OFFER_BACK_ROUTE_MAP;

      const routePatterns = Object.keys(routerMap) as Array<
        keyof typeof routerMap
      >;

      const foundMatchPattern = routePatterns.find((pattern) =>
        matchPath({ path: pattern }, location.pathname),
      );

      if (foundMatchPattern) {
        // eslint-disable-next-line
        // @ts-ignore
        const newRoute = generatePath(routerMap[foundMatchPattern], {
          id: String(offerId),
        });

        navigate(newRoute);
        return;
      }
    } else {
      const routerMap =
        offerType === 'PURCHASE'
          ? CREATE_BUY_OFFER_BACK_ROUTE_MAP
          : CREATE_SEL_OFFER_BACK_ROUTE_MAP;

      const routePatterns = Object.keys(routerMap) as Array<
        keyof typeof routerMap
      >;
      const foundMatchPattern = routePatterns.find((pattern) =>
        matchPath({ path: pattern }, location.pathname),
      );

      if (foundMatchPattern) {
        const newRoute = routerMap[foundMatchPattern];
        navigate(newRoute);
        return;
      }
    }

    if (cameFrom === 'profile') {
      navigate({
        pathname: generatePath(routePaths.P2P_USER_PROFILE, {
          type: offerType,
          '*': '',
        }),
        search: createSearchParams({
          isRestoreYScrollPosition: String(true),
        }).toString(),
      });
    } else if (cameFrom === 'dom') {
      navigate({
        pathname: generatePath(routePaths.P2P_OFFERS, {
          type: offerType,
          '*': '',
        }),
        search: createSearchParams({
          isRestorePrevStateOnOffersPage: String(true),
        }).toString(),
      });
    } else {
      navigate(routePaths.P2P_HOME);
    }
  }, [
    mode,
    draftOffer,
    initialOfferToEdit,
    location.pathname,
    isFormWasUsed,
    cameFrom,
    openDeletePopup,
    offerType,
    offerId,
    navigate,
  ]);

  const handleFieldEdit = useCallback(
    ({
      field,
      numValue,
    }: {
      field: keyof FieldsUserEdited;
      numValue: BigNumber;
    }) => {
      if (!initialOfferToEdit) return;

      const isFieldEdited = !numValue.isEqualTo(
        BigNumber(initialOfferToEdit[field]),
      );

      setFieldsUserEdited((prev) => ({
        ...prev,
        [field]: isFieldEdited,
      }));
    },
    [initialOfferToEdit],
  );

  // Lifecycle hooks

  useEffect(() => {
    const isOfferEdited =
      initialOfferToEdit &&
      mode === 'edit' &&
      !getIsOfferEdited(draftOffer, initialOfferToEdit);

    if (isOfferEdited || isFormWasUsed) {
      window.Telegram.WebApp.enableClosingConfirmation();
    }

    return () => {
      window.Telegram.WebApp.disableClosingConfirmation();
    };
  }, [draftOffer, mode, initialOfferToEdit, isFormWasUsed]);

  useEffect(() => {
    if (mode === 'create') {
      logEvent('Create ad screen viewed', {
        category: 'p2p.merchant.ad',
        source: cameFrom === 'profile' ? 'profile' : 'main',
      });
    }

    const init = async () => {
      fetchUserBalance(draftOffer.baseCurrencyCode).finally(() => {
        setLoadingStates((prevState) => ({
          ...prevState,
          isUserBalanceLoading: false,
        }));
      });

      fetchPaymentMethodsByCurrencyCode(draftOffer.quoteCurrencyCode).finally(
        () => {
          setLoadingStates((prev) => ({
            ...prev,
            isPaymentMethodsLoading: false,
          }));
        },
      );

      fetchRates().finally(() => {
        setLoadingStates((prev) => ({ ...prev, isRatesLoading: false }));
      });

      if (mode === 'edit') {
        const paymentDetails = await fetchUserPaymentDetails();
        setLoadingStates((prev) => ({
          ...prev,
          isUserPaymentDetailsLoading: false,
        }));
        await fetchOffer({ paymentDetails });
      } else {
        await fetchUserPaymentDetails();
        setLoadingStates((prev) => ({
          ...prev,
          isUserPaymentDetailsLoading: false,
        }));
      }
    };

    init();
  }, []);

  useDidUpdate(() => {
    const rate = rates.find(
      (item) =>
        item.base === draftOffer.baseCurrencyCode &&
        item.quote === draftOffer.quoteCurrencyCode,
    );
    const isRateLastTimeUpdatedWasMoreThanFiveMinutesAgo =
      rate &&
      rate.lastUpdateDateTime &&
      new Date(rate.lastUpdateDateTime) < new Date(Date.now() - 5 * 60 * 1000);

    if (isRateLastTimeUpdatedWasMoreThanFiveMinutesAgo || !rate) {
      if (exchangePricePerUnitOfBaseCurrency === 0) {
        setLoadingStates((prev) => ({ ...prev, isRatesLoading: true }));
      }
      fetchRates().finally(() => {
        setLoadingStates((prev) => ({ ...prev, isRatesLoading: false }));
      });
    }

    // if there is no payment methods for selected currency, then we fetch them
    if (!paymentMethods || !paymentMethods[draftOffer.quoteCurrencyCode]) {
      fetchPaymentMethodsByCurrencyCode(draftOffer.quoteCurrencyCode);
    }
  }, [draftOffer.baseCurrencyCode, draftOffer.quoteCurrencyCode]);

  useDidUpdate(() => {
    fetchUserBalance(draftOffer.baseCurrencyCode);
  }, [draftOffer.baseCurrencyCode]);

  const isPageReloaded = useIsPageReloaded();

  useEffect(() => {
    const userDoesNotEnterAmountButIsOnNextFormStep =
      draftOffer.amount.toString() === '0' || !draftOffer.amount.toString();

    const isUserOnStepsThatShouldResetForm = ROUTES_PATTERNS_TO_RESET_FORM.some(
      (pattern) =>
        !!matchPath(
          {
            path: pattern,
          },
          location.pathname,
        ),
    );

    const isUserOnStepsThatShouldResetFormOnRefresh =
      ROUTES_PATTERNS_TO_RESET_FORM_ON_REFRESH.some(
        (pattern) =>
          !!matchPath(
            {
              path: pattern,
            },
            location.pathname,
          ),
      );

    // If user reloads the page on the step 2, 3 or 4, we need to redirect him to the step 1
    if (
      (userDoesNotEnterAmountButIsOnNextFormStep &&
        isUserOnStepsThatShouldResetForm) ||
      (isPageReloaded && isUserOnStepsThatShouldResetFormOnRefresh)
    ) {
      if (mode === 'create') {
        navigate(
          {
            pathname: routePaths.P2P_OFFER_CREATE,
            search: createSearchParams({
              offerType,
            }).toString(),
          },
          { replace: true },
        );
      } else {
        navigate(
          {
            pathname: generatePath(routePaths.P2P_OFFER_EDIT, {
              id: String(offerId),
            }),
            search: createSearchParams({
              offerType,
            }).toString(),
          },
          {
            replace: true,
          },
        );
      }
    }
  }, [
    isPageReloaded,
    draftOffer.amount,
    location.pathname,
    mode,
    navigate,
    offerId,
    offerType,
  ]);

  // Computed values

  const exchangePricePerUnitOfBaseCurrency = useMemo(() => {
    return (
      Number(
        rates.find(
          (item) =>
            item.base === draftOffer.baseCurrencyCode &&
            item.quote === draftOffer.quoteCurrencyCode,
        )?.rate,
      ) || 0
    );
  }, [rates, draftOffer.baseCurrencyCode, draftOffer.quoteCurrencyCode]);

  const approximateAdPrice = useMemo(() => {
    return exchangePricePerUnitOfBaseCurrency
      ? (Number(exchangePricePerUnitOfBaseCurrency) *
          Number(draftOffer.floatingPercentage || 0)) /
          100
      : 0;
  }, [draftOffer.floatingPercentage, exchangePricePerUnitOfBaseCurrency]);

  return (
    <Page mode="secondary">
      <BackButton onClick={handleBackButtonClick} />
      <Outlet
        context={{
          mode,
          draftOffer,
          setDraftOffer,
          userBalance,
          exchangePricePerUnitOfBaseCurrency,
          approximateAdPrice,
          rates,
          offerId,
          paymentMethods: paymentMethods
            ? paymentMethods[draftOffer.quoteCurrencyCode] || []
            : [],
          selectedPaymentMethodToAdd,
          setSelectedPaymentMethodToAdd,
          setLoadingStates,
          cameFrom,
          fieldsUserEdited,
          handleFieldEdit,
          offerType,
          setOfferType,
          setIsFormWasUsed,
          settings,
          fixedPriceLimits,
          isSettingsLoading,
          initialOfferToEdit,

          ...loadingStates,
        }}
      />
    </Page>
  );
};

export default CreateEditOffer;
