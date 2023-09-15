import classnames from 'classnames/bind';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { getLastChangelog } from 'pages/p2p/OrderPage/utils';

import Section from 'components/Section/Section';

import { printDate } from 'utils/common/date';

import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import { AmountSection } from '../../components/AmountSection/AmountSection';
import { CounterpartyInfoSection } from '../../components/CounterpartyInfoSection/CounterpartyInfoSection';
import CreateAppeal from '../../components/CreateAppeal/CreateAppeal';
import { OrderDetailsSection } from '../../components/OrderDetailsSection/OrderDetailsSection';
import { StatusSection } from '../../components/StatusSection/StatusSection';
import styles from './Completed.module.scss';

const Completed = () => {
  const { t } = useTranslation();
  const theme = useTheme(styles);

  const { order, offer, isUserSeller, isUserBuyer } =
    useContext(OrderPageContext);

  const { languageCode } = useSelector((state: RootState) => state.settings);

  if (!order || !offer) return null;

  const lastChangeLog = getLastChangelog(order);

  const startedByText = t(
    `p2p.order_detail.${
      (offer.type === 'SALE' && isUserBuyer) ||
      (offer.type === 'PURCHASE' && isUserSeller)
        ? 'started_by_you'
        : offer.type === 'SALE' && isUserSeller
        ? 'started_by_buyer'
        : 'started_by_seller'
    }`,
  );

  return (
    <>
      <AmountSection />

      <StatusSection
        sections={[
          {
            header: t(`p2p.order_detail.status_title`),
            icon: 'check',
            content: t('p2p.order_status.code_COMPLETED'),
          },
          {
            header: '',
            allowScroll: true,
            before: (
              <div className={styles.verticalColumn}>
                <span>{t('p2p.order_detail.completed')}</span>
                <span>{startedByText}</span>
              </div>
            ),
            after: (
              <div
                className={classnames(
                  styles.verticalColumn,
                  styles.rightColumn,
                )}
              >
                <span>
                  {lastChangeLog ? (
                    printDate({
                      value: new Date(lastChangeLog.createDateTime),
                      t,
                      languageCode,
                    })
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
                <span>
                  {order.confirmationDateTime ? (
                    printDate({
                      value: new Date(order.confirmationDateTime),
                      t,
                      languageCode,
                    })
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
              </div>
            ),
          },
        ]}
      />

      <OrderDetailsSection separator={theme.theme === 'material'} />

      <CounterpartyInfoSection />

      <Section apple={{ fill: 'secondary' }} separator>
        <CreateAppeal order={order} />
      </Section>
    </>
  );
};

export default Completed;
