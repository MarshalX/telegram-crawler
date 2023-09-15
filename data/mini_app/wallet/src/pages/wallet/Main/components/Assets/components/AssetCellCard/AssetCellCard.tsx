import classNames from 'classnames';
import { ElementType, FC } from 'react';

import { Cell, CellProps } from 'components/Cells/Cell/Cell';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './AssetCellCard.module.scss';

export const AssetCellCard: FC<
  CellProps & {
    RootElement?: ElementType;
  }
> = ({ className, children, RootElement = Cell, ...restProps }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <RootElement
      className={classNames(themeClassName('root'), className)}
      {...restProps}
    >
      {children}
    </RootElement>
  );
};
