import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderPageContext } from '../../OrderPage';
import { OrderStatus } from '../../components/OrderStatus/OrderStatus';

export const ServiceError = () => {
  const { t } = useTranslation();
  const { order } = useContext(OrderPageContext);

  if (!order) {
    return null;
  }

  return (
    <OrderStatus
      icon="sad"
      title={t('p2p.order_detail.service_error')}
      subTitle={t('p2p.order_detail.wait_for_the_payment')}
    />
  );
};
