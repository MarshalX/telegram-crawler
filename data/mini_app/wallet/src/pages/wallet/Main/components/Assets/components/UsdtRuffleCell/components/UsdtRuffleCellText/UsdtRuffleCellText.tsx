import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './UsdtRuffleCellText.module.scss';

type CellTextBaseProps = {
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
};

type CellTextProps =
  | (CellTextBaseProps & {
      title: ReactNode;
      description?: ReactNode;
      bold?: boolean;
    })
  | (CellTextBaseProps & {
      skeleton?: boolean;
      description?: boolean;
    });

export const UsdtRuffleCellText: FC<CellTextProps> = ({
  className,
  style,
  ...props
}) => {
  const { themeClassName } = useTheme(styles);
  return (
    <div
      className={classNames(
        themeClassName('root'),
        'skeleton' in props && props.skeleton && themeClassName('skeleton'),
        className,
      )}
      data-testid={props['data-testid']}
      style={style}
    >
      <div
        className={classNames(
          themeClassName('title'),
          'bold' in props && props.bold && styles.bold,
        )}
      >
        {'title' in props && props.title}
      </div>
      {props.description && (
        <div className={classNames(themeClassName('description'))}>
          {props.description}
        </div>
      )}
    </div>
  );
};
