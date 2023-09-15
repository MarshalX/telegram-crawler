import classNames from 'classnames';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningTriangleSVG } from 'images/warning_triangle.svg';

import styles from './Notice.module.scss';

export const Notice: FC<{ className?: string }> = ({ children, className }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(themeClassName('root'), className)}>
      <div className={themeClassName('icon')}>
        <WarningTriangleSVG />
      </div>
      <div className={themeClassName('content')}>{children}</div>
    </div>
  );
};
