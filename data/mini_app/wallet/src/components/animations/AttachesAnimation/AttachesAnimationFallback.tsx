import classNames from 'classnames';
import { CSSProperties, FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './AttachesAnimation.module.scss';
import { ReactComponent as AttachesPromoAppleSVG } from './apple_banner.svg';
import { ReactComponent as AttachesPromoMaterialSVG } from './material_banner.svg';

export const AttachesAnimationFallback: FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => {
  const { themeClassName, theme } = useTheme(styles);

  return (
    <div
      className={classNames(themeClassName('root'), className)}
      style={style}
    >
      {theme === 'apple' ? (
        <AttachesPromoAppleSVG />
      ) : (
        <AttachesPromoMaterialSVG />
      )}
    </div>
  );
};
