import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

export const BetaWaitlistSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  return (
    <Page expandOnMount>
      <BackButton
        onClick={() => navigate(routePaths.MAIN, { replace: true })}
      />
      <PagePlaceholder
        media={
          <Suspense fallback={<BoomstickSVG />}>
            <BoomstickAnimation />
          </Suspense>
        }
        title={t('scw.beta_waitlist.success_title')}
        text={t('scw.beta_waitlist.success_text')}
      />
      <MainButton
        text={t('scw.beta_waitlist.success_button')}
        onClick={() => navigate(routePaths.MAIN, { replace: true })}
      />
    </Page>
  );
};
