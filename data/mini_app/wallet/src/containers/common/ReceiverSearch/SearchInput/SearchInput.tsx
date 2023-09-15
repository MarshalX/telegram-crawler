import classNames from 'classnames';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ClearAppleSVG } from 'images/clear_apple.svg';
import { ReactComponent as ClearMaterialSVG } from 'images/clear_material.svg';

import styles from './SearchInput.module.scss';
import { ParsedAddress, parseAddress } from './parseAddress';

interface SearchInputProps {
  onPaste: (address: ParsedAddress) => void;
  onChange: (value: string) => void;
  onSubmit: VoidFunction;
  onBlur: VoidFunction;
  value: string;
  assetCurrency: FrontendCryptoCurrencyEnum;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  onBlur,
  onPaste,
  assetCurrency,
}) => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const { platform, isVersionAtLeast } = window.Telegram.WebApp;
  const canPaste =
    platform &&
    ['ios', 'android', 'macos', 'tdesktop'].includes(platform) &&
    isVersionAtLeast('6.4') &&
    onPaste; // В tdesktop paste работает нестабильно, ждем апдейта от ТГ
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = t(
    `receiver_search.search_placeholder_${assetCurrency}` as const,
  );

  const onClear = () => {
    onChange('');
  };

  return (
    <div
      className={classNames(
        themeClassName('wrapper'),
        window.Telegram.WebApp.platform === 'macos' && styles.macos,
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}
        className={themeClassName('root')}
      >
        <div className={themeClassName('control')}>
          <textarea
            ref={textareaRef}
            autoFocus
            className={themeClassName('textarea')}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onBlur={onBlur}
            onFocus={(e) => {
              // Двигаем каретку в конец введенного значения
              const value = e.target.value;
              e.target.value = '';
              e.target.value = value;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSubmit && onSubmit();
              }
            }}
            autoComplete="off"
          ></textarea>
          <div className={themeClassName('value')}>
            {value ? `${value}\n` : placeholder}
          </div>
        </div>
        {value.length > 0 ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={themeClassName('clear')}
              onClick={() => {
                textareaRef.current?.focus();
                onClear && onClear();
              }}
            >
              {theme === 'apple' ? <ClearAppleSVG /> : <ClearMaterialSVG />}
            </button>
          </div>
        ) : canPaste ? (
          <div className={styles.actions}>
            <button
              className={themeClassName('paste')}
              type="button"
              onClick={() => {
                window.Telegram.WebApp.readTextFromClipboard((text) => {
                  onPaste(parseAddress(text));
                });
              }}
            >
              {t('receiver_search.paste')}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
