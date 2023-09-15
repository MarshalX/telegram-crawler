import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Section from 'components/Section/Section';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import ContactSupport from '../../components/ContactSupport/ContactSupport';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';

export const OrderOnAppeal = () => {
  const { order, offer } = useContext(OrderPageContext);
  const { t } = useTranslation();
  const theme = useTheme();

  if (!order || !offer) return null;

  return (
    <>
      <AmountSection />

      <StatusSection
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'redWarning',
            content: t(`p2p.order_detail.on_appeal`),
          },
        ]}
      />

      <OrderDetailsSection separator={theme === 'material'} />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <ContactSupport />
      </Section>
    </>
  );
};
