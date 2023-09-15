import { captureException } from '@sentry/react';
import {
  Suspense,
  lazy,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import API from 'api/wallet-v2';
import { PasscodeTypeEnum } from 'api/wallet-v2/generated';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';

import Keypad from 'components/Keypad/Keypad';
import PasscodeDots from 'components/PasscodeDots/PasscodeDots';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CrystalSVG } from 'images/crystal.svg';

import styles from './PasscodeVerify.module.scss';

const CrystalAnimation = lazy(
  () => import('components/animations/CrystalAnimation/CrystalAnimation'),
);

export interface PasscodeVerifyProps {
  onSuccess: (passcode: string) => void;
}

/*
  When using PasscodeVerify on a page, please ensure that:
    1. While PV is shown, hide MainButton
      - This is because MainButton always overlaps webview content
    2. While PV is shown, Back button hides PV (instead of changing page)
    3. While PV is shown, do not have autoFocus inputs
      - This could cause side effects and you may still see input focus carat
*/
const PasscodeVerify: React.FC<PasscodeVerifyProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);

  const { passcodeType, unlockDuration, unlockedUntil, enteredPasscode } =
    useAppSelector((state) => state.passcode);
  const passcodeMaxLength = passcodeType === PasscodeTypeEnum._4Digit ? 4 : 6;

  const [passcode, setPasscode] = useState('');
  const [fail, setFail] = useState(false);
  const [numRemainingAttempts, setNumRemainingAttempts] = useState(Infinity);
  const showWarning = numRemainingAttempts < 5;

  const alreadyUnlocked = useMemo(() => {
    if (enteredPasscode && unlockedUntil) {
      return unlockedUntil > Date.now();
    }
    return false;
  }, [unlockedUntil, enteredPasscode]);

  useEffect(() => {
    if (enteredPasscode && alreadyUnlocked) {
      onSuccess(enteredPasscode);
    } else {
      if (!window.Telegram.WebApp.isExpanded) {
        window.Telegram.WebApp.expand();
      }
    }
  }, [enteredPasscode, alreadyUnlocked]);

  const showNetworkError = () => {
    snackbarContext.showSnackbar({
      onShow: () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
      },
      snackbarId: 'passcode',
      icon: 'warning',
      text: t('error.server'),
      shakeOnShow: true,
    });
  };

  const handleUpdatePasscode = async (value: string) => {
    if (value.length <= passcodeMaxLength) {
      setPasscode(value);
    }

    if (value.length === passcodeMaxLength) {
      try {
        await API.Passcodes.verifyPasscode({
          passcode: value,
        });
        dispatch(
          updatePasscode({
            unlockedUntil: Date.now() + (unlockDuration || 0) * 1000,
          }),
        );
        onSuccess(value);
        // eslint-disable-next-line
      } catch (error: any) {
        // TODO: Determine best UX for network error situations
        if (error?.message == 'Network Error') {
          showNetworkError();
          captureException('Wallet v2 API unreachable');
        } else if (
          error?.response &&
          [500, 404].includes(error?.response?.status)
        ) {
          showNetworkError();
          captureException(`Wallet v2 API error: ${error?.response?.status}`);
        } else if (error?.response && error?.response?.status === 422) {
          // user inputted incorrect passcode
          if (
            error?.response?.data?.code === 'passcode_wrong' ||
            error?.response?.data?.code === 'passcode_exceeded_max_attempts'
          ) {
            setNumRemainingAttempts(
              error?.response?.data?.num_remaining_attempts,
            );
          }
          // Passcode should only be un-synced when user using multiple devices at same time
          if (error?.response?.data?.code === 'passcode_not_set') {
            dispatch(
              updatePasscode({
                passcodeType: undefined,
              }),
            );
            onSuccess('');
          }
        }
        setFail(true);
      }
    }
  };

  useEffect(() => {
    if (!fail) return;
    setTimeout(() => {
      setPasscode('');
      setFail(false);
    }, 1000);
  }, [fail]);

  // Prevent showing passcode form if already unlocked
  if (alreadyUnlocked) {
    return null;
  }

  return (
    <div className={themeClassName('root')}>
      <div className={themeClassName('top')}>
        <Suspense
          fallback={
            <div className={themeClassName('topAvatar')}>
              <CrystalSVG />
            </div>
          }
        >
          <CrystalAnimation className={themeClassName('topAvatar')} />
        </Suspense>
        <p className={themeClassName('text')}>
          {t('passcode.enter_wallet_passcode')}
        </p>
        <PasscodeDots
          passcodeLength={passcode.length}
          passcodeMaxLength={passcodeMaxLength}
          shake={fail}
        />
        <div>
          <p className={themeClassName('text')}>
            <Link
              to={routePaths.PASSCODE_RESET}
              className={showWarning ? themeClassName('warning') : undefined}
            >
              {showWarning &&
                t('passcode.number_attempts_left', {
                  numberLeft: numRemainingAttempts,
                }) + ' · '}
              {t('passcode.forgot_passcode')}
            </Link>
          </p>
        </div>
      </div>
      <div className={themeClassName('bottom')}>
        <Keypad value={passcode} onUpdate={handleUpdatePasscode} />
      </div>
    </div>
  );
};

export default PasscodeVerify;
