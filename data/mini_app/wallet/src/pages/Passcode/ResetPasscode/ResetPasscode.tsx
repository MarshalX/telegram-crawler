import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import API from 'api/wallet-v2';
import { EmailCodeReasonEnum, PasscodeTypeEnum } from 'api/wallet-v2/generated';

import routePaths from 'routePaths';

import { useAppDispatch, useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';

import { BackButton } from 'components/BackButton/BackButton';
import EmailCode from 'components/EmailCode/EmailCode';
import Page from 'components/Page/Page';
import Passcode from 'components/Passcode/Passcode';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

// passcodes considered so insecure we warn user to set a different passcode
const INSECURE_PASSCODES = ['0000', '1234', '000000', '123456'];

export enum ResetPasscodeSteps {
  confirmEmail = 'confirm-email',
  setPasscode = 'set-passcode',
  confirmPasscode = 'confirm-passcode',
}

// Used for creating, updating, and re-activating passcode
const ResetPasscode: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const {
    recoveryEmail,
    unlockDuration,

    newPasscode,
    newPasscodeType,
  } = useAppSelector((state) => state.passcode);
  const [step, setStep] = useState(ResetPasscodeSteps.confirmEmail);

  const [clearPasscode, setClearPasscode] = useState(false);
  const [clearConfirmPasscode, setClearConfirmPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');
  const [emailCode, setEmailCode] = useState('');

  const [clearConfirmEmail, setClearConfirmEmail] = useState(false);

  // update redux passcode upon passcode callbacks
  const setStorePasscode = (
    callbackPasscode: string,
    callbackPasscodeType: PasscodeTypeEnum,
  ) => {
    dispatch(
      updatePasscode({
        newPasscode: callbackPasscode,
        newPasscodeType: callbackPasscodeType,
      }),
    );
    setStep(ResetPasscodeSteps.confirmPasscode);
    setPasscodeError('');
  };

  const handleConfirmEmail = async (emailCode: string) => {
    try {
      await API.RecoveryEmail.checkEmailCode({
        emailCode: emailCode,
        reason: EmailCodeReasonEnum.ChangePasscode,
      });
      setEmailCode(emailCode);
      setStep(ResetPasscodeSteps.setPasscode);
    } catch {
      setClearConfirmEmail(true);
    }
  };

  const handleSetPasscode = (
    callbackPasscode: string,
    callbackPasscodeType: PasscodeTypeEnum,
  ) => {
    // if user chose an insecure passcode, ask them to change it in Telegram popup
    if (INSECURE_PASSCODES.includes(callbackPasscode)) {
      window.Telegram.WebApp.showPopup(
        {
          title: t('passcode.passcode_can_be_guessed'),
          message: t('passcode.passcode_can_unlock_wallet'),
          buttons: [
            {
              id: 'use',
              text: t('passcode.use_anyway'),
            },
            {
              id: 'change',
              text: t('passcode.change_passcode'),
            },
          ],
        },
        (id: string) => {
          if (id === 'use') {
            setStorePasscode(callbackPasscode, callbackPasscodeType);
          }
          if (id === 'change') {
            setClearPasscode(true);
          }
        },
      );
      return;
    }
    setStorePasscode(callbackPasscode, callbackPasscodeType);
  };

  const handleConfirmPasscode = async (
    callbackPasscode: string,
    callbackPasscodeType: PasscodeTypeEnum,
  ) => {
    if (callbackPasscode !== newPasscode) {
      setClearConfirmPasscode(true);
      return;
    }
    try {
      await API.Passcodes.updatePasscode({
        newPasscode: callbackPasscode,
        newPasscodeType: callbackPasscodeType,
        emailCode: emailCode,
      });
      dispatch(
        updatePasscode({
          passcodeType: callbackPasscodeType,
          enteredPasscode: callbackPasscode,
          unlockDuration: unlockDuration || 0,
          newPasscode: undefined,
          newPasscodeType: undefined,
          newRecoveryEmail: undefined,
        }),
      );
      navigate(routePaths.SETTINGS_PASSCODE, { replace: true });
    } catch (error) {
      snackbarContext.showSnackbar({
        snackbarId: 'reset_passcode',
        text: t('passcode.failed_to_reset_passcode'),
        icon: 'warning',
      });
    }
  };

  const handleBack = () => {
    switch (step) {
      case ResetPasscodeSteps.confirmEmail:
      case ResetPasscodeSteps.setPasscode:
        dispatch(
          updatePasscode({
            newPasscode: undefined,
            newPasscodeType: undefined,
            newRecoveryEmail: undefined,
          }),
        );
        window.history.back();
        return;
      case ResetPasscodeSteps.confirmPasscode:
        setStep(ResetPasscodeSteps.setPasscode);
        return;
    }
  };

  const handlClearPasscode = () => {
    setClearPasscode(false);
  };

  const handleClearConfirmPasscode = () => {
    setClearConfirmPasscode(false);
    setPasscodeError(t('passcode.passcodes_do_not_match'));
    setStep(ResetPasscodeSteps.setPasscode);
  };

  const handleOnClearConfirmEmail = () => {
    setClearConfirmEmail(false);
  };

  useEffect(() => {
    if (recoveryEmail) {
      API.RecoveryEmail.requestEmailCode({
        email: recoveryEmail,
        reason: EmailCodeReasonEnum.ChangePasscode,
      });
    } else {
      snackbarContext.showSnackbar({
        snackbarId: 'passcode.something_went_wrong',
        text: t('common.something_went_wrong'),
        icon: 'warning',
      });
    }
  }, []);

  return (
    <Page>
      <BackButton onClick={handleBack} />
      {step === ResetPasscodeSteps.confirmEmail && (
        <EmailCode
          email={recoveryEmail}
          reason={EmailCodeReasonEnum.ChangePasscode}
          onComplete={handleConfirmEmail}
          onClear={clearConfirmEmail ? handleOnClearConfirmEmail : undefined}
        />
      )}
      {step === ResetPasscodeSteps.setPasscode && (
        <Passcode
          title={t('passcode.set_a_passcode')}
          onComplete={handleSetPasscode}
          error={passcodeError}
          showOptions={true}
          onClear={clearPasscode ? handlClearPasscode : undefined}
          defaultPasscodeType={newPasscodeType}
        />
      )}
      {step === ResetPasscodeSteps.confirmPasscode && (
        <Passcode
          title={t('passcode.confirm_a_passcode')}
          onComplete={handleConfirmPasscode}
          onClear={
            clearConfirmPasscode ? handleClearConfirmPasscode : undefined
          }
          defaultPasscodeType={newPasscodeType}
        />
      )}
    </Page>
  );
};

export default ResetPasscode;
