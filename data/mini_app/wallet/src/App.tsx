import * as Sentry from '@sentry/react';
import { AppearanceProvider } from 'AppearanceProvider';
import { useSCWAddresses } from 'query/scw/address';
import {
  useCountryToCurrency,
  useSupportedCurrencies,
} from 'query/wallet/currencies';
import { useKycLimits } from 'query/wallet/kyc/useKycLimits';
import { usePurchaseSettings } from 'query/wallet/purchase';
import { useLastUsedPaymentCurrencies } from 'query/wallet/user';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Routes,
  To,
  createSearchParams,
  generatePath,
  matchPath,
} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { BaseOfferRestDtoTypeEnum } from 'api/p2p/generated-common';
import { KycStatusPublicDtoLevelEnum } from 'api/p2p/generated-userservice';
import API from 'api/wallet';
import APIV2 from 'api/wallet-v2';
import { AccessToken, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { Amplitude } from 'types/amplitude';
import { InvoiceStatus, WebApp, WebView } from 'types/webApp';

import routePaths from 'routePaths';

import { RootState, useAppSelector } from 'store';

import {
  resetCampaignParticipation,
  resetGift,
  setCampaignParticipation,
  setGift,
} from 'reducers/gift/giftSlice';
import { updateKyc } from 'reducers/kyc/kycSlice';
import { setLocation } from 'reducers/location/locationSlice';
import { setDefaultCurrencies } from 'reducers/p2p/adFormSlice';
import { setFilters } from 'reducers/p2p/domSlice';
import { setP2P } from 'reducers/p2p/p2pSlice';
import { setUser } from 'reducers/p2p/userSlice';
import { updatePasscode } from 'reducers/passcode/passcodeSlice';
import { cleanPurchase, updatePurchase } from 'reducers/purchase/purchaseSlice';
import { updateSCW } from 'reducers/scw/scwSlice';
import {
  updateFiatCurrency,
  updateLanguage,
  updatePreferredAsset,
} from 'reducers/settings/settingsSlice';
import {
  setAuthorized,
  setIsRussian,
  updateFeatureFlags,
  updatePermissions,
  updatePurchaseByCard,
} from 'reducers/user/userSlice';
import { updateWallet } from 'reducers/wallet/walletSlice';
import { updateWarningsVisibility } from 'reducers/warningsVisibility/warningsVisibilitySlice';

import Error from 'pages/Error/Error';
import { NotFound } from 'pages/NotFound';
// import SendGift from 'pages/SendGift/SendGift';
import Settings from 'pages/Settings/Settings';
import SettingsLanguage from 'pages/SettingsLanguage/SettingsLanguage';
import Unavailable from 'pages/Unavailable';
import UnknownError from 'pages/UnknownError';
import { CollectiblePageFallback } from 'pages/collectibles/CollectiblePage/CollectiblePageFallback';
import { CollectiblesPageFallback } from 'pages/collectibles/CollectiblesPage/CollectiblesPageFallback';
import CountryForbidden from 'pages/p2p/CountryForbidden';
import { HomePageFallback } from 'pages/p2p/HomePage/HomePageFallback';
import { OfferPageFallback } from 'pages/p2p/OfferPage/OfferPageFallback';
import { OfferPreviewPageFallback } from 'pages/p2p/OfferPreviewPage/OfferPreviewPageFallback';
import { OffersListPageFallback } from 'pages/p2p/OffersListPage/OffersListPageFallback';
import OperationsUnavailable from 'pages/p2p/OperationsUnavailable/OperationsUnavailable';
import { OrderPageFallback } from 'pages/p2p/OrderPage/OrderPageFallback';
import { UserProfilePageFallback } from 'pages/p2p/UserProfilePage/UserProfilePageFallback';
import { BetaWaitlistSuccess } from 'pages/scw/BetaWaitlistSuccess/BetaWaitlistSuccess';
import Asset from 'pages/wallet/Assets/Asset/Asset';
import Assets from 'pages/wallet/Assets/Assets';
import ChooseAsset from 'pages/wallet/Assets/ChooseAsset/ChooseAsset';
import Purchase from 'pages/wallet/Assets/Purchase/Purchase';
import { ReceiverSearch } from 'pages/wallet/Assets/ReceiverSearch/ReceiverSearch';
import Send from 'pages/wallet/Assets/Send/Send';
import { SendRequestConfirmation } from 'pages/wallet/Assets/SendRequestConfirmation/SendRequestConfirmation';
import { SendRequestStatus } from 'pages/wallet/Assets/SendRequestStatus/SendRequestStatus';
import { AttachPromo } from 'pages/wallet/AttachPromo/AttachPromo';
import { Exchange } from 'pages/wallet/Exchange/Exchange';
import { ExchangeConfirmation } from 'pages/wallet/Exchange/ExchangeConfirmation/ExchangeConfirmation';
import { ExchangeForm } from 'pages/wallet/Exchange/ExchangeForm/ExchangeForm';
import { FirstDeposit } from 'pages/wallet/FirstDeposit/FirstDeposit';
import { FirstTransaction } from 'pages/wallet/FirstTransaction/FirstTransaction';
import KYCConfirmation from 'pages/wallet/KYC/Confirmation/Confirmation';
import KYCFirstConfirmation from 'pages/wallet/KYC/FirstConfirmation/FirstConfirmation';
import KYC from 'pages/wallet/KYC/KYC';
import KYCSettings from 'pages/wallet/KYC/Settings/Settings';
import Main from 'pages/wallet/Main/Main';
import Onboarding from 'pages/wallet/Onboarding/Onboarding';
import { PurchaseOptions } from 'pages/wallet/PurchaseOptions/PurchaseOptions';
// import OpenGift from 'pages/OpenGift/OpenGift';
import PurchaseStatus from 'pages/wallet/PurchaseStatus/PurchaseStatus';
import { Receive } from 'pages/wallet/Receive/Receive';
import { SelectPaymentCurrency } from 'pages/wallet/SelectPaymentCurrency';
import { SendOptions } from 'pages/wallet/SendOptions/SendOptions';
import { SettingsSelectPaymentCurrency } from 'pages/wallet/SettingsSelectPaymentCurrency';
import Transaction from 'pages/wallet/Transaction/TransactionPage';
import { UsdtRuffleMain } from 'pages/wallet/UsdtRuffle/UsdtRuffleMain/UsdtRuffleMain';
import { UsdtRuffleTicketsPage } from 'pages/wallet/UsdtRuffle/UsdtRuffleTickets/UsdtRuffleTickets';
import { WPAYOrderPaymentSkeleton } from 'pages/wpay/OrderPayment/OrderPaymentSkeleton';

import { DollarsModalProvider } from 'containers/wallet/DollarsModal/DollarsModalProvider';

import PasscodeVerify from 'components/PasscodeVerify/PasscodeVerify';
import SnackbarProvider from 'components/Snackbar/SnackbarProvider';

import { convertLangCodeFromAPItoISO, setLanguage } from 'utils/common/lang';
import { logEvent, setAnalyticsProps } from 'utils/common/logEvent';
import { multiLazy } from 'utils/common/multiLazy';
import { parseStartAttach } from 'utils/common/startattach';
import { refreshBalance } from 'utils/wallet/balance';

import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useIsPageReloaded } from 'hooks/utils/useIsPageReloaded';

