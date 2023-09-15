import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { DetailCell } from 'components/Cells';
import Section from 'components/Section/Section';

import { printNumber } from 'utils/common/currency';

import { useLanguage } from 'hooks/utils/useLanguage';

import { OrderPageContext } from '../../OrderPage';

export const CounterpartyInfoSection = () => {
  const languageCode = useLanguage();
  const { t } = useTranslation();
  const { order, isUserSeller } = useContext(OrderPageContext);

  if (!order) return null;

  const tradeStats = t('p2p.user_trades_stats', {
    trades_count: printNumber({
      value:
        (isUserSeller
          ? order.buyer?.statistics.totalOrdersCount
          : order.seller?.statistics.totalOrdersCount) || 0,
      languageCode,
      options: {
        maximumFractionDigits: 2,
      },
    }),
    success_rate: printNumber({
      value:
        (isUserSeller
          ? order.buyer?.statistics?.successPercent
          : order.seller?.statistics?.successPercent) || 0,
      languageCode,
      options: {
        maximumFractionDigits: 2,
      },
    }),
  });

  const title = isUserSeller ? 'p2p.buyer_info' : 'p2p.seller_info';
  const name = isUserSeller ? 'p2p.buyer_name' : 'p2p.seller_name';
  const after = isUserSeller ? order.buyer?.nickname : order.seller?.nickname;

  return (
    <Section apple={{ fill: 'secondary' }} title={t(title)} separator>
      <DetailCell header="" before={t(name)} after={after} />
      <DetailCell header="" before={t(`p2p.trade_stats`)} after={tradeStats} />
    </Section>
  );
};
