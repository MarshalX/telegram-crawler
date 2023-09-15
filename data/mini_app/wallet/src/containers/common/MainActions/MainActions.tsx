import classNames from 'classnames';
import { FC } from 'react';

import { InlineLayout } from 'components/InlineLayout/InlineLayout';

import styles from './MainActions.module.scss';

const MainActions: FC<{ className?: string; dense?: boolean }> = ({
  children,
  className,
  dense = true,
}) => {
  return (
    <InlineLayout className={classNames(styles.root, className)}>
      <section className={classNames(styles.actions, dense && styles.dense)}>
        {children}
      </section>
    </InlineLayout>
  );
};

export default MainActions;
