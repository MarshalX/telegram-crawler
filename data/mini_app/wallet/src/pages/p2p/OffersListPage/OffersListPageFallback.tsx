import OfferCardSkeleton from 'containers/p2p/OfferCard/OfferCardSkeleton';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OffersListPage.module.scss';
import { FilterSkeleton } from './components/Filter/FilterSkeleton';

function OffersListPageFallback() {
  const { themeClassName } = useTheme(styles);

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={themeClassName('filtersContainer')}>
        <FilterSkeleton className={styles.filter} />
        <FilterSkeleton className={styles.filter} />
        <FilterSkeleton className={styles.filter} />
        <FilterSkeleton className={styles.filter} />
        <div className={styles.filtersContainerBorder}></div>
      </div>

      <div className={themeClassName('offersContainer')}>
        <OfferCardSkeleton className={themeClassName('offer')} />
        <OfferCardSkeleton className={themeClassName('offer')} />
        <OfferCardSkeleton className={themeClassName('offer')} />
      </div>
    </Page>
  );
}

export { OffersListPageFallback };
