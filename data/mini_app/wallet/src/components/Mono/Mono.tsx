import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Mono.module.scss';

type MonoProps = HTMLAttributes<HTMLSpanElement>;

const Mono: FC<MonoProps> = ({ children, className, ...restProps }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <span
      {...restProps}
      className={classNames(themeClassName('root'), className)}
    >
      {children}
    </span>
  );
};

export default Mono;
