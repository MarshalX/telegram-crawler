import classNames from 'classnames';
import { CSSProperties, FC } from 'react';

import { isUnicode } from 'utils/common/common';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './InitialsAvatar.module.scss';

interface InitialsAvatarProps {
  size?: number;
  name: string;
  userId: number;
  className?: string;
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

const InitialsAvatar: FC<InitialsAvatarProps> = ({
  size = 40,
  className,
  userId,
  name,
}) => {
  const { theme, themeClassName } = useTheme(styles);

  const bgIndex = userId % 7;

  const [color, topColor, bottomColor] = bgColors[bgIndex];
  const [firstName = '', lastName = ''] = name.split(' ');

  return (
    <div
      className={classNames(themeClassName('root'), className)}
      style={
        {
          width: size,
          height: size,
          background:
            theme === 'apple'
              ? `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`
              : color,
          ['--font_size']: `${Math.round(size / 2.2)}px`,
        } as CSSProperties
      }
    >
      <div>
        {isUnicode(firstName.charAt(0)) &&
          firstName.charAt(0).toLocaleUpperCase()}
        {isUnicode(lastName.charAt(0)) &&
          lastName.charAt(0).toLocaleUpperCase()}
      </div>
    </div>
  );
};

export default InitialsAvatar;
