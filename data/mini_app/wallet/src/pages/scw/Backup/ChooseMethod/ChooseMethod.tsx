import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import SCWProfileDisplay from 'containers/scw/ProfileDisplay/ProfileDisplay';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { CreateRecoveryEmailIntents } from 'components/RecoveryEmail/RecoveryEmail';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import {
  SCWNotificationActions,
  updateAddressNotifications,
} from 'utils/scw/notifications';
import {
  backupMnemonic,
  platformAllowsRecovery,
  shouldUpdateForRecovery,
} from 'utils/scw/recovery';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ChooseMethod.module.scss';

const BackupChooseMethod = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const { recoveryEmail } = useAppSelector((state) => state.passcode);
  const { raw, mnemonic } = useAppSelector((state) => state.scw);

  const handleEmailBackupClick = () => {
    if (!platformAllowsRecovery()) {
      snackbarContext.showSnackbar({
        snackbarId: 'scw',
        icon: 'warning',
        text: t('scw.update.recovery_not_yet_supported', {
          platform: window.Telegram.WebApp.platform,
        }),
      });
      return;
    }
    if (shouldUpdateForRecovery()) {
      navigate(routePaths.SCW_UPDATE);
      return;
    }
    if (!recoveryEmail) {
      navigate({
        pathname: routePaths.RECOVERY_EMAIL_CREATE,
        search: createSearchParams({
          intent: CreateRecoveryEmailIntents.scw,
        }).toString(),
      });
    } else {
      backupMnemonic(raw, mnemonic)
        .then((success) => {
          if (!success) {
            throw new Error('Failed to backup');
          }
          updateAddressNotifications(raw, SCWNotificationActions.register);
          dispatch(updateSCW({ setupComplete: true, recoveryComplete: true }));
          navigate(routePaths.SCW_BACKUP_SUCCESS);
        })
        .catch(() => {
          snackbarContext.showSnackbar({
            snackbarId: 'passcode.something_went_wrong',
            text: t('common.something_went_wrong'),
            icon: 'warning',
          });
        });
    }
  };

  return (
    <Page>
      <BackButton
        onClick={() => {
          navigate(routePaths.MAIN, { replace: true });
        }}
      />
      <>
        <div className={themeClassName('root')}>
          <SCWProfileDisplay />
          <div className={themeClassName('content')}>
            <Text
              style={{ marginInline: 32 }}
              apple={{ variant: 'title1' }}
              material={{ variant: 'headline5' }}
            >
              {t('scw.backup.choose_method.title')}
            </Text>
            <Text
              style={{ marginInline: 32, marginBlock: 12 }}
              apple={{ variant: 'body', weight: 'regular' }}
              material={{ variant: 'body', weight: 'regular' }}
            >
              {t('scw.backup.choose_method.description')}
            </Text>
          </div>
        </div>
        <BottomContent className={themeClassName('bottom')}>
          <ActionButton
            data-testid="tgcrawl"
            stretched
            size="medium"
            shiny
            onClick={handleEmailBackupClick}
            className={styles.button}
          >
            {t('scw.backup.choose_method.main_button')}
          </ActionButton>
          <ActionButton
            data-testid="tgcrawl"
            size="medium"
            stretched
            mode="transparent"
            onClick={() => {
              navigate(routePaths.SCW_BACKUP_MANUAL);
            }}
            className={styles.button}
          >
            {t('scw.backup.choose_method.secondary_button')}
          </ActionButton>
        </BottomContent>
      </>
    </Page>
  );
};

export default memo(BackupChooseMethod);