import { useKycStatus } from './query/wallet/kyc/useKycStatus';
import { updateTransaction } from './query/wallet/transactions/useTransactions';

const KYCSumsub = lazy(() => import('pages/wallet/KYC/Sumsub/Sumsub'));

function expandWebview(): void {
  if (window.Telegram.WebApp.isExpanded) return;

  window.Telegram.WebApp.expand();

  const expandInterval = setInterval(() => {
    if (window.Telegram.WebApp.isExpanded) {
      clearInterval(expandInterval);
      return;
    }

    window.Telegram.WebApp.expand();
  }, 500);
}

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const [WPAYOrderPayment, WPAYChoosePaymentAsset, WPAYChooseDepositType] =
  multiLazy([
    () => import('pages/wpay/OrderPayment/OrderPayment'),
    () => import('pages/wpay/ChoosePaymentAsset/ChoosePaymentAsset'),
    () => import('pages/wpay/ChooseDepositType/ChooseDepositType'),
  ]);

const [
  SCWMain,
  SCWOnboarding,
  SCWReceiveOptions,
  SCWQR,
  SCWSendChooseAsset,
  SCWSend,
  SCWSendTonConfirmation,
  SCWSendJettonConfirmation,
  SCWSendTonOptions,
  SCWSendSuccess,
  SCWReceiverSearch,
  SCWRoutesGuard,
  SCWSettings,
  SCWSettingsLogout,
  SCWImportChooseMethod,
  SCWImportConfirmation,
  SCWImportMnemonic,
  SCWImportFailedPage,
  SCWImportSuccessPage,
  SCWImportExisting,
  SCWBackupChooseMethod,
  SCWBackupManual,
  SCWBackupTest,
  SCWTestSuccess,
  SCWBackupSuccess,
  SCWRecover,
  SCWUpdate,
  SCWAsset,
  SCWTx,
] = multiLazy([
  () => import('pages/scw/Main/Main'),
  () => import('pages/scw/Onboarding/Onboarding'),
  () => import('pages/scw/ReceiveOptions/ReceiveOptions'),
  () => import('pages/scw/QR/QR'),
  () => import('pages/scw/Send/SendChooseAsset'),
  () => import('pages/scw/Send/Send'),
  () => import('pages/scw/SendTonConfirmation'),
  () => import('pages/scw/SendJettonConfirmation'),
  () => import('pages/scw/SendTonOptions'),
  () => import('pages/scw/SendSuccess/SendSuccess'),
  () => import('pages/scw/ReceiverSearch'),
  () => import('containers/scw/RoutesGuard/RoutesGuard'),
  () => import('pages/scw/Settings/Settings'),
  () => import('pages/scw/SettingsLogout/SettingsLogout'),
  () => import('pages/scw/Import/ChooseMethod/ChooseMethod'),
  () => import('pages/scw/Import/Confirmation/Confirmation'),
  () => import('pages/scw/Import/Mnemonic/Mnemonic'),
  () => import('pages/scw/Import/Failed/Failed'),
  () => import('pages/scw/Import/Success/Success'),
  () => import('pages/scw/Import/Existing/Existing'),
  () => import('pages/scw/Backup/ChooseMethod/ChooseMethod'),
  () => import('pages/scw/Backup/Manual/Manual'),
  () => import('pages/scw/Backup/Test/Test'),
  () => import('pages/scw/Backup/TestSuccess/TestSuccess'),
  () => import('pages/scw/Backup/BackupSuccess/BackupSuccess'),
  () => import('pages/scw/Recover/Recover'),
  () => import('pages/scw/Update/Update'),
  () => import('pages/scw/Asset/Asset'),
  () => import('pages/scw/Tx/Tx'),
]);

const [
  CreatePasscode,
  ResetPasscode,
  TurnOnPasscode,
  SettingsPasscode,
  PasscodeUnlockDuration,
  ChangeRecoveryEmail,
  CreateRecoveryEmail,
] = multiLazy([
  () => import('pages/Passcode/CreatePasscode/CreatePasscode'),
  () => import('pages/Passcode/ResetPasscode/ResetPasscode'),
  () => import('pages/Passcode/TurnOnPasscode/TurnOnPasscode'),
  () => import('pages/SettingsPasscode/SettingsPasscode'),
  () => import('pages/Passcode/PasscodeUnlockDuration/PasscodeUnlockDuration'),
  () => import('pages/RecoveryEmail/ChangeRecoveryEmail/ChangeRecoveryEmail'),
  () => import('pages/RecoveryEmail/CreateRecoveryEmail/CreateRecoveryEmail'),
]);

