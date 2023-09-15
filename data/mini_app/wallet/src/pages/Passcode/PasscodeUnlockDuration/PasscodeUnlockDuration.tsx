import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import API from 'api/wallet-v2';

import { RootState } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, SelectionCell } from 'components/Cells';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { useTheme } from 'hooks/utils/useTheme';

export const PASSCODE_DURATIONS = [
  { value: 0, label: 'passcode.immediately' },
  { value: 300, label: 'passcode.after_5_minutes' },
  { value: 900, label: 'passcode.after_15_minutes' },
  { value: 3600, label: 'passcode.after_1_hour' },
  { value: 1800, label: 'passcode.after_5_hours' },
];

const PasscodeUnlockDuration: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enteredPasscode, unlockDuration } = useSelector(
    (state: RootState) => state.passcode,
  );
  const snackbarContext = useContext(SnackbarContext);

  const handleUpdateUnlockDuration = async (value: string) => {
    try {
      const newUnlockDuration = parseInt(value);
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
        unlockDuration: newUnlockDuration,
      });
      dispatch(
        updatePasscode({
          unlockDuration: newUnlockDuration,
          unlockedUntil: Date.now() + newUnlockDuration * 1000,
        }),
      );
      window.history.back();
    } catch {
      snackbarContext.showSnackbar({
        snackbarId: 'passcode.something_went_wrong',
        text: t('passcode.failed_to_updated_passcode_settings'),
        icon: 'warning',
      });
    }
  };

  return (
    <Page mode={theme === 'apple' ? 'secondary' : 'primary'}>
      <BackButton />

      <Section
        title={t('passcode.require_passcode')}
        description={t('passcode.shorter_times_are_more_secure')}
      >
        <Cell.List>
          {PASSCODE_DURATIONS.map((item) => (
            <SelectionCell
              name="unlockDurations"
              mode="radio"
              onChange={handleUpdateUnlockDuration}
              checked={unlockDuration === item.value}
              value={item.value.toString()}
              key={item.value}
            >
              {t(item.label)}
            </SelectionCell>
          ))}
        </Cell.List>
      </Section>
    </Page>
  );
};

export default PasscodeUnlockDuration;
