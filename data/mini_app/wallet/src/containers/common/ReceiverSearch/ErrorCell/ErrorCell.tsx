import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningIconSVG } from 'images/exclamation_mark_triange.svg';

import styles from './ErrorCell.module.scss';

export const ErrorCell: FC<{
  title: ReactNode;
  text: ReactNode;
  className?: string;
}> = ({ title, text, className }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(themeClassName('root'), className)}>
      <div className={themeClassName('before')}>
        <WarningIconSVG style={{ color: 'var(--tg-theme-hint-color)' }} />
      </div>
      <div className={themeClassName('main')}>
        <div className={themeClassName('title')}>{title}</div>
        <div className={themeClassName('text')}>{text}</div>
      </div>
    </div>
  );
};
