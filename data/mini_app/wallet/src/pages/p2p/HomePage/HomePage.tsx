import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { resetTransactions } from 'query/wallet/transactions/useTransactions';
import {
  Fragment,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import API from 'api/p2p';
import {
  BaseOfferRestDtoTypeEnum,
  OrderRestDto,
  OrderRestDtoStatusEnum,
} from 'api/p2p/generated-common';
import { CryptoCurrency, FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { P2P_FAQ_URLS } from 'config';

import { RootState, useAppSelector } from 'store';

import { P2PState, setP2P } from 'reducers/p2p/p2pSlice';

import { useP2PRoutesGuardContext } from 'containers/p2p/RoutesGuard/RoutesGuard';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { DetailCell } from 'components/Cells';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { SelectList } from 'components/SelectList';
import Skeleton from 'components/Skeleton/Skeleton';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { printDate } from 'utils/common/date';
import { Langs } from 'utils/common/lang';
import { refreshBalance } from 'utils/wallet/balance';

import { useGetPaymentMethodName, useSnackbarForBannedUser } from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as AccountMaterialNewSVG } from 'images/account_material_new.svg';
import { ReactComponent as AccountNewSVG } from 'images/account_new.svg';
import { ReactComponent as ArrowDownSVG } from 'images/arrow_down.svg';
import { ReactComponent as ArrowDownCircleSVG } from 'images/arrow_down_circle.svg';
import { ReactComponent as ArrowsSVG } from 'images/arrows_vertical.svg';
import { ReactComponent as FaqSVG } from 'images/faq.svg';
import { ReactComponent as FaqMaterialSVG } from 'images/faq_material.svg';
import { ReactComponent as NotificationSVG } from 'images/notification.svg';
import { ReactComponent as NotificationMaterialSVG } from 'images/notification_material.svg';
import { ReactComponent as PlusSVG } from 'images/plus.svg';

import styles from './HomePage.module.scss';
import { HomePageSkeleton } from './HomePageSkeleton';
import { ReactComponent as MoneySVG } from './market.svg';

const ExchangeAnimation = lazy(
  () => import('./ExchangeAnimation/ExchangeAnimation'),
);

const getFaqUrlByLanguageCode = (languageCode: Langs) => {
  const url = P2P_FAQ_URLS[languageCode];

  if (url) {
    return url;
  }

  return P2P_FAQ_URLS.en;
};

const createdStatusDate = (order: OrderRestDto) => {
  const date = order.changeLog.items.find(
    ({ status }) => status === order.status,
  )?.createDateTime;

  return date ? new Date(date) : new Date();
};

function getStatusStyle(status: OrderRestDtoStatusEnum) {
  switch (status) {
    case 'CANCELLED':
    case 'CANCELLING':
      return styles.errorStatus;

    case 'COMPLETED':
      return styles.completedStatus;
    default:
      return styles.defaultStatus;
  }
}

const OrderItemSkeleton = ({
  themeClassName,
}: {
  themeClassName: (className: string) => string;
}) => (
  <ListItemCell className={themeClassName('orderHistoryItem')}>
    <div className={themeClassName('text')} />
    <div className={themeClassName('title')} />
    <div className={themeClassName('text')} />
    <div className={themeClassName('text')} />
  </ListItemCell>
);

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme, themeClassName } = useTheme(styles);
  const languageCode = useSelector(
    (state: RootState) => state.settings.languageCode,
  );

  const getPaymentMethodName = useGetPaymentMethodName();

  const {
    homePageLastYScrollPosition,
    orderHistoryStatus: orderHistoryStatusFromState,
  } = useSelector((state: RootState) => state.p2p);
  const { userId, p2pInitialized, canUseP2p, isBanned } = useSelector(
    (state: RootState) => state.p2pUser,
  );

  const [searchParams] = useSearchParams();
  const isRestoreYScrollPositionOnHomePage = searchParams.get(
    'isRestoreYScrollPositionOnHomePage',
  );
  const hasToGoBack = searchParams.get('back');
  const { isLoadingUser } = useP2PRoutesGuardContext();

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const isUserBlocked = !canUseP2p || isBanned;

  const handleNavigateToOffersListPageClick = useCallback(
    (offerType: BaseOfferRestDtoTypeEnum) => {
      if (isUserBlocked) {
        navigate(routePaths.P2P_UNAVAILABLE);
      } else {
        navigate(
          generatePath(routePaths.P2P_OFFERS, { type: offerType, '*': '' }),
        );
      }
    },
    [isUserBlocked, navigate],
  );

  const handleCreateAdClick = useCallback(() => {
    if (isUserBlocked) {
      showSnackbarForBannedUser();
      return;
    }

    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_CREATE),
      search: createSearchParams({
        cameFrom: 'home',
      }).toString(),
    });
  }, [isUserBlocked, navigate, showSnackbarForBannedUser]);

  const openOrderPage = (order: OrderRestDto) => {
    navigate({
      pathname: generatePath(routePaths.P2P_ORDER, {
        id: String(order.id),
      }),
      search: createSearchParams({
        showStatusWithDetails: String(true),
      }).toString(),
    });
  };

  const { prevLocation, location: locationFromState } = useAppSelector(
    (state) => state.location,
  );
  const location = useLocation();

  // We do this in case prevLocation is not yet updated due to current location change mechanism
  const isPrevLocationIsOrderPage =
    !!matchPath(routePaths.P2P_ORDER, prevLocation?.pathname || '') ||
    !!matchPath(routePaths.P2P_ORDER, locationFromState?.pathname || '');

  const isSameLocation = prevLocation?.pathname === location.pathname;

  const queryClient = useQueryClient();

  useEffect(() => {
    const isRemoveOrdersHistoryCache =
      !isSameLocation && !isPrevLocationIsOrderPage;

    if (isRemoveOrdersHistoryCache) {
      queryClient.setQueryData(
        ['getOrdersHistoryByUserId', userId],
        (prev?: { pages: OrderRestDto[][]; pageParams: number[] }) => {
          if (!prev) {
            return prev;
          }

          return {
            pages: prev.pages.slice(0, 1),
            pageParams: prev.pageParams.slice(0, 1),
          };
        },
      );
    }
  }, [isPrevLocationIsOrderPage, isSameLocation, queryClient, userId]);

  const [orderHistoryStatus, setOrderHistoryStatus] = useState<
    P2PState['orderHistoryStatus']
  >(
    isPrevLocationIsOrderPage && orderHistoryStatusFromState === 'completed'
      ? 'completed'
      : 'active',
  );

  useEffect(() => {
    dispatch(
      setP2P({
        orderHistoryStatus,
      }),
    );
  }, [dispatch, orderHistoryStatus]);

  const { status } = useMemo(() => {
    const status = (
      {
        active: 'ALL_ACTIVE',
        completed: 'ALL_COMPLETED',
      } as const
    )[orderHistoryStatus];

    return { status };
  }, [orderHistoryStatus]);

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isFetchingNextPage: isOrdersLoadingNextPage,
    refetch,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['getOrdersHistoryByUserId', userId, status],
    queryFn: async ({ pageParam: offset = 0 }) => {
      const LIMIT = 20;

      const { data } = await API.Order.getOrdersHistoryByUserIdV2({
        offset: offset || 0,
        limit: LIMIT,
        filter: {
          status,
        },
      });

      if (data.status !== 'SUCCESS') {
        console.error(data);
      }

      return {
        orders: data.data || [],
        nextOffset: offset + LIMIT,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset || 0,
    onError: (error) => {
      console.error(error);
    },
    cacheTime: 60 * 1000,
  });

  const isUserHasOrders =
    ordersData &&
    ordersData.pages?.length > 0 &&
    ordersData.pages[0].orders.length > 0;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isFetching) {
        refetch();
      }
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [
    isFetching,
    isPrevLocationIsOrderPage,
    isSameLocation,
    isUserHasOrders,
    refetch,
  ]);

  const handleBackBtnClick = () => {
    refreshBalance();

    dispatch(
      setP2P({
        chosenCryptoCurrencyOnAssetPageForDom: undefined,
        chosenCryptoCurrencyOnAssetPageForAdForm: undefined,
      }),
    );

    if (isUserHasOrders) {
      resetTransactions();
    }

    if (hasToGoBack) {
      navigate(-1);
    } else {
      navigate({
        pathname: routePaths.MAIN,
        search: createSearchParams({
          isScrollToTop: 'true',
        }).toString(),
      });
    }
  };

  useLayoutEffect(() => {
    // restore scroll position
    if (isRestoreYScrollPositionOnHomePage && homePageLastYScrollPosition) {
      window.scrollTo(0, homePageLastYScrollPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      dispatch(
        setP2P({
          homePageLastYScrollPosition: window.scrollY,
        }),
      );
    };
  }, []);

  const isSkeletonShown = isLoadingUser && (!p2pInitialized || isUserBlocked);

  const { ref: pastOrderRef } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  const SelectOrderHistoryStatus = (
    <SelectList
      floatingOffset={-20}
      floatingShiftPadding={14}
      onChange={(status) => {
        setOrderHistoryStatus(status as P2PState['orderHistoryStatus']);
      }}
      options={[
        {
          value: 'active',
          label: t('p2p.home_page.order_status_active'),
        },
        {
          value: 'completed',
          label: t('p2p.home_page.order_status_completed'),
        },
      ]}
      value={orderHistoryStatus}
    >
      <div className={classNames(styles.orderStatusWrapper)}>
        <div className={styles.orderStatus}>
          {
            {
              active: t('p2p.home_page.order_status_active'),
              completed: t('p2p.home_page.order_status_completed'),
            }[orderHistoryStatus]
          }
        </div>

        {theme === 'apple' ? <ArrowsSVG /> : <ArrowDownSVG />}
      </div>
    </SelectList>
  );

  return (
    <Page mode="secondary">
      <BackButton onClick={handleBackBtnClick} />
      <div className={themeClassName('root')}>
        <Skeleton
          skeleton={<HomePageSkeleton />}
          skeletonShown={isSkeletonShown}
        >
          <>
            <CSSTransition
              addEndListener={(node: HTMLElement, done: VoidFunction) =>
                node.addEventListener('transitionend', done, false)
              }
              in
              unmountOnExit
            >
              <Suspense fallback={<MoneySVG className={styles.media} />}>
                <ExchangeAnimation className={styles.media} />
              </Suspense>
            </CSSTransition>
            <h1 className={themeClassName('pageTitle')} data-testid="tgcrawl">
              {t('p2p.home_page.pageTitle')}
            </h1>
            <p
              className={themeClassName('pageDescription')}
              data-testid="tgcrawl"
            >
              {t('p2p.home_page.buy_sell_crypto')}
            </p>
            <div className={themeClassName('actionWrapper')}>
              <ActionButton
                layout="horizontal"
                mode="tertiary"
                className={classNames(
                  styles.actions,
                  searchParams.get('highlight') === 'buy' && styles.highlight,
                )}
                icon={<ArrowDownCircleSVG className={styles.arrows} />}
                data-testid="tgcrawl"
                onClick={() => handleNavigateToOffersListPageClick('SALE')}
              >
                {t('p2p.home_page.buy')}
              </ActionButton>

              <ActionButton
                layout="horizontal"
                mode="tertiary"
                className={classNames(
                  styles.actions,
                  searchParams.get('highlight') === 'sell' && styles.highlight,
                )}
                icon={
                  <ArrowDownCircleSVG
                    className={classNames(styles.arrows, styles.arrowUp)}
                  />
                }
                data-testid="tgcrawl"
                onClick={() => handleNavigateToOffersListPageClick('PURCHASE')}
              >
                {t('p2p.home_page.sell')}
              </ActionButton>
            </div>
            <Section separator>
              <ListItemCell
                data-testid="tgcrawl"
                icon={
                  <ListItemIcon
                    type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                  >
                    {theme === 'apple' ? (
                      <AccountNewSVG className={themeClassName('iconColor')} />
                    ) : (
                      <AccountMaterialNewSVG
                        className={themeClassName('iconColor')}
                      />
                    )}
                  </ListItemIcon>
                }
                header={
                  <div className={themeClassName('title')}>
                    {t('p2p.home_page.my_ads')}
                  </div>
                }
                chevron
                onClick={() => navigate(routePaths.P2P_USER_PROFILE)}
              >
                <div className={themeClassName('text')}>
                  {t('p2p.home_page.profile_link_text')}
                </div>
              </ListItemCell>
              <ListItemCell
                data-testid="tgcrawl"
                icon={
                  <ListItemIcon
                    type={theme === 'apple' ? 'iconWithBg' : 'icon'}
                    className={styles.plusIcon}
                  >
                    <PlusSVG />
                  </ListItemIcon>
                }
                chevron
                onClick={handleCreateAdClick}
              >
                <div className={themeClassName('createAdText')}>
                  {t('p2p.home_page.create_ad')}
                </div>
              </ListItemCell>
            </Section>

            <Section separator className={themeClassName('linksGroup')}>
              <ListItemCell
                data-testid="tgcrawl"
                chevron
                onClick={() =>
                  navigate(
                    generatePath(routePaths.P2P_NOTIFICATIONS, {
                      id: String(userId),
                    }),
                  )
                }
                icon={
                  theme === 'apple' ? (
                    <ListItemIcon
                      type="iconWithBg"
                      className={themeClassName('icon')}
                    >
                      <NotificationSVG
                        className={themeClassName('iconColor')}
                      />
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon
                      type="icon"
                      className={themeClassName('icon')}
                    >
                      <NotificationMaterialSVG
                        className={themeClassName('iconColor')}
                      />
                    </ListItemIcon>
                  )
                }
              >
                <div className={themeClassName('menuText')}>
                  {t('p2p.home_page.notifications')}
                </div>
              </ListItemCell>
              <ListItemCell
                data-testid="tgcrawl"
                chevron
                onClick={() =>
                  window.Telegram.WebApp.openLink(
                    getFaqUrlByLanguageCode(languageCode),
                    { try_instant_view: true },
                  )
                }
                icon={
                  theme === 'apple' ? (
                    <ListItemIcon
                      type="iconWithBg"
                      className={themeClassName('icon')}
                    >
                      <FaqSVG className={themeClassName('iconColor')} />
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon
                      type="icon"
                      className={themeClassName('icon')}
                    >
                      <FaqMaterialSVG className={themeClassName('iconColor')} />
                    </ListItemIcon>
                  )
                }
              >
                <span className={themeClassName('menuText')}>
                  {t('p2p.home_page.faq')}
                </span>
              </ListItemCell>
            </Section>

            {theme === 'apple' && (
              <InlineLayout>
                <SectionHeader
                  className={styles.orderHistoryHeader}
                  action={SelectOrderHistoryStatus}
                >
                  {t('p2p.home_page.order_history').toLocaleUpperCase()}
                </SectionHeader>
              </InlineLayout>
            )}
            {theme === 'material' && (
              <Section
                className={styles.tabsWrapper}
                // Weird typescript error when it won't accept prop with the same type as in interface
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                action={SelectOrderHistoryStatus}
                title={t('p2p.home_page.order_history')}
              />
            )}
            <Section
              apple={{
                fill: isUserHasOrders ? 'secondary' : 'primary',
              }}
              separator
            >
              <Skeleton
                skeleton={
                  <div
                    className={styles.skeleton}
                    data-testid="tgcrawl"
                  >
                    <OrderItemSkeleton themeClassName={themeClassName} />
                  </div>
                }
                skeletonShown={isOrdersLoading}
              >
                {isOrdersLoading ? null : isUserHasOrders ? (
                  ordersData.pages.map(({ orders }, index) => (
                    <Fragment key={index}>
                      {orders.map((order, orderIndex) => (
                        <div
                          key={order.id}
                          className={themeClassName('orderHistoryItem')}
                          ref={(ref) => {
                            // if it's 5th last order in the last page, set ref
                            if (
                              index === ordersData.pages.length - 1 &&
                              orderIndex === orders.length - 5
                            ) {
                              pastOrderRef(ref);
                            }
                          }}
                        >
                          <DetailCell onClick={() => openOrderPage(order)}>
                            <div
                              className={classNames(
                                themeClassName('statusText'),
                                getStatusStyle(order.status),
                              )}
                              data-testid={`order-${order.id}-status`}
                            >
                              {t(
                                `p2p.order_status.code_${order.status}` as string,
                              )}
                            </div>
                            <div
                              className={themeClassName('title')}
                              data-testid={`order-${order.id}-title`}
                            >
                              {t(
                                order.seller?.userId === userId
                                  ? 'p2p.home_page.order_history_item_title_sell'
                                  : 'p2p.home_page.order_history_item_title_buy',
                                {
                                  cryptoAmount: printCryptoAmount({
                                    amount: Number(order.volume.amount),
                                    currency: order.volume
                                      .currencyCode as CryptoCurrency,
                                    languageCode,
                                    currencyDisplay: 'code',
                                  }),
                                  fiatAmount: printFiatAmount({
                                    amount: Number(order.amount.amount),
                                    currency: order.amount
                                      .currencyCode as FiatCurrency,
                                    languageCode,
                                    currencyDisplay: 'code',
                                  }),
                                },
                              )}
                            </div>
                            <div
                              className={themeClassName('text')}
                              data-testid={`order-${order.id}-payment-method`}
                            >
                              {t('p2p.home_page.payment_method', {
                                name: getPaymentMethodName(
                                  order.paymentDetails.paymentMethod,
                                ),
                              })}
                            </div>
                            <div
                              className={themeClassName('text')}
                              data-testid={`order-${order.id}-date`}
                            >
                              {`${printDate({
                                value: createdStatusDate(order),
                                t,
                                languageCode,
                              })} Â· #${order.number || 0}`}
                            </div>
                          </DetailCell>
                        </div>
                      ))}
                    </Fragment>
                  ))
                ) : (
                  <div className={themeClassName('emptyOrderHistory')}>
                    {t('p2p.home_page.empty_order_history')}
                  </div>
                )}
                {isUserHasOrders && isOrdersLoadingNextPage && (
                  <div className={styles.skeleton}>
                    <OrderItemSkeleton themeClassName={themeClassName} />
                  </div>
                )}
              </Skeleton>
            </Section>
          </>
        </Skeleton>
      </div>
    </Page>
  );
}
