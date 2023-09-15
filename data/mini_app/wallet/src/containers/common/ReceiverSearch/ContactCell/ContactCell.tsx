import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ContactCell.module.scss';

export const ContactCell: FC<{
  before: ReactNode;
  top: ReactNode;
  bottom: ReactNode;
  className?: string;
  separator?: boolean;
  onClick?: VoidFunction;
}> = ({ onClick, before, top, bottom, separator, className }) => {
  const { themeClassName } = useTheme(styles);

  return (
    <Tappable
      Component="button"
      onClick={onClick}
      rootClassName={classNames(themeClassName('root'), className)}
    >
      <div className={themeClassName('container')}>
        <div className={themeClassName('before')}>{before}</div>
        <div
          className={classNames(
            themeClassName('main'),
            separator && styles.separator,
          )}
        >
          <div className={themeClassName('top')}>{top}</div>
          <div className={themeClassName('bottom')}>{bottom}</div>
        </div>
      </div>
    </Tappable>
  );
};
