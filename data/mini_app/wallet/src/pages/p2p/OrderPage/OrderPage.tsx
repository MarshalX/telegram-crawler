import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';
import {
  BuyOfferRestDto,
  OrderRestDto,
  RestResponseCancelRestStatus,
  RestResponseOpenChatRestStatus,
  SellOfferRestDto,
} from 'api/p2p/generated-common';
import { CryptoCurrency, FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { RootState } from 'store';

import { OrderSkeleton } from 'pages/p2p/OrderPage/components/OrderSkeleton/OrderSkeleton';
import {
  getIsOfferDeactivated,
  getIsOrderWasCancelledAfterPaymentConfirm,
  getIsOrderWasCancelledBeforeAccept,
  getIsOrderWasCancelledBeforePaymentConfirm,
  orderIsCancelled,
} from 'pages/p2p/OrderPage/utils';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';

import { useKycPopup } from 'hooks/common/useKycPopup';
import {
  useOfferPriceChangedWarning,
  useSnackbarForBannedUser,
} from 'hooks/p2p';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTgBotLink } from 'hooks/utils/useTgBotLink';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { AcceptOrDeclineOrder } from './status/AcceptOrDeclineOrder/AcceptOrDeclineOrder';
import { AwaitingCounterpartyOrderAcceptance } from './status/AwaitingCounterpartyOrderAcceptance/AwaitingCounterpartyOrderAcceptance';
import Completed from './status/Completed/Completed';
import { ConfirmCounterpartyPayment } from './status/ConfirmCounterpartyPayment/ConfirmCounterpartyPayment';
import { ConfirmSendingPayment } from './status/ConfirmSendingPayment/ConfirmSendingPayment';
import { CreateOrderTimeoutExceed } from './status/CreateOrderTimeoutExceed/CreateOrderTimeoutExceed';
import { Draft } from './status/Draft/Draft';
import { NotEnoughVolumeError } from './status/NotEnoughVolumeError/NotEnoughVolumeError';
import OfferInactive from './status/OfferInactive/OfferInactive';
import { OrderCancelled } from './status/OrderCancelled/OrderCancelled';
import { OrderOnAppeal } from './status/OrderOnAppeal/OrderOnAppeal';
import { PaymentConfirmationTimeoutExceed } from './status/PaymentConfirmationTimeoutExceed/PaymentConfirmationTimeoutExceed';
import { PaymentConfirmed } from './status/PaymentConfirmed/PaymentConfirmed';
import { ServiceError } from './status/ServiceError/ServiceError';
import { TransactionCompletedSuccessfully } from './status/TransactionCompletedSuccessfully/TransactionCompletedSuccessfully';
import { WaitingCounterpartyPayment } from './status/WaitingCounterpartyPayment/WaitingCounterpartyPayment';
import { WaitingCounterpartyPaymentConfirmation } from './status/WaitingCounterpartyPaymentConfirmation/WaitingCounterpartyPaymentConfirmation';
import { WaitingCounterpartyPaymentConfirmationWithDetails } from './status/WaitingCounterpartyPaymentConfirmationWithDetails/WaitingCounterpartyPaymentConfirmationWithDetails';

export const OrderPageContext = createContext<{
  offer?: BuyOfferRestDto | SellOfferRestDto;
  order?: OrderRestDto;
  onServiceErrorOccurred: () => void;
  onOrderCanceled: () => void;
  onOrderAccepted: () => void;
  onCreateOrder: () => void;
  onConfirmSendingPayment: () => void;
  onConfirmReceiptPayment: () => void;
  onPaymentTimeoutExpired: () => void;
  onCounterpartyBlocked: () => void;
  onOfferNotFoundError: () => void;
  onNotEnoughVolumeError: () => void;
  onOfferIllegalStateError: () => void;
  isUserBuyer: boolean;
  isUserSeller: boolean;
  isUserBlocked: boolean;
  isOneOfTheUsersBlocked: boolean;
  isConfirmingOrder: boolean;
}>({
  onServiceErrorOccurred: () => {},
  onOrderCanceled: () => {},
  onOrderAccepted: () => {},
  onCreateOrder: () => {},
  onConfirmSendingPayment: () => {},
  onConfirmReceiptPayment: () => {},
  onPaymentTimeoutExpired: () => {},
  onCounterpartyBlocked: () => {},
  onOfferNotFoundError: () => {},
  onNotEnoughVolumeError: () => {},
  onOfferIllegalStateError: () => {},
  isUserBuyer: false,
  isUserSeller: false,
  isUserBlocked: false,
  isOneOfTheUsersBlocked: false,
  isConfirmingOrder: false,
});

