import classNames from 'classnames';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BackspaceSVG } from 'images/backspace.svg';

import styles from './Keypad.module.scss';

export interface KeypadProps {
  value: string;
  onUpdate: (text: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ value, onUpdate }) => {
  const { themeClassName } = useTheme(styles);

  const updateValue = (digit: string) => {
    const newValue = value + digit;
    onUpdate(newValue);
  };

  const backspaceValue = () => {
    if (value.length === 0) return;
    const newValue = value.substring(0, value.length - 1);
    onUpdate(newValue);
  };

  return (
    <div className={themeClassName('root')}>
      <div className={styles.keypadRow}>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('1');
          }}
        >
          <div className={themeClassName('keypadNumber')}>1</div>
          <div className={themeClassName('keypadLetters')}>&nbsp;</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('2');
          }}
        >
          <div className={themeClassName('keypadNumber')}>2</div>
          <div className={themeClassName('keypadLetters')}>ABC</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('3');
          }}
        >
          <div className={themeClassName('keypadNumber')}>3</div>
          <div className={themeClassName('keypadLetters')}>DEF</div>
        </button>
      </div>
      <div className={styles.keypadRow}>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('4');
          }}
        >
          <div className={themeClassName('keypadNumber')}>4</div>
          <div className={themeClassName('keypadLetters')}>GHI</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('5');
          }}
        >
          <div className={themeClassName('keypadNumber')}>5</div>
          <div className={themeClassName('keypadLetters')}>JKL</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('6');
          }}
        >
          <div className={themeClassName('keypadNumber')}>6</div>
          <div className={themeClassName('keypadLetters')}>MNO</div>
        </button>
      </div>
      <div className={styles.keypadRow}>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('7');
          }}
        >
          <div className={themeClassName('keypadNumber')}>7</div>
          <div className={themeClassName('keypadLetters')}>PQRS</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('8');
          }}
        >
          <div className={themeClassName('keypadNumber')}>8</div>
          <div className={themeClassName('keypadLetters')}>TUV</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('9');
          }}
        >
          <div className={themeClassName('keypadNumber')}>9</div>
          <div className={themeClassName('keypadLetters')}>WXYZ</div>
        </button>
      </div>
      <div className={styles.keypadRow}>
        <button
          className={classNames(
            themeClassName('keypadButton'),
            styles.invisible,
          )}
        >
          <div className={themeClassName('keypadNumber')}>&nbsp;</div>
          <div className={themeClassName('keypadLetters')}>&nbsp;</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            updateValue('0');
          }}
        >
          <div className={themeClassName('keypadNumber')}>0</div>
          <div className={themeClassName('keypadLetters')}>+</div>
        </button>
        <button
          className={themeClassName('keypadButton')}
          onClick={() => {
            backspaceValue();
          }}
        >
          <BackspaceSVG className={themeClassName('keypadSVG')} />
        </button>
      </div>
    </div>
  );
};

export default Keypad;
