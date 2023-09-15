import classNames from 'classnames';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './InitialsAvatar.module.scss';

interface InitialsAvatarSkeletonProps {
  size?: number;
  className?: string;
}

const InitialsAvatarSkeleton: FC<InitialsAvatarSkeletonProps> = ({
  size = 40,
  className,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(themeClassName('root'), styles.skeleton, className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default InitialsAvatarSkeleton;
