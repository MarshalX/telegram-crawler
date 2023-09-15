import { FC, HTMLProps, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ClearAppleSVG } from 'images/clear_apple.svg';
import { ReactComponent as ClearMaterialSVG } from 'images/clear_material.svg';
import { ReactComponent as SearchAppleSVG } from 'images/search_apple.svg';

import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onClear?: VoidFunction;
}

export const SearchInput: FC<
  SearchInputProps & HTMLProps<HTMLInputElement>
> = ({ value, onClear, ...props }) => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={themeClassName('root')}>
      {theme === 'apple' && (
        <SearchAppleSVG className={themeClassName('searchIcon')} />
      )}
      <input
        ref={ref}
        className={themeClassName('input')}
        placeholder={t('common.search')}
        value={value}
        autoComplete="off"
        {...props}
      />
      {value.length > 0 && (
        <button
          type="button"
          className={themeClassName('clearButton')}
          onClick={() => {
            ref.current?.focus();
            onClear && onClear();
          }}
        >
          {theme === 'apple' ? <ClearAppleSVG /> : <ClearMaterialSVG />}
        </button>
      )}
    </div>
  );
};
