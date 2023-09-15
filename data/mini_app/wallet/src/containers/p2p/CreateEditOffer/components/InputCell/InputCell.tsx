import { ReactNode, forwardRef } from 'react';

import Skeleton from 'components/Skeleton/Skeleton';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './InputCell.module.scss';
import InputCellSkeleton from './InputCellSkeleton';

interface Props {
  fetching?: boolean;
  children?: ReactNode;
}

const InputCell = forwardRef<HTMLDivElement, Props>(
  ({ fetching, children }, ref) => {
    const { themeClassName } = useTheme(styles);

    return (
      <div className={themeClassName('root')} ref={ref}>
        <Skeleton skeletonShown={fetching} skeleton={<InputCellSkeleton />}>
          <div className={themeClassName('container')}>
            <div className={themeClassName('content')}>
              <div className={themeClassName('children')}>{children}</div>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  },
);

export default InputCell;
