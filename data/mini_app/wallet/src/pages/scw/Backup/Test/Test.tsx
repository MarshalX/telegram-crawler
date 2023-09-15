import * as Sentry from '@sentry/react';
import classNames from 'classnames';
import {
  Suspense,
  lazy,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { mnemonicWordList as wordlists } from 'ton-crypto';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { useAppDispatch, useAppSelector } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

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
import { MNEMONIC_LENGTH } from 'utils/scw/ton';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as TeacherSVG } from 'images/teacher.svg';

import styles from './Test.module.scss';

const TeacherAnimation = lazy(
  () => import('components/animations/TeacherAnimation/TeacherAnimation'),
);

function findIndexOfMismatch(str1: string, str2: string) {
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      return i;
    }
  }

  return minLength;
}

const TEST_LENGTH = 3;

const generateTestIndicies = () => {
  const indicies: number[] = [];
  while (indicies.length < TEST_LENGTH) {
    const randomIndex = Math.floor(Math.random() * MNEMONIC_LENGTH) + 1;

    // Ensure that the random index is not already in the list
    if (!indicies.includes(randomIndex)) {
      indicies.push(randomIndex);
    }
  }
  return indicies.sort((a, b) => a - b);
};

const BackupTest = () => {
  const { t } = useTranslation();
  const { themeClassName, theme } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [activeInput, setActveInput] = useState<number | null>(null);
  const { mnemonic, raw } = useAppSelector((store) => store.scw);
  const [testIndicies] = useState(generateTestIndicies());
  const [inputs, setInputs] = useState<string[]>(
    Array.from({ length: testIndicies.length }, () => ''),
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
    ].slice(0, testIndicies.length);
    setInputs(newWords);
    if (valueWords.length > 1 && endIndex < testIndicies.length) {
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
      const isValid = inputs.every((word) => wordlists.includes(word));
      if (!isValid) {
        snackbarContext.showSnackbar({
          snackbarId: 'scw',
          icon: 'warning',
          text: t('scw.import.mnemonic.invalid_recovery_phrase'),
        });
        setProgress(false);
        return;
      }

      const matches = testIndicies.every(
        (testIndex, index) => inputs[index] === mnemonic[testIndex - 1],
      );
      if (!matches) {
        snackbarContext.showSnackbar({
          snackbarId: 'scw',
          icon: 'warning',
          text: t('scw.backup.test.words_do_not_match'),
        });
        setProgress(false);
        return;
      }

      updateAddressNotifications(raw, SCWNotificationActions.register);
      dispatch(
        updateSCW({
          setupComplete: true,
        }),
      );

      setProgress(false);
      navigate(routePaths.SCW_BACKUP_TEST_SUCCESS, { replace: true });
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
      <BackButton
        onClick={() =>
          navigate(routePaths.SCW_BACKUP_CHOOSE_METHOD, { replace: true })
        }
      />
      <div className={themeClassName('root')}>
        <Suspense fallback={<TeacherSVG className={themeClassName('media')} />}>
          <TeacherAnimation className={themeClassName('media')} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.backup.test.title')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', color: 'hint', weight: 'regular' }}
          className={styles.description}
        >
          {t('scw.backup.test.please_enter_words', {
            number1: testIndicies[0],
            number2: testIndicies[1],
            number3: testIndicies[2],
          })}
        </Text>
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
                      {`${testIndicies[index]}${theme === 'apple' ? '.' : ':'}`}
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

export default memo(BackupTest);
