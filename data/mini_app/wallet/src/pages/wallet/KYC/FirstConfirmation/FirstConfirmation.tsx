import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as IdCardSVG } from 'images/id_card.svg';

import styles from './FirstConfirmation.module.scss';

const IdCardAnimation = lazy(
  () => import('components/animations/IdCardAnimation/IdCardAnimation'),
);

const FirstConfirmation = () => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Page>
      <BackButton />
      <div className={styles.root}>
        <Suspense fallback={<IdCardSVG className={themeClassName('media')} />}>
          <IdCardAnimation className={themeClassName('media')} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          align="center"
          className={themeClassName('title')}
        >
          {t('kyc.first_verification.title')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', color: 'hint', weight: 'regular' }}
          align="center"
        >
          {t('kyc.first_verification.description')}
        </Text>
        <Link
          className={themeClassName('showLimits')}
          to={routePaths.KYC_SETTINGS}
        >
          <Text
            apple={{ variant: 'body', weight: 'regular', color: 'link' }}
            material={{ variant: 'body', weight: 'regular', color: 'link' }}
          >
            {t('kyc.first_verification.show_limits')}
          </Text>
        </Link>
      </div>

      <MainButton
        text={t('kyc.first_verification.button')}
        onClick={() => navigate(routePaths.KYC_CONFIRMATION)}
      />
    </Page>
  );
};

export default FirstConfirmation;
