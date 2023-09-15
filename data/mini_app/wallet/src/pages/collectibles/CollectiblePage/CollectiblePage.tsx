import { useCollectible } from 'query/getGems/collectibles/collectible';
import { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { PageError } from 'pages/collectibles/components/PageError/PageError';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import Skeleton from 'components/Skeleton/Skeleton';
import NotFoundUtka from 'components/animations/NotFoundUtkaAnimation/NotFoundUtka';

import Collectible from './components/Collectible/Collectible';
import CollectibleSkeleton from './components/Collectible/CollectibleSkeleton';

const CollectiblePage: FC = () => {
  const address = useParams().address as string;
  const { isFetching, data, isError, refetch } = useCollectible(address);
  const collectible = data?.collectible;
  const { t } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    const backPath = searchParams.get('backPath');
    if (backPath) {
      navigate(backPath);
    } else {
      window.history.back();
    }
  };

  if (isError && !collectible) {
    return <PageError refetch={refetch} />;
  }

  return (
    <Page>
      <BackButton onClick={onBackButtonClick} />
      <Skeleton skeletonShown={isFetching} skeleton={<CollectibleSkeleton />}>
        {collectible ? (
          <Collectible collectible={collectible} />
        ) : (
          <PagePlaceholder
            media={<NotFoundUtka />}
            title={t('collectibles.collectible_page.empty_placeholder_title')}
            text={t('collectibles.collectible_page.empty_placeholder_text')}
          />
        )}
      </Skeleton>
    </Page>
  );
};

export default CollectiblePage;