const [
  HomePage,
  OffersListPage,
  CreateEditOfferSuccessPage,
  CreateOfferPage,
  EditOfferPage,
  NotificationPage,
  OfferPage,
  OfferDetails,
  OfferForm,
  OfferPreviewPage,
  OrderPage,
  UserProfilePage,
  AddComment,
  AddPaymentDetailsList,
  AddPaymentDetailsNew,
  ChoosePaymentMethods,
  DraftOfferForm,
  PreviewOffer,
  SelectFiatCurrency,
  P2PRoutesGuard,
  UserPaymentsPage,
  AddNewPayment,
  CreatePayment,
  EditPayment,
  PaymentsList,
  OfferSelectPayment,
  OfferCreatePayment,
  Collectibles,
  Collectible,
  CollectibleReceiverSearch,
  CollectibleSendConfirmPage,
  CollectibleSendSuccessPage,
] = multiLazy([
  () => import('pages/p2p/HomePage/HomePage'),
  () => import('pages/p2p/OffersListPage/OffersListPage'),
  () =>
    import('pages/p2p/CreateEditOfferSuccessPage/CreateEditOfferSuccessPage'),
  () => import('pages/p2p/CreateOfferPage/CreateOfferPage'),
  () => import('pages/p2p/EditOfferPage/EditOfferPage'),
  () => import('pages/p2p/NotificationsPage/NotificationsPage'),
  () => import('pages/p2p/OfferPage/OfferPage'),
  () => import('pages/p2p/OfferPage/components/OfferDetails/OfferDetails'),
  () => import('pages/p2p/OfferPage/components/OfferForm/OfferForm'),
  () => import('pages/p2p/OfferPreviewPage/OfferPreviewPage'),
  () => import('pages/p2p/OrderPage/OrderPage'),
  () => import('pages/p2p/UserProfilePage/UserProfilePage'),
  () =>
    import('containers/p2p/CreateEditOffer/components/AddComment/AddComment'),
  () =>
    import(
      'containers/p2p/CreateEditOffer/components/AddPaymentDetails/AddPaymentDetailsList'
    ),
  () =>
    import(
      'containers/p2p/CreateEditOffer/components/AddPaymentDetails/AddPaymentDetailsNew'
    ),
  () =>
    import(
      'containers/p2p/CreateEditOffer/components/ChoosePaymentMethods/ChoosePaymentMethods'
    ),
  () =>
    import(
      'containers/p2p/CreateEditOffer/components/DraftOfferForm/DraftOfferForm'
    ),
  () =>
    import(
      'containers/p2p/CreateEditOffer/components/PreviewOffer/PreviewOffer'
    ),
  () => import('containers/p2p/CreateEditOffer/components/SelectFiatCurrency'),
  () => import('containers/p2p/RoutesGuard/RoutesGuard'),
  () => import('pages/p2p/UserPaymentsPage/UserPaymentsPage'),
  () =>
    import('pages/p2p/UserPaymentsPage/components/AddNewPayment/AddNewPayment'),
  () => import('pages/p2p/UserPaymentsPage/components/CreatePayment'),
  () => import('pages/p2p/UserPaymentsPage/components/EditPayment'),
  () =>
    import('pages/p2p/UserPaymentsPage/components/PaymentsList/PaymentsList'),
  () => import('pages/p2p/OfferPage/components/SelectPayment/SelectPayment'),
  () => import('pages/p2p/OfferPage/components/CreatePayment/CreatePayment'),
  () => import('pages/collectibles/CollectiblesPage/CollectiblesPage'),
  () => import('pages/collectibles/CollectiblePage/CollectiblePage'),
  () =>
    import(
      'pages/collectibles/CollectibleReceiverSearch/CollectibleReceiverSearch'
    ),
  () =>
    import(
      'pages/collectibles/CollectibleSendConfirmPage/CollectibleSendConfirmPage'
    ),
  () =>
    import(
      'pages/collectibles/CollectibleSendSuccessPage/CollectibleSendSuccessPage'
    ),
]);

declare global {
  interface Window {
    WalletAuth: Promise<AccessToken>;
    Telegram: {
      WebApp: WebApp;
      WebView: WebView;
    };
    amplitude: Amplitude;
  }
}

const ROUTE_PATTERN_TO_FALLBACK = {
  [routePaths.P2P_OFFER_CREATE]: null,
  [routePaths.P2P_OFFER_EDIT]: null,
  [routePaths.P2P_OFFER_DETAILS]: null,
  [routePaths.P2P_HOME]: HomePageFallback,
  [routePaths.P2P_OFFERS]: OffersListPageFallback,
  [routePaths.P2P_ORDER]: OrderPageFallback,
  [routePaths.P2P_OFFER]: OfferPageFallback,
  [routePaths.P2P_OFFER_PREVIEW]: OfferPreviewPageFallback,
  [routePaths.P2P_USER_PROFILE]: UserProfilePageFallback,
  [routePaths.COLLECTIBLES]: CollectiblesPageFallback,
  [routePaths.COLLECTIBLE]: CollectiblePageFallback,
} as const;

