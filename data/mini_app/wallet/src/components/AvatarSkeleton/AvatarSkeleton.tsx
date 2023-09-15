import classNames from 'classnames';
import { FC } from 'react';

import styles from './AvatarSkeleton.module.scss';

export interface AvatarProps {
  size?: number;

  className?: string;
}

const AvatarSkeleton: FC<AvatarProps> = ({ size = 40, className }) => {
  return (
    <div
      className={classNames(styles.root, className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export { AvatarSkeleton };
