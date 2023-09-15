import * as Sentry from '@sentry/react';
import classNames from 'classnames';
import { useActiveSCWAddress } from 'query/scw/address';
import {
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { mnemonicValidate, mnemonicWordList as wordlists } from 'ton-crypto';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { useAppDispatch } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import AddressDisplay from 'containers/scw/AddressDisplay/AddressDisplay';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';
import { Tooltip } from 'components/Tooltip/Tooltip';

import { shakeAnimation } from 'utils/common/animations';
import { debounceFunc } from 'utils/common/debounce';
import {
  SCWNotificationActions,
  updateAddressNotifications,
} from 'utils/scw/notifications';
import {
  MNEMONIC_LENGTH,
  getFriendlyAddress,
  getWalletFromMnemonic,
} from 'utils/scw/ton';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Mnemonic.module.scss';

function findIndexOfMismatch(str1: string, str2: string) {
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      return i;
    }
  }

  return minLength;
}

const Mnemonic = () => {
  const { t } = useTranslation();
  const { themeClassName, theme } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const scwAddress = useActiveSCWAddress();
  const registeredFriendlyAddress = scwAddress
    ? getFriendlyAddress(scwAddress)
    : undefined;

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [activeInput, setActveInput] = useState<number | null>(null);
  const [inputs, setInputs] = useState<string[]>(
    Array.from({ length: MNEMONIC_LENGTH }, () => ''),
  );
  const inputRef = useRef<string[]>(inputs);
  inputRef.current = inputs;
  const [progress, setProgress] = useState(false);

  const isDisabled = useMemo(() => {
    return inputs.some((input) => input.length === 0);
  }, [inputs]);

  const updatePrompts = (search: string) => {
    const result: string[] = [];

    if (search) {
      for (const word of wordlists) {
        if (word.charCodeAt(0) > search.charCodeAt(0) || result.length >= 3) {
          break;
        }

        const partOfWord = word.substring(0, search.length);

        if (partOfWord === search && search !== word) {
          result.push(word);
        }
      }
    }

    setPrompts(result);
  };

  const debounceUpdatePrompts = useCallback(
    debounceFunc(updatePrompts, 500),
    [],
  );

  const handleValidateAndShake = (index: number) => {
    const latestValue = inputRef.current[index];
    // If input is not on wordlist, shake with haptic
    if (latestValue !== '' && !wordlists.includes(latestValue)) {
      inputsRef.current[index].animate(shakeAnimation, 500);
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
  };

  const handleChange = (newValue: string, index: number) => {
    const valueWords = newValue
      .replace(/\n/g, ' ')
      .replace(/ {2}/g, ' ')
      .trim()
      .split(' ');
    const endIndex = index + valueWords.length;
    const newWords = [
      ...inputs.slice(0, index),
      ...valueWords,
      ...inputs.slice(endIndex),
    ].slice(0, MNEMONIC_LENGTH);
    setInputs(newWords);
    if (valueWords.length > 1 && endIndex < MNEMONIC_LENGTH) {
      inputsRef.current[endIndex].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Enter') {
      if (index + 1 <= inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }

    if (event.key === 'Backspace') {
      if (index - 1 >= 0 && !inputs[index]) {
        event.preventDefault();
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setProgress(true);
      const isValid = await mnemonicValidate(inputs);
      if (!isValid) {
        snackbarContext.showSnackbar({
          snackbarId: 'scw',
          icon: 'warning',
          text: t('scw.import.mnemonic.invalid_recovery_phrase'),
        });
        setProgress(false);
        return;
      }

      const walletInfo = await getWalletFromMnemonic(inputs);

      if (
        registeredFriendlyAddress &&
        walletInfo.address !== registeredFriendlyAddress
      ) {
        window.Telegram.WebApp.showPopup({
          message: t('scw.onboarding.multiple_ton_space_text'),
          buttons: [
            {
              type: 'ok',
            },
          ],
        });
        setProgress(false);
        return;
      }

      updateAddressNotifications(
        walletInfo.raw,
        SCWNotificationActions.register,
      );

      dispatch(
        updateSCW({
          mnemonic: inputs,
          privateKey: walletInfo.privateKey,
          address: walletInfo.address,
          raw: walletInfo.raw,
          publicKey: walletInfo.publicKey,
          walletClass: walletInfo.walletClass,
          setupComplete: true,
        }),
      );

      setProgress(false);
      navigate(routePaths.SCW_MAIN, { replace: true });
    } catch (error) {
      snackbarContext.showSnackbar({
        snackbarId: 'scw',
        icon: 'warning',
        text: t('scw.import.mnemonic.invalid_recovery_phrase'),
      });
      Sentry.captureException(error);
      setProgress(false);
    }
  };

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.import.mnemonic.title')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', color: 'hint', weight: 'regular' }}
        >
          {t('scw.import.mnemonic.description')}
        </Text>
        {!!registeredFriendlyAddress && (
          <AddressDisplay address={registeredFriendlyAddress} />
        )}
        <section className={themeClassName('list')}>
          {inputs.map((value, index) => {
            return (
              <Tooltip
                key={index}
                arrow
                placement={inputs.length - 1 === index ? 'top' : 'bottom'}
                open={activeInput === index && prompts.length > 0}
              >
                <Tooltip.Trigger>
                  <div
                    className={classNames(
                      styles.inputContainer,
                      activeInput === index && styles.active,
                    )}
                  >
                    <Text
                      apple={{
                        variant: 'body',
                        color: 'text',
                        weight: 'regular',
                      }}
                      material={{
                        variant: 'body',
                        color: 'text',
                        weight: 'regular',
                      }}
                      className={styles.number}
                    >
                      {`${index + 1}${theme === 'apple' ? '.' : ':'}`}
                    </Text>
                    {/* TODO: change input to Text component */}
                    <input
                      tabIndex={index + 1}
                      className={themeClassName('input')}
                      value={value}
                      autoComplete="off"
                      type="text"
                      spellCheck="false"
                      autoCorrect="off"
                      autoCapitalize="none"
                      autoFocus={index === 0}
                      onFocus={() => {
                        updatePrompts(value);
                        setActveInput(index);
                      }}
                      onBlur={() => {
                        setActveInput(null);
                        // tooltip change happens directly after blur,
                        // shouldn't trigger only on handleChange because
                        // also want shake if user blurs without using tooltip
                        setTimeout(() => {
                          handleValidateAndShake(index);
                        }, 200);
                      }}
                      onChange={(event) => {
                        handleChange(event.target.value, index);
                        debounceUpdatePrompts(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        handleKeyDown(event, index);
                      }}
                      ref={(ref) => {
                        if (inputsRef.current && ref) {
                          inputsRef.current[index] = ref;
                        }
                      }}
                    />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content className={styles.tooltipContent}>
                  {prompts.length > 0 &&
                    prompts.map((word) => {
                      const substringIndex = findIndexOfMismatch(word, value);

                      return (
                        <div
                          key={word}
                          onClick={() => {
                            handleChange(word, index);
                            if (index + 1 <= inputsRef.current.length - 1) {
                              inputsRef.current[index + 1].focus();
                            }
                          }}
                          className={styles.text}
                        >
                          <Text
                            apple={{
                              variant: 'subheadline2',
                              color: 'overlay',
                              weight: 'regular',
                            }}
                            material={{
                              variant: 'subtitle1',
                              color: 'overlay',
                            }}
                          >
                            {word.substring(0, substringIndex)}
                          </Text>
                          <Text
                            apple={{
                              variant: 'subheadline2',
                              color: 'overlay',
                              weight: 'regular',
                            }}
                            material={{
                              variant: 'subtitle1',
                              color: 'overlay',
                            }}
                          >
                            {word.substring(substringIndex, word.length)}
                          </Text>
                        </div>
                      );
                    })}
                </Tooltip.Content>
              </Tooltip>
            );
          })}
        </section>
      </div>
      <MainButton
        data-testid="tgcrawl"
        onClick={handleSubmit}
        disabled={isDisabled}
        color={
          isDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : undefined
        }
        textColor={
          isDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : undefined
        }
        progress={progress}
        text={t('scw.import.mnemonic.button')}
      />
    </Page>
  );
};

export default memo(Mnemonic);
