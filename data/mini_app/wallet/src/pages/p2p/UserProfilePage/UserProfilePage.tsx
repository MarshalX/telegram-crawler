import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { queryKeys } from 'query/queryKeys';
import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';
import {
  BaseOfferRestDtoStatusEnum,
  BaseOfferRestDtoTypeEnum,
  UserPrivateMyBuyOffersListRestDto,
  UserPrivateMyOffersListRestDto,
  UserPrivateMySellOffersListRestDto,
} from 'api/p2p/generated-common';
import { CryptoCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { DEPRECATED_P2P_PAYMENT_METHODS } from 'config';
import { P2P_CRYPTO_CURRENCIES_MULTICURRENCY } from 'config';

import { RootState, useAppDispatch, useAppSelector } from 'store';

import { setP2P } from 'reducers/p2p/p2pSlice';

import OfferCard from 'containers/p2p/OfferCard/OfferCard';
import OfferCardSkeleton from 'containers/p2p/OfferCard/OfferCardSkeleton';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { BackButton } from 'components/BackButton/BackButton';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import { ListItemIcon } from 'components/Cells/ListItemCell/ListItemIcon';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import SegmentedControl from 'components/SegmentedControl/SegmentedControl';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Switch } from 'components/Switch/Switch';
import { Tabs } from 'components/Tabs/Tabs';
import Tappable from 'components/Tappable/Tappable';

import { printNumber } from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import {
  useActivateOffer,
  useGetPaymentMethodName,
  useSnackbarForBannedUser,
  useUserStats,
} from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ApplePaymentCardSVG } from 'images/payment_card.svg';
import { ReactComponent as PlusSVG } from 'images/plus.svg';
import { ReactComponent as MaterialPaymentCardSVG } from 'images/settings.svg';
import { ReactComponent as AppleTradesSVG } from 'images/trades.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './UserProfilePage.module.scss';
import { ReactComponent as MaterialTradesSVG } from './arrows.svg';

