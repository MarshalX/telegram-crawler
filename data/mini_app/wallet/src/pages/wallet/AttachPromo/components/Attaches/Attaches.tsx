import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'components/Text/Text';
import { AttachesAnimationFallback } from 'components/animations/AttachesAnimation/AttachesAnimationFallback';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Attaches.module.scss';

const AttachesAnimation = lazy(
  () => import('components/animations/AttachesAnimation/AttachesAnimation'),
);

export const Attaches = memo(() => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<AttachesAnimationFallback />}>
        <AttachesAnimation />
      </Suspense>
      <Text
        align="center"
        apple={{ variant: 'title1' }}
        material={{ variant: 'headline5' }}
        className={themeClassName('title')}
      >
        {t('attaches_promo.title')}
      </Text>

      <Text
        align="center"
        apple={{ variant: 'body', weight: 'regular' }}
        material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        className={themeClassName('text')}
      >
        {t('attaches_promo.text')}
      </Text>
    </>
  );
});
