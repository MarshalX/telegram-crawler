import { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import API from 'api/wallet';

import routePaths from 'routePaths';

import { setOnboardingShown } from 'reducers/p2p/p2pSlice';

import { Feature } from 'containers/common/FeaturesList/components/Feature/Feature';

import ActionButton from 'components/ActionButton/ActionButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { Text } from 'components/Text/Text';
import { FeaturesAnimationFallback } from 'components/animations/FeaturesAnimation/FeaturesAnimationFallback';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Onboarding.module.scss';

const FEATURES = [
  {
    title: 'p2p.onboarding.transactions_title',
    text: 'p2p.onboarding.transactions_text',
    icon: <FeaturesAnimationFallback feature="flexibility" v2 />,
  },
  {
    title: 'p2p.onboarding.payments_title',
    text: 'p2p.onboarding.payments_text',
    icon: <FeaturesAnimationFallback feature="transactions" v2 />,
  },
  {
    title: 'p2p.onboarding.security_title',
    text: 'p2p.onboarding.security_text',
    icon: <FeaturesAnimationFallback feature="security" v2 />,
  },
] as const;

const Onboarding: FC<{
  type: 'SALE' | 'PURCHASE';
}> = ({ type }) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  if (!type) {
    return null;
  }

  const translationKey = type === 'SALE' ? 'purchase' : 'sale';

  return (
    <div className={themeClassName('root')}>
      <Text
        Component="h1"
        apple={{
          variant: 'title1',
        }}
        material={{ variant: 'headline5' }}
        align="center"
      >
        {t('p2p.onboarding.title')}
      </Text>
      <Text
        apple={{
          variant: 'body',
          weight: 'regular',
        }}
        material={{ variant: 'body', weight: 'regular' }}
        align="center"
        className={themeClassName('subTitle')}
      >
        {t(`p2p.onboarding.${translationKey}.sub_title`)}
      </Text>
      <div className={themeClassName('features')}>
        {FEATURES.map(({ text, title, icon }) => {
          return (
            <Feature
              className={styles.feature}
              key={title}
              title={t(title)}
              text={t(text)}
              icon={icon}
            />
          );
        })}
      </div>
      <BottomContent className={themeClassName('bottom')}>
        <ActionButton
          className={styles.button}
          stretched
          size="medium"
          shiny
          onClick={() => {
            dispatch(setOnboardingShown());
            API.WVSettings.setUserWvSettings({
              p2p_onboarding_completed: true,
            });
            window.Telegram.WebApp.expand();
            navigate(routePaths.P2P_HOME);
          }}
        >
          {t('p2p.onboarding.button')}
        </ActionButton>
      </BottomContent>
    </div>
  );
};

export default Onboarding;
