import cn from 'classnames';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './Filter.module.scss';

const FilterSkeleton = ({ className }: { className?: string }) => {
  const { themeClassName } = useTheme(styles);
  return (
    <div
      className={cn(styles.root, themeClassName('rootSkeleton'), className)}
    ></div>
  );
};

export { FilterSkeleton };
