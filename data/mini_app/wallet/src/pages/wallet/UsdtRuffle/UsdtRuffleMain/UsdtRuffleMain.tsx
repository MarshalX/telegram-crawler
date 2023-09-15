import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { differenceInSeconds, parseISO } from 'date-fns';
import { queryKeys } from 'query/queryKeys';
import { useUsdtRuffle } from 'query/wallet/ruffle/useUsdtRuffle';
import { useUsdtRuffleTotalTickets } from 'query/wallet/ruffle/useUsdtRuffleTotalTickets';
import {
  Suspense,
  lazy,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Navigate, generatePath, useNavigate } from 'react-router-dom';

import RoutePaths from 'routePaths';
import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import Skeleton from 'components/Skeleton/Skeleton';
import Tappable from 'components/Tappable/Tappable';

import { generateTelegramLink } from 'utils/common/common';
import { logEvent, setAnalyticsProps } from 'utils/common/logEvent';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './UsdtRuffleMain.module.scss';
import { UsdtRuffleActions } from './components/UsdtRuffleActions/UsdtRuffleActions';
import { UsdtRuffleGetMore } from './components/UsdtRuffleGetMore/UsdtRuffleGetMore';
import { UsdtRuffleTicketsAnimationSkeleton } from './components/UsdtRuffleTicketsLogo/UsdtRuffleTicketsAnimationSkeleton';

const UsdtRuffleTicketsAnimation = lazy(
  () => import('./components/UsdtRuffleTicketsLogo/UsdtRuffleTicketsAnimation'),
);

const UsdtRuffleMainEndCampaign: React.FC<{ totalTickets?: number }> = ({
  totalTickets = 0,
}) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const languageCode = useAppSelector((state) => state.settings.languageCode);
  const navigate = useNavigate();

  const openResults = () => {
    if (languageCode === 'ru' || languageCode === 'uz') {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink('wallet_news'),
      );
    } else if (languageCode === 'tr') {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink('wallet_news_tr'),
      );
    } else {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink('wallet_news_en'),
      );
    }
  };

  return (
    <>
      <BackButton onClick={() => navigate(generatePath(RoutePaths.MAIN))} />
      <Suspense
        fallback={
          <UsdtRuffleTicketsAnimationSkeleton className={styles.logo} />
        }
      >
        <UsdtRuffleTicketsAnimation className={styles.logo} />
      </Suspense>
      <h1 className={themeClassName('pageTitle')}>
        {t('marketing.main.title_end')}
      </h1>
      <p className={themeClassName('pageDescription')}>
        {t('marketing.main.description_end')}
      </p>
      <Tappable
        Component="div"
        rootClassName={styles.getMore}
        className={styles.getMoreInner}
        onClick={openResults}
      >
        <div>
          <div className={styles.tickets}>
            <span className={themeClassName('ticketsToday')}>
              {totalTickets}
            </span>
          </div>
          <div className={themeClassName('ticketsDescription')}>
            {t('marketing.main.my_tickets')}
          </div>
        </div>
        <button className={themeClassName('getMoreButton')}>
          {t('marketing.main.results')}
        </button>
      </Tappable>
      <UsdtRuffleActions />
    </>
  );
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const pad = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
};

