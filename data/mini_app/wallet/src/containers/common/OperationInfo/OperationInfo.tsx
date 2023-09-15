import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { VerifiedMerchantBadge } from 'containers/common/VerifiedMerchantBadge/VerifiedMerchantBadge';

import useABTests from 'hooks/p2p/useABTests';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './OperationInfo.module.scss';

interface OperationType {
  operation?: ReactNode;
  merchant?: string;
  avatar?: ReactNode;
  isVerifiedMerchant?: boolean;
}

const OperationInfo: FC<OperationType> = ({
  operation,
  merchant,
  avatar,
  isVerifiedMerchant,
}) => {
  const { themeClassName } = useTheme(styles);
  const abTests = useABTests();
  const showBadge = abTests.data?.verifiedMerchantBadge;

  return (
    <div className={styles.root}>
      {avatar && <div className={themeClassName('avatar')}>{avatar}</div>}
      <span className={themeClassName('text')}>
        <span>{operation}</span>
        {merchant && <b>{merchant}</b>}
        {isVerifiedMerchant && showBadge && (
          <div className={styles.badge}>
            <VerifiedMerchantBadge size="md" />
          </div>
        )}
      </span>
    </div>
  );
};

export const OperationInfoSkeleton: FC<{ avatar?: ReactNode }> = ({
  avatar,
}) => {
  const { themeClassName } = useTheme(styles);
  return (
    <div className={classNames(styles.root, styles.skeleton)}>
      {avatar && <div className={themeClassName('avatar')}>{avatar}</div>}
      <span className={themeClassName('text')} />
    </div>
  );
};

export default OperationInfo;
