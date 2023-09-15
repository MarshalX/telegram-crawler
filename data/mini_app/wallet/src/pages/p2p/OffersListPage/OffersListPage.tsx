import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Routes,
  createSearchParams,
  generatePath,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';
import {
  BaseOfferRestDtoTypeEnum,
  DomOfferRestDto,
  DomOffersRestRequest,
  PaymentMethodRestDto,
} from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import {
  DEFAULT_FIAT_FRACTION,
  DEPRECATED_P2P_PAYMENT_METHODS,
  P2P_CRYPTO_CURRENCIES,
  P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
} from 'config';

import { RootState, useAppSelector } from 'store';

import { setDom, setFilters as setDomFilters } from 'reducers/p2p/domSlice';
import { setP2P } from 'reducers/p2p/p2pSlice';

import OfferCard from 'containers/p2p/OfferCard/OfferCard';
import OfferCardSkeleton from 'containers/p2p/OfferCard/OfferCardSkeleton';
import { SelectCurrency } from 'containers/p2p/SelectCurrency/SelectCurrency';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, DetailCell, SelectionCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { logEvent } from 'utils/common/logEvent';
import { retryAsync } from 'utils/common/retryAsync';

import { useGetPaymentMethodName } from 'hooks/p2p';
import useABTests from 'hooks/p2p/useABTests';
import { useUserDefaultFiatCurrency } from 'hooks/p2p/useUserDefaultFiatCurrency';
import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useIsPageReloaded } from 'hooks/utils/useIsPageReloaded';
import { useLocaleStrBigNumberToNumFormatter } from 'hooks/utils/useLocaleStrToNumFormatter';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SadSmileSVG } from 'images/sad.svg';

import styles from './OffersListPage.module.scss';
import FilterInput from './components/Filter/FilterInput';
import FilterMultiSelect from './components/Filter/FilterMultiSelect';
import FilterSelect from './components/Filter/FilterSelect';

const SadAnimation = lazy(
  () => import('components/animations/SadSmileAnimation/SadSmileAnimation'),
);

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

const SHOWN_OFFERS_CHUNK_LIMIT = 10;
const OFFERS_CHUNK_TO_LOAD_LIMIT = 100;
const OFFSET_THAT_INDICATES_END_OF_THE_LIST =
  OFFERS_CHUNK_TO_LOAD_LIMIT * 2 - SHOWN_OFFERS_CHUNK_LIMIT;
const OFFER_POSITION_FROM_THE_END_AT_WHICH_LOAD_NEXT_OFFERS = 4;

const IS_RESTORE_PREV_STATE_ON_OFFERS_PAGE = 'isRestorePrevStateOnOffersPage';
const IS_RESTORE_PREV_FILTERS = 'isRestorePrevFilters';
const PAYMENT_METHODS_PATH = 'payment-methods';
const SELECT_FIAT_CURRENCY_PATH = 'select-fiat-currency';
const SNACKBAR_ID_OFFER_UNAVAILABLE = 'offer-unavailable';

function removeQueryParamFromUrl({
  param,
  url,
}: {
  param: string;
  url: string;
}) {
  const builtUrl = new URL(url);
  const searchParams = new URLSearchParams(builtUrl.search);

  searchParams.delete(param);
  builtUrl.search = searchParams.toString();

  const newUrl = builtUrl.toString();

  return newUrl;
}

