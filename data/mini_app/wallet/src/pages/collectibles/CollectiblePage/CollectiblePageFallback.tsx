import { FC } from 'react';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import CollectibleSkeleton from './components/Collectible/CollectibleSkeleton';

export const CollectiblePageFallback: FC = () => {
  return (
    <Page>
      <BackButton />
      <CollectibleSkeleton />
    </Page>
  );
};
