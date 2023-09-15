import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { Text } from 'components/Text/Text';

import styles from './SectionHeader.module.scss';

const SectionHeader: FC<{ className?: string; action?: ReactNode }> = ({
  children,
  className,
  action,
}) => {
  return (
    <Text
      apple={{ variant: 'footnote', caps: true, color: 'hint' }}
      material={{ variant: 'button1', color: 'link' }}
      className={classNames(styles.root, className)}
    >
      {children}
      {action && <span className={styles.action}>{action}</span>}
    </Text>
  );
};

export default SectionHeader;
