import classNames from 'classnames';
import * as React from 'react';
import { FC } from 'react';

import { useTheme } from 'hooks/utils/useTheme';

import { Media } from '../Media/Media';
import styles from './CollectiblePreview.module.scss';

interface CollectiblePreviewSkeletonProps {
  gradient?: boolean;
}

export const CollectiblePreviewSkeleton: FC<
  CollectiblePreviewSkeletonProps
> = ({ gradient }) => {
  const { themeClassName } = useTheme(styles);
  return (
    <Media
      className={classNames(
        themeClassName('root'),
        gradient && styles.gradient,
      )}
    />
  );
};