const RoutesFallback = () => {
  const location = useLocation();

  const routePattern = Object.keys(ROUTE_PATTERN_TO_FALLBACK).find(
    (pattern) => {
      const isMatch = !!matchPath(
        {
          path: pattern,
        },
        location.pathname,
      );

      return isMatch;
    },
  ) as keyof typeof ROUTE_PATTERN_TO_FALLBACK | undefined;

  if (!routePattern) {
    return null;
  }

  const Fallback = ROUTE_PATTERN_TO_FALLBACK[routePattern];

  if (!Fallback) {
    return null;
  }

  return <Fallback />;
};

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isBot, startParam, isYourSelf } = useSelector(
    (state: RootState) => state.session,
  );
  const {
    payment_id: paymentId,
    purchase_id: purchaseId,
    method: paymentMethod,
    status: paymentStatus,
    assetCurrency: paymentAssetCurrency,
  } = useSelector((state: RootState) => state.purchase);
  const { languageCode, preferredAsset } = useSelector(
    (state: RootState) => state.settings,
  );
  const authorized = useSelector((state: RootState) => state.user.authorized);
  const {
    isRussian,
    language_code: tgUserLanguageCode,
    featureFlags: storeFeatureFlags,
  } = useSelector((state: RootState) => state.user);
  const { displaySCW: storeDisplaySCW } = useSelector(
    (state: RootState) => state.warningsVisibility,
  );
  const { russianCardRestrictionPopup } = useSelector(
    (state: RootState) => state.warningsVisibility,
  );
  const purchasePollingTimeout = useRef<number>();
  const { id } = useSelector((state: RootState) => state.user);
  const { userId: p2pUserId, userCountryPhoneAlpha2Code } = useSelector(
    (state: RootState) => state.p2pUser,
  );
  const fiatCurrency = useAppSelector((state) => state.settings.fiatCurrency);
  const scwAddress = useAppSelector((state) => state.scw.address);
  const { passcodeType, requiredOnOpen, openUnlocked } = useSelector(
    (state: RootState) => state.passcode,
  );

  // Из-за того, что мы сначала попадаем на /wv, а потом на нужный роут, в Sentry при pageload отсылается куча
  // переходов на /wv, хотя на самом деле юзер находится уже не там.
  const navigateAndCapture = (to: To) => {
    navigate(to);
    Sentry.configureScope((scope) =>
      scope.setTransactionName(
        typeof to === 'string'
          ? to
          : `${String(to.pathname)}?${String(to.search)}`,
      ),
    );
  };

  useDidUpdate(() => {
    setLanguage(i18n, languageCode);
  }, [languageCode, i18n]);

  useEffect(() => {
    const navigateToSettings = () => {
      if (location.pathname === routePaths.SETTINGS_LANGUAGE) {
        window.history.back();
      } else if (
        matchPath(`${routePaths.SCW_MAIN}*`, location.pathname) &&
        scwAddress
      ) {
        window.Telegram.WebApp.expand();
        navigate(routePaths.SCW_SETTINGS);
      } else if (
        location.pathname !== routePaths.SETTINGS &&
        location.pathname !== routePaths.WV
      ) {
        window.Telegram.WebApp.expand();
        navigate(routePaths.SETTINGS);
      }
    };

    window.Telegram.WebApp.onEvent('settingsButtonClicked', navigateToSettings);

    return () =>
      window.Telegram.WebApp.offEvent(
        'settingsButtonClicked',
        navigateToSettings,
      );
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    const handler = ({ status }: { status: InvoiceStatus }) => {
      if (status === 'cancelled' && typeof purchaseId === 'number') {
        API.Purchases.cancelPurchase(purchaseId).then(() => {
          dispatch(cleanPurchase());
        });
      }
    };
    window.Telegram.WebApp.onEvent('invoiceClosed', handler);

    return () => {
      window.Telegram.WebApp.offEvent('invoiceClosed', handler);
    };
  }, [purchaseId, dispatch]);

  useEffect(() => {
    const purchaseInfo = () => {
      paymentId &&
        paymentMethod &&
        paymentAssetCurrency &&
        API.Purchases.purchaseInfo(paymentId, paymentMethod).then((result) => {
          dispatch(updatePurchase({ status: result.data.status }));
          switch (result.data.status) {
            case 'success':
              refreshBalance();
              if (isRussian && russianCardRestrictionPopup) {
                API.WVSettings.setUserWvSettings({
                  display_ru_card_option: false,
                }).then(() => {
                  dispatch(
                    updateWarningsVisibility({
                      russianCardRestrictionPopup: false,
                    }),
                  );
                });
              }
              updateTransaction(
                (transaction) => transaction.purchase_external_id === paymentId,
                { status: 'success' },
              );
              break;
            case 'fail':
              updateTransaction(
                (transaction) => transaction.purchase_external_id === paymentId,
                { status: 'fail' },
              );
              break;
            case 'pending':
              purchasePollingTimeout.current = window.setTimeout(() => {
                purchaseInfo();
              }, 1500);
          }
        });
    };

    clearTimeout(purchasePollingTimeout.current);
    if (paymentStatus === 'pending' && authorized) {
      purchaseInfo();
    }
    // eslint-disable-next-line
  }, [paymentStatus, paymentMethod, paymentId, authorized, dispatch]);

  const isPageReloaded = useIsPageReloaded();

  useEffect(() => {
    if (!isPageReloaded) {
      Promise.all([window.WalletAuthPromise, window.WalletLangpackPromise])
        .then(
          ([
            {
              is_new_user: isNewUser,
              local_currency: localFiatCurrency,
              accounts,
              feature_flags: featureFlags,
              country_alpha2_ip: userCountryAlpha2Code,
              country_alpha2_phone: userCountryPhoneAlpha2Code,
              bot_username: botUsername,
              bot_language: botLanguage,
              gift: gift,
              campaign_participation: campaignParticipation,
              user_id: userId,
              wv_settings: wvSettings,
              available_balance_total_fiat_amount:
                availableBalanceTotalFiatAmount,
              available_balance_total_fiat_currency:
                availableBalanceTotalFiatCurrency,
              permissions,
            },
            data,
          ]) => {
            // informs the Telegram app that the Web App is ready to be displayed
            window.Telegram.WebApp.ready();

            const botLangCode = convertLangCodeFromAPItoISO(botLanguage);

            if (data) {
              const { langpack } = data;
              i18n.addResourceBundle(botLangCode, 'translation', langpack);
              setLanguage(i18n, botLangCode);
            } else {
              Sentry.captureException('Langpack was not loaded');
            }

            Sentry.setTag('wallet.language', botLangCode);

            setAnalyticsProps({ userId, userCountryPhoneAlpha2Code });

            dispatch(
              setUser({
                userId,
                userCountryAlpha2Code,
                userCountryPhoneAlpha2Code,
              }),
            );
            dispatch(setAuthorized(true));

            dispatch(updateFiatCurrency(localFiatCurrency));

            dispatch(updateLanguage(botLangCode));

            if (
              preferredAsset &&
              !accounts.find((asset) => asset.currency === preferredAsset)
            ) {
              dispatch(updatePreferredAsset(FrontendCryptoCurrencyEnum.Ton));
            }

            dispatch(
              updateWarningsVisibility({
                russianCardRestriction: wvSettings.display_ru_card_restriction,
                russianCardRestrictionPopup: wvSettings.display_ru_card_option,
                shareGiftIsOver: wvSettings.display_share_gift_is_over,
                whatAreDollars: wvSettings.display_what_are_dollars,
                hasScwAddress: wvSettings.has_scw_address,
                expandCryptocurrency: wvSettings.expand_cryptocurrency,
                displaySCW: wvSettings.display_scw,
              }),
            );

            dispatch(
              setP2P({
                isWhyUsdtCalloutShown: !wvSettings.p2p_usdt_info_hidden,
                isP2pOnboardingShown: wvSettings.p2p_onboarding_completed,
              }),
            );

            dispatch(
              updateWallet({
                botUsername,
                totalFiatAmount: availableBalanceTotalFiatAmount,
                totalFiatCurrency: availableBalanceTotalFiatCurrency,
                assets: accounts.map((account) => {
                  return {
                    address: account.addresses[0].address,
                    network: account.addresses[0].network,
                    hasTransactions: account.has_transactions,
                    balance: account.available_balance,
                    currency: account.currency as FrontendCryptoCurrencyEnum,
                    fiatBalance: account.available_balance_fiat_amount!,
                    fiatCurrency: account.available_balance_fiat_currency,
                  };
                }),
              }),
            );

            dispatch(updateFeatureFlags(featureFlags));
            dispatch(updatePermissions(permissions));

            dispatch(
              setIsRussian(
                userCountryAlpha2Code?.toLowerCase() === 'ru' ||
                  userCountryPhoneAlpha2Code?.toLowerCase() === 'ru',
              ),
            );

            if (campaignParticipation) {
              dispatch(
                setCampaignParticipation({
                  isLastWave: campaignParticipation.is_last_wave,
                  campaignEndDate: campaignParticipation.campaign_end_date,
                  shareGiftCount: campaignParticipation.share_gift_count,
                }),
              );
            } else {
              dispatch(resetCampaignParticipation());
            }

            if (gift) {
              dispatch(
                setGift({
                  amount: gift.amount,
                  currency: gift.currency,
                  status: gift.status,
                }),
              );
            } else {
              dispatch(resetGift());
            }

            if (botLanguage !== tgUserLanguageCode) {
              Sentry.captureMessage(`tg user language !== wv user language`, {
                level: 'info',
              });
            }
            if (startParam) {
              logEvent('Open Bot', {
                priority: 'P2',
                category: 'Admin',
                startParam,
              });
            }

            if (startParam) {
              const { operation, params } = parseStartAttach(startParam);

              if (operation === 'wpay_order' && featureFlags.wpay_as_payer) {
                navigateAndCapture(
                  `${routePaths.WPAY_ORDER_PAYMENT}?order_id=${params.orderId}`,
                );
              } else if (operation === 'st') {
                if (
                  params.receiverId ===
                  window.Telegram.WebApp.initDataUnsafe.user?.id
                ) {
                  if (isNewUser) {
                    window.Telegram.WebApp.expand();
                    navigateAndCapture({
                      pathname: routePaths.FIRST_TRANSACTION,
                      search: createSearchParams({
                        correspondingTransactionId: params.sentTransactionId,
                      }).toString(),
                    });
                  } else {
                    navigateAndCapture({
                      pathname: routePaths.TRANSACTION,
                      search: createSearchParams({
                        correspondingTransactionId: params.sentTransactionId,
                        from: 'direct_messages',
                      }).toString(),
                    });
                  }
                } else if (
                  params.senderId ===
                  window.Telegram.WebApp.initDataUnsafe.user?.id
                ) {
                  navigateAndCapture({
                    pathname: routePaths.TRANSACTION,
                    search: createSearchParams({
                      transactionId: params.sentTransactionId,
                      from: 'direct_messages',
                    }).toString(),
                  });
                } else {
                  navigateAndCapture(routePaths.MAIN);
                }
              } else if (isNewUser) {
                navigateAndCapture(routePaths.ONBOARDING);
              } else if (
                operation === 'scw_beta_waitlist_success' &&
                featureFlags.scw_beta_waitlist
              ) {
                navigateAndCapture(routePaths.SCW_BETA_WAITLIST_SUCCESS);
              } else if (operation === 'scw_onboarding') {
                navigateAndCapture(routePaths.SCW_ONBOARDING);
              } else if (operation === 'receiverSearch') {
                navigateAndCapture({
                  pathname: generatePath(routePaths.RECEIVER_SEARCH, {
                    assetCurrency: params.assetCurrency,
                  }),
                  search: createSearchParams({
                    backPath: routePaths.MAIN,
                  }).toString(),
                });
              } else if (operation === 'chooseAsset') {
                navigateAndCapture({
                  pathname: generatePath(routePaths.CHOOSE_ASSET, {
                    type: params.type,
                  }),
                  search: createSearchParams({
                    backPath: routePaths.MAIN,
                  }).toString(),
                });
              } else if (
                operation === 'usdt_raffle' &&
                featureFlags.usdt_raffle &&
                permissions.can_usdt_raffle
              ) {
                navigateAndCapture(routePaths.USDT_RUFFLE);
              } else if (
                operation === 'usdt_raffle_tickets' &&
                featureFlags.usdt_raffle &&
                permissions.can_usdt_raffle
              ) {
                navigateAndCapture(routePaths.USDT_RUFFLE_TICKETS);
              } else if (operation === 'gift' && gift) {
                navigateAndCapture(routePaths.OPEN_GIFT);
              } else if (operation === 'purchasing' && paymentId) {
                navigateAndCapture(routePaths.OPEN_GIFT);
              } else if (operation === 'sendOptions') {
                navigateAndCapture(routePaths.SEND_OPTIONS);
              } else if (operation === 'kyc_success') {
                navigateAndCapture(
                  generatePath(routePaths.PURCHASE, {
                    assetCurrency: params.assetCurrency,
                  }),
                );
              } else if (operation === 'kyc_retry') {
                navigateAndCapture(routePaths.KYC);
              } else if (operation.startsWith('kyc_start')) {
                const level = startParam.replace('kyc_start_', '');

                if (level) {
                  expandWebview();

                  dispatch(
                    updateKyc({
                      nextLevel: level as KycStatusPublicDtoLevelEnum,
                    }),
                  );

                  navigateAndCapture({
                    pathname: routePaths.KYC_CONFIRMATION,
                    search: createSearchParams({
                      backPath: routePaths.KYC_SETTINGS,
                    }).toString(),
                  });
                }
              } else if (operation.startsWith('kyc_settings')) {
                const level = startParam.replace('kyc_settings', '');

                if (level) {
                  expandWebview();
                  navigateAndCapture({
                    pathname: routePaths.KYC_SETTINGS,
                    search: createSearchParams({
                      kycLevel: String(level),
                      backPath: routePaths.MAIN,
                    }).toString(),
                  });
                }
              } else if (operation === 'send_gift' && campaignParticipation) {
                navigateAndCapture(routePaths.SEND_GIFT);
              } else if (operation === 'send' && !isYourSelf) {
                navigateAndCapture({
                  pathname: routePaths.SEND,
                  search: createSearchParams({
                    value: String(params.value ?? 0),
                    assetCurrency: params.assetCurrency || '',
                  }).toString(),
                });
              } else if (operation.startsWith('offerid')) {
                logEvent('Market opened', {
                  category: 'p2p',
                  source: 'link',
                });

                const [offerId, userId] = startParam
                  .replace('offerid_', '')
                  .split('_');

                if (offerId) {
                  expandWebview();

                  if (Number(userId) === p2pUserId) {
                    navigateAndCapture(
                      generatePath(routePaths.P2P_OFFER_PREVIEW, {
                        id: offerId,
                      }),
                    );
                  } else {
                    navigateAndCapture(
                      generatePath(routePaths.P2P_OFFER, { id: offerId }),
                    );
                  }
                } else {
                  Sentry.captureMessage('Invalid offer id');
                  navigateAndCapture(routePaths.P2P_HOME);
                }
              } else if (operation.startsWith('orderid')) {
                logEvent('Market opened', {
                  category: 'p2p',
                  source: 'link',
                });

                const orderId = startParam.split('_')[1];

                if (orderId) {
                  expandWebview();

                  navigateAndCapture(
                    `${generatePath(routePaths.P2P_ORDER, {
                      id: orderId,
                    })}?${createSearchParams({
                      showStatusWithDetails: String(true),
                    }).toString()}`,
                  );
                } else {
                  Sentry.captureMessage('Invalid order id');
                  navigateAndCapture(routePaths.P2P_HOME);
                }
              } else if (operation.startsWith('marketads')) {
                logEvent('Market opened', {
                  category: 'p2p',
                  source: 'bot',
                });

                const offerType = startParam.split(
                  '_',
                )[1] as BaseOfferRestDtoTypeEnum;

                expandWebview();

                if (offerType) {
                  if (
                    Object.values(BaseOfferRestDtoTypeEnum).includes(offerType)
                  ) {
                    navigateAndCapture(
                      generatePath(routePaths.P2P_OFFERS, {
                        type: offerType,
                        '*': '',
                      }),
                    );
                  } else {
                    Sentry.captureMessage('Incorrect offer type');

                    navigateAndCapture(
                      generatePath(routePaths.P2P_OFFERS, {
                        type: 'SALE',
                        '*': '',
                      }),
                    );
                  }
                } else {
                  Sentry.captureMessage('Not defined offer type');

                  navigateAndCapture(
                    generatePath(routePaths.P2P_OFFERS, {
                      type: 'SALE',
                      '*': '',
                    }),
                  );
                }
              } else if (operation === 'market') {
                logEvent('Market opened', {
                  category: 'p2p',
                  source: 'bot',
                });

                navigateAndCapture(routePaths.P2P_HOME);
              } else if (operation.startsWith('profile')) {
                logEvent('Market opened', {
                  category: 'p2p',
                  source: 'bot',
                });

                expandWebview();

                navigateAndCapture(routePaths.P2P_USER_PROFILE);
              } else if (operation === 'tonconnect') {
                // TODO: Check if SCW is setup, and show onboarding if not
                navigateAndCapture({
                  pathname: routePaths.SCW_MAIN,
                  search: createSearchParams({
                    v: String(params.v ?? 2),
                    id: params.id || '',
                    r: params.r,
                    ret: params.ret,
                  }).toString(),
                });
              } else if (operation.startsWith('collectible')) {
                const address = startParam.split(/_(.*)/s)[1];
                if (address) {
                  navigateAndCapture({
                    pathname: generatePath(routePaths.COLLECTIBLE, { address }),
                    search: createSearchParams({
                      backPath: routePaths.MAIN,
                    }).toString(),
                  });
                }
              } else if (operation.startsWith('firstDeposit')) {
                navigateAndCapture(routePaths.FIRST_DEPOSIT);
              } else if (operation.startsWith('settings')) {
                navigateAndCapture(routePaths.SETTINGS);
              } else {
                navigateAndCapture(routePaths.MAIN);
              }
            } else if (isNewUser) {
              navigateAndCapture(routePaths.ONBOARDING);
            } else {
              navigateAndCapture(routePaths.MAIN);
            }
          },
        )
        .catch((error) => {
          window.WalletLangpackPromise.then((data) => {
            if (data) {
              const { langpack, language } = data;

              i18n.addResourceBundle(language, 'translation', langpack);
              setLanguage(i18n, language);
            } else {
              Sentry.captureException('Langpack was not loaded');
            }
          }).finally(() => {
            if (error?.status >= 500) {
              Sentry.captureException(error);
              navigateAndCapture(routePaths.ERROR);
            } else if (error?.status === 404) {
              Sentry.captureException(error);
              navigateAndCapture(routePaths.UNKNOWN_ERROR);
            } else if (
              error?.status === 403 &&
              error?.data?.code === 'content_unavailable'
            ) {
              navigateAndCapture(routePaths.UNAVAILABLE);
            } else if (
              error?.status === 403 &&
              error?.data?.code === 'country_is_forbidden'
            ) {
              navigateAndCapture(routePaths.COUNTRY_FORBIDDEN);
            } else if (
              error?.status === 401 &&
              error?.data?.code === 'user_not_found'
            ) {
              window.location.href = error?.data?.detail;
              if (isBot) {
                window.Telegram.WebApp.close();
              }
            } else {
              Sentry.captureException('Unknown auth error');
            }
          });
        });
    } else {
      setAnalyticsProps({ userId: id, userCountryPhoneAlpha2Code });
      dispatch(setAuthorized(true));
      refreshBalance();
      logEvent('Reload page', { priority: 'P2', category: 'Admin' });
    }

    // eslint-disable-next-line
  }, [p2pUserId]);

  useEffect(() => {
    // allow scw users to get recovery email address, even if they do not have passcode
    if (
      authorized &&
      (storeFeatureFlags.passcode || storeFeatureFlags.scw || storeDisplaySCW)
    ) {
      APIV2.Passcodes.getPasscodeInfo().then((response) => {
        const { passcodeType, unlockDuration, requiredOnOpen, recoveryEmail } =
          response.data;
        dispatch(
          updatePasscode({
            passcodeType,
            unlockDuration,
            requiredOnOpen,
            recoveryEmail,
          }),
        );
      });
    }
  }, [
    dispatch,
    authorized,
    storeFeatureFlags.passcode,
    storeFeatureFlags.scw,
    storeDisplaySCW,
  ]);

  useEffect(() => {
    dispatch(setLocation({ location }));
  }, [dispatch, location]);

  useDidUpdate(() => {
    if (!authorized) return;
    API.Users.getPaymentMethods().then(({ data }) => {
      dispatch(
        updatePurchaseByCard({
          available: data.card_default.is_available,
          code: data.card_default.reason_code,
        }),
      );
    });
  }, [dispatch, authorized]);

  useDidUpdate(() => refreshBalance(), [fiatCurrency, dispatch]);

  useEffect(() => {
    if (!isPageReloaded) {
      dispatch(
        setFilters({
          amountValue: undefined,
          amount: undefined,
          paymentMethods: undefined,
        }),
      );

      dispatch(
        setP2P({
          chosenCryptoCurrencyOnAssetPageForDom: undefined,
          chosenCryptoCurrencyOnAssetPageForAdForm: undefined,
        }),
      );

      dispatch(updateSCW({ pendingTransactions: [] }));
      dispatch(updatePasscode({ openUnlocked: false }));
    }
  }, []);

  const { defaultCurrencies } = useAppSelector((state) => state.p2pAdForm);

  const { filters } = useAppSelector((state) => state.p2pDom);

  // TODO: remove after backend will remove USD WT-3664
  useEffect(() => {
    dispatch(
      setDefaultCurrencies({
        fiat: defaultCurrencies.fiat === 'USD' ? 'EUR' : defaultCurrencies.fiat,
      }),
    );

    dispatch(
      setFilters({
        ...filters,
        fiatCurrency:
          filters?.fiatCurrency === 'USD' ? 'EUR' : filters?.fiatCurrency,
      }),
    );
  }, []);

  // Prefetching
  useLastUsedPaymentCurrencies();
  useSupportedCurrencies();
  useCountryToCurrency();
  usePurchaseSettings();
  useSCWAddresses();
  useKycLimits();
  useKycStatus();

  const { featureFlags } = useAppSelector((state) => state.user);

  return (
    <AppearanceProvider>
      <DollarsModalProvider>
        <SnackbarProvider>
          <Suspense fallback={<RoutesFallback />}>
            <SentryRoutes>
              <Route path={routePaths.WV} element={null} />
              <Route path={routePaths.ONBOARDING} element={<Onboarding />} />
              <Route
                path={routePaths.FIRST_TRANSACTION}
                element={<FirstTransaction />}
              />
              <Route
                path={routePaths.ATTACHES_PROMO}
                element={<AttachPromo />}
              />
              <Route
                path={routePaths.FIRST_DEPOSIT}
                element={<FirstDeposit />}
              />
              <Route path={routePaths.MAIN} element={<Main />} />
              <Route path={routePaths.EXCHANGE} element={<Exchange />}>
                <Route index element={<ExchangeForm />} />
                <Route
                  path={routePaths.EXCHANGE_CONFIRMATION}
                  element={<ExchangeConfirmation />}
                />
              </Route>
              <Route path={routePaths.CHOOSE_ASSET} element={<ChooseAsset />} />
              <Route path={routePaths.ASSETS} element={<Assets />}>
                <Route index element={<Asset />} />
                <Route path={routePaths.PURCHASE} element={<Purchase />} />
                <Route
                  path={routePaths.RECEIVER_SEARCH}
                  element={<ReceiverSearch />}
                />
              </Route>
              <Route path={routePaths.SEND} element={<Send />} />
              <Route
                path={routePaths.SEND_REQUEST_CONFIRMATION}
                element={<SendRequestConfirmation />}
              />
              <Route
                path={routePaths.SEND_REQUEST_STATUS}
                element={<SendRequestStatus />}
              />
              <Route path={routePaths.KYC} element={<KYC />} />
              <Route path={routePaths.KYC_SUMSUB} element={<KYCSumsub />} />
              <Route
                path={routePaths.KYC_FIRST_CONFIRMATION}
                element={<KYCFirstConfirmation />}
              />
              <Route
                path={routePaths.KYC_CONFIRMATION}
                element={<KYCConfirmation />}
              />
              <Route path={routePaths.RECEIVE} element={<Receive />} />
              <Route path={routePaths.SEND_OPTIONS} element={<SendOptions />} />
              <Route
                path={routePaths.PURCHASE_OPTIONS}
                element={<PurchaseOptions />}
              />
              <Route path={routePaths.SETTINGS} element={<Settings />} />
              <Route
                path={routePaths.SETTINGS_LANGUAGE}
                element={<SettingsLanguage />}
              />
              <Route
                path={routePaths.SETTINGS_PASSCODE}
                element={<SettingsPasscode />}
              />
              <Route
                path={routePaths.PASSCODE_TURN_ON}
                element={<TurnOnPasscode />}
              />
              <Route
                path={routePaths.PASSCODE_CREATE}
                element={<CreatePasscode />}
              />
              <Route
                path={routePaths.PASSCODE_RESET}
                element={<ResetPasscode />}
              />
              <Route
                path={routePaths.PASSCODE_UNLOCK_DURATION}
                element={<PasscodeUnlockDuration />}
              />
              <Route
                path={routePaths.RECOVERY_EMAIL_CHANGE}
                element={<ChangeRecoveryEmail />}
              />
              <Route
                path={routePaths.RECOVERY_EMAIL_CREATE}
                element={<CreateRecoveryEmail />}
              />
              <Route
                path={routePaths.SCW_SETTINGS_LOGOUT}
                element={<SCWSettingsLogout />}
              />
              <Route path={routePaths.SCW_SETTINGS} element={<SCWSettings />} />
              <Route path={routePaths.KYC_SETTINGS} element={<KYCSettings />} />
              <Route path={routePaths.TRANSACTION} element={<Transaction />} />
              <Route
                path={routePaths.PURCHASE_STATUS}
                element={<PurchaseStatus />}
              />
              <Route path={routePaths.UNAVAILABLE} element={<Unavailable />} />
              <Route
                path={routePaths.UNKNOWN_ERROR}
                element={<UnknownError />}
              />
              <Route
                path={routePaths.COUNTRY_FORBIDDEN}
                element={<CountryForbidden />}
              />
              <Route
                path={routePaths.USDT_RUFFLE_TICKETS}
                element={<UsdtRuffleTicketsPage />}
              />
              <Route
                path={routePaths.USDT_RUFFLE}
                element={<UsdtRuffleMain />}
              />
              <Route path={routePaths.ERROR} element={<Error />} />
              <Route path={routePaths.OPEN_GIFT} element={<></>} />
              <Route path={routePaths.SEND_GIFT} element={<></>} />
              <Route
                path={routePaths.SELECT_PAYMENT_CURRENCY}
                element={<SelectPaymentCurrency />}
              />
              <Route
                path={routePaths.SETTINGS_SELECT_PAYMENT_CURRENCY}
                element={<SettingsSelectPaymentCurrency />}
              />
              <Route element={<P2PRoutesGuard />}>
                <Route path={routePaths.P2P_HOME} element={<HomePage />} />
                <Route
                  path={routePaths.P2P_NOTIFICATIONS}
                  element={<NotificationPage />}
                />
                <Route
                  path={routePaths.P2P_OFFERS}
                  element={<OffersListPage />}
                />
                <Route path={routePaths.P2P_OFFER} element={<OfferPage />}>
                  <Route index element={<OfferForm />} />
                  <Route
                    path={routePaths.P2P_OFFER_DETAILS}
                    element={<OfferDetails />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_SELECT_PAYMENT}
                    element={<OfferSelectPayment />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_PAYMENT}
                    element={<OfferCreatePayment />}
                  />
                </Route>
                <Route
                  path={routePaths.P2P_OFFER_CREATE}
                  element={<CreateOfferPage />}
                >
                  <Route index element={<DraftOfferForm />} />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_ADD_PAYMENT_METHODS}
                    element={<AddPaymentDetailsList />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_NEW_PAYMENT_METHOD}
                    element={<AddPaymentDetailsNew />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_CHOOSE_PAYMENT_METHODS}
                    element={<ChoosePaymentMethods />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_ADD_COMMENT}
                    element={<AddComment />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_PREVIEW_OFFER}
                    element={<PreviewOffer />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_CREATE_SELECT_CURRENCY}
                    element={<SelectFiatCurrency />}
                  />
                </Route>
                <Route
                  path={routePaths.P2P_OFFER_EDIT}
                  element={<EditOfferPage />}
                >
                  <Route index element={<DraftOfferForm />} />
                  <Route
                    path={routePaths.P2P_OFFER_EDIT_ADD_PAYMENT_METHODS}
                    element={<AddPaymentDetailsList />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_EDIT_NEW_PAYMENT_METHOD}
                    element={<AddPaymentDetailsNew />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_EDIT_CHOOSE_PAYMENT_METHODS}
                    element={<ChoosePaymentMethods />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_EDIT_ADD_COMMENT}
                    element={<AddComment />}
                  />
                  <Route
                    path={routePaths.P2P_OFFER_EDIT_PREVIEW_OFFER}
                    element={<PreviewOffer />}
                  />
                </Route>
                <Route
                  path={routePaths.P2P_OFFER_CREATE_EDIT_SUCCESS}
                  element={<CreateEditOfferSuccessPage />}
                />
                <Route
                  path={routePaths.P2P_OFFER_PREVIEW}
                  element={<OfferPreviewPage />}
                />
                <Route path={routePaths.P2P_ORDER} element={<OrderPage />} />
                <Route
                  path={routePaths.P2P_USER_PROFILE}
                  element={<UserProfilePage />}
                />
                <Route
                  path={routePaths.P2P_USER_PAYMENTS}
                  element={<UserPaymentsPage />}
                >
                  <Route index element={<PaymentsList />} />
                  <Route
                    path={routePaths.P2P_USER_PAYMENTS_NEW}
                    element={<AddNewPayment />}
                  />
                  <Route
                    path={routePaths.P2P_USER_PAYMENTS_CREATE}
                    element={<CreatePayment />}
                  />
                  <Route
                    path={routePaths.P2P_USER_PAYMENTS_EDIT}
                    element={<EditPayment />}
                  />
                </Route>
              </Route>
              <Route
                path={routePaths.P2P_UNAVAILABLE}
                element={<OperationsUnavailable />}
              />
              <Route path={routePaths.WPAY_ORDER_PAYMENT}>
                <Route
                  index
                  element={
                    <Suspense fallback={<WPAYOrderPaymentSkeleton />}>
                      <WPAYOrderPayment />
                    </Suspense>
                  }
                />
                <Route
                  path={routePaths.WPAY_CHOOSE_PAYMENT_ASSET}
                  element={
                    <Suspense fallback={null}>
                      <WPAYChoosePaymentAsset />
                    </Suspense>
                  }
                />
                <Route
                  path={routePaths.WPAY_CHOOSE_DEPOSIT_TYPE}
                  element={
                    <Suspense fallback={null}>
                      <WPAYChooseDepositType />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path={routePaths.SCW_ONBOARDING}
                element={<SCWOnboarding />}
              />
              <Route
                path={routePaths.SCW_IMPORT_CHOOSE_METHOD}
                element={<SCWImportChooseMethod />}
              />
              <Route
                path={routePaths.SCW_IMPORT_CONFIRMATION}
                element={<SCWImportConfirmation />}
              />
              <Route
                path={routePaths.SWC_IMPORT_MNEMONIC}
                element={<SCWImportMnemonic />}
              />
              <Route
                path={routePaths.SWC_IMPORT_FAILED}
                element={<SCWImportFailedPage />}
              />
              <Route
                path={routePaths.SWC_IMPORT_SUCCESS}
                element={<SCWImportSuccessPage />}
              />
              <Route
                path={routePaths.SCW_IMPORT_EXISTING}
                element={<SCWImportExisting />}
              />
              <Route
                path={routePaths.SCW_BACKUP_CHOOSE_METHOD}
                element={<SCWBackupChooseMethod />}
              />
              <Route
                path={routePaths.SCW_BACKUP_MANUAL}
                element={<SCWBackupManual />}
              />
              <Route
                path={routePaths.SCW_BACKUP_TEST}
                element={<SCWBackupTest />}
              />
              <Route
                path={routePaths.SCW_BACKUP_TEST_SUCCESS}
                element={<SCWTestSuccess />}
              />
              <Route
                path={routePaths.SCW_BACKUP_SUCCESS}
                element={<SCWBackupSuccess />}
              />
              <Route path={routePaths.SCW_RECOVER} element={<SCWRecover />} />
              <Route path={routePaths.SCW_UPDATE} element={<SCWUpdate />} />
              <Route path={routePaths.SCW_MAIN} element={<SCWRoutesGuard />}>
                <Route index element={<SCWMain />} />
                <Route
                  path={routePaths.SCW_RECEIVE_OPTIONS}
                  element={<SCWReceiveOptions />}
                />
                <Route path={routePaths.SCW_QR} element={<SCWQR />} />
                <Route
                  path={routePaths.SCW_SEND_TON_OPTIONS}
                  element={<SCWSendTonOptions />}
                />
                <Route
                  path={routePaths.SCW_SEND_TON_CONFIRMATION}
                  element={<SCWSendTonConfirmation />}
                />
                <Route
                  path={routePaths.SCW_SEND_JETTON_CONFIRMATION}
                  element={<SCWSendJettonConfirmation />}
                />
                <Route
                  path={routePaths.SCW_SEND_SUCCESS}
                  element={<SCWSendSuccess />}
                />
                <Route
                  path={routePaths.SCW_RECEIVER_SEARCH}
                  element={<SCWReceiverSearch />}
                />
                <Route
                  path={routePaths.SCW_CHOOSE_ASSET}
                  element={<SCWSendChooseAsset />}
                />
                <Route path={routePaths.SCW_SEND} element={<SCWSend />} />
                <Route path={routePaths.SCW_ASSET} element={<SCWAsset />} />
                <Route path={routePaths.SCW_TX} element={<SCWTx />} />
              </Route>
              <Route
                path={routePaths.SCW_BETA_WAITLIST_SUCCESS}
                element={<BetaWaitlistSuccess />}
              />
              {featureFlags.collectibles && (
                <>
                  <Route
                    path={routePaths.COLLECTIBLES}
                    element={<Collectibles />}
                  />
                  <Route
                    path={routePaths.COLLECTIBLE}
                    element={<Collectible />}
                  />
                  <Route
                    path={routePaths.COLLECTIBLE_RECEIVER_SEARCH}
                    element={<CollectibleReceiverSearch />}
                  />
                  <Route
                    path={routePaths.COLLECTIBLE_SEND_CONFIRM}
                    element={<CollectibleSendConfirmPage />}
                  />
                  <Route
                    path={routePaths.COLLECTIBLE_SEND_SUCCESS}
                    element={<CollectibleSendSuccessPage />}
                  />
                </>
              )}
              {/* if no match show nothing */}
              <Route path="*" element={<NotFound />} />
            </SentryRoutes>
            {passcodeType &&
              requiredOnOpen &&
              !openUnlocked &&
              location.pathname !== routePaths.PASSCODE_RESET && (
                <PasscodeVerify
                  onSuccess={() => {
                    dispatch(updatePasscode({ openUnlocked: true }));
                  }}
                />
              )}
          </Suspense>
        </SnackbarProvider>
      </DollarsModalProvider>
    </AppearanceProvider>
  );
}

export default Sentry.withProfiler(App);
