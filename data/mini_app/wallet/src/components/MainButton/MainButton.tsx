import { FC, useEffect } from 'react';

import styles from './MainButton.module.scss';

export interface MainButtonProps {
  disabled?: boolean;
  progress?: boolean;
  color?: string;
  textColor?: string;
  onClick?: VoidFunction;
  text: string;
  hideOnUnmount?: boolean;
  'data-testid'?: string;
  type?: 'button' | 'submit';
}

const mainButton = window.Telegram.WebApp.MainButton;

// eslint-disable-next-line
const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

let isButtonShown = false;

export const MainButton: FC<MainButtonProps> = ({
  disabled = false,
  color = button_color,
  textColor = button_text_color,
  text,
  onClick,
  progress = false,
  'data-testid': dataTestId,
  type = 'button',
}) => {
  useEffect(() => {
    mainButton.setText(text);
    mainButton.show();
    isButtonShown = true;
    return () => {
      isButtonShown = false;
      // Мы ждем 10мс на случай, если на следующем экране тоже нужен MainButton.
      // Если через это время isButtonShown не стал true, значит следующему экрану кнопка не нужна и мы её прячем
      setTimeout(() => {
        if (!isButtonShown) {
          mainButton.hide();
        }
      }, 10);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (progress) {
      mainButton.showProgress();
      mainButton.disable();
    } else {
      mainButton.hideProgress();
    }

    if (disabled || progress) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }

    return () => {
      mainButton.hideProgress();
      mainButton.enable();
    };
  }, [disabled, progress]);

  useEffect(() => {
    mainButton.setParams({ color, text_color: textColor });
  }, [color, textColor]);

  useEffect(() => {
    mainButton.setText(text);
  }, [text]);

  useEffect(() => {
    if (onClick) {
      window.Telegram.WebApp.MainButton.onClick(onClick);
      return () => {
        window.Telegram.WebApp.MainButton.offClick(onClick);
      };
    }
  }, [onClick]);

  if (process.env.NODE_ENV === 'test') {
    return (
      <button
        data-testid={dataTestId}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    );
  }

  if (type === 'submit') {
    return (
      <input
        type="submit"
        className={styles.hideSubmitInput}
        tabIndex={-1}
        disabled={disabled || progress}
      />
    );
  }

  return null;
};
