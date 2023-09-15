import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MainButton } from 'components/MainButton/MainButton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { isValidEmail } from 'utils/common/sanitize';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './RecoveryEmail.module.scss';
import { ReactComponent as Monkey } from './monkey.svg';

export enum CreateRecoveryEmailIntents {
  scw = 'scw',
}

export interface RecoveryEmailProps {
  onComplete: (text: string) => void;
  error?: string;
  intent?: CreateRecoveryEmailIntents;
}

const RecoveryEmail: React.FC<RecoveryEmailProps> = ({
  onComplete,
  error,
  intent,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);

  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryEmail(e.target.value);
  };

  const handleConfirmEmail = () => {
    if (isValidEmail(recoveryEmail)) {
      onComplete(recoveryEmail);
    } else {
      snackbarContext.showSnackbar({
        snackbarId: 'recovery_email',
        icon: 'warning',
        text: t('recovery_email.please_enter_valid_email'),
      });
    }
  };

  const getTitle = () => {
    if (intent === CreateRecoveryEmailIntents.scw) {
      return t('recovery_email.add_recovery_email');
    }
    return t('recovery_email.recovery_email');
  };

  const getDescription = () => {
    if (intent === CreateRecoveryEmailIntents.scw) {
      return t('recovery_email.email_can_restore_ton_space');
    }
    return t('recovery_email.email_can_reset_passcode');
  };

  return (
    <div className={themeClassName('root')}>
      <label htmlFor="recoveryEmailInput" className={themeClassName('top')}>
        <Monkey className={themeClassName('topAvatar')} />
        <h1 className={themeClassName('title')}>{getTitle()}</h1>
        <p className={themeClassName('text')}>{getDescription()}</p>
        <input
          id="tgcrawl"
          type="email"
          onChange={handleUpdateEmail}
          onBlur={(e) => {
            e.preventDefault();
            return;
          }}
          placeholder={t('recovery_email.your_email_address')}
          value={recoveryEmail}
          className={themeClassName('textInput')}
          autoFocus
        />
        {error && <div className={themeClassName('error')}>{error}</div>}
      </label>
      <MainButton
        text={t('recovery_email.confirm_email')}
        onClick={handleConfirmEmail}
      />
    </div>
  );
};

export default RecoveryEmail;
