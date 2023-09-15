import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import { Cell } from 'components/Cells';
import { CellProps } from 'components/Cells/Cell/Cell';

import styles from './ButtonCell.module.scss';

interface CellButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'danger' | 'primary';
  start?: CellProps['start'];
}

const ButtonCell: FC<CellButtonProps> = ({
  children,
  mode = 'primary',
  className,

  ...restProps
}) => {
  return (
    <Cell
      tappable
      className={classNames(className, styles[mode])}
      {...restProps}
    >
      <Cell.Text title={children} titleAppearance={mode} />
    </Cell>
  );
};

export default ButtonCell;
