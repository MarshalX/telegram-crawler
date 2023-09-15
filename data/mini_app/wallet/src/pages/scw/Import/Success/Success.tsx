import cn from 'classnames';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import routePaths from 'routePaths';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './Success.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

const Success = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { themeClassName } = useTheme(styles);

  return (
    <Page>
      <BackButton onClick={() => navigate(routePaths.SCW_MAIN)} />
      <div className={themeClassName('root')}>
        <Suspense
          fallback={<BoomstickSVG className={cn(themeClassName('media'))} />}
        >
          <BoomstickAnimation className={cn(themeClassName('media'))} />
        </Suspense>
        <Text apple={{ variant: 'title1' }} material={{ variant: 'headline5' }}>
          {t('scw.import.success.title')}
        </Text>
      </div>
      <BottomContent className={themeClassName('bottom')}>
        <ActionButton
          data-testid="tgcrawl"
          stretched
          shiny
          size="medium"
          onClick={() => navigate(routePaths.SCW_MAIN)}
          className={styles.button}
        >
          {t('scw.import.success.button')}
        </ActionButton>
      </BottomContent>
    </Page>
  );
};

export default memo(Success);