function OffersListPage() {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const getPaymentMethodName = useGetPaymentMethodName();
  const { type: offerType = 'SALE' } = useParams<{
    type: BaseOfferRestDtoTypeEnum;
  }>();

  const isRestorePrevState = searchParams.get(
    IS_RESTORE_PREV_STATE_ON_OFFERS_PAGE,
  );
  const isRestorePrevFilters = searchParams.get(IS_RESTORE_PREV_FILTERS);

  const { userId: p2pUserId, p2pInitialized } = useSelector(
    (state: RootState) => state.p2pUser,
  );

  const { languageCode } = useSelector((state: RootState) => state.settings);

  const isPageReloaded = useIsPageReloaded();

  const { chosenCryptoCurrencyOnAssetPageForDom } = useAppSelector(
    (state) => state.p2p,
  );

  const dom = useAppSelector((state) => state.p2pDom);

  const amountFieldTimeout = useRef<NodeJS.Timeout | null>(null);
  const { prevLocation } = useAppSelector((state) => state.location);

  const abTests = useABTests();

  // Initialized

  const userDefaultCurrency = useUserDefaultFiatCurrency();

  const defaultFiatCurrency = useMemo(() => {
    if (dom.filters?.fiatCurrency) return dom.filters?.fiatCurrency;

    return userDefaultCurrency;
  }, [dom.filters?.fiatCurrency, userDefaultCurrency]);

  const defaultCryptoCurrency =
    chosenCryptoCurrencyOnAssetPageForDom ||
    dom.filters?.cryptoCurrency ||
    'TON';

  useEffect(() => {
    logEvent('Taker. Ad list viewed', {
      category: 'p2p.buyer.order',
      type: offerType === 'SALE' ? 'sell' : 'buy',
      crypto_currency: defaultCryptoCurrency,
      fiat_currency: defaultFiatCurrency,
    });
  }, []);

  const [filters, setFilters] = useState<{
    cryptoCurrency: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
    fiatCurrency: string;
    amount: BigNumber;
    amountValue: string;
    paymentMethods: string[];
  }>({
    cryptoCurrency: defaultCryptoCurrency,
    fiatCurrency: defaultFiatCurrency,
    paymentMethods:
      isRestorePrevState || isPageReloaded || isRestorePrevFilters
        ? dom.filters?.paymentMethods || []
        : [],
    amountValue:
      isRestorePrevState || isPageReloaded || isRestorePrevFilters
        ? dom.filters?.amountValue || ''
        : '',
    amount:
      isRestorePrevState || isPageReloaded || isRestorePrevFilters
        ? BigNumber(dom.filters?.amount || 0)
        : BigNumber(0),
  });

  const [cachedMethods, setCachedMethods] = useState<string[]>([]);

  const formatStrToNum = useLocaleStrBigNumberToNumFormatter(
    filters.amountValue,
  );

  const [offset, setOffset] = useState(
    dom.offset && isRestorePrevState ? dom.offset : 0,
  );

  const [offers, setOffers] = useState<DomOfferRestDto[]>(
    dom.offers && isRestorePrevState ? dom.offers : [],
  );

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodRestDto[]>(
    dom.paymentMethods || [],
  );

  const [isLoading, setIsLoading] = useState(offers.length ? false : true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const domAbortController = useRef<AbortController>();

  useEffect(() => {
    domAbortController.current = new AbortController();

    return () => {
      domAbortController.current?.abort();
    };
  }, []);

  const paymentMethodsByCurrencyCodeAbortController = useRef<AbortController>();

  useEffect(() => {
    paymentMethodsByCurrencyCodeAbortController.current = new AbortController();

    return () => {
      paymentMethodsByCurrencyCodeAbortController.current?.abort();
    };
  }, []);

  // Fetching

  const abortDomRequest = () => {
    domAbortController.current?.abort();
    domAbortController.current = new AbortController();
  };

  const fetchOffers = useCallback(
    async ({
      offset = 0,
      cryptoCurrency,
      fiatCurrency,
      amount,
      paymentMethods,
      isLoadingMore,
    }: {
      offset?: number;
      cryptoCurrency: keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY;
      fiatCurrency: string;
      amount: BigNumber;
      paymentMethods: string[];
      isLoadingMore?: boolean;
    }) => {
      try {
        if (isLoadingMore) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        abortDomRequest();

        if (!offerType) {
          Sentry.captureException('Offer type is not defined in URL params', {
            extra: {
              location: location,
              prevLocation: prevLocation,
            },
          });
        }

        const body: DomOffersRestRequest = {
          baseCurrencyCode: cryptoCurrency,
          quoteCurrencyCode: fiatCurrency,
          offerType: offerType || 'SALE',
          paymentMethodCodes: paymentMethods.length
            ? paymentMethods
            : undefined,
          offset,
          limit: OFFERS_CHUNK_TO_LOAD_LIMIT,
        };

        if (amount && amount.toString() !== '0') {
          body.desiredAmount = amount.toString();
        }

        const { data } = await retryAsync(
          () =>
            API.Offer.listDomOffersV2(body, {
              signal: domAbortController.current?.signal,
            }),
          {
            retries: 30,
            delay: 100,
          },
        );

        if (data.status === 'SUCCESS') {
          const offers =
            data.data?.filter((offer) => {
              return !offer.paymentMethods.some((paymentMethod) => {
                return DEPRECATED_P2P_PAYMENT_METHODS.includes(
                  paymentMethod.code,
                );
              });
            }) || [];

          setOffers((prev) => (offset === 0 ? offers : [...prev, ...offers]));
        } else {
          console.error(data);
        }

        if (isLoadingMore) {
          setIsLoadingMore(false);
        } else {
          setIsLoading(false);
        }
        // eslint-disable-next-line
      } catch (error: any) {
        console.error(error);

        // if requested aborted, don't retry
        if (error.message !== 'canceled') {
          if (isLoadingMore) {
            setIsLoadingMore(false);
          } else {
            setIsLoading(false);
          }
        }
      }
    },
    [location, offerType, prevLocation],
  );

  const prevUnavailableOffersData = useRef<{
    unavailableOffers: { [key: number]: boolean };
    createdDateTime: string;
  }>();

  const { data: unavailableOffers } = useQuery({
    enabled: !!p2pInitialized,
    queryKey: ['getOfferIdsToExcludeFromDom'],
    queryFn: async () => {
      const { data } = await API.Offer.getOfferIdsToExcludeFromDom();

      if (data.status === 'SUCCESS' && data.data) {
        const prevData = prevUnavailableOffersData.current;

        if (
          !prevData ||
          new Date(data.data.createdDateTime) >
            new Date(prevData.createdDateTime)
        ) {
          const unavailableOffers = (data.data?.items || []).reduce(
            (acc, offerId) => {
              acc[offerId] = true;
              return acc;
            },
            {} as { [key: number]: boolean },
          );

          prevUnavailableOffersData.current = {
            unavailableOffers,
            createdDateTime: data.data.createdDateTime,
          };

          return unavailableOffers;
        } else {
          return prevData.unavailableOffers;
        }
      }

      return {};
    },
    retry: 20,
    retryDelay: 500,
    refetchInterval: 4000,
    onError: (error) => {
      console.error(error);
    },
  });

  const fetchPaymentMethodsByCurrencyCode = useCallback(
    async ({ fiatCurrency }) => {
      try {
        paymentMethodsByCurrencyCodeAbortController.current?.abort();
        paymentMethodsByCurrencyCodeAbortController.current =
          new AbortController();
        abortDomRequest();

        const { data } =
          await API.PaymentDetails.findAllPaymentMethodsByCurrencyCodeV2(
            {
              currencyCode: fiatCurrency,
            },
            {
              signal:
                paymentMethodsByCurrencyCodeAbortController.current?.signal,
            },
          );

        if (data.status === 'SUCCESS') {
          const methods =
            data.data?.filter(
              ({ code }) => !DEPRECATED_P2P_PAYMENT_METHODS.includes(code),
            ) || [];

          setPaymentMethods(methods);
        } else {
          console.error(data);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [],
  );

  // Handlers

  const handleCryptoCurrencyChange = useCallback(
    async (value: string) => {
      logEvent('Filter. Cryptocurrency chosen', {
        cryptocurrency: value,
        crypto_currency: value,
        fiat_currency: filters.fiatCurrency,
      });

      if (value === filters.cryptoCurrency) {
        return;
      }

      const nextFilters = {
        ...filters,
        cryptoCurrency:
          value as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
      };

      setFilters(nextFilters);

      await fetchOffers(nextFilters);

      setOffset(0);
    },
    [fetchOffers, filters],
  );

  const handleFiatCurrencySelect = useCallback(
    async (value: string) => {
      logEvent('Filter. Fiat chosen', {
        fiat: value,
        crypto_currency: filters.cryptoCurrency,
        fiat_currency: value,
      });

      // ReactRouter officially support going back with -1, buy TypeScript doesn't
      // eslint-disable-next-line
      // @ts-ignore
      navigate(-1, { replace: true });

      if (value === filters.fiatCurrency) {
        return;
      }

      setIsLoading(true);

      const nextFilters = {
        ...filters,
        fiatCurrency: value,
        paymentMethods: [],
      };

      setFilters(nextFilters);

      try {
        await fetchPaymentMethodsByCurrencyCode({
          fiatCurrency: nextFilters.fiatCurrency,
        });

        await fetchOffers(nextFilters);

        setOffset(0);
        // eslint-disable-next-line
      } catch (error: any) {
        console.error(error);

        if (error.message !== 'canceled') {
          setIsLoading(false);
        }
      }
    },
    [fetchOffers, fetchPaymentMethodsByCurrencyCode, filters, navigate],
  );

  const handleMinAmountChange = useCallback(
    async (event) => {
      if (amountFieldTimeout.current) {
        clearTimeout(amountFieldTimeout.current);
      }

      const value = event.target.value;

      const [strNum, num] = formatStrToNum(value, {
        locale: languageCode,
        isAllowed: (value) =>
          value.isLessThanOrEqualTo(BigNumber(999_999_999)) &&
          value.isGreaterThanOrEqualTo(BigNumber('0')),
        maximumFractionDigits: DEFAULT_FIAT_FRACTION,
      });

      if (strNum === null || num === null) return;

      const nextFilters = {
        ...filters,
        amount: num,
        amountValue: strNum,
      };

      setFilters(nextFilters);

      amountFieldTimeout.current = setTimeout(async () => {
        logEvent('Filter. Amount chosen', {
          amount: value,
          crypto_currency: filters.cryptoCurrency,
          fiat_currency: filters.fiatCurrency,
        });

        await fetchOffers(nextFilters);

        if (event.target instanceof HTMLInputElement) event.target.blur();

        setOffset(0);
      }, 1000);
    },
    [fetchOffers, filters, formatStrToNum, languageCode],
  );

  const handleMinAmountClick = useCallback(() => {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
  }, []);

  const handleSavePaymentMethodsClick = useCallback(async () => {
    logEvent('Filter. Payments method chosen', {
      payment_methods: filters.paymentMethods,
      crypto_currency: filters.cryptoCurrency,
      fiat_currency: filters.fiatCurrency,
    });

    navigate(-1);

    await fetchOffers(filters);

    setOffset(0);
  }, [fetchOffers, filters, navigate]);

  const handleMultiSelectClick = useCallback(() => {
    if (isLoading) return;

    setCachedMethods([...filters.paymentMethods]);

    snackbarContext.hideSnackbar(SNACKBAR_ID_OFFER_UNAVAILABLE);

    navigate(
      generatePath(routePaths.P2P_OFFERS, {
        type: offerType,
        '*': PAYMENT_METHODS_PATH,
      }),
    );
  }, [filters.paymentMethods, isLoading, navigate, offerType, snackbarContext]);

  const paymentMethodsOptions = paymentMethods.map((paymentMethod) => ({
    value: paymentMethod.code,
    label: getPaymentMethodName(paymentMethod),
  }));

  const handleSelectAllClick = useCallback(() => {
    const isAllSelected =
      filters.paymentMethods.length === paymentMethodsOptions.length;

    const paymentMethods = isAllSelected
      ? []
      : paymentMethodsOptions.map((option) => option.value);

    setFilters({
      ...filters,
      paymentMethods,
    });
  }, [filters, paymentMethodsOptions]);

  const handlePaymentMethodClick = useCallback(
    (paymentMethod: string) => {
      const paymentMethods = filters.paymentMethods.includes(paymentMethod)
        ? filters.paymentMethods.filter((method) => method !== paymentMethod)
        : [...filters.paymentMethods, paymentMethod];

      setFilters((prev) => ({
        ...prev,
        paymentMethods,
      }));
    },
    [filters],
  );

  const handleBackButtonClick = useCallback(() => {
    snackbarContext.hideSnackbar(SNACKBAR_ID_OFFER_UNAVAILABLE);

    if (
      location.pathname ===
      generatePath(routePaths.P2P_OFFERS, {
        type: offerType,
        '*': PAYMENT_METHODS_PATH,
      })
    ) {
      setFilters({
        ...filters,
        paymentMethods: cachedMethods,
      });

      navigate(-1);
    } else if (
      location.pathname ===
      generatePath(routePaths.P2P_OFFERS, {
        type: offerType,
        '*': SELECT_FIAT_CURRENCY_PATH,
      })
    ) {
      navigate(-1);
    } else {
      dispatch(
        setDomFilters({
          amountValue: undefined,
          amount: undefined,
          paymentMethods: undefined,
        }),
      );

      navigate(routePaths.P2P_HOME);
    }
  }, [
    cachedMethods,
    dispatch,
    filters,
    location.pathname,
    navigate,
    offerType,
    snackbarContext,
  ]);

  // Lifecycle hooks
  useLayoutEffect(() => {
    if (isRestorePrevState) {
      // remove query param from url to prevent restoring state on page reload
      window.history.replaceState(
        null,
        '',
        removeQueryParamFromUrl({
          param: IS_RESTORE_PREV_STATE_ON_OFFERS_PAGE,
          url: window.location.href,
        }),
      );
    }

    // restore scroll position
    if (isRestorePrevState && dom.lastYScrollPosition) {
      window.scrollTo(0, dom.lastYScrollPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      // save scroll position to local storage
      dispatch(
        setDom({
          lastYScrollPosition: window.scrollY,
        }),
      );
    };
  }, []);

  useEffect(() => {
    if ((offers.length && isRestorePrevState) || !p2pInitialized) return;

    const init = async () => {
      try {
        setIsLoading(true);

        await fetchPaymentMethodsByCurrencyCode({
          fiatCurrency: filters.fiatCurrency,
        });

        await fetchOffers(filters);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [p2pInitialized]);

  useDidUpdate(() => {
    dispatch(
      setDom({
        offers,
        offset,
        paymentMethods,
      }),
    );
  }, [offers, offset, paymentMethods]);

  useDidUpdate(() => {
    dispatch(
      setDomFilters({
        amountValue: filters.amountValue,
        amount: filters.amount.toString(),
        paymentMethods: filters.paymentMethods,
        fiatCurrency: filters.fiatCurrency,
      }),
    );
  }, [filters]);

  const isAlreadySentEventOnCryptoCurrencyChange = useRef(false);

  useDidUpdate(() => {
    dispatch(
      setDomFilters({
        cryptoCurrency: filters.cryptoCurrency,
      }),
    );

    if (
      chosenCryptoCurrencyOnAssetPageForDom &&
      !isAlreadySentEventOnCryptoCurrencyChange.current
    ) {
      logEvent('Change crypto currency from asset page on dom', {
        asset: chosenCryptoCurrencyOnAssetPageForDom,
        changeTo: filters.cryptoCurrency,
      });

      isAlreadySentEventOnCryptoCurrencyChange.current = true;

      dispatch(
        setP2P({
          chosenCryptoCurrencyOnAssetPageForDom: undefined,
        }),
      );
    }
  }, [filters.cryptoCurrency]);

  useEffect(() => {
    if (chosenCryptoCurrencyOnAssetPageForDom) {
      logEvent('Set crypto currency from asset page on dom', {
        asset: chosenCryptoCurrencyOnAssetPageForDom,
      });
    }
  }, []);

  useEffect(() => {
    // Hide scrolling when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  // Calculations

  const prevEntry = useRef<IntersectionObserverEntry | null>(null);

  const { ref } = useInView({
    threshold: offset === OFFSET_THAT_INDICATES_END_OF_THE_LIST ? 1 : 0.5,
    triggerOnce: true,
    onChange: async (inView, entry) => {
      if (inView && entry && prevEntry.current?.target !== entry?.target) {
        prevEntry.current = entry;

        if (offset === OFFSET_THAT_INDICATES_END_OF_THE_LIST) {
          await fetchOffers(filters);
          setOffset(0);
        } else {
          const isUserOnMiddleOfTheList =
            OFFERS_CHUNK_TO_LOAD_LIMIT - SHOWN_OFFERS_CHUNK_LIMIT;

          if (offset === isUserOnMiddleOfTheList) {
            await fetchOffers({
              offset: offset + SHOWN_OFFERS_CHUNK_LIMIT,
              ...filters,
              isLoadingMore: true,
            });
          }

          setOffset((prev) => prev + SHOWN_OFFERS_CHUNK_LIMIT);
        }
      }
    },
  });

  const filterPaymentMethodCode = useMemo(() => {
    return filters.paymentMethods.length
      ? filters.paymentMethods[0]
      : undefined;
  }, [filters.paymentMethods]);

  const multiSelectFilterValue = useMemo(() => {
    if (filters.paymentMethods.length === 1) {
      const paymentMethod = paymentMethods.find(
        (item) => item.code === filters.paymentMethods[0],
      );

      if (!paymentMethod) return '';

      return getPaymentMethodName(paymentMethod);
    }

    if (
      filters.paymentMethods.length > 0 &&
      (filters.paymentMethods.length < paymentMethodsOptions.length ||
        !paymentMethodsOptions.length)
    ) {
      return `${t('p2p.offers_list_page.xx_methods', {
        count: filters.paymentMethods.length,
      })}`;
    }

    return t('common.all');
  }, [
    filters.paymentMethods,
    getPaymentMethodName,
    paymentMethods,
    paymentMethodsOptions.length,
    t,
  ]);

  const handleBuyClick = useCallback(
    (offer: DomOfferRestDto) => {
      if (offer.user.userId === p2pUserId) {
        snackbarContext.hideSnackbar(SNACKBAR_ID_OFFER_UNAVAILABLE);

        navigate({
          pathname: generatePath(routePaths.P2P_OFFER_PREVIEW, {
            id: String(offer.id),
          }),
          search: createSearchParams({
            backButton: generatePath(routePaths.P2P_OFFERS, {
              type: offerType,
              '*': '',
            }),
            isRestorePrevStateOnOffersPage: 'true',
            cameFrom: 'dom',
          }).toString(),
        });

        return;
      }

      if (unavailableOffers && unavailableOffers[offer.id]) {
        snackbarContext.showSnackbar({
          snackbarId: SNACKBAR_ID_OFFER_UNAVAILABLE,
          icon: 'warning',
          text: t('p2p.ad_is_unavailable'),
        });

        logEvent('Click on unavailable offer', {
          offerId: offer.id,
          listCreatedDateTime:
            prevUnavailableOffersData.current?.createdDateTime,
        });

        return;
      } else {
        snackbarContext.hideSnackbar(SNACKBAR_ID_OFFER_UNAVAILABLE);
      }

      const searchParams = (() => {
        const params: {
          [key: string]: string;
        } = {
          isRestorePrevStateOnOffersPage: 'true',
          previousPrice: String(offer.price.value),
        };

        if (filterPaymentMethodCode) {
          params.paymentMethodCode = filterPaymentMethodCode;
        }

        return params;
      })();

      navigate({
        pathname: generatePath(routePaths.P2P_OFFER, { id: String(offer.id) }),
        search: createSearchParams(searchParams).toString(),
      });
    },
    [
      filterPaymentMethodCode,
      navigate,
      offerType,
      p2pUserId,
      snackbarContext,
      t,
      unavailableOffers,
    ],
  );

  const handleFiatCurrencyFilterClick = () => {
    snackbarContext.hideSnackbar(SNACKBAR_ID_OFFER_UNAVAILABLE);

    navigate(
      generatePath(routePaths.P2P_OFFERS, {
        type: offerType,
        '*': SELECT_FIAT_CURRENCY_PATH,
      }),
    );
  };

  const CRYPTO_CURRENCIES_OPTIONS = Object.keys(
    P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
  ).map((key) => ({
    value: key as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
    label: key as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY,
  }));

  const shownOffers = useMemo(() => {
    return offers.slice(0, offset + SHOWN_OFFERS_CHUNK_LIMIT);
  }, [offers, offset]);

  const [showOnboarding, setShowOnboarding] = useState(false);

  const { ref: verifiedMerchantRef } = useInView({
    threshold: 0.8,
    triggerOnce: true,
    onChange: async (inView) => {
      const onboardingKey = 'isBadgeOnboardingCompleted';
      const isOnboardingCompleted = localStorage.getItem(onboardingKey);

      if (isOnboardingCompleted || showOnboarding) {
        return;
      }

      if (inView) {
        setShowOnboarding(true);
        localStorage.setItem(onboardingKey, 'true');
      }
    },
  });

  // index of first verified merchant
  const firstVerifiedMerchantIndex = useMemo(() => {
    return shownOffers.findIndex((offer) => offer.user.isVerified);
  }, [shownOffers]);

  return (
    <Page mode="secondary">
      <BackButton onClick={handleBackButtonClick} />
      {/* We need routes instead of absolute positioning payment methods to
      prevent scrolling bugs on IOS and Android. Telegram need to fix it from their side first. */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={themeClassName('filtersContainer')}>
                <FilterMultiSelect
                  value={multiSelectFilterValue}
                  label={t('p2p.offers_list_page.method')}
                  onClick={handleMultiSelectClick}
                  className={styles.filter}
                />
                <FilterSelect
                  selectedValueTestId="fiatCurrencyFilterValue"
                  value={filters.fiatCurrency}
                  label={t('p2p.offers_list_page.currency')}
                  onClick={handleFiatCurrencyFilterClick}
                  className={styles.filter}
                  data-testid="tgcrawl"
                />
                <FilterSelect
                  value={filters.cryptoCurrency}
                  label={t('p2p.offers_list_page.crypto')}
                  options={CRYPTO_CURRENCIES_OPTIONS}
                  onChange={handleCryptoCurrencyChange}
                  className={cn(styles.filter, themeClassName('filterCrypto'))}
                  data-testid="tgcrawl"
                />
                <FilterInput
                  id="tgcrawl"
                  data-testid="tgcrawl"
                  value={filters.amountValue}
                  label={t('p2p.offers_list_page.amount')}
                  onChange={handleMinAmountChange}
                  placeholder={`10.00 ${filters.fiatCurrency}`}
                  className={cn(
                    styles.filter,
                    themeClassName('filterMinAmount'),
                  )}
                  onClick={handleMinAmountClick}
                />
                <div className={styles.filtersContainerBorder}></div>
              </div>

              {/* TODO: Enable after Callout will be done by product team https://wallet-bot.atlassian.net/browse/WAL-1118 */}
              {/* {filters.cryptoCurrency === 'USDT' && (
                <WhyUsdt className={themeClassName('whyUsdt')} />
              )} */}

              {isLoading ? (
                <div className={themeClassName('offersContainer')}>
                  <OfferCardSkeleton className={themeClassName('offer')} />
                  <OfferCardSkeleton className={themeClassName('offer')} />
                  <OfferCardSkeleton className={themeClassName('offer')} />
                </div>
              ) : !isLoading && !offers.length ? (
                <div className={styles.noAdsContainer}>
                  <Suspense
                    fallback={<SadSmileSVG className={styles.sadSmile} />}
                  >
                    <SadAnimation className={styles.sadSmile} />
                  </Suspense>
                  <div className={themeClassName('noAdsText')}>
                    {t('p2p.offers_list_page.no_ads')}
                  </div>
                </div>
              ) : (
                <div className={themeClassName('offersContainer')}>
                  {shownOffers.map((offer, index) => (
                    <OfferCard
                      ref={(incomingRef) => {
                        if (!incomingRef) {
                          return;
                        }

                        if (index === firstVerifiedMerchantIndex) {
                          verifiedMerchantRef(incomingRef);
                        }

                        const isMoreOffersAvailable =
                          shownOffers.length % SHOWN_OFFERS_CHUNK_LIMIT === 0 &&
                          offset < OFFSET_THAT_INDICATES_END_OF_THE_LIST;

                        // We look for Nth last element in the array and add a reference to it
                        // When user scrolls to this element, we will load more offers
                        if (
                          isMoreOffersAvailable &&
                          index ===
                            shownOffers.length -
                              OFFER_POSITION_FROM_THE_END_AT_WHICH_LOAD_NEXT_OFFERS
                        ) {
                          ref(incomingRef);
                        }
                      }}
                      onboardVerifiedMerchant={
                        showOnboarding && index === firstVerifiedMerchantIndex
                      }
                      isVerifiedMerchant={
                        abTests.data?.verifiedMerchantBadge &&
                        offer.user.isVerified
                      }
                      className={themeClassName('offer')}
                      key={`${offer.id}${index}`}
                      username={offer.user.nickname}
                      userId={offer.user.userId}
                      avatarCode={offer.user.avatarCode}
                      id={String(offer.id)}
                      baseCurrencyCode={
                        offer.price
                          .baseCurrencyCode as keyof typeof P2P_CRYPTO_CURRENCIES
                      }
                      quoteCurrencyCode={offer.price.quoteCurrencyCode}
                      price={Number(offer.price.value)}
                      amount={BigNumber(offer.availableVolume)}
                      amountTitle={t('p2p.offers_list_page.available')}
                      orderAmountLimits={offer.orderAmountLimits}
                      orderVolumeLimits={offer.orderVolumeLimits}
                      paymentMethodsNames={offer.paymentMethods.map(
                        (paymentMethod) => getPaymentMethodName(paymentMethod),
                      )}
                      tradesCount={offer.user.statistics.totalOrdersCount}
                      successPercent={offer.user.statistics.successPercent}
                      onBuyClick={() => handleBuyClick(offer)}
                      separator={theme === 'material'}
                      offerType={offer.type}
                      cardClassName={
                        unavailableOffers &&
                        unavailableOffers[offer.id] &&
                        styles.inactive
                      }
                      isCardActive={
                        !unavailableOffers || !unavailableOffers[offer.id]
                      }
                      isShareEnabled={
                        !unavailableOffers || !unavailableOffers[offer.id]
                      }
                    />
                  ))}
                  {isLoadingMore && (
                    <OfferCardSkeleton className={themeClassName('offer')} />
                  )}
                  {offset === OFFSET_THAT_INDICATES_END_OF_THE_LIST && (
                    <div ref={ref} className={styles.listBottom}></div>
                  )}
                </div>
              )}
            </>
          }
        />

        <Route
          path={`/${PAYMENT_METHODS_PATH}`}
          element={
            <>
              <Section
                separator
                className={themeClassName('selectPaymentsWrapper')}
              >
                <DetailCell onClick={handleSelectAllClick}>
                  <div className={themeClassName('selectAll')}>
                    {filters.paymentMethods.length ===
                    paymentMethodsOptions.length
                      ? t('p2p.offers_list_page.clear_all')
                      : t('p2p.offers_list_page.select_all')}
                  </div>
                </DetailCell>

                <Cell.List>
                  {paymentMethodsOptions.map((option) => (
                    <SelectionCell
                      name="payment-methods"
                      mode="checkbox"
                      key={option.value}
                      value={option.value}
                      onChange={handlePaymentMethodClick}
                      checked={filters.paymentMethods.includes(option.value)}
                    >
                      {option.label}
                    </SelectionCell>
                  ))}
                </Cell.List>
              </Section>
              <MainButton
                color={button_color}
                textColor={button_text_color}
                onClick={handleSavePaymentMethodsClick}
                text={t('p2p.offers_list_page.done').toLocaleUpperCase()}
              />
            </>
          }
        />

        <Route
          path={`/${SELECT_FIAT_CURRENCY_PATH}`}
          element={
            <SelectCurrency
              value={filters.fiatCurrency}
              onSelect={handleFiatCurrencySelect}
            />
          }
        />
      </Routes>
    </Page>
  );
}

export default OffersListPage;
