import classNames from 'classnames';
import { ReactNode } from 'react';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CurrencyCell.module.scss';

interface CurrencyCellProps<T extends string> {
  checked?: boolean;
  onChange?: (value: T) => void;
  value: T;
  name: string;
  children?: ReactNode;
}

function CurrencyCell<T extends string>({
  children,
  checked,
  onChange,
  value,
  name,
}: CurrencyCellProps<T>) {
  const { themeClassName } = useTheme(styles);

  return (
    <Tappable
      Component="label"
      rootClassName={classNames(
        themeClassName('root'),
        checked && styles.checked,
      )}
    >
      <input
        type="radio"
        name={name}
        onChange={(e) => onChange && onChange(e.target.value as T)}
        value={value}
        checked={checked}
      />
      <div className={themeClassName('container')}>{children}</div>
    </Tappable>
  );
}

export default CurrencyCell;
