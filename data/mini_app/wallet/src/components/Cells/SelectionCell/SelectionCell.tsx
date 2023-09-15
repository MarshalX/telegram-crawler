import classnames from 'classnames/bind';
import { CSSProperties, ChangeEvent, ReactNode } from 'react';

import { Cell } from 'components/Cells';
import { Checkmark } from 'components/Checkmark/Checkmark';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './SelectionCell.module.scss';

interface SelectionCellProps<T> {
  value: T;
  description?: ReactNode;
  onChange: (value: T, e: ChangeEvent) => void;
  checked: boolean;
  name: string;
  children?: ReactNode;
  mode?: 'checkbox' | 'radio';
  checkmarkPlacement?: 'start' | 'end';
  start?: ReactNode;
  end?: ReactNode;
  className?: string;
  'data-testid'?: string;
  style?: CSSProperties;
}

function SelectionCell<T extends string>({
  value,
  children,
  description,
  onChange,
  checked,
  mode = 'radio',
  start,
  end,
  name,
  className,
  style,
  checkmarkPlacement,
  ...restProps
}: SelectionCellProps<T>): JSX.Element {
  const theme = useTheme();

  let resolvedCheckmarkPlacement;

  if (checkmarkPlacement) {
    resolvedCheckmarkPlacement = checkmarkPlacement;
  } else if (theme === 'material' || mode === 'checkbox') {
    resolvedCheckmarkPlacement = 'start';
  } else {
    resolvedCheckmarkPlacement = 'end';
  }

  return (
    <label
      className={classnames(styles.root, className)}
      style={style}
      {...restProps}
    >
      <input
        type={mode}
        name={name}
        value={value}
        onChange={(e) => onChange(value, e)}
        checked={checked}
        className={styles.input}
      />
      <Cell
        tappable
        start={
          resolvedCheckmarkPlacement === 'start' ? (
            <Cell.Part type={mode}>
              <Checkmark mode={mode} checked={checked} />
            </Cell.Part>
          ) : (
            start
          )
        }
        end={
          resolvedCheckmarkPlacement === 'end' ? (
            <Cell.Part type={mode}>
              <Checkmark mode={mode} checked={checked} />
            </Cell.Part>
          ) : (
            end
          )
        }
      >
        <Cell.Text title={children} description={description} />
      </Cell>
    </label>
  );
}

export default SelectionCell;