function UserProfilePage() {
  const { languageCode } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbarContext = useContext(SnackbarContext);

  const activateOffer = useActivateOffer();
  const getPaymentMethodName = useGetPaymentMethodName();
  const { userId, displayNickname, avatarCode, canUseP2p, isBanned } =
    useSelector((state: RootState) => state.p2pUser);
  const { createOfferTypeInUserProfile } = useAppSelector((state) => state.p2p);

  const isUserBlocked = userId && (!canUseP2p || isBanned);

  const { isUserDismissedStartTradesModal, profilePageLastYScrollPosition } =
    useAppSelector((state) => state.p2p);

  const [searchParams] = useSearchParams();
  const isRestoreYScrollPosition = searchParams.get('isRestoreYScrollPosition');

  const handleNavigateToPayments = () => {
    if (isUserBlocked) {
      navigate(routePaths.P2P_UNAVAILABLE);
    } else {
      navigate(routePaths.P2P_USER_PAYMENTS);
    }
  };

  const { showSnackbarForBannedUser } = useSnackbarForBannedUser();

  const handleCreateAdClick = () => {
    if (isUserBlocked) {
      showSnackbarForBannedUser();

      return;
    }

    const searchParams: {
      cameFrom: 'profile' | 'home';
      offerType: BaseOfferRestDtoTypeEnum;
    } = {
      cameFrom: 'profile',
      offerType: createOfferTypeInUserProfile,
    };

    navigate({
      pathname: routePaths.P2P_OFFER_CREATE,
      search: createSearchParams(searchParams).toString(),
    });
  };

  const queryClient = useQueryClient();

  const { data: isBiddingEnabled = true } = useQuery({
    queryKey: ['getBiddingSettings'],
    queryFn: async () => {
      const { data } = await API.UserSettings.getBiddingSettingsV2();

      if (data.status === 'SUCCESS') {
        return !!data.data?.isBiddingEnabled;
      } else {
        console.error(data);
      }
    },
  });

  const startTrades = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error('No userId presented');
      }

      const { data } = await API.UserSettings.enableBiddingV2();

      return data;
    },
    onMutate: () => {
      queryClient.setQueryData(['getBiddingSettings'], true);
    },
    onSuccess: (data) => {
      if (data.status !== 'SUCCESS') {
        queryClient.setQueryData(['getBiddingSettings'], false);
      }

      if (data.status === 'SUCCESS') {
        snackbarContext.showSnackbar({
          snackbarId: 'trades_are_launched',
          action: (
            <div onClick={() => stopTrades.mutate()}>
              {t('p2p.user_profile.undo')}
            </div>
          ),
          title: t('p2p.user_profile.trades_are_launched'),
          text: t('p2p.user_profile.trades_are_launched_description'),
        });
      }
    },
    onError: (error) => {
      queryClient.setQueryData(['getBiddingSettings'], false);
      console.error(error);
    },
  });

  const stopTrades = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error('No userId presented');
      }

      const { data } = await API.UserSettings.disableBiddingV2();

      return data;
    },
    onMutate: () => {
      queryClient.setQueryData(['getBiddingSettings'], false);
    },
    onSuccess: (data) => {
      if (data.status !== 'SUCCESS') {
        queryClient.setQueryData(['getBiddingSettings'], true);
      }

      if (data.status === 'SUCCESS') {
        snackbarContext.showSnackbar({
          snackbarId: 'trades_are_stopped',
          action: (
            <div onClick={() => startTrades.mutate()}>
              {t('p2p.user_profile.undo')}
            </div>
          ),
          title: t('p2p.user_profile.trades_are_stopped'),
          text: t('p2p.user_profile.trades_are_stopped_description'),
        });
      }
    },
    onError: (error) => {
      queryClient.setQueryData(['getBiddingSettings'], true);
      console.error(error);
    },
  });

  const { prevLocation } = useAppSelector((state) => state.location);
  const location = useLocation();

  const isSameLocation = prevLocation?.pathname === location.pathname;

  const [isCacheCleaned, setIsCacheCleaned] = useState(false);

  useEffect(() => {
    const routesFromWhichNotToCleanCache = [
      routePaths.P2P_OFFER_PREVIEW,
      routePaths.P2P_OFFER_CREATE,
      routePaths.P2P_OFFER_EDIT,
    ];

    const isRemoveOrdersHistoryCache =
      !isSameLocation &&
      !routesFromWhichNotToCleanCache.some(
        (route) => !!matchPath(route, prevLocation?.pathname || ''),
      );

    if (isRemoveOrdersHistoryCache) {
      queryClient.setQueryData(
        queryKeys.getOffersByUserIdQueryKey({
          userId,
          offerType: createOfferTypeInUserProfile,
        }),
        (prev?: {
          pages: (
            | UserPrivateMyBuyOffersListRestDto
            | UserPrivateMySellOffersListRestDto
          )[][];
          pageParams: number[];
        }) => {
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

    setIsCacheCleaned(true);
  }, [
    createOfferTypeInUserProfile,
    isSameLocation,
    prevLocation?.pathname,
    queryClient,
    userId,
  ]);

  const {
    data: offersData,
    isLoading: isOffersLoading,
    isFetchingNextPage: isOffersLoadingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    enabled: isCacheCleaned,
    queryKey: queryKeys.getOffersByUserIdQueryKey({
      userId,
      offerType: createOfferTypeInUserProfile,
    }),
    queryFn: async ({ pageParam: offset = 0, signal }) => {
      const LIMIT = 10;

      const { data } = await API.Offer.getOffersByUserIdV2(
        {
          offset: offset || 0,
          limit: LIMIT,
          offerType: createOfferTypeInUserProfile,
        },
        {
          signal,
        },
      );

      if (data.status === 'SUCCESS') {
        return {
          offers:
            data.data
              ?.filter((offer) => {
                if ('paymentDetails' in offer) {
                  return !offer.paymentDetails.some((paymentDetail) => {
                    return DEPRECATED_P2P_PAYMENT_METHODS.includes(
                      paymentDetail.paymentMethod.code,
                    );
                  });
                } else if ('paymentMethods' in offer) {
                  return !offer.paymentMethods.some((paymentMethod) => {
                    return DEPRECATED_P2P_PAYMENT_METHODS.includes(
                      paymentMethod.code,
                    );
                  });
                }
              })
              // TODO: remove after backend will remove USD WT-3664
              ?.filter((offer) => {
                if (
                  offer.status === 'DEACTIVATING' ||
                  offer.status === 'DELETED' ||
                  offer.status === 'INACTIVE'
                ) {
                  return offer.price.quoteCurrencyCode !== 'USD';
                }

                return true;
              }) || [],
          nextOffset: offset + LIMIT,
        };
      }

      return {
        offers: [],
        nextOffset: 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset || 0,
    onError: (error) => {
      console.error(error);
    },
    cacheTime: 60 * 1000,
  });

  useLayoutEffect(() => {
    // restore scroll position
    if (isRestoreYScrollPosition && profilePageLastYScrollPosition) {
      window.scrollTo(0, profilePageLastYScrollPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      dispatch(
        setP2P({
          profilePageLastYScrollPosition: window.scrollY,
        }),
      );
    };
  }, []);

  const handleStartOffer = useMutation({
    mutationFn: async ({
      id: offerId,
      type,
      price,
    }:
      | UserPrivateMyBuyOffersListRestDto
      | UserPrivateMySellOffersListRestDto) => {
      if (!isBiddingEnabled && !isUserDismissedStartTradesModal) {
        window.Telegram.WebApp.showPopup(
          {
            message: t(`p2p.do_you_want_to_start_trades`),
            buttons: [
              {
                id: 'cancel',
                text: t(`common.cancel`),
              },
              {
                id: 'confirm',
                text: t(`p2p.start_trades`),
              },
            ],
          },
          async (id: string) => {
            if (id !== 'confirm') {
              dispatch(
                setP2P({
                  isUserDismissedStartTradesModal: true,
                }),
              );

              return;
            }

            startTrades.mutate();
          },
        );
      }

      if (isUserBlocked) {
        showSnackbarForBannedUser();

        return;
      }

      return await activateOffer({
        offerType: type,
        offerId,
        baseCurrencyCode: price.baseCurrencyCode as CryptoCurrency,
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables) => {
      const { id } = variables;

      if (data?.status === 'SUCCESS') {
        queryClient.setQueryData(
          queryKeys.getOffersByUserIdQueryKey({
            userId,
            offerType: createOfferTypeInUserProfile,
          }),
          {
            ...offersData,
            pages: (offersData?.pages || []).map(({ offers, ...other }) => ({
              ...other,
              offers: offers.map((offer) => {
                if (offer.id === id) {
                  return {
                    ...offer,
                    status: BaseOfferRestDtoStatusEnum.Active,
                  };
                }
                return offer;
              }),
            })),
          },
        );

        logEvent('Ad activated', {
          category: 'p2p.merchant',
        });
      }
    },
  });

  const handleStopOffer = useMutation({
    mutationFn: async ({
      id: offerId,
      type,
    }: UserPrivateMyOffersListRestDto) => {
      const { data } = await API.Offer.deactivateOfferV2({ offerId, type });

      return data;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables) => {
      const { id } = variables;

      if (data.status === 'SUCCESS') {
        queryClient.setQueryData(
          queryKeys.getOffersByUserIdQueryKey({
            userId,
            offerType: createOfferTypeInUserProfile,
          }),
          {
            ...offersData,
            pages: (offersData?.pages || []).map(({ offers, ...other }) => ({
              ...other,
              offers: offers.map((offer) => {
                if (offer.id === id) {
                  return {
                    ...offer,
                    status: BaseOfferRestDtoStatusEnum.Inactive,
                  };
                }
                return offer;
              }),
            })),
          },
        );

        logEvent('Ad deactivated', {
          category: 'p2p.merchant',
        });
      }

      if (data.status === 'INCOMPLETE_ACCEPTED_ORDERS') {
        snackbarContext.showSnackbar({
          snackbarId: 'offer_deactivate_error',
          before: <WarningSVG />,
          text: t('p2p.user_profile.funds_release_failed'),
        });
      }
    },
  });

  const isUpdatingStatus =
    handleStartOffer.isLoading || handleStopOffer.isLoading;

  const { data: stats } = useUserStats();

  const handleToggleStartTrades = () => {
    if (isUserBlocked) {
      showSnackbarForBannedUser();

      return;
    }

    if (isBiddingEnabled) {
      stopTrades.mutate();
    } else {
      startTrades.mutate();
    }
  };

  const handleNavigateToEditOffer = (id: string) => () => {
    if (isUserBlocked) {
      showSnackbarForBannedUser();

      return;
    }

    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_EDIT, { id }),
      search: createSearchParams({
        cameFrom: 'profile',
      }).toString(),
    });
  };

  const header = (
    <div className={themeClassName('header')}>
      <AliasAvatar
        size={92}
        id={Number(userId)}
        avatarCode={avatarCode}
        loading={!avatarCode}
      />
      <h1 className={themeClassName('name')}>{displayNickname}</h1>
      <p className={themeClassName('nameDescription')}>
        {t('p2p.user_profile.avatar_description')}
      </p>
    </div>
  );

  const statistic = (
    <div className={themeClassName('statistic')}>
      <div className={themeClassName('card')}>
        <p data-testid="tgcrawl" className={themeClassName('title')}>
          {printNumber({ value: stats.totalOrdersCount, languageCode })}
        </p>
        <p className={themeClassName('description')}>
          {t('p2p.user_profile.trades_count_description')}
        </p>
      </div>
      <div className={themeClassName('card')}>
        <p data-testid="tgcrawl" className={themeClassName('title')}>
          {printNumber({
            value: stats.successPercent,
            languageCode,
            options: {
              maximumFractionDigits: 2,
            },
          })}
          %
        </p>
        <p className={themeClassName('description')}>
          {t('p2p.user_profile.trades_percent_description')}
        </p>
      </div>
    </div>
  );

  const { ref: pastOfferRef } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  const isUserHasOffers =
    offersData &&
    offersData.pages?.length > 0 &&
    offersData.pages[0].offers.length > 0;

  const createAdSection = (
    <Section
      title={theme === 'material' ? t('p2p.user_profile.your_ads') : undefined}
      className={themeClassName('createAdButtonSection')}
      separator={theme === 'material'}
    >
      <ListItemCell
        onClick={handleCreateAdClick}
        icon={
          <ListItemIcon type="icon">
            <PlusSVG
              className={styles.icon}
              style={{ position: 'absolute', top: -14.5 }}
            />
          </ListItemIcon>
        }
      >
        {t('p2p.user_profile.create_ad')}
      </ListItemCell>
    </Section>
  );

  return (
    <Page mode="secondary">
      <BackButton onClick={() => navigate(generatePath(routePaths.P2P_HOME))} />
      <div className={themeClassName('root')}>
        {theme === 'apple' ? header : <Section separator>{header}</Section>}
        {theme === 'apple' ? (
          <InlineLayout>{statistic}</InlineLayout>
        ) : (
          <Section separator>{statistic}</Section>
        )}
        <Section separator={theme === 'material'}>
          <ListItemCell
            onClick={handleNavigateToPayments}
            icon={
              theme === 'apple' ? (
                <ListItemIcon type="iconWithBg">
                  <ApplePaymentCardSVG className={themeClassName('icon')} />
                </ListItemIcon>
              ) : (
                <ListItemIcon type="icon">
                  <MaterialPaymentCardSVG className={themeClassName('icon')} />
                </ListItemIcon>
              )
            }
            chevron
          >
            <div className={themeClassName('menuItemText')}>
              {t('p2p.user_profile.payment_settings')}
            </div>
          </ListItemCell>
          <ListItemCell
            icon={
              theme === 'apple' ? (
                <ListItemIcon type="iconWithBg">
                  <AppleTradesSVG className={themeClassName('icon')} />
                </ListItemIcon>
              ) : (
                <ListItemIcon type="icon">
                  <MaterialTradesSVG className={themeClassName('icon')} />
                </ListItemIcon>
              )
            }
            after={
              <div className={styles.switchWrapper}>
                <Switch
                  data-testid="tgcrawl"
                  className={themeClassName('switch')}
                  checked={isBiddingEnabled}
                  onChange={handleToggleStartTrades}
                />
              </div>
            }
          >
            <div className={themeClassName('menuItemText')}>
              {t('p2p.user_profile.trades')}
            </div>
          </ListItemCell>
        </Section>
        {theme === 'material' && createAdSection}
        {theme === 'apple' && (
          <InlineLayout
            className={themeClassName('offerTypeSegmentedControlContainer')}
          >
            <SectionHeader className={themeClassName('yourAdsTitle')}>
              {t('p2p.user_profile.your_ads')}
            </SectionHeader>
            <SegmentedControl
              items={[
                t('p2p.user_profile.purchase'),
                t('p2p.user_profile.sale'),
              ]}
              onChange={(index) => {
                dispatch(
                  setP2P({
                    createOfferTypeInUserProfile:
                      index === 0 ? 'PURCHASE' : 'SALE',
                  }),
                );
              }}
              activeItemIndex={
                createOfferTypeInUserProfile === 'PURCHASE' ? 0 : 1
              }
            />
          </InlineLayout>
        )}
        {theme === 'material' && (
          <Section className={styles.tabsWrapper}>
            <Tabs
              tabs={[
                t('p2p.user_profile.purchase'),
                t('p2p.user_profile.sale'),
              ]}
              activeTabIndex={
                createOfferTypeInUserProfile === 'PURCHASE' ? 0 : 1
              }
              onChange={(index) => {
                dispatch(
                  setP2P({
                    createOfferTypeInUserProfile:
                      index === 0 ? 'PURCHASE' : 'SALE',
                  }),
                );
              }}
            />
          </Section>
        )}
        {theme === 'apple' &&
          !isOffersLoading &&
          !isUserHasOffers &&
          createAdSection}
        {isOffersLoading ? (
          <>
            <OfferCardSkeleton isBuySellButtonsShown={false} />
            <OfferCardSkeleton
              className={themeClassName('offer')}
              isBuySellButtonsShown={false}
            />
            <OfferCardSkeleton
              className={themeClassName('offer')}
              isBuySellButtonsShown={false}
            />
          </>
        ) : isUserHasOffers ? (
          offersData.pages.map(({ offers }, index) => (
            <Fragment key={index}>
              {offers.map((offer, offerIndex) => (
                <OfferCard
                  ref={(ref) => {
                    // if it's 5th last offer in the last page, set ref
                    if (
                      index === offersData.pages.length - 1 &&
                      offerIndex === offers.length - 5
                    ) {
                      pastOfferRef(ref);
                    }
                  }}
                  top={
                    index === 0 && offerIndex === 0 && theme === 'apple' ? (
                      <Tappable
                        Component={'button'}
                        onClick={handleCreateAdClick}
                        rootClassName={classNames(
                          themeClassName('createAdButtonRootApple'),
                        )}
                        className={classNames(
                          themeClassName('createAdButtonApple'),
                        )}
                      >
                        <PlusSVG />
                        <p
                          className={classNames(
                            themeClassName('createAdButtonTextApple'),
                          )}
                        >
                          {t('p2p.user_profile.create_ad')}
                        </p>
                      </Tappable>
                    ) : null
                  }
                  className={themeClassName('offerCard')}
                  key={`${offer.id}${index}`}
                  id={String(offer.id)}
                  tradesCount={stats.totalOrdersCount}
                  successPercent={stats.successPercent}
                  userId={Number(userId || 0)}
                  baseCurrencyCode={
                    offer.price
                      .baseCurrencyCode as keyof typeof P2P_CRYPTO_CURRENCIES_MULTICURRENCY
                  }
                  quoteCurrencyCode={offer.price.quoteCurrencyCode}
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
                      : 'paymentMethods' in offer
                      ? offer.paymentMethods.map((paymentMethod) =>
                          getPaymentMethodName(paymentMethod),
                        )
                      : []
                  }
                  isBuySellButtonsShown={false}
                  isUserInfoShown={false}
                  bottom={
                    (offer.status === BaseOfferRestDtoStatusEnum.Inactive ||
                      offer.status === BaseOfferRestDtoStatusEnum.Active) && (
                      <div className={styles.actionButtons}>
                        <Tappable
                          Component={'button'}
                          onClick={handleNavigateToEditOffer(String(offer.id))}
                          rootClassName={classNames(
                            themeClassName('actionButton'),
                            styles.confirm,
                          )}
                        >
                          {t('p2p.user_profile.edit')}
                        </Tappable>
                        <div className={styles.verticalDivider}></div>
                        {offer.status === BaseOfferRestDtoStatusEnum.Active && (
                          <Tappable
                            Component={'button'}
                            onClick={() => handleStopOffer.mutate(offer)}
                            disabled={isUpdatingStatus}
                            rootClassName={classNames(
                              themeClassName('actionButton'),
                              styles.stop,
                            )}
                          >
                            {t('p2p.user_profile.stop')}
                          </Tappable>
                        )}
                        {offer.status ===
                          BaseOfferRestDtoStatusEnum.Inactive && (
                          <Tappable
                            Component={'button'}
                            onClick={() => handleStartOffer.mutate(offer)}
                            disabled={isUpdatingStatus}
                            rootClassName={classNames(
                              themeClassName('actionButton'),
                              styles.confirm,
                            )}
                          >
                            {t('p2p.user_profile.start')}
                          </Tappable>
                        )}
                      </div>
                    )
                  }
                  onBuyClick={() => {
                    navigate({
                      pathname: generatePath(routePaths.P2P_OFFER_PREVIEW, {
                        id: String(offer.id),
                      }),
                      search: createSearchParams({
                        backButton: routePaths.P2P_USER_PROFILE,
                        isRestoreYScrollPosition: String(true),
                        cameFrom: 'profile',
                      }).toString(),
                    });
                  }}
                  separator={theme === 'material'}
                  offerType={offer.type}
                />
              ))}
            </Fragment>
          ))
        ) : (
          <Section>
            <div className={themeClassName('noAdsWrapper')}>
              {t('p2p.user_profile.no_ads')}
            </div>
          </Section>
        )}

        {isUserHasOffers && isOffersLoadingNextPage && <OfferCardSkeleton />}
      </div>
    </Page>
  );
}

export default UserProfilePage;
