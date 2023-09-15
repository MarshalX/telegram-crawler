import { useContext, useState } from 'react';
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
import RecoveryEmail from 'components/RecoveryEmail/RecoveryEmail';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

// passcodes considered so insecure we warn user to set a different passcode
const INSECURE_PASSCODES = ['0000', '1234', '000000', '123456'];

export enum CreatePasscodeSteps {
  setPasscode = 'set-passcode',
  confirmPasscode = 'confirm-passcode',
  setEmail = 'set-email',
  confirmEmail = 'confirm-email',
}

// Used for creating, updating, and re-activating passcode
const CreatePasscode: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const {
    passcodeType,
    recoveryEmail,
    unlockDuration,

    newPasscode,
    newPasscodeType,
    newRecoveryEmail,

    enteredPasscode,
  } = useAppSelector((state) => state.passcode);
  const [step, setStep] = useState(CreatePasscodeSteps.setPasscode);

  const [clearPasscode, setClearPasscode] = useState(false);
  const [clearConfirmPasscode, setClearConfirmPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

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
    setStep(CreatePasscodeSteps.confirmPasscode);
    setPasscodeError('');
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

    if (recoveryEmail) {
      // user already has recovery email, just update passcode
      // this way user does not need to reconfirm email address
      // that they have already confirmed
      try {
        if (passcodeType) {
          // update currently active passcode
          await API.Passcodes.updatePasscode({
            newPasscode: callbackPasscode,
            newPasscodeType: callbackPasscodeType,
            passcode: enteredPasscode,
          });
        } else {
          // re-activate passcode with new passcode
          await API.Passcodes.createPasscode({
            newPasscode: callbackPasscode,
            newPasscodeType: callbackPasscodeType,
          });
        }
        dispatch(
          updatePasscode({
            passcodeType: newPasscodeType,
            enteredPasscode: callbackPasscode,
            unlockDuration: unlockDuration || 0,
            openUnlocked: true,
            newPasscode: undefined,
            newPasscodeType: undefined,
            newRecoveryEmail: undefined,
          }),
        );
        navigate(routePaths.SETTINGS_PASSCODE, { replace: true });
      } catch {
        snackbarContext.showSnackbar({
          snackbarId: 'passcode.something_went_wrong',
          text: t('passcode.failed_to_set_passcode'),
          icon: 'warning',
        });
      }
      return;
    }

    // for first-time setup, user will need to
    // set and confirm an email address to recover their passcode
    setStep(CreatePasscodeSteps.setEmail);
  };

  const handleSetEmail = async (callbackRecoveryEmail: string) => {
    try {
      await API.RecoveryEmail.requestEmailCode({
        email: callbackRecoveryEmail,
        reason: EmailCodeReasonEnum.ConfirmEmail,
      });
      dispatch(updatePasscode({ newRecoveryEmail: callbackRecoveryEmail }));
      setStep(CreatePasscodeSteps.confirmEmail);
      // eslint-disable-next-line
    } catch (error: any) {
      const code = error?.response?.data?.code;
      let warningText = t('recovery_email.failed_to_set_email');
      if (code === 'email_invalid') {
        warningText = t('recovery_email.please_enter_valid_email');
      }

      snackbarContext.showSnackbar({
        snackbarId: 'set_recovery_email',
        icon: 'warning',
        text: warningText,
      });
    }
  };

  const handleConfirmEmail = async (emailCode: string) => {
    // end of passcode creation flow
    // occurs on first time user creates passcode + recovery email
    if (newPasscode) {
      try {
        await API.Passcodes.createPasscode({
          newPasscode: newPasscode,
          newPasscodeType: newPasscodeType,
          email: newRecoveryEmail,
          emailCode: emailCode,
        });

        dispatch(
          updatePasscode({
            passcodeType: newPasscodeType,
            recoveryEmail: newRecoveryEmail,
            unlockDuration: unlockDuration || 0,
            enteredPasscode: newPasscode,
            openUnlocked: true,
            newPasscode: undefined,
            newPasscodeType: undefined,
            newRecoveryEmail: undefined,
          }),
        );
        navigate(routePaths.SETTINGS_PASSCODE, { replace: true });
      } catch {
        setClearConfirmEmail(true);
      }
      return;
    }
    // user is only changing their recovery email
    if (newRecoveryEmail) {
      if (!enteredPasscode) {
        setClearConfirmEmail(true);
        snackbarContext.showSnackbar({
          snackbarId: 'confirm_recovery_email',
          icon: 'warning',
          text: t('passcode.must_enter_passcode_again'),
        });
        return;
      }
      API.RecoveryEmail.changeRecoveryEmail({
        passcode: enteredPasscode,
        email: newRecoveryEmail,
        emailCode: emailCode,
      })
        .then(() => {
          dispatch(
            updatePasscode({
              recoveryEmail: newRecoveryEmail,
            }),
          );
          navigate(routePaths.SETTINGS_PASSCODE);
          return;
        })
        .catch(() => {
          setClearConfirmEmail(true);
          return;
        });
    }
  };

  const handleBack = () => {
    switch (step) {
      case CreatePasscodeSteps.setPasscode:
        dispatch(
          updatePasscode({
            newPasscode: undefined,
            newPasscodeType: undefined,
            newRecoveryEmail: undefined,
          }),
        );
        window.history.back();
        return;
      case CreatePasscodeSteps.confirmPasscode:
        setStep(CreatePasscodeSteps.setPasscode);
        return;
      case CreatePasscodeSteps.setEmail:
        setStep(CreatePasscodeSteps.setPasscode);
        return;
      case CreatePasscodeSteps.confirmEmail:
        setStep(CreatePasscodeSteps.setEmail);
        return;
    }
  };

  const handlClearPasscode = () => {
    setClearPasscode(false);
  };

  const handleClearConfirmPasscode = () => {
    setClearConfirmPasscode(false);
    setPasscodeError(t('passcode.passcodes_do_not_match'));
    setStep(CreatePasscodeSteps.setPasscode);
  };

  const handleOnClearConfirmEmail = () => {
    setClearConfirmEmail(false);
  };

  return (
    <Page>
      <BackButton onClick={handleBack} />
      {step === CreatePasscodeSteps.setPasscode && (
        <Passcode
          title={t('passcode.set_a_passcode')}
          onComplete={handleSetPasscode}
          error={passcodeError}
          showOptions={true}
          onClear={clearPasscode ? handlClearPasscode : undefined}
          defaultPasscodeType={newPasscodeType}
        />
      )}
      {step === CreatePasscodeSteps.confirmPasscode && (
        <Passcode
          title={t('passcode.confirm_a_passcode')}
          onComplete={handleConfirmPasscode}
          onClear={
            clearConfirmPasscode ? handleClearConfirmPasscode : undefined
          }
          defaultPasscodeType={newPasscodeType}
        />
      )}
      {step === CreatePasscodeSteps.setEmail && (
        <RecoveryEmail onComplete={handleSetEmail} />
      )}
      {step === CreatePasscodeSteps.confirmEmail && (
        <EmailCode
          email={newRecoveryEmail}
          reason={EmailCodeReasonEnum.ConfirmEmail}
          onComplete={handleConfirmEmail}
          onClear={clearConfirmEmail ? handleOnClearConfirmEmail : undefined}
        />
      )}
    </Page>
  );
};

export default CreatePasscode;
