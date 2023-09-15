import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';

import { Image } from 'components/Image/Image';

import styles from './Avatar.module.scss';

export interface AvatarProps {
  size?: number;
  src?: string;
  className?: string;
  style?: CSSProperties;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 40, className, style, src }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.root, className)}
        style={{
          width: size,
          height: size,
          ...style,
        }}
      >
        <Image src={src} className={styles.img} />
      </div>
    );
  },
);

export default Avatar;
