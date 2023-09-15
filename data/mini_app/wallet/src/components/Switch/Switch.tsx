import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Switch.module.scss';

export const Switch: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  disabled = false,
  className,
  style,
  id,
  ...props
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <label
      style={style}
      htmlFor={id}
      className={classNames(
        className,
        themeClassName('root'),
        disabled && themeClassName('disabled'),
      )}
    >
      <input id={id} type="checkbox" disabled={disabled} {...props} />
      <span className={themeClassName('presentation')} />
    </label>
  );
};