export const useStartChat = () => {
  const { order, isUserSeller, isUserBuyer, onCounterpartyBlocked } =
    useContext(OrderPageContext);
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);
  const [openChatReqResult, setOpenChatReqResult] = useState<
    RestResponseOpenChatRestStatus | undefined
  >();
  const tgBotLink = useTgBotLink();

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const [isStartingChat, setIsStartingChat] = useState(false);

  const showSnackbarIfParticipantsBanned = (
    data?: RestResponseOpenChatRestStatus,
  ) => {
    if (data?.status === 'ACCESS_DENIED_FOR_BUYER') {
      onCounterpartyBlocked();

      if (isUserSeller) {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t('p2p.operations_unavailable_to_buyer'),
          showDuration: 5000,
        });
      } else {
        showSnackbarForBannedUser();
      }
    } else if (data?.status === 'ACCESS_DENIED_FOR_SELLER') {
      onCounterpartyBlocked();

      if (isUserBuyer) {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t('p2p.operations_unavailable_to_seller'),
          showDuration: 5000,
        });
      } else {
        showSnackbarForBannedUser();
      }
    }
  };

  const startChat = async () => {
    if (openChatReqResult || isStartingChat) {
      showSnackbarIfParticipantsBanned(openChatReqResult);
      return;
    }

    if (!order) return;

    setIsStartingChat(true);

    try {
      const { data } = await API.Chat.openChatFromWebviewV2({
        orderId: order.id,
      });

      setOpenChatReqResult(data);
      showSnackbarIfParticipantsBanned(data);

      if (data.status !== 'SUCCESS') {
        setIsStartingChat(false);
        return;
      }

      window.Telegram.WebApp.openTelegramLink(tgBotLink);
    } catch (error) {
      console.error(error);
      snackbarContext.showSnackbar({
        snackbarId: 'common.something_went_wrong',
        text: t('p2p.order_detail.failed_to_start_chat'),
        before: <WarningSVG />,
      });
      setIsStartingChat(false);
    }
  };

  return { startChat, isStartingChat };
};

export const useCancelOrder = () => {
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);
  const {
    order,
    onServiceErrorOccurred,
    isUserSeller,
    isUserBuyer,
    onOrderCanceled,
    onCounterpartyBlocked,
  } = useContext(OrderPageContext);
  const languageCode = useLanguage();
  const [isCanceling, setIsCanceling] = useState(false);

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const cancelOrder = async () => {
    if (!order) return;

    setIsCanceling(true);

    try {
      let response: AxiosResponse<RestResponseCancelRestStatus> | void;

      if (isUserBuyer) {
        response = await API.Order.cancelOrderByBuyerV2({
          orderId: order.id,
        });
      }

      if (isUserSeller) {
        response = await API.Order.cancelOrderBySellerV2({
          orderId: order.id,
        });
      }

      const status = response?.data.status;

      if (status === 'ACCESS_DENIED_FOR_BUYER') {
        onCounterpartyBlocked();

        if (isUserSeller) {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_buyer'),
            showDuration: 5000,
          });
        } else {
          showSnackbarForBannedUser();
        }
      } else if (status === 'ACCESS_DENIED_FOR_SELLER') {
        onCounterpartyBlocked();

        if (isUserBuyer) {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_seller'),
            showDuration: 5000,
          });
        } else {
          showSnackbarForBannedUser();
        }
      }

      if (status !== 'SUCCESS') {
        return;
      }

      onOrderCanceled();
    } catch (error) {
      console.error(error);
      onServiceErrorOccurred();
      setIsCanceling(false);
    }
  };

  const showCancelOrderPopup = () => {
    if (!order) return;

    window.Telegram.WebApp.showPopup(
      {
        message: t(`p2p.order_detail.cancel_popup.description`, {
          amount: printFiatAmount({
            amount: Number(order.amount.amount),
            currency: order.amount.currencyCode as FiatCurrency,
            languageCode,
            currencyDisplay: 'code',
          }),
          volume: `${printCryptoAmount({
            amount: Number(order.volume.amount),
            currency: order.volume.currencyCode as CryptoCurrency,
            languageCode,
          })} ${order.volume.currencyCode}`,
        }),
        buttons: [
          {
            id: 'cancel',
            text: t(`p2p.order_detail.cancel_popup.cancel_button`),
          },
          {
            id: 'confirm',
            text: t(`p2p.order_detail.cancel_popup.continue_button`),
          },
        ],
      },
      (id: string) => {
        if (id === 'confirm') {
          cancelOrder();
        }
      },
    );
  };

  return { cancelOrder: showCancelOrderPopup, isCanceling };
};

const OrderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const languageCode = useLanguage();

  const [searchParams] = useSearchParams();
  const snackbarContext = useContext(SnackbarContext);
  const showKycPopup = useKycPopup();

  const { userId, canUseP2p, isBanned } = useSelector(
    (state: RootState) => state.p2pUser,
  );

  const { checkPriceChangeAndShowWarning } = useOfferPriceChangedWarning();

  const [isOfferInactive, setIsOfferInactive] = useState(false);
  const [isServiceError, setIsServiceError] = useState(false);
  const [isNotEnoughVolumeError, setIsNotEnoughVolumeError] = useState(false);
  const [isBuyerDidNotPay, setBuyerDidNotPay] = useState(false);
  const [isOneOfTheUsersBlocked, setIsOneOfTheUsersBlocked] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [
    isOrderStatusChangedWhileUserWasOnPage,
    setIsOrderStatusChangedWhileUserWasOnPage,
  ] = useState(false);
  const prevOrderStatus = useRef<OrderRestDto['status']>();

  const tgBotLink = useTgBotLink();

  const orderId = Number(params.id);
  const isUserBlocked = !!userId && (!canUseP2p || !!isBanned);

  const isAlreadyCheckedPriceChange = useRef(false);

  const notifyBuyerOfSumChange = (order: OrderRestDto) => {
    const amount = searchParams.get('amount');
    const volume = searchParams.get('volume');

    if (!amount || !volume) return;

    let sum = amount || volume;
    const orderSum = amount ? order.amount.amount : order.volume.amount;
    if (sum.length < orderSum.length) {
      for (let i = 0; i < orderSum.length - sum.length; i++) {
        sum += '0';
      }
    }

    for (let i = 0; i < orderSum.length; i++) {
      if (orderSum[i] !== sum[i]) {
        snackbarContext.showSnackbar({
          text: t('p2p.order_detail.seller_changed_price'),
        });
      }
    }
  };

  const {
    data: { offer, order } = {},
    isLoading: isOrderAndOfferInfoLoading,
    error: isGetOrderAndOfferInfoError,
    refetch: refetchOrderAndOfferInfo,
  } = useQuery({
    queryKey: ['getOrderAndOfferInfo', orderId],
    queryFn: async () => {
      const orderResponse = await API.Order.getOrderByIdV2({ orderId });
      const order = orderResponse.data.data;

      if (!order) return {};

      const offerResponse = await API.Offer.getOfferV2({
        offerId: order.offerId,
      });

      if (order?.buyer?.userId === userId) notifyBuyerOfSumChange(order);

      return {
        order,
        offer: offerResponse.data.data,
      };
    },
    retry: 5,
    refetchInterval: 7000,
    // 30 seconds
    cacheTime: 30 * 1000,
  });

  const isUserBuyer = order?.buyer?.userId === userId;
  const isUserSeller = order?.seller?.userId === userId;

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const isOrderWasCancelledByUsers =
    getIsOrderWasCancelledBeforeAccept({ order, offer }) ||
    getIsOrderWasCancelledAfterPaymentConfirm({ order, offer }) ||
    getIsOrderWasCancelledBeforePaymentConfirm({ order, offer });

  const showSnackbarThatCounterpartySideIsBanned = (text: string) => {
    snackbarContext.showSnackbar({
      before: <WarningSVG />,
      text,
      showDuration: 5000,
    });
  };

  const createOrder = async () => {
    if (!order || !offer) return;

    if (isUserBlocked) {
      showSnackbarForBannedUser();
      setIsConfirmingOrder(false);
      return;
    }

    setIsConfirmingOrder(true);

    try {
      const response = await API.Order.confirmOrderV2({
        orderId: order.id,
        type: offer.type,
      });

      const status = response?.data.status;

      if (status === 'SUCCESS') {
        await refetchOrderAndOfferInfo();
      } else if (status === 'TOO_MANY_OPEN_ORDERS') {
        snackbarContext.showSnackbar({
          before: <WarningSVG />,
          text: t(
            offer.type === 'PURCHASE'
              ? 'p2p.order_detail.too_many_open_orders_purchase_offer'
              : 'p2p.order_detail.too_many_open_orders_sale_offer',
            {
              count: response.data.errorDetails?.maxOpenOrdersNumber,
            },
          ),
        });
      } else if (status === 'ACCESS_DENIED_FOR_BUYER') {
        if (isUserSeller) {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_buyer'),
            showDuration: 5000,
          });
        } else {
          showSnackbarForBannedUser();
        }
      } else if (status === 'ACCESS_DENIED_FOR_SELLER') {
        if (isUserBuyer) {
          snackbarContext.showSnackbar({
            before: <WarningSVG />,
            text: t('p2p.operations_unavailable_to_seller'),
            showDuration: 5000,
          });
        } else {
          showSnackbarForBannedUser();
        }
      } else if (status === 'PHONE_NUMBER_REQUIRED') {
        snackbarContext.showSnackbar({
          text: t('p2p.share_your_phone_number_in_the_bot'),
          showDuration: 5000,
          action: (
            <button
              type="button"
              onClick={() => {
                window.Telegram.WebApp.openTelegramLink(tgBotLink);
              }}
            >
              {t('p2p.go_to_bot')}
            </button>
          ),
        });
      } else if (status === 'NO_VOLUME_ENOUGH') {
        setIsNotEnoughVolumeError(true);
      } else if (
        status === 'OFFER_ILLEGAL_STATE' ||
        status === 'BIDDING_IS_DISABLED' ||
        status === 'NOT_FOUND'
      ) {
        setIsOfferInactive(true);
      } else if (status === 'TIMEOUT_EXPIRED') {
        snackbarContext.showSnackbar({
          icon: 'warning',
          text: t('p2p.order_detail.order_confirm_timeout_expire'),
        });
      } else if (status === 'KYC_PROMOTION_REQUIRED') {
        showKycPopup(response.data.errorDetails?.promotionKYCLevel);
      } else {
        setIsServiceError(true);
      }

      setIsConfirmingOrder(false);
    } catch (error) {
      console.error(error);
      setIsServiceError(true);
      setIsConfirmingOrder(false);
    }
  };

  const confirmSendingPayment = async () => {
    if (!order) return;

    try {
      const response = await API.Order.confirmSendingPaymentV2({
        orderId: order.id,
      });

      if (response?.data.status === 'ACCESS_DENIED_FOR_BUYER') {
        setIsOneOfTheUsersBlocked(true);

        if (isUserSeller) {
          showSnackbarThatCounterpartySideIsBanned(
            t('p2p.operations_unavailable_to_buyer'),
          );
        } else {
          showSnackbarForBannedUser();
        }
      }

      if (response?.data.status !== 'SUCCESS') {
        return;
      }

      refetchOrderAndOfferInfo();
    } catch (error) {
      console.error(error);
      setIsServiceError(true);
    }
  };

  const confirmReceiptPayment = async () => {
    if (!order) return;
    try {
      const response = await API.Order.confirmReceiptPaymentV2({
        orderId: order.id,
      });

      if (response?.data.status === 'ACCESS_DENIED_FOR_BUYER') {
        setIsOneOfTheUsersBlocked(true);

        if (isUserSeller) {
          showSnackbarThatCounterpartySideIsBanned(
            t('p2p.operations_unavailable_to_buyer'),
          );
        } else {
          showSnackbarForBannedUser();
        }
      } else if (response?.data.status === 'ACCESS_DENIED_FOR_SELLER') {
        setIsOneOfTheUsersBlocked(true);

        if (isUserBuyer) {
          showSnackbarThatCounterpartySideIsBanned(
            t('p2p.operations_unavailable_to_seller'),
          );
        } else {
          showSnackbarForBannedUser();
        }
      }

      if (response?.data.status !== 'SUCCESS') {
        return;
      }

      refetchOrderAndOfferInfo();
    } catch (error) {
      console.error(error);
      setIsServiceError(true);
    }
  };

  const handleBackBtnClick = () => {
    const navigateBack = () => {
      const redirectPath = searchParams.get('backButton');

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate({
          pathname: generatePath(routePaths.P2P_HOME),
          search: createSearchParams({
            isRestoreYScrollPositionOnHomePage: 'true',
          }).toString(),
        });
      }
    };

    navigateBack();
  };

  const handleConfirmSendingPayment = () => {
    window.Telegram.WebApp.showPopup(
      {
        message: t(`p2p.order_detail.confirm_payment_popup.description`, {
          amount: printFiatAmount({
            amount: Number(order?.amount?.amount),
            currency: order?.amount?.currencyCode as FiatCurrency,
            languageCode,
            currencyDisplay: 'code',
          }),
        }),
        buttons: [
          {
            id: 'cancel',
            text: t(`p2p.order_detail.confirm_payment_popup.cancel_button`),
          },
          {
            id: 'confirm',
            text: t(`p2p.order_detail.confirm_payment_popup.continue_button`),
          },
        ],
      },
      (id: string) => {
        if (id === 'confirm') {
          confirmSendingPayment();
        }
      },
    );
  };

  const handleConfirmReceiptPayment = () => {
    window.Telegram.WebApp.showPopup(
      {
        message: t(`p2p.order_detail.confirm_receipt_popup.description`, {
          amount: printFiatAmount({
            amount: Number(order?.amount?.amount),
            currency: order?.amount?.currencyCode as FiatCurrency,
            languageCode,
            currencyDisplay: 'code',
          }),
          volume: `${printCryptoAmount({
            amount: Number(order?.volume?.amount),
            currency: order?.volume?.currencyCode as CryptoCurrency,
            languageCode,
          })} ${order?.volume?.currencyCode}`,
        }),
        buttons: [
          {
            id: 'cancel',
            text: t(`p2p.order_detail.confirm_receipt_popup.cancel_button`),
          },
          {
            id: 'confirm',
            text: t(`p2p.order_detail.confirm_receipt_popup.continue_button`),
          },
        ],
      },
      (id: string) => {
        if (id === 'confirm') confirmReceiptPayment();
      },
    );
  };

  // Lifecycle hooks

  useEffect(() => {
    const prevStatus = prevOrderStatus.current;

    if (prevStatus && order?.status !== prevStatus) {
      setIsOrderStatusChangedWhileUserWasOnPage(true);
    }

    prevOrderStatus.current = order?.status;
  }, [order?.status]);

  useLayoutEffect(() => {
    if (!params.id || isNaN(+params.id)) {
      navigate(generatePath(routePaths.P2P_HOME));
    }

    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!order) return;
    const isOfferDeactivated = getIsOfferDeactivated(order);
    setIsOfferInactive(isOfferDeactivated);
  }, [order]);

  useEffect(() => {
    if (
      !offer ||
      !offer?.price?.estimated ||
      isAlreadyCheckedPriceChange.current
    )
      return;

    const previousPrice = Number(searchParams.get('previousPrice'));
    const offerPrice = Number(offer.price.estimated);
    const quoteCurrencyCode = offer.price.quoteCurrencyCode;

    checkPriceChangeAndShowWarning({
      previousPrice,
      currentPrice: offerPrice,
      currency: quoteCurrencyCode as FiatCurrency,
    });

    isAlreadyCheckedPriceChange.current = true;
  }, [checkPriceChangeAndShowWarning, offer, searchParams]);

  useEffect(() => {
    if (order?.status === 'DRAFT') {
      window.Telegram.WebApp.enableClosingConfirmation();
    } else {
      window.Telegram.WebApp.disableClosingConfirmation();
    }

    return () => {
      window.Telegram.WebApp.disableClosingConfirmation();
    };
  }, [order?.status]);

  // Computations

  const orderStatus = order?.status;

  const isOrderResultShown = useMemo(() => {
    if (!order) return;

    const { status } = order;

    return (
      (status === 'CONFIRMED_SENDING_PAYMENT_BY_BUYER' && isUserBuyer) ||
      status === 'CONFIRMED_RECEIPT_PAYMENT_BY_SELLER' ||
      status === 'COMPLETED' ||
      isOrderWasCancelledByUsers
    );
  }, [isOrderWasCancelledByUsers, isUserBuyer, order]);

  const isOrderCanceled = orderIsCancelled(order);

  const Content = useMemo(() => {
    if (isOfferInactive) return <OfferInactive offerType={offer!.type} />;
    if (isNotEnoughVolumeError) return <NotEnoughVolumeError />;
    if (isServiceError || isGetOrderAndOfferInfoError) return <ServiceError />;

    if (
      orderStatus === 'TIMEOUT_EXPIRED_SENDING_PAYMENT_BY_BUYER' ||
      (isBuyerDidNotPay &&
        !isOrderCanceled &&
        orderStatus !== 'ON_APPEAL' &&
        orderStatus !== 'APPEAL_RESOLVED' &&
        orderStatus !== 'CONFIRMED_SENDING_PAYMENT_BY_BUYER' &&
        orderStatus !== 'CONFIRMED_RECEIPT_PAYMENT_BY_SELLER' &&
        orderStatus !== 'COMPLETED')
    ) {
      return <PaymentConfirmationTimeoutExceed />;
    }

    if (orderStatus === 'REJECTED') return <CreateOrderTimeoutExceed />;

    if (orderStatus === 'DRAFT' || orderStatus === 'CONFIRMING_ORDER') {
      return <Draft />;
    }

    if (orderStatus === 'NEW' || orderStatus === 'ACCEPTING_ORDER') {
      if (
        (isUserBuyer && offer?.type === 'SALE') ||
        (isUserSeller && offer?.type === 'PURCHASE')
      ) {
        return <AwaitingCounterpartyOrderAcceptance />;
      } else {
        return <AcceptOrDeclineOrder />;
      }
    }

    if (orderStatus === 'ACCEPTED_ORDER' && !isBuyerDidNotPay) {
      if (isUserBuyer) {
        return <ConfirmSendingPayment />;
      } else {
        return <WaitingCounterpartyPayment />;
      }
    }

    const isShowCompletedStatusWithDetails =
      searchParams.get('showStatusWithDetails') === 'true' &&
      !isOrderStatusChangedWhileUserWasOnPage;

    if (orderStatus === 'CONFIRMED_SENDING_PAYMENT_BY_BUYER') {
      if (isUserSeller) {
        return <ConfirmCounterpartyPayment />;
      } else {
        if (isShowCompletedStatusWithDetails) {
          return <WaitingCounterpartyPaymentConfirmationWithDetails />;
        } else {
          return <WaitingCounterpartyPaymentConfirmation />;
        }
      }
    }

    if (orderStatus === 'CONFIRMED_RECEIPT_PAYMENT_BY_SELLER') {
      return <PaymentConfirmed />;
    }

    if (orderStatus === 'COMPLETED') {
      if (isShowCompletedStatusWithDetails) {
        return <Completed />;
      } else {
        return <TransactionCompletedSuccessfully />;
      }
    }

    if (orderStatus === 'ON_APPEAL' || orderStatus === 'APPEAL_RESOLVED')
      return <OrderOnAppeal />;

    if (isOrderCanceled) return <OrderCancelled />;

    return null;
  }, [
    orderStatus,
    isBuyerDidNotPay,
    isNotEnoughVolumeError,
    isServiceError,
    isGetOrderAndOfferInfoError,
    isOfferInactive,
    offer,
    isUserBuyer,
    searchParams,
    isOrderStatusChangedWhileUserWasOnPage,
    isOrderCanceled,
    isUserSeller,
  ]);

  return (
    <Page
      mode={
        theme === 'material' && !isOrderResultShown ? 'secondary' : 'primary'
      }
    >
      <OrderPageContext.Provider
        value={{
          order,
          offer,
          isUserBuyer,
          isUserSeller,
          isUserBlocked,
          isOneOfTheUsersBlocked,
          isConfirmingOrder,
          onServiceErrorOccurred: () => setIsServiceError(true),
          onOrderCanceled: refetchOrderAndOfferInfo,
          onOrderAccepted: refetchOrderAndOfferInfo,
          onCreateOrder: createOrder,
          onConfirmSendingPayment: handleConfirmSendingPayment,
          onConfirmReceiptPayment: handleConfirmReceiptPayment,
          onPaymentTimeoutExpired: () => setBuyerDidNotPay(true),
          onCounterpartyBlocked: () => setIsOneOfTheUsersBlocked(true),
          onOfferNotFoundError: () => setIsOfferInactive(true),
          onNotEnoughVolumeError: () => setIsNotEnoughVolumeError(true),
          onOfferIllegalStateError: () => setIsOfferInactive(true),
        }}
      >
        <BackButton onClick={handleBackBtnClick} />
        <OrderSkeleton isShown={isOrderAndOfferInfoLoading && !isOfferInactive}>
          {Content}
        </OrderSkeleton>
      </OrderPageContext.Provider>
    </Page>
  );
};

export default OrderPage;
