import { FC } from 'react';
import * as React from 'react';

import { CollectiblePreviewGrid } from 'pages/collectibles/components/CollectiblePreviewGrid/CollectiblePreviewGrid';

import { Text } from 'components/Text/Text';

import { repeat } from 'utils/common/common';

import { CollectiblePreviewSkeleton } from '../../../components/CollectiblePreview/CollectiblePreviewSkeleton';
import { Media } from '../../../components/Media/Media';
import styles from './CollectibleGroup.module.scss';

const defaultCollectibleCounts = [3, 5];

const CollectibleGroupSkeleton: FC<{ collectibleCounts?: Array<number> }> = ({
  collectibleCounts = defaultCollectibleCounts,
}) => {
  return (
    <>
      {collectibleCounts.map((collectibleCount, key) => {
        return (
          <div key={key} className={styles.root}>
            <div className={styles.tappable}>
              <div className={styles.expandable}>
                <div className={styles.left}>
                  <div className={styles.media}>
                    <Media />
                  </div>
                </div>
                <div className={styles.middle}>
                  <Text
                    skeleton
                    skeletonWidth={key === 0 ? 148 : 93}
                    apple={{ variant: 'title3', weight: 'bold', color: 'text' }}
                    material={{
                      variant: 'headline6',
                      color: 'text',
                    }}
                  />
                </div>
              </div>
            </div>
            <CollectiblePreviewGrid className={styles.collectiblePreviews}>
              {repeat(
                (key) => (
                  <CollectiblePreviewSkeleton key={key} />
                ),
                collectibleCount,
              )}
            </CollectiblePreviewGrid>
          </div>
        );
      })}
    </>
  );
};

export default CollectibleGroupSkeleton;
