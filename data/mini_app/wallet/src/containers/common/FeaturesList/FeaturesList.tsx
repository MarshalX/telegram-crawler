import { FC, Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FeaturesAnimationFallback } from 'components/animations/FeaturesAnimation/FeaturesAnimationFallback';

import styles from './FeaturesList.module.scss';
import { Feature } from './components/Feature/Feature';

const FeaturesAnimation = lazy(
  () => import('components/animations/FeaturesAnimation/FeaturesAnimation'),
);

const FEATURES = [
  {
    title: 'onboarding.transactions_title',
    text: 'onboarding.transactions_text',
    icon: (
      <Suspense fallback={<FeaturesAnimationFallback feature="transactions" />}>
        <FeaturesAnimation feature="transactions" />
      </Suspense>
    ),
  },
  {
    title: 'onboarding.crypto_title',
    text: 'onboarding.crypto_text',
    icon: (
      <Suspense fallback={<FeaturesAnimationFallback feature="crypto" />}>
        <FeaturesAnimation feature="crypto" />
      </Suspense>
    ),
  },
  {
    title: 'onboarding.security_title',
    text: 'onboarding.security_text',
    icon: (
      <Suspense fallback={<FeaturesAnimationFallback feature="security" />}>
        <FeaturesAnimation feature="security" />
      </Suspense>
    ),
  },
] as const;

export const FeaturesList: FC<{ className?: string }> = memo(
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <div className={className}>
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
    );
  },
);
