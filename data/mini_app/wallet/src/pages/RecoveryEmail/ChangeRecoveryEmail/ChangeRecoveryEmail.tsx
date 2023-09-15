import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/wallet-v2';
import { EmailCodeReasonEnum } from 'api/wallet-v2/generated';

import { useAppDispatch, useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';

import { BackButton } from 'components/BackButton/BackButton';
import EmailCode from 'components/EmailCode/EmailCode';
import Page from 'components/Page/Page';
import RecoveryEmail from 'components/RecoveryEmail/RecoveryEmail';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

export enum ChangeRecoveryEmailSteps {
  confirmCurrentEmail = 'confirm-current-email', // optional
  setEmail = 'set-email',
  confirmEmail = 'confirm-email',
}

const ChangeRecoveryEmail: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const { newRecoveryEmail, recoveryEmail, enteredPasscode } = useAppSelector(
    (state) => state.passcode,
  );
  const defaultStep = enteredPasscode
    ? ChangeRecoveryEmailSteps.setEmail
    : ChangeRecoveryEmailSteps.confirmCurrentEmail;
  const [step, setStep] = useState(defaultStep);
  const [currentEmailCode, setCurrentEmailCode] = useState('');

  const [clearConfirmCurrentEmail, setClearConfirmCurrentEmail] =
    useState(false);
  const [clearConfirmEmail, setClearConfirmEmail] = useState(false);

  const requestEmailCode = async () => {
    if (enteredPasscode) return;

    if (!recoveryEmail) {
      snackbarContext.showSnackbar({
        snackbarId: 'confirm_recovery_email',
        icon: 'warning',
        text: t('common.something_went_wrong'),
      });
      return;
    }
    await API.RecoveryEmail.requestEmailCode({
      email: recoveryEmail,
      reason: EmailCodeReasonEnum.ChangeEmail,
    });
  };

  const handleSetEmail = async (callbackRecoveryEmail: string) => {
    try {
      await API.RecoveryEmail.requestEmailCode({
        email: callbackRecoveryEmail,
        reason: EmailCodeReasonEnum.ConfirmEmail,
      });
      dispatch(updatePasscode({ newRecoveryEmail: callbackRecoveryEmail }));
      setStep(ChangeRecoveryEmailSteps.confirmEmail);
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

  const handleConfirmCurrentEmail = async (emailCode: string) => {
    if (!recoveryEmail) {
      setClearConfirmCurrentEmail(true);
      snackbarContext.showSnackbar({
        snackbarId: 'confirm_recovery_email',
        icon: 'warning',
        text: t('passcode.must_enter_email_again'),
      });
      return;
    }
    API.RecoveryEmail.checkEmailCode({
      emailCode: emailCode,
      reason: EmailCodeReasonEnum.ChangeEmail,
    })
      .then(() => {
        setCurrentEmailCode(emailCode);
        setStep(ChangeRecoveryEmailSteps.setEmail);
      })
      .catch(() => {
        setClearConfirmCurrentEmail(true);
        return;
      });
  };

  const handleConfirmEmail = async (emailCode: string) => {
    // In theory these errors should never happen
    if (!newRecoveryEmail) {
      setClearConfirmEmail(true);
      snackbarContext.showSnackbar({
        snackbarId: 'confirm_recovery_email',
        icon: 'warning',
        text: t('passcode.must_enter_email_again'),
      });
      return;
    }
    if (!enteredPasscode && !currentEmailCode) {
      setClearConfirmEmail(true);
      snackbarContext.showSnackbar({
        snackbarId: 'confirm_recovery_email',
        icon: 'warning',
        text: t('common.something_went_wrong'),
      });
      return;
    }

    API.RecoveryEmail.changeRecoveryEmail({
      currentEmailCode: currentEmailCode,
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
        window.history.back();
        return;
      })
      .catch(() => {
        setClearConfirmEmail(true);
        return;
      });
  };

  const handleBack = () => {
    switch (step) {
      case ChangeRecoveryEmailSteps.confirmCurrentEmail:
        dispatch(
          updatePasscode({
            newRecoveryEmail: undefined,
          }),
        );
        window.history.back();
        return;
      case ChangeRecoveryEmailSteps.setEmail:
        dispatch(
          updatePasscode({
            newPasscode: undefined,
            newPasscodeType: undefined,
            newRecoveryEmail: undefined,
          }),
        );
        // go back when using passcode and email-code
        // don't have user go back just to enter new email-code again
        window.history.back();
        return;
      case ChangeRecoveryEmailSteps.confirmEmail:
        setStep(ChangeRecoveryEmailSteps.setEmail);
        return;
    }
  };

  const handleOnClearConfirmEmail = () => {
    setClearConfirmEmail(false);
  };

  const handleOnClearConfirmCurrentEmail = () => {
    setClearConfirmCurrentEmail(false);
  };

  useEffect(() => {
    requestEmailCode();
  }, []);

  return (
    <Page>
      <BackButton onClick={handleBack} />
      {step === ChangeRecoveryEmailSteps.confirmCurrentEmail && (
        <EmailCode
          email={recoveryEmail}
          reason={EmailCodeReasonEnum.ChangeEmail}
          onComplete={handleConfirmCurrentEmail}
          onClear={
            clearConfirmCurrentEmail
              ? handleOnClearConfirmCurrentEmail
              : undefined
          }
        />
      )}
      {step === ChangeRecoveryEmailSteps.setEmail && (
        <RecoveryEmail onComplete={handleSetEmail} />
      )}
      {step === ChangeRecoveryEmailSteps.confirmEmail && (
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

export default ChangeRecoveryEmail;
