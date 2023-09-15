import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './DetailCell.module.scss';

interface DetailCellSkeletonProps {
  after?: ReactNode;
  header?: ReactNode;
  before?: ReactNode;
}

const DetailCellSkeleton: FC<DetailCellSkeletonProps> = ({
  after,
  before,
  header,
}) => {
  const { themeClassName } = useTheme(styles);

  return (
    <div className={classNames(themeClassName('container'), styles.skeleton)}>
      {before && <div className={themeClassName('before')} />}
      <div className={themeClassName('content')}>
        {header && <div className={themeClassName('header')} />}
        <div className={themeClassName('children')} />
      </div>
      {after && <div className={themeClassName('after')} />}
    </div>
  );
};

export default DetailCellSkeleton;
