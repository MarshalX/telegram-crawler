import classNames from 'classnames';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './CellList.module.scss';

/**
 * Use this component if you want to draw several Cells in a row and separate them by 1px line
 */
export const CellList: FC<{
  separator?: boolean;
  className?: string;
  mode?: 'plain' | 'card';
  overlap?: boolean;
}> = ({
  children,
  separator = true,
  className,
  mode = 'plain',
  overlap = false,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(
        themeClassName('root'),
        separator && styles.separator,
        mode === 'card' && themeClassName('card'),
        overlap && styles.overlap,
        className,
      )}
    >
      {children}
    </div>
  );
};
