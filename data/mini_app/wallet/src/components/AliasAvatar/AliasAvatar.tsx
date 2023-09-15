import classNames from 'classnames';
import * as React from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { Image } from '../Image/Image';
import styles from './AliasAvatar.module.scss';

interface AliasAvatarProps {
  avatarCode?: string;
  id?: number;
  className?: string;
  size?: number;
  loading?: boolean;
}

const bgColors = [
  ['#e17076', '#ff885e', '#ff516a'], // red
  ['#faa774', '#ffcd6a', '#ffa85c'], // orange
  ['#a695e7', '#82b1ff', '#665fff'], // purple
  ['#7bc862', '#a0de7e', '#54cb68'], // green
  ['#6ec9cb', '#53edd6', '#28c9b7'], // cyan
  ['#65aadd', '#72d5fd', '#2a9ef1'], // blue
  ['#ee7aae', '#e0a2f3', '#d669ed'], // pink
];

export const AliasAvatar: React.FC<AliasAvatarProps> = ({
  id = 0,
  avatarCode,
  className,
  size = 40,
  loading,
}) => {
  const { theme } = useTheme(styles);
  const src = avatarCode ? `/static/images/alias/${avatarCode}.svg` : '';

  const bgIndex = id % 7;

  const [color, topColor, bottomColor] = bgColors[bgIndex];

  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  if (avatarCode) {
    style.background =
      theme === 'apple'
        ? `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`
        : color;
  }

  return (
    <div
      style={style}
      className={classNames(styles.root, loading && styles.loading, className)}
    >
      {!loading && <Image className={classNames(styles.img)} src={src} />}
    </div>
  );
};
