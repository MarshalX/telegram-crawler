import cn from 'classnames';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import routePaths from 'routePaths';

import ActionButton from 'components/ActionButton/ActionButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './Success.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

const Success: React.FC<{ imported?: boolean }> = ({ imported = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { themeClassName } = useTheme(styles);

  return (
    <>
      <div className={themeClassName('root')}>
        <Suspense
          fallback={<BoomstickSVG className={cn(themeClassName('media'))} />}
        >
          <BoomstickAnimation className={cn(themeClassName('media'))} />
        </Suspense>
        <Text apple={{ variant: 'title1' }} material={{ variant: 'headline5' }}>
          {t(
            imported
              ? 'scw.onboarding.recovery_success.title'
              : 'scw.onboarding.success.title',
          )}
        </Text>
      </div>
      <BottomContent className={themeClassName('bottom')}>
        <ActionButton
          stretched
          shiny
          size="medium"
          onClick={() => navigate(routePaths.SCW_MAIN)}
          className={styles.button}
        >
          {t('scw.onboarding.success.button')}
        </ActionButton>
      </BottomContent>
    </>
  );
};

export default memo(Success);
