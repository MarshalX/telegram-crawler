import classNames from 'classnames';
import { CSSProperties } from 'react';
import * as React from 'react';

import styles from './BottomContent.module.scss';

type Props = {
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  children: React.ReactNode;
};
export const BottomContent = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    return (
      <div
        className={classNames(styles.root, className)}
        {...restProps}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
