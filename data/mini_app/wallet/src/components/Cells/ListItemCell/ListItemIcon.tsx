import classNames from 'classnames';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ListItemIcon.module.scss';

type IconProps = {
  type: 'icon' | 'iconWithBg';
  className?: string;
  minWidth?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const rootWidthApple = {
  icon: 28,
  iconWithBg: 32,
};

const rootWidthMaterial = {
  icon: 29,
  iconWithBg: 32,
};

export const ListItemIcon: FC<IconProps> = ({
  children,
  type,
  className,
  minWidth,
  ...props
}) => {
  const { theme, themeClassName } = useTheme(styles);
  const rootWidth =
    theme === 'apple' ? rootWidthApple[type] : rootWidthMaterial[type];

  return (
    <div
      className={classNames(themeClassName('root'), themeClassName(type))}
      style={{
        minWidth: minWidth ?? rootWidth,
      }}
    >
      <div className={classNames(styles.base, className)} {...props}>
        {children}
      </div>
    </div>
  );
};
