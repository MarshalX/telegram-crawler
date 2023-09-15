import classNames from 'classnames';
import {
  CSSProperties,
  ElementType,
  FC,
  ReactNode,
  createElement,
} from 'react';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ChevronSVG } from 'images/chevron.svg';

import styles from './Cell.module.scss';
import { CellList } from './components/CellList/CellList';
import { CellPart } from './components/CellPart/CellPart';
import { CellText } from './components/CellText/CellText';

export type CellProps = {
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  /**
   * Cell.Part is preferred
   */
  start?: ReactNode;
  /**
   * CellText is preferred
   */
  children?: ReactNode;
  /**
   * Cell.Part or Cell.Text are preferred
   */
  end?: ReactNode;
  tappable?: boolean;
  /**
   * Use this prop to force separator visibility.
   * Otherwise, wrap Cells by Cell.List, that places separators automatically
   */
  separator?: boolean;
  chevron?: boolean;
} & (
  | ({
      Component: typeof Link;
    } & LinkProps)
  | {
      Component?: ElementType;
    }
);

export const Cell: FC<CellProps> & {
  Text: typeof CellText;
  Part: typeof CellPart;
  List: typeof CellList;
} = ({
  className,
  start,
  children,
  end,
  tappable,
  Component = 'div',
  separator,
  chevron,
  ...restProps
}) => {
  const { themeClassName } = useTheme(styles);

  const childrenComponent = (
    <>
      {start && <div className={themeClassName('start')}>{start}</div>}
      <div className={themeClassName('container')}>
        {children}
        {end && <div className={themeClassName('end')}>{end}</div>}
        {chevron && <ChevronSVG className={themeClassName('chevron')} />}
      </div>
    </>
  );

  if (tappable) {
    return (
      <>
        {createElement(
          Tappable,
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Component,
            rootClassName: classNames(styles.tappable, className),
            className: classNames(
              themeClassName('root'),
              separator && styles.separator,
            ),
            ...restProps,
          },
          childrenComponent,
        )}
      </>
    );
  } else {
    return (
      <Component
        className={classNames(
          themeClassName('root'),
          separator && styles.separator,
          className,
        )}
        {...restProps}
      >
        {childrenComponent}
      </Component>
    );
  }
};

Cell.Text = CellText;
Cell.Part = CellPart;
Cell.List = CellList;
