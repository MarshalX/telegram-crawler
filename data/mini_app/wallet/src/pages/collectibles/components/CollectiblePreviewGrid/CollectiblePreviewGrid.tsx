import classNames from 'classnames';
import { FC } from 'react';

import styles from './CollectiblePreviewGrid.module.scss';

interface CollectiblePreviewGridProps {
  className?: string;
}
export const CollectiblePreviewGrid: FC<CollectiblePreviewGridProps> = ({
  className,
  children,
}) => {
  return <div className={classNames(className, styles.root)}>{children}</div>;
};
