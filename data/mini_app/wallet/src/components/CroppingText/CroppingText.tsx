import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';

import styles from './CroppingText.module.scss';

type Props = {
  value: string;
  languageCode: string;
} & ComponentProps<'div'>;

export const CroppingText = forwardRef<HTMLDivElement, Props>(
  ({ value, children, className, ...props }, ref) => {
    return (
      <div className={classNames(styles.root, className)} ref={ref} {...props}>
        <div className={styles.text}>{value}</div> {children}
      </div>
    );
  },
);
