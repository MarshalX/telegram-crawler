import classNames from 'classnames';
import { useSCWAddresses } from 'query/scw/address';
import { FC, useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { WALLET_TERMS_OF_USE_TON_SPACE_LINK } from 'config';

import { RootState } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import MnemonicDisplay from 'containers/scw/MnemonicDisplay/MnemonicDisplay';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import { CreateRecoveryEmailIntents } from 'components/RecoveryEmail/RecoveryEmail';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import {
  backupMnemonic,
  platformAllowsRecovery,
  shouldUpdateForRecovery,
} from 'utils/scw/recovery';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TouchSVG } from 'images/touch.svg';
import { ReactComponent as WarningTriangleSVG } from 'images/warning_triangle.svg';

import styles from './Settings.module.scss';

const Settings: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);
  const {
    raw,
    mnemonic,
    recoveryComplete,
    address: storeSCWAddress,
    apps = [],
    connections = [],
  } = useSelector((state: RootState) => state.scw);
  const { recoveryEmail } = useSelector((state: RootState) => state.passcode);
  const { data: scwAddresses } = useSCWAddresses();
  const hasRecovery =
    scwAddresses &&
    scwAddresses.backups.some((address) => address.address === raw);
  const platformCanRecover = platformAllowsRecovery();

  const [searchParams] = useSearchParams();
  const showMnemonic = searchParams.get('showMnemonic');

  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (showMnemonic === 'true') {
      setShow(true);
    }
  }, [showMnemonic]);

  const handleRevelPhraseClick = () => {
    setShow(true);
  };

  const handleLogoutClick = () => {
    navigate(routePaths.SCW_SETTINGS_LOGOUT);
  };

  const handleBackupClick = () => {
    if (shouldUpdateForRecovery()) {
      navigate(routePaths.SCW_UPDATE);
      return;
    }
    if (recoveryEmail) {
      backupMnemonic(raw, mnemonic)
        .then((success) => {
          if (!success) {
            throw new Error('Failed to backup');
          }
          dispatch(updateSCW({ recoveryComplete: true }));
          navigate(routePaths.SCW_BACKUP_SUCCESS);
        })
        .catch(() => {
          snackbarContext.showSnackbar({
            snackbarId: 'passcode.something_went_wrong',
            text: t('common.something_went_wrong'),
            icon: 'warning',
          });
        });
    } else {
      navigate({
        pathname: routePaths.RECOVERY_EMAIL_CREATE,
        search: createSearchParams({
          intent: CreateRecoveryEmailIntents.scw,
        }).toString(),
      });
    }
  };

  const handleDisconnectDappsClick = () => {
    dispatch(updateSCW({ apps: [], connections: [] }));
  };

  const handleChangeEmailClick = () => {
    navigate(routePaths.RECOVERY_EMAIL_CHANGE);
  };

  return (
    <Page mode={'secondary'}>
      <BackButton />
      <div className={themeClassName('root')}>
        {!(recoveryComplete || hasRecovery) &&
          platformCanRecover &&
          !!storeSCWAddress && (
            <Section className={themeClassName('backupSection')}>
              <Cell.List>
                <Cell
                  start={
                    <WarningTriangleSVG
                      height={28}
                      width={28}
                      className={themeClassName('warningSvg')}
                    />
                  }
                >
                  <Cell.Text
                    title={t('scw.settings.not_backed_up')}
                    description={t(
                      recoveryEmail
                        ? 'scw.settings.use_email_to_backup'
                        : 'scw.settings.add_email_to_backup',
                    )}
                    multilineDescription
                    className={themeClassName('paddedCell')}
                  />
                </Cell>
                <Cell separator />
                <Cell onClick={handleBackupClick}>
                  <Cell.Text
                    titleAppearance="primary"
                    title={t('scw.settings.back_up')}
                  />
                </Cell>
              </Cell.List>
            </Section>
          )}
        {!!storeSCWAddress && (
          <Section
            title={
              theme === 'apple'
                ? t('scw.settings.recovery_phrase').toLocaleUpperCase()
                : t('scw.settings.recovery_phrase')
            }
            description={t('scw.settings.description')}
            material={{
              descriptionLayout: 'outer',
            }}
            separator
          >
            <div
              className={classNames(
                themeClassName('container'),
                show && styles.active,
                !show && styles.pointer,
              )}
              onClick={handleRevelPhraseClick}
            >
              <div
                className={classNames(
                  themeClassName('tap'),
                  show && styles.inactive,
                )}
              >
                <TouchSVG height={48} width={48} />
                <Text
                  apple={{
                    variant: 'subheadline1',
                    weight: 'semibold',
                    color: 'link',
                  }}
                  material={{ variant: 'button1', color: 'link' }}
                >
                  {t('scw.settings.tap_text')}
                </Text>
              </div>
              {show && <MnemonicDisplay mnemonic={mnemonic} />}
            </div>
          </Section>
        )}

        {(apps.length > 0 || connections.length > 0) && (
          <Section
            description={t('scw.settings.disconnect_apps_warning')}
            material={{
              descriptionLayout: 'outer',
            }}
            separator
          >
            <Cell.List>
              <Cell onClick={handleDisconnectDappsClick} tappable>
                <Cell.Text
                  titleAppearance="danger"
                  title={t('scw.settings.disconnect_apps')}
                />
              </Cell>
            </Cell.List>
          </Section>
        )}
        {(!!storeSCWAddress || !!recoveryEmail) && (
          <Section separator>
            <Cell.List>
              {!!recoveryEmail && (
                <Cell onClick={handleChangeEmailClick} tappable>
                  <Cell.Text
                    titleAppearance="primary"
                    title={t('passcode.change_recovery_email')}
                  />
                </Cell>
              )}
              {!!storeSCWAddress && (
                <Cell onClick={handleLogoutClick} tappable>
                  <Cell.Text
                    titleAppearance="danger"
                    title={t('scw.settings.logout')}
                  />
                </Cell>
              )}
            </Cell.List>
          </Section>
        )}
        <Text
          className={themeClassName('privacyLink')}
          apple={{ variant: 'subheadline1', weight: 'regular', color: 'link' }}
          material={{ variant: 'subtitle1', color: 'link' }}
          align="center"
          onClick={() => {
            window.Telegram.WebApp.openLink(WALLET_TERMS_OF_USE_TON_SPACE_LINK);
          }}
        >
          {t('scw.settings.terms_of_use_link')}
        </Text>
      </div>
    </Page>
  );
};

export default Settings;
