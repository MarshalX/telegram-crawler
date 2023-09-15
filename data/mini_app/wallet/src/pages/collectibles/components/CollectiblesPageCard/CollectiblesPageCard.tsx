import classNames from 'classnames';
import { useCollectiblePreviewsNewest } from 'query/getGems/collectibles/collectiblePreviewsNewest';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { PageCard } from 'containers/scw/PageCard/PageCard';

import { Text } from 'components/Text/Text';

import { repeat } from 'utils/common/common';

import { CollectiblePreview } from '../CollectiblePreview/CollectiblePreview';
import { CollectiblePreviewSkeleton } from '../CollectiblePreview/CollectiblePreviewSkeleton';
import { CollectiblePreviewGrid } from '../CollectiblePreviewGrid/CollectiblePreviewGrid';
import styles from './CollectiblesPageCard.module.scss';

const COLLECTIBLE_COUNT = 3;

export const CollectiblesPageCard = () => {
  const { t } = useTranslation();
  const address = useAppSelector((state) => state.scw.address);
  const {
    data: data,
    isLoading: isLoading,
    refetch: refetch,
    isError: isError,
  } = useCollectiblePreviewsNewest(address);

  const onTryAgainClick = () => {
    refetch();
  };

  const hasItems = !!data?.collectibles && !!data?.collectibles.length;
  const isEmptyState = !isLoading && !hasItems && !isError;
  const isErrorState = !isLoading && !hasItems && isError;

  return (
    <PageCard
      title={t('scw.collectibles')}
      aside={
        hasItems && (
          <Link to={routePaths.COLLECTIBLES}>
            <Text
              material={{
                variant: 'body',
                weight: 'regular',
                color: 'link',
              }}
              apple={{
                variant: 'body',
                weight: 'regular',
                color: 'link',
              }}
            >
              {t('scw.more')}
            </Text>
          </Link>
        )
      }
    >
      <CollectiblePreviewGrid className={styles.previewGrid}>
        {!hasItems && (
          <>
            {repeat(
              (key) => (
                <CollectiblePreviewSkeleton
                  gradient={isEmptyState || isErrorState}
                  key={key}
                />
              ),
              COLLECTIBLE_COUNT,
            )}
            {isEmptyState && (
              <div className={styles.placeholder}>
                <Text
                  className={styles.placeholderText}
                  apple={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'hint',
                  }}
                  material={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'hint',
                  }}
                >
                  {t('scw.collectibles_empty')}
                </Text>
              </div>
            )}
            {isErrorState && (
              <div className={styles.placeholder}>
                <Text
                  className={styles.placeholderText}
                  apple={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'hint',
                  }}
                  material={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'hint',
                  }}
                >
                  {t('scw.collectibles_error')}
                </Text>
                <Text
                  className={classNames(styles.retry, styles.placeholderText)}
                  onClick={onTryAgainClick}
                  apple={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'button',
                  }}
                  material={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'button',
                  }}
                >
                  {t('scw.try_again')}
                </Text>
              </div>
            )}
          </>
        )}
        {hasItems &&
          data.collectibles.map((collectiblePreview) => {
            return (
              <CollectiblePreview
                key={collectiblePreview.address}
                collectiblePreview={collectiblePreview}
              />
            );
          })}
      </CollectiblePreviewGrid>
    </PageCard>
  );
};
