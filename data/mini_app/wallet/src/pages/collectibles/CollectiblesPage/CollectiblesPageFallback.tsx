import { FC } from 'react';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import CollectibleGroupSkeleton from './components/CollectibleGroup/CollectibleGroupSkeleton';

export const CollectiblesPageFallback: FC = () => {
  return (
    <Page>
      <BackButton />
      <CollectibleGroupSkeleton />
    </Page>
  );
};
