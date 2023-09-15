import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';

import routePaths from 'routePaths';

import { P2P_CRYPTO_CURRENCIES_MULTICURRENCY } from 'config';

import { RootState } from 'store';

import StepsTitle from 'containers/p2p/CreateEditOffer/components/StepsTitle/StepsTitle';
import OfferCard from 'containers/p2p/OfferCard/OfferCard';
import OfferCardSkeleton from 'containers/p2p/OfferCard/OfferCardSkeleton';

import { BackButton } from 'components/BackButton/BackButton';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { getLinesCountInElement } from 'utils/common/getLinesCountInElement';

import {
  useGetPaymentMethodName,
  useSnackbarForBannedUser,
  useUserStats,
} from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as MessageSVG } from 'images/message_outline.svg';

import styles from './OfferPreviewPage.module.scss';

const OfferPreviewPage: FC = () => {
  const { userId, canUseP2p, isBanned, displayNickname, avatarCode } =
    useSelector((state: RootState) => state.p2pUser);
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showCommentIconOnTop, setShowCommentIconOnTop] = useState(false);
  const commentElRef = useRef<HTMLDivElement>(null);
  const isUserBlocked = userId && (!canUseP2p || isBanned);
  const { data: stats } = useUserStats();
  const getPaymentMethodName = useGetPaymentMethodName();

  const offerIdStr = params.id;

  if (!offerIdStr || isNaN(+offerIdStr)) {
    Sentry.captureMessage('Invalid offer id', {
      extra: {
        params,
      },
    });
    navigate(generatePath(routePaths.P2P_HOME));
  }

  const offerId = Number(offerIdStr);

  const { data: offer, isLoading } = useQuery({
    queryKey: ['getOffer', offerId],
    queryFn: async () => {
      const { data } = await API.Offer.getUserPrivateOfferV2({
        offerId,
      });

      if (data.status !== 'SUCCESS') {
        console.error(data);
        return undefined;
      }

      return data.data;
    },
    onError: (error) => {
      console.log(error);
    },
    cacheTime: 5 * 1000,
  });

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const handleEditClick = () => {
    if (isUserBlocked) {
      showSnackbarForBannedUser();
      return;
    }

    const cameFrom = searchParams.get('cameFrom');

    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_EDIT, { id: params.id! }),
      search: cameFrom
        ? createSearchParams({
            cameFrom,
          }).toString()
        : undefined,
    });
  };

  const handleBackBtnClick = useCallback(() => {
    const redirectPath = searchParams.get('backButton');
    const isRestorePrevStateOnOffersPage = searchParams.get(
      'isRestorePrevStateOnOffersPage',
    );
    const isRestoreYScrollPosition = searchParams.get(
      'isRestoreYScrollPosition',
    );

    const searchParamsObj: {
      isRestorePrevStateOnOffersPage?: string;
      isRestoreYScrollPosition?: string;
    } = {};

    if (isRestorePrevStateOnOffersPage) {
      searchParamsObj.isRestorePrevStateOnOffersPage = String(true);
    }

    if (isRestoreYScrollPosition) {
      searchParamsObj.isRestoreYScrollPosition = String(true);
    }

    if (redirectPath) {
      navigate({
        pathname: redirectPath,
        search: Object.keys(searchParamsObj).length
          ? createSearchParams(searchParamsObj).toString()
          : '',
      });

      return;
    }

    navigate(generatePath(routePaths.P2P_HOME));
  }, [navigate, searchParams]);

  useEffect(() => {
    const el = commentElRef.current;

    if (!el) return;

    const linesCount = getLinesCountInElement(el);

    setShowCommentIconOnTop(linesCount > 3);
  }, [offer, isLoading]);

  return (
    <Page mode="secondary">
      <BackButton onClick={handleBackBtnClick} />
      <div className={themeClassName('root')}>
        <StepsTitle title={t('p2p.preview_offer_page.your_order')} />
        <Skeleton skeletonShown={isLoading} skeleton={<OfferCardSkeleton />}>
          {offer ? (
            <>
              <OfferCard
                userId={Number(userId)}
                username={displayNickname}
                avatarCode={avatarCode}
                id={String(offer.id)}
                tradesCount={stats.totalOrdersCount}
                successPercent={stats.successPercent}
                baseCurrencyCode={
                  offer.price
                    .baseCurrencyCode as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY
                }
                quoteCurrencyCode={offer.price.quoteCurrencyCode}
                priceType={offer.price.type === 'FIXED' ? 'fixed' : 'floating'}
                price={
                  offer.price.estimated
                    ? Number(offer.price.estimated)
                    : undefined
                }
                amount={BigNumber(offer.availableVolume.amount)}
                orderAmountLimits={offer.orderAmountLimits}
                orderVolumeLimits={offer.orderVolumeLimits}
                paymentMethodsNames={
                  'paymentDetails' in offer
                    ? offer.paymentDetails.map(({ paymentMethod }) =>
                        getPaymentMethodName(paymentMethod),
                      )
                    : offer.paymentMethods.map((paymentMethod) =>
                        getPaymentMethodName(paymentMethod),
                      )
                }
                timeLimit={offer.paymentConfirmTimeout}
                isCardActive={false}
                separator
                offerType={offer.type}
              />
              {offer?.comment && (
                <Section>
                  <ListItemCell
                    icon={
                      <ListItemIcon
                        type="icon"
                        className={cn(
                          themeClassName('messageIcon'),
                          showCommentIconOnTop &&
                            themeClassName('messageIconOnTop'),
                        )}
                      >
                        <MessageSVG className={styles.messageColor} />
                      </ListItemIcon>
                    }
                    header={t('p2p.preview_offer_page.comment')}
                    headerTheme="secondary"
                    contentClassName={styles.commentContent}
                    containerClassName={styles.commentContainer}
                  >
                    {/* style is a monkey patch to fix strange browser behavior on some systems */}
                    <div
                      className={styles.comment}
                      ref={commentElRef}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {offer.comment}
                    </div>
                  </ListItemCell>
                </Section>
              )}
            </>
          ) : null}
        </Skeleton>
      </div>
      <MainButton
        text={t('p2p.preview_offer_page.edit').toLocaleUpperCase()}
        onClick={handleEditClick}
      />
    </Page>
  );
};

export default OfferPreviewPage;
