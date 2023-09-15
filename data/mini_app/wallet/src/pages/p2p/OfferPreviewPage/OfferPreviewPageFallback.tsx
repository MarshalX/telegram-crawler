import StepsTitle from 'containers/p2p/CreateEditOffer/components/StepsTitle/StepsTitle';
import OfferCardSkeleton from 'containers/p2p/OfferCard/OfferCardSkeleton';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OfferPreviewPage.module.scss';

const OfferPreviewPageFallback = () => {
  const { themeClassName } = useTheme(styles);
  return (
    <Page mode="secondary">
      <BackButton />
      <div className={themeClassName('root')}>
        <StepsTitle isLoading title="Title" />
        <OfferCardSkeleton />
      </div>
    </Page>
  );
};

export { OfferPreviewPageFallback };
