import cn from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { OrderRestDto } from 'api/p2p/generated-common';

import RoutePaths from 'routePaths';

import { RootState } from 'store';

import {
  getIsOrderWasNotAccepted,
  getLastChangelog,
  getOrderStatusBeforeCancel,
  orderIsCancelled,
} from 'pages/p2p/OrderPage/utils';

import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { printDate } from 'utils/common/date';

import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import ContactSupport from '../../components/ContactSupport/ContactSupport';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import styles from './OrderCancelled.module.scss';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

function getIsCanCreateAppeal(order?: OrderRestDto) {
  if (!order) return false;

  const isCanceledWithSpecificReasons =
    (order.status === 'CANCELLED' || order.status === 'CANCELLING') &&
    (order.cancelReason === 'CANCELLED_ON_SENDING_PAYMENT_STAGE_BY_BUYER' ||
      order.cancelReason === 'SENDING_PAYMENT_BY_BUYER_TIMEOUT_EXCEEDED' ||
      order.cancelReason ===
        'CANCELLED_ON_CONFIRMING_RECEIPT_PAYMENT_STAGE_BY_BUYER');

  return (
    order.status === 'ACCEPTED_ORDER' ||
    order.status === 'TIMEOUT_EXPIRED_SENDING_PAYMENT_BY_BUYER' ||
    order.status === 'CONFIRMED_RECEIPT_PAYMENT_BY_SELLER' ||
    order.status === 'CONFIRMED_SENDING_PAYMENT_BY_BUYER' ||
    order.status === 'COMPLETED' ||
    isCanceledWithSpecificReasons
  );
}

function orderIsCancelledByNotPaying(order?: OrderRestDto) {
  if (!order) return false;

  const previousStatus = getOrderStatusBeforeCancel(order);

  return (
    orderIsCancelled(order) &&
    previousStatus === 'TIMEOUT_EXPIRED_SENDING_PAYMENT_BY_BUYER' &&
    order.cancelReason === 'SENDING_PAYMENT_BY_BUYER_TIMEOUT_EXCEEDED'
  );
}

function orderIsCancelledBySystem(order?: OrderRestDto) {
  if (!order) return false;

  const lastChangelog = getLastChangelog(order);
  const previousStatus = getOrderStatusBeforeCancel(order);

  return (
    orderIsCancelled(order) &&
    !lastChangelog?.initiatorUserId &&
    (previousStatus === 'ON_APPEAL' || previousStatus === 'APPEAL_RESOLVED')
  );
}

function getUserThatCancelledOrder(order?: OrderRestDto) {
  if (!order || !orderIsCancelled(order)) return;

  const lastChangelog = getLastChangelog(order);

  if (!lastChangelog) return;
  if (lastChangelog?.initiatorUserId === order.buyer?.userId)
    return order.buyer;
  if (lastChangelog?.initiatorUserId === order.seller?.userId)
    return order.seller;
}

export const OrderCancelled = () => {
  const { t } = useTranslation();
  const { order, offer, isUserSeller, isUserBuyer } =
    useContext(OrderPageContext);
  const { userId } = useSelector((state: RootState) => state.p2pUser);
  const navigate = useNavigate();
  const languageCode = useLanguage();
  const theme = useTheme();

  if (!order || !offer) return null;

  const userThatCanceledOrder = getUserThatCancelledOrder(order);

  const lastChangelog = getLastChangelog(order);
  const isUserCanceledOrder =
    userThatCanceledOrder && userId === userThatCanceledOrder.userId;

  const isOrderWasNotAccepted = getIsOrderWasNotAccepted({ order, offer });
  const cancelledBySystem =
    orderIsCancelledBySystem(order) || orderIsCancelledByNotPaying(order);

  const cancelledByText = isUserCanceledOrder
    ? t(`p2p.order_detail.cancelled_by_you`)
    : t(
        `p2p.order_detail.${
          userThatCanceledOrder?.userId === order?.seller?.userId
            ? 'cancelled_by_seller'
            : 'cancelled_by_buyer'
        }`,
      );

  const cancelledTitle = (() => {
    if (cancelledBySystem) {
      return t(`p2p.orders_list.order_status.canceled`);
    }

    if (isOrderWasNotAccepted) {
      return (offer?.type === 'SALE' &&
        lastChangelog?.initiatorUserId === order.seller?.userId &&
        isUserSeller) ||
        (offer?.type === 'PURCHASE' &&
          lastChangelog?.initiatorUserId === order.buyer?.userId &&
          isUserBuyer)
        ? t(`p2p.order_detail.you_not_confirmed_order`)
        : isUserSeller
        ? t(`p2p.order_detail.buyer_not_confirmed`)
        : t(`p2p.order_detail.seller_not_confirmed`);
    }

    return userThatCanceledOrder?.userId === userId
      ? t('p2p.order_detail.cancelled_by_you')
      : t(`p2p.order_detail.cancelled_by`, {
          name: userThatCanceledOrder?.nickname,
        });
  })();

  const startedByText = t(
    `p2p.order_detail.${
      (offer.type === 'SALE' && isUserBuyer) ||
      (offer.type === 'PURCHASE' && isUserSeller)
        ? 'started_by_you'
        : offer.type === 'SALE' && isUserSeller
        ? 'started_by_buyer'
        : 'started_by_seller'
    }`,
  );

  return (
    <>
      <AmountSection />

      <StatusSection
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'cross',
            content: cancelledTitle,
          },
          {
            header: '',
            allowScroll: true,
            before: (
              <>
                {userThatCanceledOrder && !cancelledBySystem && (
                  <div className={styles.verticalColumn}>
                    <span>{cancelledByText}</span>
                    <span>{startedByText}</span>
                  </div>
                )}
                {cancelledBySystem && (
                  <div className={styles.verticalColumn}>
                    <span>{t('p2p.orders_list.order_status.canceled')}</span>
                    <span>{startedByText}</span>
                  </div>
                )}
              </>
            ),
            after: (
              <div className={cn(styles.verticalColumn, styles.rightColumn)}>
                <span>
                  {lastChangelog ? (
                    printDate({
                      value: new Date(lastChangelog.createDateTime),
                      t,
                      languageCode,
                    })
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
                <span>
                  {order.confirmationDateTime ? (
                    printDate({
                      value: new Date(order.confirmationDateTime),
                      t,
                      languageCode,
                    })
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
              </div>
            ),
          },
        ]}
      />

      <OrderDetailsSection separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        {getIsCanCreateAppeal(order) ? (
          <CreateAppeal order={order} />
        ) : (
          <ContactSupport />
        )}
      </Section>

      <MainButton
        text={t('p2p.order_detail.open_market').toLocaleUpperCase()}
        onClick={() => navigate(generatePath(RoutePaths.P2P_HOME))}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
