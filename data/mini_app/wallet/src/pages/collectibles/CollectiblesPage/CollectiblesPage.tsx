import { useCollectiblesGrouped } from 'query/getGems/collectibles/collectiblesGrouped';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import { useAppSelector } from 'store';

import { PageError } from 'pages/collectibles/components/PageError/PageError';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import Skeleton from 'components/Skeleton/Skeleton';
import NotFoundUtka from 'components/animations/NotFoundUtkaAnimation/NotFoundUtka';

import CollectibleGroup from './components/CollectibleGroup/CollectibleGroup';
import CollectibleGroupSkeleton from './components/CollectibleGroup/CollectibleGroupSkeleton';

const COUNT_COL_TOTAL = 3;
const COUNT_ROW_PER_COLLECTION = 2;
const COUNT_ROW_TOTAL = 10;
const SKELETON_COLLECTIBLE_COUNT_LOAD_NEXT = [
  COUNT_ROW_PER_COLLECTION * COUNT_COL_TOTAL,
];

const GROUP_INDEX_FROM_THE_END_AT_WHICH_LOAD_NEXT = 1;

const Collectibles: FC = () => {
  const address = useAppSelector((state) => state.scw.address);
  const { t } = useTranslation();
  const {
    items,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useCollectiblesGrouped({
    address,
    countColTotal: COUNT_COL_TOTAL,
    countRowPerCollection: COUNT_ROW_PER_COLLECTION,
    countRowTotal: COUNT_ROW_TOTAL,
  });

  const { ref } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  const performInfinityScrollRef = (idx: number) => {
    return (inputRef: HTMLDivElement | null) => {
      if (!inputRef) {
        return;
      }
      if (
        hasNextPage &&
        idx ===
          Math.max(
            0,
            items.length - 1 - GROUP_INDEX_FROM_THE_END_AT_WHICH_LOAD_NEXT,
          )
      ) {
        ref(inputRef);
      }
    };
  };

  const isFatalError = isError && !items.length;
  const isInitialFetch = isFetching && !isFetchingNextPage;
  const isEmptyState = !isFetching && !isError && !items.length;

  if (isFatalError) {
    return <PageError refetch={refetch} />;
  }

  return (
    <Page>
      <BackButton />
      {isEmptyState ? (
        <PagePlaceholder
          media={<NotFoundUtka />}
          title={t('collectibles.collectibles_page.empty_placeholder_title')}
          text={t('collectibles.collectibles_page.empty_placeholder_text')}
        />
      ) : (
        <Skeleton
          skeletonShown={isInitialFetch}
          skeleton={<CollectibleGroupSkeleton />}
        >
          {items.map((group, idx) => {
            return (
              <div key={idx} ref={performInfinityScrollRef(idx)}>
                <CollectibleGroup
                  countColTotal={COUNT_COL_TOTAL}
                  countRowPerCollection={COUNT_ROW_PER_COLLECTION}
                  collectionPreview={group.collectionPreview}
                  collectibleCount={group.collectibleCount}
                />
              </div>
            );
          })}
          {isFetchingNextPage && (
            <CollectibleGroupSkeleton
              collectibleCounts={SKELETON_COLLECTIBLE_COUNT_LOAD_NEXT}
            />
          )}
        </Skeleton>
      )}
    </Page>
  );
};

export default Collectibles;
