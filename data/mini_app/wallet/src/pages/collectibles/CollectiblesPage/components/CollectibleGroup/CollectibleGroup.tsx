import classNames from 'classnames';
import { useCollectiblePreviewsByCollection } from 'query/getGems/collectibles/collectiblePreviewsByCollection';
import { FC, memo } from 'react';
import * as React from 'react';
import { useCollapse } from 'react-collapsed';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionPreview as CollectionPreviewPayload } from 'api/getGems/generated';

import { RootState, useAppSelector } from 'store';

import {
  collapseCollectibleGroup,
  expandCollectibleGroup,
} from 'reducers/collectibles/collectibleGroupedSlice';

import Tappable from 'components/Tappable/Tappable';
import { Text } from 'components/Text/Text';

import { repeat } from 'utils/common/common';
import { printNumber } from 'utils/common/currency';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ChevronDown } from 'images/chevron_down.svg';
import { ReactComponent as ChevronRightCirceFill } from 'images/chevron_right_circle_fill.svg';

import { CollectiblePreview } from '../../../components/CollectiblePreview/CollectiblePreview';
import { CollectiblePreviewSkeleton } from '../../../components/CollectiblePreview/CollectiblePreviewSkeleton';
import { CollectiblePreviewGrid } from '../../../components/CollectiblePreviewGrid/CollectiblePreviewGrid';
import { Media } from '../../../components/Media/Media';
import styles from './CollectibleGroup.module.scss';

interface CommonProps {
  countColTotal: number;
  countRowPerCollection: number;
  collectibleCount: number;
}

interface CollapseContentProps extends CommonProps {
  collectionAddress: string;
}

interface CollectibleGroupProps extends CommonProps {
  collectionPreview: CollectionPreviewPayload;
}

const MemoizedCollectiblePreview = memo(CollectiblePreview);

const CollapsedContent: FC<CollapseContentProps> = ({
  countColTotal,
  countRowPerCollection,
  collectionAddress,
  collectibleCount,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const userAddress = useAppSelector((state) => state.scw.address);
  const {
    collectiblePreviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCollectiblePreviewsByCollection(
    {
      userAddress,
      collectionAddress: collectionAddress,
      count: countColTotal * countRowPerCollection,
    },
    {
      useCachedInitialData: true,
      enabled: false,
    },
  );

  const onMoreClick = async () => {
    fetchNextPage();
  };

  return (
    <>
      <CollectiblePreviewGrid className={styles.collectiblePreviews}>
        {collectiblePreviews.map((collectiblePreview) => {
          return (
            <MemoizedCollectiblePreview
              key={collectiblePreview.address}
              collectiblePreview={collectiblePreview}
            />
          );
        })}
        {hasNextPage && !isFetchingNextPage && (
          <Tappable
            onClick={onMoreClick}
            rootClassName={themeClassName('moreWrap')}
            Component="div"
            className={styles.more}
          >
            <ChevronRightCirceFill />
            <Text
              apple={{
                variant: 'subheadline2',
                weight: 'semibold',
                color: 'link',
              }}
              material={{
                variant: 'subtitle2',
                color: 'link',
                weight: 'medium',
              }}
            >
              {t('collectibles.collectibles_page.more')}
            </Text>
          </Tappable>
        )}
        {isFetchingNextPage &&
          repeat(
            (key) => <CollectiblePreviewSkeleton key={key} />,
            Math.min(
              collectibleCount - collectiblePreviews.length,
              countColTotal * countRowPerCollection + 1,
            ),
          )}
      </CollectiblePreviewGrid>
    </>
  );
};

const MemoizedCollapseContent = memo(CollapsedContent);

const CollectibleGroup: FC<CollectibleGroupProps> = (props) => {
  const {
    collectionPreview,
    collectibleCount,
    countColTotal,
    countRowPerCollection,
  } = props;

  const { themeClassName } = useTheme(styles);

  const isExpanded = useSelector((state: RootState) => {
    return !state.collectibleGrouped[collectionPreview.address];
  });
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
    duration: 300,
  });
  const dispatch = useDispatch();

  const collectionName =
    collectionPreview.name || squashAddress(collectionPreview.address);

  const { languageCode } = useSelector((state: RootState) => state.settings);
  const count = printNumber({
    value: collectibleCount,
    languageCode: languageCode,
  });

  return (
    <div className={styles.root}>
      <Tappable
        rootClassName={styles.tappable}
        Component="button"
        {...getToggleProps({
          onClick: () =>
            dispatch(
              isExpanded
                ? collapseCollectibleGroup(collectionPreview.address)
                : expandCollectibleGroup(collectionPreview.address),
            ),
        })}
      >
        <div className={styles.expandable}>
          <div className={styles.left}>
            <div className={styles.media}>
              <Media payload={collectionPreview.content} />
            </div>
          </div>
          <div className={styles.container}>
            <div className={themeClassName('middle')}>
              <Text
                className={styles.middleText}
                apple={{ variant: 'title3', weight: 'bold', color: 'text' }}
                material={{
                  variant: 'headline6',
                  color: 'text',
                }}
              >
                {collectionName}
              </Text>
            </div>
            <div className={styles.right}>
              <div className={styles.right}>
                <div className={styles.count}>
                  <Text
                    className={styles.countText}
                    apple={{
                      variant: 'title3',
                      weight: 'regular',
                      color: 'hint',
                    }}
                    material={{
                      variant: 'headline6',
                      color: 'hint',
                    }}
                  >
                    {count}
                  </Text>
                </div>
                <div className={styles.arrowContainer}>
                  <ChevronDown
                    className={classNames(
                      themeClassName('arrow'),
                      isExpanded && styles.arrowUp,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tappable>
      <div {...getCollapseProps()}>
        <MemoizedCollapseContent
          collectibleCount={collectibleCount}
          collectionAddress={collectionPreview.address}
          countColTotal={countColTotal}
          countRowPerCollection={countRowPerCollection}
        />
      </div>
    </div>
  );
};

export default CollectibleGroup;
