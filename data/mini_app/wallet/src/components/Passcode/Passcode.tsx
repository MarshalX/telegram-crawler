import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PasscodeTypeEnum } from 'api/wallet-v2/generated';

import PasscodeDots from 'components/PasscodeDots/PasscodeDots';
import { Text } from 'components/Text/Text';

import { usePreventContentHideUnderKeyboard } from 'hooks/common/ReceiverSearch/usePreventContentHideUnderKeyboard';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Passcode.module.scss';
import { ReactComponent as SecretMonkey } from './secret_monkey.svg';

export interface PassCodeProps {
  title: string;
  onComplete: (passcode: string, passcodeOption: PasscodeTypeEnum) => void;
  showOptions?: boolean;
  error?: string;
  onClear?: () => void;
  defaultPasscodeType?: PasscodeTypeEnum;
}

const Passcode: React.FC<PassCodeProps> = ({
  title,
  onComplete,
  showOptions,
  error,
  onClear,
  defaultPasscodeType = PasscodeTypeEnum._4Digit,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const { contentStyle } = usePreventContentHideUnderKeyboard();

  const [formPasscode, setFormPasscode] = useState('');
  const [formPasscodeType, setFormPasscodeType] = useState(defaultPasscodeType);
  const [shake, setShake] = useState(false);
  const customStyle = {
    display: 'flex',
    'flex-direction': 'column',
    height: contentStyle.height === 'initial' ? 'inherit' : contentStyle.height,
    overflowY: contentStyle.overflowY,
  };

  const passcodeMaxLength =
    formPasscodeType === PasscodeTypeEnum._6Digit ? 6 : 4;

  useEffect(() => {
    // trigger resize incase virtual keyboard already open
    if (window.visualViewport) {
      window.visualViewport.dispatchEvent(new Event('resize'));
    }
  }, []);

  useEffect(() => {
    if (onClear) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setFormPasscode('');
        setFormPasscodeType(defaultPasscodeType);
        onClear();
      }, 1000);
    }
  }, [onClear]);

  const handleUpdatePasscode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventPasscode = e.target.value;
    if (eventPasscode.length <= passcodeMaxLength) {
      setFormPasscode(eventPasscode);
    }
    if (eventPasscode.length == passcodeMaxLength) {
      onComplete(eventPasscode, formPasscodeType);
    }
  };

  return (
    <div className={themeClassName('root')}>
      <div style={customStyle}>
        <label htmlFor="passCodeInput" className={themeClassName('top')}>
          <SecretMonkey className={themeClassName('topAvatar')} />
          <h1 className={themeClassName('title')}>{title}</h1>
          <p className={themeClassName('text')}>
            {t('passcode.enter_passcode', {
              passcodeLength: passcodeMaxLength,
            })}
          </p>
          <PasscodeDots
            passcodeLength={formPasscode.length}
            passcodeMaxLength={passcodeMaxLength}
            shake={shake}
          />
          {error && <div className={themeClassName('error')}>{error}</div>}
          <input
            id="tgcrawl"
            type="number"
            pattern="[0-9]*"
            onChange={handleUpdatePasscode}
            onBlur={(e) => {
              e.preventDefault();
              return;
            }}
            value={formPasscode}
            autoFocus
            className={styles.passCodeInput}
          />
        </label>
        {showOptions && (
          <div className={themeClassName('bottom')}>
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
                window.Telegram.WebApp.showPopup(
                  {
                    message: t('passcode.select_passcode_type'),
                    buttons: [
                      {
                        id: PasscodeTypeEnum._4Digit,
                        text: t('passcode.4_digit_code'),
                      },
                      {
                        id: PasscodeTypeEnum._6Digit,
                        text: t('passcode.6_digit_code'),
                      },
                    ],
                  },
                  (id: string) => {
                    const option = Object.entries(PasscodeTypeEnum).find(
                      ([, value]) => value === id,
                    );
                    if (!option) return;
                    setFormPasscodeType(option[1]);
                  },
                );
              }}
            >
              {t('passcode.passcode_options')}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Passcode;
