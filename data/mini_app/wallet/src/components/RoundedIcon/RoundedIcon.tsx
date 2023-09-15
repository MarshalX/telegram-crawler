import classNames from 'classnames';
import { CSSProperties, FC } from 'react';

import { TelegramColorIds } from 'types/utility';

import styles from './RoundedIcon.module.scss';

const ICON_SIZES_BY_AVATAR_SIZE: Record<number, number> = {
  24: 20,
  32: 22,
  40: 28,
  46: 32,
} as const;

export const RoundedIcon: FC<{
  iconSize?: number;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /**
   * Accepts either key from the Telegram [ThemeParams](https://core.telegram.org/bots/webapps#themeparams) (button, link, text) or arbitrary color string (red, #0f0, var(--some-var))
   */
  backgroundColor?: TelegramColorIds | string;
  /**
   * Accepts arbitrary color string (red, #0f0, var(--some-var))
   */
  iconColor?: string;
}> = ({
  backgroundColor,
  iconColor = '#fff',
  size = 40,
  iconSize,
  children,
  className,
  style,
}) => {
  const resolvedIconSize =
    iconSize ||
    (size in ICON_SIZES_BY_AVATAR_SIZE && ICON_SIZES_BY_AVATAR_SIZE[size]) ||
    28;

  const isTGBackgroundColor = backgroundColor && backgroundColor in styles;

  return (
    <div
      className={classNames(
        styles.root,
        isTGBackgroundColor && styles[backgroundColor],
        className,
      )}
      style={{
        ...style,
        color: iconColor,
        background: !isTGBackgroundColor ? backgroundColor : undefined,
        width: size,
        height: size,
      }}
    >
      <div style={{ width: resolvedIconSize, height: resolvedIconSize }}>
        {children}
      </div>
    </div>
  );
};
