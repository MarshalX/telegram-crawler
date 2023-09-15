import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/p2p';

import ActionButton from 'components/ActionButton/ActionButton';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { useKycPopup } from 'hooks/common/useKycPopup';
import { useSettings, useSnackbarForBannedUser } from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import { OrderPageContext, useCancelOrder } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';
import styles from './AcceptOrDeclineOrder.module.scss';

export const AcceptOrDeclineOrder = () => {
  const {
    order,
    offer,
    isUserBuyer,
    isUserSeller,
    isOneOfTheUsersBlocked,
    isUserBlocked,
    onCounterpartyBlocked,
    onOfferNotFoundError,
    onOfferIllegalStateError,
    onNotEnoughVolumeError,
    onPaymentTimeoutExpired,
    onOrderAccepted,
    onServiceErrorOccurred,
  } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const [isAccepting, setIsAccepting] = useState(false);
  const snackbarContext = useContext(SnackbarContext);

  const { cancelOrder } = useCancelOrder();
  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();
  const { data: settings } = useSettings();
  const showKycPopup = useKycPopup();

  if (!order || !offer || !settings) return null;

  const isAcceptingOrder =
    !isOneOfTheUsersBlocked &&
    (order.status === 'ACCEPTING_ORDER' ||
      (isAccepting && order.status === 'NEW'));

  const acceptOrder = async () => {
    if (!order || !offer) return;

    if (isUserBlocked) {
      showSnackbarForBannedUser();

      return;
    }

    try {
      const response = await API.Order.acceptOrderV2({
        orderId: order.id,
        type: offer.type,
      });

      const status = response.data.status;

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
      } else if (status === 'NOT_FOUND') {
        onOfferNotFoundError();
      } else if (status === 'OFFER_ILLEGAL_STATE') {
        onOfferIllegalStateError();
      } else if (status === 'NO_VOLUME_ENOUGH') {
        onNotEnoughVolumeError();
      } else if (status === 'TIMEOUT_EXPIRED') {
        onPaymentTimeoutExpired();
      }

      if (status === 'KYC_PROMOTION_REQUIRED') {
        showKycPopup(response.data.errorDetails?.promotionKYCLevel);
        setIsAccepting(false);
        return;
      }

      if (status !== 'SUCCESS') {
        return;
      }

      onOrderAccepted();
    } catch (error) {
      console.error(error);
      onServiceErrorOccurred();
    }
  };

  const DecisionsButtons = (
    <>
      <div className={themeClassName('decisionButtons')}>
        <ActionButton
          layout="horizontal"
          disabled={isAcceptingOrder}
          onClick={() => {
            acceptOrder();
            setIsAccepting(true);
          }}
          data-testid="tgcrawl"
        >
          {t(`p2p.order_detail.accept_order_button`)}
        </ActionButton>
        <ActionButton
          mode="destructive"
          layout="horizontal"
          disabled={isAcceptingOrder}
          onClick={cancelOrder}
          data-testid="tgcrawl"
        >
          {t(`p2p.order_detail.decline_order_button`)}
        </ActionButton>
      </div>
      <div className={themeClassName('acceptTimer')}>
        {isAcceptingOrder ? (
          <div className={themeClassName('processing')}>
            {t(`p2p.order_detail.processing`)}
          </div>
        ) : (
          <TimeTicker
            start={order.confirmationDateTime}
            timeout={settings.orderSettings.orderAcceptanceTimeout}
            getDescription={(time) =>
              t(`p2p.order_detail.please_proceed_within`, {
                time,
              })
            }
          />
        )}
      </div>
    </>
  );

  return (
    <>
      <AmountSection isSeparatorShown={false} />

      {theme === 'material' ? (
        <Section separator>{DecisionsButtons}</Section>
      ) : (
        DecisionsButtons
      )}

      <OrderDetailsSection separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <div data-testid="tgcrawl" />
    </>
  );
};
