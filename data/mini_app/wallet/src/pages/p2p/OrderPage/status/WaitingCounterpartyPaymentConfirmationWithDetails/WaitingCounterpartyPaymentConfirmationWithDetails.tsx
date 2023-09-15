import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Cell } from 'components/Cells';
import Section from 'components/Section/Section';

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

export const WaitingCounterpartyPaymentConfirmationWithDetails = () => {
  const { order, offer } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();

  const { cancelOrder, isCanceling } = useCancelOrder();

  if (!order || !offer) return null;

  return (
    <>
      <AmountSection />

      <StartChatSection />

      <StatusSection
        separator={theme === 'material'}
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'check',
            content: t(`p2p.order_detail.you_confirmed_payment`),
          },
          {
            header: t(`p2p.order_detail.important_title`),
            icon: 'warning',
            content: t(`p2p.order_detail.seller_must_confirm_within`, {
              time: t('common.xx_minutes', {
                count: 10,
              }),
            }),
          },
        ]}
      />

      <PaymentInfoSection
        title={t(`p2p.order_detail.payment_details`)}
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
    </>
  );
};
