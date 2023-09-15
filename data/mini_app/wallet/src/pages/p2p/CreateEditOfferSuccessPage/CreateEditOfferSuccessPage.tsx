import cn from 'classnames';
import { queryClient } from 'query/client';
import { queryKeys } from 'query/queryKeys';
import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { MainButton } from 'components/MainButton/MainButton';
import Tappable from 'components/Tappable/Tappable';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BoomstickSVG } from 'images/boomstick.svg';

import styles from './CreateEditOfferSuccessPage.module.scss';

const BoomstickAnimation = lazy(
  () => import('components/animations/BoomstickAnimation/BoomstickAnimation'),
);

const CreateEditOfferSuccessPage = () => {
  const params = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') as 'create' | 'edit';
  const cameFrom = searchParams.get('cameFrom') as 'home' | 'profile';
  const { userId } = useAppSelector((state) => state.p2pUser);

  const redirectToOfferPreview = () => {
    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_PREVIEW, {
        id: params.id!,
      }),
      search: createSearchParams({
        backButton:
          cameFrom === 'home' || !userId
            ? generatePath(routePaths.P2P_HOME)
            : routePaths.P2P_USER_PROFILE,
      }).toString(),
    });
  };

  const handleMainBtnClick = () => {
    if (cameFrom === 'home' || !userId) {
      navigate(generatePath(routePaths.P2P_HOME));
    } else {
      navigate(routePaths.P2P_USER_PROFILE);
    }
  };

  const mainButtonText = t(
    cameFrom === 'home'
      ? 'p2p.create_offer_page.open_market'
      : 'p2p.create_offer_page.open_profile',
  ).toLocaleUpperCase();

  useEffect(() => {
    queryClient.removeQueries(
      queryKeys.getOffersByUserIdQueryKey({
        userId,
        offerType: 'SALE',
      }),
    );
    queryClient.removeQueries(
      queryKeys.getOffersByUserIdQueryKey({
        userId,
        offerType: 'PURCHASE',
      }),
    );
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  }, []);

  return (
    <>
      <div className={themeClassName('root')}>
        <Suspense
          fallback={
            <BoomstickSVG
              className={cn(themeClassName('media'), styles.boomstick)}
            />
          }
        >
          <BoomstickAnimation
            className={cn(themeClassName('media'), styles.boomstick)}
          />
        </Suspense>
        <h1 className={themeClassName('title')}>
          {mode === 'edit'
            ? t('p2p.create_offer_page.ad_edited')
            : t('p2p.create_offer_page.ad_created')}
        </h1>
        <p className={themeClassName('text')}>
          {t('p2p.create_offer_page.you_will_be_notified')}
        </p>
        <Tappable
          Component="button"
          rootClassName={cn(themeClassName('text'), themeClassName('link'))}
          onClick={redirectToOfferPreview}
        >
          {t('p2p.create_offer_page.view_your_ad')}
        </Tappable>
      </div>
      <MainButton text={mainButtonText} onClick={handleMainBtnClick} />
    </>
  );
};

export default CreateEditOfferSuccessPage;
