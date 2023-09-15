import classNames from 'classnames';
import { MouseEventHandler, ReactNode, createElement, forwardRef } from 'react';
import * as React from 'react';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ChevronSVG } from 'images/chevron.svg';

import styles from './ListItemCell.module.scss';

interface ListItemCellProps {
  header?: ReactNode;
  after?: ReactNode;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  icon?: ReactNode;
  chevron?: boolean;
  // TODO:  убрать и сделать по нормальному опцию шефрона когда он нужен и в material и apple
  perenniallyСhevron?: boolean;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  afterClassName?: string;
  headerTheme?: 'primary' | 'secondary';
  'data-testid'?: string;
}

const HEADER_THEME_TO_CLASSNAME = {
  primary: 'headerPrimary',
  secondary: 'headerSecondary',
};

export const ListItemCell = forwardRef<
  JSX.Element,
  React.PropsWithChildren<ListItemCellProps>
>(
  (
    {
      onClick,
      header,
      children,
      perenniallyСhevron = false,
      after,
      icon,
      chevron,
      className,
      contentClassName,
      containerClassName,
      afterClassName,
      headerTheme = 'primary',
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { theme, themeClassName } = useTheme(styles);

    const childrenComponent = (
      <div
        className={classNames(
          themeClassName('root'),
          !icon && themeClassName('withOutIcon'),
        )}
      >
        {icon}
        <div
          className={classNames(
            themeClassName('container'),
            containerClassName,
          )}
        >
          <div
            className={classNames(themeClassName('content'), contentClassName)}
          >
            {header && (
              <div
                className={classNames(
                  themeClassName('header'),
                  themeClassName(HEADER_THEME_TO_CLASSNAME[headerTheme]),
                )}
              >
                {header}
              </div>
            )}
            <div className={themeClassName('children')}>{children}</div>
          </div>
          {after && (
            <div
              className={classNames(themeClassName('after'), afterClassName)}
            >
              {after}
            </div>
          )}
          {((theme === 'apple' && chevron) || perenniallyСhevron) && (
            <ChevronSVG className={styles.chevron} />
          )}
        </div>
      </div>
    );

    if (onClick) {
      return createElement(
        Tappable,
        {
          rootClassName: classNames(styles.wrapper, className),
          onClick,
          Component: 'div',
          ref,
          'data-testid': dataTestId,
        },
        childrenComponent,
      );
    } else {
      return createElement(
        'div',
        { className: classNames(styles.wrapper, className), ref },
        childrenComponent,
      );
    }
  },
);
