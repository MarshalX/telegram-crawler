import { ChangeEvent, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import API from 'api/wallet-v2';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppDispatch, useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';

import { PASSCODE_DURATIONS } from 'pages/Passcode/PasscodeUnlockDuration/PasscodeUnlockDuration';

import { BackButton } from 'components/BackButton/BackButton';
import { ButtonCell, Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Switch } from 'components/Switch/Switch';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import routePaths from '../../routePaths';
import styles from './SettingsPasscode.module.scss';

const SettingsPasscode = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const { enteredPasscode, requiredOnOpen, unlockDuration } = useAppSelector(
    (state) => state.passcode,
  );
  const unlockDurationLabel = PASSCODE_DURATIONS.find(
    (item) => item.value === unlockDuration,
  )?.label;

  const navigate = useNavigate();
  const { themeClassName } = useTheme(styles);

  const handleUpdateRequiredOnOpen = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newRequiredOnOpen = e.target.checked;
    try {
      if (!enteredPasscode) {
        snackbarContext.showSnackbar({
          snackbarId: 'passcode.something_went_wrong',
          text: t('passcode.must_enter_passcode_again'),
          icon: 'warning',
        });
        return;
      }
      await API.Passcodes.updatePasscodeSettings({
        passcode: enteredPasscode,
        requiredOnOpen: newRequiredOnOpen,
      });
      dispatch(
        updatePasscode({
          requiredOnOpen: newRequiredOnOpen,
        }),
      );
    } catch {
      snackbarContext.showSnackbar({
        snackbarId: 'passcode.something_went_wrong',
        text: t('passcode.failed_to_updated_passcode_settings'),
        icon: 'warning',
      });
    }
  };

  const handleTurnOffPasscode = () => {
    // Show Telegram popup to confirm user really wants to
    // deactivate their passcode
    window.Telegram.WebApp.showPopup(
      {
        message: t('passcode.turn_passcode_off'),
        buttons: [
          {
            id: 'cancel',
            text: t('common.cancel'),
          },
          {
            id: 'ok',
            text: t('common.ok'),
          },
        ],
      },
      async (id: string) => {
        if (id === 'ok') {
          try {
            if (!enteredPasscode) {
              snackbarContext.showSnackbar({
                snackbarId: 'passcode.something_went_wrong',
                text: t('passcode.must_enter_passcode_again'),
                icon: 'warning',
              });
              return;
            }

            await API.Passcodes.removePasscode({
              passcode: enteredPasscode,
            });

            dispatch(
              updatePasscode({
                passcodeType: undefined,
                enteredPasscode: undefined,
              }),
            );
            navigate(routePaths.SETTINGS, { replace: true });
          } catch {
            snackbarContext.showSnackbar({
              snackbarId: 'settings-passcode',
              before: <WarningSVG />,
              text: t('passcode.failed_to_remove_passcode'),
              action: (
                <a href={WALLET_SUPPORT_BOT_LINK}>
                  {t('common.contact_support')}
                </a>
              ),
              actionPosition: 'bottom',
            });
          }
        }
      },
    );
  };

  return (
    <Page mode="secondary">
      <BackButton
        onClick={() => {
          dispatch(updatePasscode({ enteredPasscode: undefined }));
          window.history.back();
        }}
      />
      <div className={themeClassName('root')}>
        <Section description={t('passcode.forgot_and_recovery')} separator>
          <Cell.List>
            <ButtonCell
              onClick={() => {
                navigate(routePaths.PASSCODE_CREATE);
              }}
            >
              {t('passcode.change_passcode')}
            </ButtonCell>
            <ButtonCell
              onClick={() => {
                navigate(routePaths.RECOVERY_EMAIL_CHANGE);
              }}
            >
              {t('passcode.change_recovery_email')}
            </ButtonCell>
            <ButtonCell mode="danger" onClick={handleTurnOffPasscode}>
              {t('passcode.turn_passcode_off')}
            </ButtonCell>
          </Cell.List>
        </Section>
        <Section description={t('passcode.require_passcode_if_away')}>
          <Cell.List>
            <Cell
              end={
                <Cell.Part type="switch">
                  <Switch
                    checked={requiredOnOpen}
                    onChange={handleUpdateRequiredOnOpen}
                  />
                </Cell.Part>
              }
            >
              <Cell.Text title={t('passcode.ask_each_wallet_open')} />
            </Cell>
            <Cell
              Component={Link}
              chevron
              tappable
              to={routePaths.PASSCODE_UNLOCK_DURATION}
              end={
                <Cell.Text
                  title={unlockDurationLabel ? t(unlockDurationLabel) : ''}
                />
              }
            >
              <Cell.Text title={t('passcode.require_passcode')} />
            </Cell>
          </Cell.List>
        </Section>
      </div>
    </Page>
  );
};

export default memo(SettingsPasscode);
