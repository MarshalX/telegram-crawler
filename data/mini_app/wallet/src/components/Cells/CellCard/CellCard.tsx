import classNames from 'classnames';
import { FC } from 'react';

import { Cell } from 'components/Cells';
import { CellProps } from 'components/Cells/Cell/Cell';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CellCard.module.scss';

export const CellCard: FC<CellProps> = ({
  className,
  children,
  ...restProps
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <Cell
      className={classNames(themeClassName('root'), className)}
      {...restProps}
    >
      {children}
    </Cell>
  );
};
