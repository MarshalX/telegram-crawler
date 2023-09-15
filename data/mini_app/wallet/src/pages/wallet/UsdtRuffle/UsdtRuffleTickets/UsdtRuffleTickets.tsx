import { useUsdtRuffle } from 'query/wallet/ruffle/useUsdtRuffle';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import { UsdtRuffleTicket } from './UsdtRuffleTicket/UsdtRuffleTicket';
import styles from './UsdtRuffleTickets.module.scss';

export const UsdtRuffleTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const backPathname = searchParams.get('backPathname');
  const { tickets } = useUsdtRuffle();
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page>
      <div className={styles.container}>
        <BackButton
          onClick={() => {
            if (backPathname) {
              navigate(backPathname);
            } else {
              navigate(routePaths.MAIN);
            }
          }}
        />
        {tickets.data?.numbers.map((ticketForPeriod) => {
          return (
            <>
              <div className={styles.header}>
                <span className={themeClassName('day')}>
                  {t('marketing.tickets.title', {
                    count: ticketForPeriod.periodId,
                  })}
                </span>
                <span className={themeClassName('numberOfTickets')}>
                  {t('marketing.shared.xx_tickets_count', {
                    count: ticketForPeriod.ticketNumbers.length,
                  })}
                </span>
              </div>
              <div className={styles.tickets}>
                {ticketForPeriod.ticketNumbers.map((number) => (
                  <UsdtRuffleTicket
                    key={number}
                    number={number}
                    className={styles.ticket}
                  />
                ))}
              </div>
            </>
          );
        })}
      </div>
    </Page>
  );
};
