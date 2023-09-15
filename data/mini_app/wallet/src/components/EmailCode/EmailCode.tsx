import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { Trans, useTranslation } from 'react-i18next';

import API from 'api/wallet-v2';
import { EmailCodeReasonEnum } from 'api/wallet-v2/generated';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppSelector } from 'store';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { censorEmail } from 'utils/common/sanitize';

import { usePreventContentHideUnderKeyboard } from 'hooks/common/ReceiverSearch/usePreventContentHideUnderKeyboard';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as MailboxSVG } from 'images/mailbox.svg';

import styles from './EmailCode.module.scss';

const EMAIL_TIMEOUT_SEC = 59;
const EMAIL_TIMEOUT_MS = EMAIL_TIMEOUT_SEC * 1000;

export interface EmailCodeProps {
  reason: EmailCodeReasonEnum;
  email?: string;
  onComplete: (emailCode: string) => void;
  onClear?: () => void;
}

const EmailCode: React.FC<EmailCodeProps> = ({
  reason,
  email,
  onComplete,
  onClear,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);
  const { contentStyle } = usePreventContentHideUnderKeyboard();
  const { recoveryEmail } = useAppSelector((state) => state.passcode);

  const digits: React.MutableRefObject<HTMLInputElement | null>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [emailCode, setEmailCode] = useState('');
  const [highlightRed, setHighlightRed] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdownEnd, setCountdownEnd] = useState(
    Date.now() + EMAIL_TIMEOUT_MS,
  );
  const [countdownSeconds, setCountdownSeconds] = useState(EMAIL_TIMEOUT_SEC);
  const displayMinutes = Math.floor(countdownSeconds / 60);
  const displaySeconds = String(countdownSeconds % 60).padStart(2, '0');
  const isResettingPasscode = reason === EmailCodeReasonEnum.ChangePasscode;

  const customStyle = {
    display: 'flex',
    'flex-direction': 'column',
    height: contentStyle.height === 'initial' ? 'inherit' : contentStyle.height,
    overflowY: contentStyle.overflowY,
  };

  // send another email to user with code
  const handleResendCode = () => {
    if (!email) {
      // just in case, in theory this should not occur
      snackbarContext.showSnackbar({
        snackbarId: 'email_code',
        icon: 'warning',
        text: t('recovery_email.must_enter_email_again'),
        action: (
          <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact_support')}</a>
        ),
        actionPosition: 'bottom',
      });
      return;
    }
    API.RecoveryEmail.requestEmailCode({ email, reason });
  };

  const focusOnIndex = (index: number) => {
    const nextRef = digits[index];
    if (nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (value.length === 1) {
      if (value in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
        // append digit
        const newEmailCode = emailCode.substring(0, index) + value;

        // prevent retyping last cell without delete
        if (emailCode.length !== newEmailCode.length) {
          setEmailCode(newEmailCode);
          // submit when finishing last digit
          if (index === digits.length - 1) {
            onComplete(newEmailCode);
          }
        }
        // move forwards to next cell
        if (index < digits.length) {
          focusOnIndex(index + 1);
        }
      }
    } else if (value.length > 1) {
      if (/^\d+$/.test(value)) {
        const trimmedValue = value.substring(0, digits.length);
        setEmailCode(trimmedValue);
        focusOnIndex(trimmedValue.length);
        if (trimmedValue.length === digits.length) {
          onComplete(trimmedValue);
        }
      } else {
        snackbarContext.showSnackbar({
          snackbarId: 'email_code',
          icon: 'warning',
          text: t('recovery_email.pasted_invalid_code', {
            code: value,
          }),
        });
      }
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace') {
      // backspace on empty cell, move backwards
      if (emailCode.length === index) {
        if (index > 0) {
          focusOnIndex(index - 1);
        }
      } else {
        // backspace on non-empty cell, empty cell and keep index
        setEmailCode(emailCode.substring(0, index));
        focusOnIndex(index);
      }
    }
  };

  const handleFocus = (index: number) => {
    const trimmedEmailCode = emailCode.trim();

    // Clear code after focused cell
    if (trimmedEmailCode.length > index) {
      setEmailCode(trimmedEmailCode.substring(0, index));
    }
  };

  const handleClick = (index: number) => {
    // Focus on last cell before first blank, instead of clicked cell
    if (emailCode.length < index) {
      focusOnIndex(emailCode.length);
    }
  };

  useEffect(() => {
    // trigger resize incase virtual keyboard already open
    if (window.visualViewport) {
      window.visualViewport.dispatchEvent(new Event('resize'));
    }
  }, []);

  useEffect(() => {
    if (onClear) {
      setHighlightRed(true);
      setTimeout(() => {
        setHighlightRed(false);
        focusOnIndex(0);
        setEmailCode('');
        onClear();
      }, 1000);
    }
  }, [onClear]);

  return (
    <div className={themeClassName('root')}>
      <div style={customStyle}>
        <div className={themeClassName('top')}>
          <div className={themeClassName('topAvatar')}>
            <MailboxSVG className={styles.inboxIcon} />
          </div>
          <h1 className={themeClassName('title')}>
            {t(
              isResettingPasscode
                ? 'recovery_email.check_your_email'
                : 'recovery_email.email_code',
            )}
          </h1>
          <p className={themeClassName('text')}>
            {isResettingPasscode ? (
              <Trans
                i18nKey="recovery_email.for_recovery_check_email"
                t={t}
                components={[<b key="highlight" />]}
                values={{
                  email: censorEmail(recoveryEmail || ''),
                }}
              />
            ) : (
              t('recovery_email.check_email_for_code')
            )}
          </p>
          <div className={styles.digitContainer}>
            {digits.map((ref, index) => (
              <input
                key={index}
                inputMode="numeric"
                className={classNames(themeClassName('digitInput'), {
                  [styles.errored]: highlightRed,
                })}
                ref={ref}
                onKeyDown={(event) => {
                  handleKeyPress(event, index);
                }}
                onChange={(event) => {
                  handleChange(event.target.value, index);
                }}
                value={emailCode.length > index ? emailCode[index] : ''}
                onFocus={() => {
                  handleFocus(index);
                }}
                onClick={() => {
                  handleClick(index);
                }}
                autoFocus={index === 0 && emailCode.length === 0}
              />
            ))}
          </div>
          {/* Countdown used outside of MainButton because MainButton only
              accepts text and not component
          */}
          <Countdown
            key={countdownEnd}
            date={countdownEnd}
            onComplete={() => {
              setCanResend(true);
            }}
            onTick={() => {
              setCountdownSeconds(countdownSeconds - 1);
            }}
            renderer={() => ''}
          />
        </div>
        <div className={themeClassName('bottom')}>
          {isResettingPasscode && (
            <div className={styles.supportLink}>
              <Text
                apple={{
                  variant: 'body',
                  weight: 'regular',
                  color: 'link',
                }}
                material={{
                  variant: 'body',
                  weight: 'regular',
                  color: 'link',
                }}
                onClick={() => {
                  window.Telegram.WebApp.openTelegramLink(
                    WALLET_SUPPORT_BOT_LINK,
                  );
                }}
              >
                {t('recovery_email.cant_access_your_email')}
              </Text>
            </div>
          )}
          <Text
            apple={{
              variant: 'body',
              weight: 'regular',
              color: canResend ? 'link' : 'hint',
            }}
            material={{
              variant: 'body',
              weight: 'regular',
              color: canResend ? 'link' : 'hint',
            }}
            onClick={() => {
              if (canResend) {
                setCanResend(false);
                setCountdownEnd(Date.now() + EMAIL_TIMEOUT_MS);
                setCountdownSeconds(EMAIL_TIMEOUT_SEC);
                handleResendCode();
              }
            }}
          >
            {canResend && t('recovery_email.resend_code')}
            {!canResend &&
              t('recovery_email.request_another_code', {
                timeRemaining: `${displayMinutes}:${displaySeconds}`,
              })}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default EmailCode;
