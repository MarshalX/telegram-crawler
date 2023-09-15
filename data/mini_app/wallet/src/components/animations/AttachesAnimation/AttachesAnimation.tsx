import classNames from 'classnames';
import Lottie from 'lottie-react';
import { CSSProperties, FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './AttachesAnimation.module.scss';
import appleAnimationData from './apple_banner.json';
import materialAnimationData from './material_banner.json';

const AttachesAnimation: FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => {
  const { theme, themeClassName } = useTheme(styles);

  return (
    <div
      className={classNames(themeClassName('root'), className)}
      style={style}
    >
      <Lottie
        loop={false}
        className={styles.lottie}
        alt="attachments"
        animationData={
          theme === 'apple' ? appleAnimationData : materialAnimationData
        }
      />
    </div>
  );
};

export default AttachesAnimation;
