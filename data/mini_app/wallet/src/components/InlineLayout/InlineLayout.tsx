import classNames from 'classnames';
import { CSSProperties, FC } from 'react';

import styles from './InlineLayout.module.scss';

type InlineLayout = {
  className?: string;
  style?: CSSProperties;
};

export const InlineLayout: FC<InlineLayout> = ({
  className,
  style,
  children,
}) => {
  return (
    <div style={style} className={classNames(styles.root, className)}>
      {children}
    </div>
  );
};
