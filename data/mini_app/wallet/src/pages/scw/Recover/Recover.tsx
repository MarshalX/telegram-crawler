import { useBackupSCWAddress } from 'query/scw/address';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/wallet-v2';
import { EmailCodeReasonEnum } from 'api/wallet-v2/generated';

import { useAppSelector } from 'store';

import Success from 'pages/scw/Onboarding/components/Success/Success';

import { BackButton } from 'components/BackButton/BackButton';
import EmailCode from 'components/EmailCode/EmailCode';
import Page from 'components/Page/Page';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { recoverMnemonic } from 'utils/scw/recovery';

export enum RecoverSCWSteps {
  confirmEmail = 'confirm-email',
  success = 'success',
}

const RecoverSCW: React.FC = () => {
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);
  const { recoveryEmail } = useAppSelector((state) => state.passcode);
  const backupAddress = useBackupSCWAddress();
  const [step, setStep] = useState(RecoverSCWSteps.confirmEmail);

  const [clearConfirmEmail, setClearConfirmEmail] = useState(false);

  const handleConfirmEmail = async (emailCode: string) => {
    try {
      if (!backupAddress) {
        throw Error('Backup address not found');
      }
      try {
        await API.RecoveryEmail.checkEmailCode({
          emailCode: emailCode,
          reason: EmailCodeReasonEnum.GetRecoveryKey,
        });
      } catch {
        setClearConfirmEmail(true);
        return;
      }
      const recovered = await recoverMnemonic(backupAddress, emailCode);
      if (!recovered) {
        throw Error('Failed to recover mnemonic');
      }
      setStep(RecoverSCWSteps.success);
    } catch {
      snackbarContext.showSnackbar({
        snackbarId: 'passcode.something_went_wrong',
        text: t('common.something_went_wrong'),
        icon: 'warning',
      });
      setClearConfirmEmail(true);
    }
  };

  const handleOnClearConfirmEmail = () => {
    setClearConfirmEmail(false);
  };

  useEffect(() => {
    if (recoveryEmail) {
      API.RecoveryEmail.requestEmailCode({
        email: recoveryEmail,
        reason: EmailCodeReasonEnum.GetRecoveryKey,
      });
    } else {
      snackbarContext.showSnackbar({
        snackbarId: 'passcode.something_went_wrong',
        text: t('common.something_went_wrong'),
        icon: 'warning',
      });
    }
  }, [recoveryEmail]);

  return (
    <Page>
      <BackButton />
      {step === RecoverSCWSteps.confirmEmail && (
        <EmailCode
          email={recoveryEmail}
          reason={EmailCodeReasonEnum.GetRecoveryKey}
          onComplete={handleConfirmEmail}
          onClear={clearConfirmEmail ? handleOnClearConfirmEmail : undefined}
        />
      )}
      {step === RecoverSCWSteps.success && <Success imported={true} />}
    </Page>
  );
};

export default RecoverSCW;
