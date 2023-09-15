import cn from 'classnames';
import { MouseEventHandler, ReactNode, createElement, forwardRef } from 'react';

import DetailCellSkeleton from 'components/Cells/DetailCell/DetailCellSkeleton';
import Skeleton from 'components/Skeleton/Skeleton';
import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './DetailCell.module.scss';

interface DetailCellProps {
  header?: ReactNode;
  before?: ReactNode;
  beforeClassName?: string;
  after?: ReactNode;
  fetching?: boolean;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  allowScroll?: boolean;
  containerClassName?: string;
  afterClassName?: string;
}

const DetailCell = forwardRef<
  JSX.Element,
  React.PropsWithChildren<DetailCellProps>
>(
  (
    {
      fetching,
      onClick,
      header,
      children,
      after,
      before,
      beforeClassName,
      allowScroll,
      containerClassName,
      afterClassName,
    },
    ref,
  ) => {
    const { themeClassName } = useTheme(styles);

    const childrenComponent = (
      <Skeleton
        skeletonShown={fetching}
        skeleton={
          <DetailCellSkeleton after={after} header={header} before={before} />
        }
      >
        <div
          className={cn(
            themeClassName('container'),
            allowScroll && styles.allowScroll,
            containerClassName,
          )}
        >
          {before && (
            <div className={cn(themeClassName('before'), beforeClassName)}>
              {before}
            </div>
          )}
          <div className={themeClassName('content')}>
            {header && <div className={themeClassName('header')}>{header}</div>}
            <div className={themeClassName('children')}>{children}</div>
          </div>
          {after && (
            <div className={cn(themeClassName('after'), afterClassName)}>
              {after}
            </div>
          )}
          {/* It's a hack that helps to preserve padding when the width of the content in the flex container */}
          {/* is more than the screen width */}
          {allowScroll && <div className={styles.pseudoPadding}></div>}
        </div>
      </Skeleton>
    );

    if (onClick) {
      return createElement(
        Tappable,
        {
          rootClassName: themeClassName('root'),
          onClick,
          Component: 'div',
          ref,
        },
        childrenComponent,
      );
    } else {
      return createElement(
        'div',
        { className: themeClassName('root'), ref },
        childrenComponent,
      );
    }
  },
);

export default DetailCell;
