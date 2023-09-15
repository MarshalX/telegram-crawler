import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import RoutePaths from 'routePaths';

import { ORDER_SETTINGS } from 'config';

import ActionButton from 'components/ActionButton/ActionButton';
import { MainButton } from 'components/MainButton/MainButton';

import { printDuration } from 'utils/common/date';

import {
  OrderPageContext,
  useCancelOrder,
  useStartChat,
} from '../../OrderPage';
import { OrderStatus } from '../../components/OrderStatus/OrderStatus';
import styles from './WaitingCounterpartyPaymentConfirmation.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

export const WaitingCounterpartyPaymentConfirmation = () => {
  const { t } = useTranslation();
  const { order, offer } = useContext(OrderPageContext);
  const { cancelOrder } = useCancelOrder();
  const { startChat } = useStartChat();
  const navigate = useNavigate();

  if (!order || !offer) {
    return null;
  }

  return (
    <>
      <OrderStatus
        icon="money"
        title={t(`p2p.order_detail.you_confirmed_payment`)}
        subTitle={t(`p2p.order_detail.seller_must_confirm_within`, {
          time: printDuration(ORDER_SETTINGS.CONFIRM_PAYMENT_RECEIVED_TIMEOUT),
        })}
        isSendAppeal
        bottom={
          <div className={styles.bottomButtons}>
            <ActionButton
              mode="destructive"
              layout="horizontal"
              onClick={cancelOrder}
            >
              {t(`p2p.order_detail.cancel_order`)}
            </ActionButton>
            <ActionButton
              mode="secondary"
              layout="horizontal"
              onClick={startChat}
            >
              {t(`p2p.order_detail.send_message`)}
            </ActionButton>
          </div>
        }
      />

      <div data-testid="tgcrawl" />

      <MainButton
        text={t('p2p.order_detail.open_market').toLocaleUpperCase()}
        onClick={() => navigate(generatePath(RoutePaths.P2P_HOME))}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
