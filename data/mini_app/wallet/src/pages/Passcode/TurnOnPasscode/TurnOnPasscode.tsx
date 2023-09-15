import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as LockSVG } from 'images/lock.svg';

import styles from './TurnOnPasscode.module.scss';

const LockAnimation = lazy(
  () => import('components/animations/LockAnimation/LockAnimation'),
);

const TurnOnPasscode: React.FC = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();

  return (
    <Page>
      <BackButton />
      <div className={styles.root}>
        <div className={themeClassName('top')}>
          <Suspense fallback={<LockSVG className={styles.lockIcon} />}>
            <LockAnimation className={styles.lockIcon} />
          </Suspense>
          <h1 className={themeClassName('title')}>{t('passcode.passcode')}</h1>
          <p className={themeClassName('text')}>
            {t('passcode.passcode_increases_security')}
          </p>
        </div>
        <BottomContent className={themeClassName('bottom')}>
          <ActionButton
            Component="button"
            stretched
            size="medium"
            onClick={() => {
              navigate(routePaths.PASSCODE_CREATE, { replace: true });
            }}
          >
            {t('passcode.turn_passcode_on')}
          </ActionButton>
          <div className={themeClassName('disclaimer')}>
            {t('passcode.forgot_and_recovery')}
          </div>
        </BottomContent>
      </div>
    </Page>
  );
};

export default TurnOnPasscode;
