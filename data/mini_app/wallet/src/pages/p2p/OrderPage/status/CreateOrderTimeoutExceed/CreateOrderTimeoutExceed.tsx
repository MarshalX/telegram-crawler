import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import RoutePaths from 'routePaths';

import { MainButton } from 'components/MainButton/MainButton';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;
export const CreateOrderTimeoutExceed = () => {
  const { order, offer } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  if (!order || !offer) return null;

  return (
    <>
      <AmountSection />

      <StatusSection
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'cross',
            content: t(`p2p.order_detail.you_not_confirmed_in_time`),
          },
        ]}
      />

      <OrderDetailsSection
        separator={theme === 'material'}
        timeLimit={order.paymentConfirmTimeout}
      />

      <CounterpartyInfoSection />

      <MainButton
        text={t('p2p.order_detail.open_market').toLocaleUpperCase()}
        onClick={() => navigate(generatePath(RoutePaths.P2P_HOME))}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
