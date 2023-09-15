import cx from 'classnames';
import cn from 'classnames';
import {
  FormEventHandler,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Amount, AmountProps } from 'containers/common/Amount/Amount';

import { NumericInput } from 'components/NumericInput';
import Tappable from 'components/Tappable/Tappable';
import { Text } from 'components/Text/Text';

import { useDidUpdate } from 'hooks/utils/useDidUpdate';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Form.module.scss';

interface FormProps extends Omit<AmountProps, 'value'> {
  onSubmit?: VoidFunction;
  onChange?: (value: string) => void;
  onFocus?: VoidFunction;
  autoFocus?: boolean;
  onInput?: FormEventHandler;
  value?: string;
  hasError?: boolean;
  id?: string;
  formRef?: FormRef;
  isDisabled?: boolean;
  presets?: {
    label: string;
    value: number;
  }[];
  'data-testid'?: string;
}

export type FormRefCurrentProps = {
  shake: () => void;
};

type FormRef = MutableRefObject<FormRefCurrentProps | null>;

const Form = forwardRef<HTMLInputElement, FormProps>(
  (
    {
      onInput,
      onSubmit,
      top,
      onChange,
      onFocus,
      autoFocus,
      after,
      hasError,
      bottom,
      value,
      currency,
      id = 'input',
      formRef,
      className,
      isDisabled,
      align,
      refreshing,
      fill,
      presets,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { themeClassName } = useTheme(styles);
    const [doShake, setDoShake] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (formRef) {
        formRef.current = {
          shake,
        };
      }
      return () => {
        if (formRef) {
          formRef.current = null;
        }
      };
      // eslint-disable-next-line
    }, [formRef]);

    const onInputChange = useCallback(
      (event) => {
        onChange && onChange(event.target.value);
      },
      [onChange],
    );

    const shake = () => {
      setDoShake(true);
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    };

    useDidUpdate(() => {
      if (!hasError && doShake) {
        setDoShake(false);
      }
    }, [hasError, doShake]);

    const handleFocus = useCallback(() => {
      if (autoFocus) {
        window.Telegram.WebApp.expand();
      }

      onFocus && onFocus();
    }, [autoFocus, onFocus]);

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit && onSubmit();
        }}
        className={cx(
          { [styles.error]: hasError, [styles.shake]: doShake },
          className,
        )}
      >
        <Amount
          fill={fill}
          appearance={hasError ? 'error' : 'default'}
          align={align}
          top={
            <label htmlFor={id} className={themeClassName('top')}>
              {top}
            </label>
          }
          after={after}
          value={
            <>
              <NumericInput
                data-testid={dataTestId}
                id={id}
                autoComplete="off"
                inputMode="decimal"
                onChange={onInputChange}
                onFocus={handleFocus}
                autoFocus={autoFocus}
                onInput={onInput}
                ref={(_ref) => {
                  // TypeScript is not friendly with ref assignment
                  // eslint-disable-next-line
                  // @ts-ignore
                  ref.current = _ref;

                  inputRef.current = _ref;
                }}
                value={value}
                className={themeClassName('input')}
              />
              <div className={themeClassName('hiddenValue')}>{value || 0}</div>
            </>
          }
          currency={currency}
          bottom={<div className={styles.bottom}>{bottom}</div>}
          refreshing={refreshing}
          className={cn(presets && styles.amount)}
        />
        <input
          type="submit"
          className={styles.hideSubmitInput}
          disabled={isDisabled}
        />
        {presets && (
          <div className={styles.presets}>
            {presets.map(({ label, value: presetValue }) => (
              <Tappable
                Component="button"
                key={presetValue}
                rootClassName={themeClassName('preset')}
                onClick={() => {
                  inputRef?.current?.focus();
                  onChange && onChange(String(presetValue));
                }}
                tapAreaSpace={[6, 8]}
                type="button"
              >
                <Text
                  apple={{
                    color: 'text',
                    rounded: true,
                    variant: 'subheadline1',
                    weight: 'semibold',
                  }}
                  material={{
                    color: 'text',
                    variant: 'button1',
                  }}
                >
                  {label}
                </Text>
              </Tappable>
            ))}
          </div>
        )}
      </form>
    );
  },
);

export default Form;