const Countdown = memo(
  ({ end, day }: { end: string | undefined; day: number | undefined }) => {
    const { themeClassName } = useTheme(styles);
    const [countdown, setCoundown] = useState<number | null>(null);
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { id } = useAppSelector((state) => state.user);

    useEffect(() => {
      if (!end) {
        return;
      }

      if (countdown === null) {
        setCoundown(differenceInSeconds(parseISO(end), new Date()));
      }

      const interval = setInterval(() => {
        setCoundown((prev) => {
          if (prev && prev - 1 <= 0) {
            queryClient.invalidateQueries(queryKeys.UsdtRuffle.settings(id));
            return null;
          }
          if (prev === null) {
            return end ? differenceInSeconds(parseISO(end), new Date()) : null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [end]);

    return !countdown || countdown < 0 ? (
      <div className={styles.ruffleCountdown}>
        <div
          className={classNames(styles.skeleton, styles.countDownSkeleleton)}
        />
      </div>
    ) : (
      <div className={styles.ruffleCountdown}>
        <div
          className={styles.progress}
          style={
            {
              '--p': ((countdown! / 3600 / 24) * 100).toFixed(0),
            } as React.CSSProperties
          }
        />
        <div className={themeClassName('ruffleCountdownText')}>
          <Trans
            i18nKey="marketing.main.countdown"
            values={{
              day: t(`marketing.shared.day_${day}`),
              time: countdown && formatTime(countdown),
            }}
            components={[<span key="span" className={styles.time} />]}
          />
        </div>
      </div>
    );
  },
);

export const UsdtRuffleMain: React.FC = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const { settings, tickets } = useUsdtRuffle();
  const { totalTickets } = useUsdtRuffleTotalTickets();
  const navigate = useNavigate();
  const actionsRef = useRef<HTMLDivElement>(null);
  const featureFlags = useAppSelector((state) => state.user.featureFlags);
  const permissions = useAppSelector((state) => state.user.permissions);

  useEffect(() => {
    try {
      setAnalyticsProps({
        raffle_participant: true,
      });
      logEvent('opened raffle page');
    } catch (error) {
      console.error(error);
    }
  }, []);

  const currentPeriod = useMemo(() => {
    return settings.data?.campaignPeriods.find(
      (period) => period.id === settings.data?.currentPeriodId,
    );
  }, [settings.data?.currentPeriodId, settings.data?.campaignPeriods]);

  if (!featureFlags.usdtRuffle || !permissions.canUsdtRuffle) {
    return <Navigate to={routePaths.MAIN} replace />;
  }

  if (settings.data?.isCampaignActive === false) {
    return (
      <Page>
        <div className={styles.container}>
          <UsdtRuffleMainEndCampaign totalTickets={totalTickets} />
        </div>
      </Page>
    );
  }

  const scrollToActions = () => {
    if (!actionsRef.current) {
      return;
    }
    actionsRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  return (
    <Page>
      <div className={styles.container}>
        <BackButton onClick={() => navigate(generatePath(RoutePaths.MAIN))} />
        <Suspense
          fallback={
            <UsdtRuffleTicketsAnimationSkeleton className={styles.logo} />
          }
        >
          <UsdtRuffleTicketsAnimation className={styles.logo} />
        </Suspense>
        <h1 className={themeClassName('pageTitle')}>
          {t('marketing.main.title')}
        </h1>
        <p className={themeClassName('pageDescription')}>
          <Trans
            i18nKey="marketing.main.description"
            components={[
              <span key="span" className={styles.bold} />,
              <span key="span" className={styles.bold} />,
            ]}
          />
        </p>
        <Tappable
          Component="div"
          rootClassName={styles.getMore}
          className={styles.getMoreInner}
          onClick={scrollToActions}
        >
          <div>
            <Skeleton
              skeleton={<div className={styles.ticketsSkeleton} />}
              skeletonShown={settings.isLoading || tickets.isLoading}
            >
              <div className={styles.tickets}>
                <span className={themeClassName('ticketsToday')}>
                  {totalTickets}
                </span>
                <span
                  className={themeClassName('ticketsLimit')}
                >{`/${currentPeriod?.ticketLimit}`}</span>
              </div>
            </Skeleton>
            <div className={themeClassName('ticketsDescription')}>
              {t('marketing.main.my_tickets')}
            </div>
          </div>
          <button className={themeClassName('getMoreButton')}>
            {t('marketing.main.get_more')}
          </button>
        </Tappable>
        <Countdown end={currentPeriod?.endExclusive} day={currentPeriod?.id} />
        <div ref={actionsRef}>
          <UsdtRuffleGetMore />
        </div>
        <UsdtRuffleActions />
      </div>
    </Page>
  );
};
