import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import RoutePaths from 'routePaths';

import { Cell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { printDuration } from 'utils/common/date';

import { useSettings } from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext, useCancelOrder } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CancelOrderCellButton } from '../../components/CancelOrderCellButton';
import ContactSupport from '../../components/ContactSupport/ContactSupport';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StartChatSection } from '../../components/StartChatSection/StartChatSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

export const PaymentConfirmationTimeoutExceed = () => {
  const { order, isUserBuyer } = useContext(OrderPageContext);
  const { cancelOrder, isCanceling } = useCancelOrder();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: settings } = useSettings();

  if (!order || !settings) return null;

  return (
    <>
      <AmountSection />

      <StartChatSection />

      <StatusSection
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'cross',
            content: isUserBuyer
              ? t(`p2p.order_detail.canceled_order_status`)
              : t(`p2p.order_detail.payment_wasnt_sent_in_time_by_buyer`),
            action: <ContactSupport mode="link" />,
          },
          {
            header: t(`p2p.order_detail.important_title`),
            icon: 'warning',
            content: t(`p2p.order_detail.canceled_order_important`, {
              time: printDuration(
                settings.orderSettings.buyerSendingPaymentConfirmationTimeout,
              ),
            }),
          },
        ]}
      />

      <OrderDetailsSection separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <Cell.List separator={theme === 'apple'}>
          <CreateAppeal order={order} />
          {isUserBuyer && (
            <CancelOrderCellButton
              onClick={cancelOrder}
              isCancelling={isCanceling || order.status === 'CANCELLING'}
            />
          )}
        </Cell.List>
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
