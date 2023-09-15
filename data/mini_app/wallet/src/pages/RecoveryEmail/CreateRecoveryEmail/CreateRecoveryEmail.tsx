import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import API from 'api/wallet-v2';
import { EmailCodeReasonEnum } from 'api/wallet-v2/generated';

import routePaths from 'routePaths';

import { useAppDispatch, useAppSelector } from 'store';

import { updatePasscode } from 'reducers/passcode/passcodeSlice';
import { updateSCW } from 'reducers/scw/scwSlice';

import { BackButton } from 'components/BackButton/BackButton';
import EmailCode from 'components/EmailCode/EmailCode';
import Page from 'components/Page/Page';
import RecoveryEmail from 'components/RecoveryEmail/RecoveryEmail';
import { CreateRecoveryEmailIntents } from 'components/RecoveryEmail/RecoveryEmail';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { backupMnemonic } from 'utils/scw/recovery';

export enum CreateRecoveryEmailSteps {
  setEmail = 'set-email',
  confirmEmail = 'confirm-email',
}

const ChangeRecoveryEmail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);
  const { newRecoveryEmail } = useAppSelector((state) => state.passcode);
  const [step, setStep] = useState(CreateRecoveryEmailSteps.setEmail);
  const [searchParams] = useSearchParams();
  const searchIntent = searchParams.get('intent');
  const intent =
    searchIntent && searchIntent in CreateRecoveryEmailIntents
      ? (searchIntent as CreateRecoveryEmailIntents)
      : undefined;
  const { raw, mnemonic } = useAppSelector((store) => store.scw);

  const [clearConfirmEmail, setClearConfirmEmail] = useState(false);

  const handleSetEmail = async (callbackRecoveryEmail: string) => {
    try {
      await API.RecoveryEmail.requestEmailCode({
        email: callbackRecoveryEmail,
        reason: EmailCodeReasonEnum.ConfirmEmail,
      });
      dispatch(updatePasscode({ newRecoveryEmail: callbackRecoveryEmail }));
      setStep(CreateRecoveryEmailSteps.confirmEmail);
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
    if (!newRecoveryEmail) {
      setClearConfirmEmail(true);
      snackbarContext.showSnackbar({
        snackbarId: 'confirm_recovery_email',
        icon: 'warning',
        text: t('passcode.must_enter_email_again'),
      });
      return;
    }
    API.RecoveryEmail.createRecoveryEmail({
      email: newRecoveryEmail,
      emailCode: emailCode,
    })
      .then(() => {
        dispatch(
          updatePasscode({
            recoveryEmail: newRecoveryEmail,
          }),
        );
        if (intent === CreateRecoveryEmailIntents.scw) {
          backupMnemonic(raw, mnemonic)
            .then((success) => {
              if (!success) {
                throw new Error('Failed to backup');
              }
              dispatch(
                updateSCW({ setupComplete: true, recoveryComplete: true }),
              );
              navigate(routePaths.SCW_BACKUP_SUCCESS, { replace: true });
            })
            .catch(() => {
              snackbarContext.showSnackbar({
                snackbarId: 'passcode.something_went_wrong',
                text: t('common.something_went_wrong'),
                icon: 'warning',
              });
            });
        } else {
          navigate(routePaths.SETTINGS, { replace: true });
        }
        return;
      })
      .catch(() => {
        setClearConfirmEmail(true);
        return;
      });
  };

  const handleBack = () => {
    switch (step) {
      case CreateRecoveryEmailSteps.setEmail:
        dispatch(
          updatePasscode({
            newRecoveryEmail: undefined,
          }),
        );
        window.history.back();
        return;
      case CreateRecoveryEmailSteps.confirmEmail:
        setStep(CreateRecoveryEmailSteps.setEmail);
        return;
    }
  };

  const handleOnClearConfirmEmail = () => {
    setClearConfirmEmail(false);
  };

  return (
    <Page>
      <BackButton onClick={handleBack} />
      {step === CreateRecoveryEmailSteps.setEmail && (
        <RecoveryEmail onComplete={handleSetEmail} intent={intent} />
      )}
      {step === CreateRecoveryEmailSteps.confirmEmail && (
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
