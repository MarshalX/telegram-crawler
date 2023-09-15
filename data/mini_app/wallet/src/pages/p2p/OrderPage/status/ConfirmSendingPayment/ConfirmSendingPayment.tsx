import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Cell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { printDuration } from 'utils/common/date';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext, useCancelOrder } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CancelOrderCellButton } from '../../components/CancelOrderCellButton';
import { Comment } from '../../components/Comment/Comment';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { PaymentInfoSection } from '../../components/PaymentInfoSection/PaymentInfoSection';
import { StartChatSection } from '../../components/StartChatSection/StartChatSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

export const ConfirmSendingPayment = () => {
  const { order, offer, onPaymentTimeoutExpired, onConfirmSendingPayment } =
    useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { cancelOrder, isCanceling } = useCancelOrder();

  if (!order || !offer) return null;

  return (
    <>
      <AmountSection />

      <StartChatSection />

      {offer.type === 'PURCHASE' ? (
        <StatusSection
          separator={theme === 'material'}
          sections={[
            {
              header: t(`p2p.order_detail.status_title`),
              icon: 'clock',
              content: t(`p2p.order_detail.waiting_for_payment`),
            },
            {
              header: t(`p2p.order_detail.important_title`),
              icon: 'warning',
              content: t(`p2p.order_detail.send_money_within_x`, {
                time: printDuration(order.paymentConfirmTimeout),
              }),
            },
          ]}
        />
      ) : (
        <StatusSection
          separator={theme === 'material'}
          sections={[
            {
              header: t(`p2p.order_detail.status_title`),
              icon: 'check',
              content: t(`p2p.order_detail.seller_accepted_order`),
            },
            {
              header: t(`p2p.order_detail.important_title`),
              icon: 'warning',
              content: t(`p2p.order_detail.send_money_within_x`, {
                time: printDuration(order.paymentConfirmTimeout),
              }),
            },
          ]}
        />
      )}

      <PaymentInfoSection
        title={t(`p2p.order_detail.make_payment`)}
        description={
          <TimeTicker
            start={order.acceptDateTime}
            timeout={order.paymentConfirmTimeout}
            getDescription={(time) =>
              t(`p2p.order_detail.make_payment_within_x_time`, {
                time,
              })
            }
            onExpire={onPaymentTimeoutExpired}
          />
        }
        separator={
          theme === 'material' ||
          (offer.type === 'SALE' && !!order.offerComment)
        }
      />

      {offer.type === 'SALE' && <Comment separator={theme === 'material'} />}

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <Cell.List separator={theme === 'apple'}>
          <CreateAppeal order={order} />
          <CancelOrderCellButton
            onClick={cancelOrder}
            isCancelling={isCanceling || order.status === 'CANCELLING'}
          />
        </Cell.List>
      </Section>

      <div data-testid="tgcrawl" />

      <MainButton
        text={t('p2p.order_detail.confirm_payment_button').toLocaleUpperCase()}
        onClick={onConfirmSendingPayment}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
