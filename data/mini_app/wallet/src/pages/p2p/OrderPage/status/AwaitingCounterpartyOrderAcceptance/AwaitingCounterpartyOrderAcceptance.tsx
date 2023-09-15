import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext, useCancelOrder } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CancelOrderCellButton } from '../../components/CancelOrderCellButton';
import { Comment } from '../../components/Comment/Comment';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import TimeTicker from '../../components/TimeTicker/TimeTicker';
import styles from './AwaitingCounterpartyOrderAcceptance.module.scss';

export const AwaitingCounterpartyOrderAcceptance = () => {
  const { order, offer, isUserBuyer } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();

  const { cancelOrder, isCanceling } = useCancelOrder();

  if (!order || !offer) return null;

  const timeout = 'orderAcceptTimeout' in offer ? offer.orderAcceptTimeout : '';

  return (
    <>
      <AmountSection />

      <StatusSection
        description={
          <span className={styles.grayText}>
            {
              <TimeTicker
                start={order.confirmationDateTime}
                timeout={timeout}
                getDescription={(time) =>
                  isUserBuyer
                    ? t(`p2p.order_detail.waiting_for_seller`, {
                        time,
                      })
                    : t(`p2p.order_detail.waiting_for_buyer`, {
                        time,
                      })
                }
              />
            }
          </span>
        }
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'clock',
            content: isUserBuyer
              ? t(`p2p.order_detail.waiting_for_seller_confirmation`)
              : t(`p2p.order_detail.waiting_for_buyer_confirmation`),
          },
          {
            header: t(`p2p.order_detail.important_title`),
            icon: 'warning',
            content: isUserBuyer
              ? t(
                  `p2p.order_detail.expect_receive_order_confirmation_from_seller`,
                )
              : t(
                  `p2p.order_detail.expect_receive_order_confirmation_from_buyer`,
                ),
          },
        ]}
      />

      <OrderDetailsSection
        timeLimit={order.paymentConfirmTimeout}
        separator={theme === 'material' || !!order.offerComment}
      />

      <Comment separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <CancelOrderCellButton
          onClick={cancelOrder}
          isCancelling={isCanceling || order.status === 'CANCELLING'}
        />
      </Section>

      <div data-testid="tgcrawl" />
    </>
  );
};
