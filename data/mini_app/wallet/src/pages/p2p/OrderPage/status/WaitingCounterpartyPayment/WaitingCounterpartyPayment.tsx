import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { FiatCurrency } from 'api/wallet/generated';

import Section from 'components/Section/Section';

import { printFiatAmount } from 'utils/common/currency';
import { printDuration } from 'utils/common/date';

import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { PaymentInfoSection } from '../../components/PaymentInfoSection/PaymentInfoSection';
import { StartChatSection } from '../../components/StartChatSection/StartChatSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';

export const WaitingCounterpartyPayment = () => {
  const { order, onPaymentTimeoutExpired } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const languageCode = useLanguage();
  const theme = useTheme();

  if (!order) return null;

  return (
    <>
      <AmountSection />

      <StartChatSection />

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
            content: t(`p2p.order_detail.expect_receive_payment`, {
              amount: printFiatAmount({
                amount: +order.amount.amount,
                currency: order.amount.currencyCode as FiatCurrency,
                languageCode,
                currencyDisplay: 'code',
              }),
              time: printDuration(order.paymentConfirmTimeout),
            }),
          },
        ]}
        description={
          <TimeTicker
            start={order.acceptDateTime}
            timeout={order.paymentConfirmTimeout}
            getDescription={(time) =>
              t(`p2p.order_detail.waiting_for_buyer_within`, {
                time,
              })
            }
            onExpire={onPaymentTimeoutExpired}
          />
        }
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
    </>
  );
};
