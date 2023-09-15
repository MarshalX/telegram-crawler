import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Feature.module.scss';

export const Feature: FC<{
  title: string;
  text: string;
  icon: ReactNode;
  className?: string;
}> = ({ title, text, icon, className }) => {
  const { themeClassName } = useTheme(styles);
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={themeClassName('title')}>{title}</div>
        <div className={themeClassName('text')}>{text}</div>
      </div>
    </div>
  );
};
