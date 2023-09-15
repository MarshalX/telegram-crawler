import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ItemOrderStatusStatusEnum,
  OrderRestDto,
} from 'api/p2p/generated-common';

import { ORDER_SETTINGS } from 'config';

import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { PaymentInfoSection } from '../../components/PaymentInfoSection/PaymentInfoSection';
import { StartChatSection } from '../../components/StartChatSection/StartChatSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

function getPaymentConfirmDate(order?: OrderRestDto) {
  if (!order) return;

  for (let i = order.changeLog.items.length - 1; i >= 0; i--) {
    const paymentLog = order.changeLog.items[i];
    if (
      paymentLog.status ===
      ItemOrderStatusStatusEnum.ConfirmedSendingPaymentByBuyer
    )
      return paymentLog?.createDateTime;
  }
}

export const ConfirmCounterpartyPayment = () => {
  const { order, offer, onConfirmReceiptPayment } =
    useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();

  if (!order || !offer) return null;

  const paymentConfirmDateTime = getPaymentConfirmDate(order);

  return (
    <>
      <AmountSection />

      <StartChatSection />

      <StatusSection
        separator={theme === 'material'}
        description={
          <TimeTicker
            start={paymentConfirmDateTime}
            timeout={ORDER_SETTINGS.CONFIRM_PAYMENT_RECEIVED_TIMEOUT}
            getDescription={(time) =>
              t(`p2p.order_detail.confirm_payment_within`, {
                time,
              })
            }
          />
        }
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'check',
            content: t(`p2p.order_detail.buyer_confirmed_payment`),
          },
          {
            header: t(`p2p.order_detail.important_title`),
            icon: 'warning',
            content: t(`p2p.order_detail.check_if_you_received_payment`),
          },
        ]}
      />

      <PaymentInfoSection
        canCopy={false}
        title={t(`p2p.order_detail.payment_details`)}
        separator={theme === 'material'}
      />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <CreateAppeal order={order} />
      </Section>

      <div data-testid="tgcrawl" />

      <MainButton
        text={t('p2p.order_detail.confirm_payment_button').toLocaleUpperCase()}
        onClick={onConfirmReceiptPayment}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
