import { useCollectiblePreviewsNewest } from 'query/getGems/collectibles/collectiblePreviewsNewest';
import {
  SCWAsset,
  useAccountJettons,
  useAccountTonAsset,
} from 'query/scw/account';
import { useAccountEvents } from 'query/scw/account';
import { useBaseRate } from 'query/wallet/rates/useBaseRate';
import {
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { AccountEvent } from 'api/tonapi/generated/api';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { DEFAULT_FIAT_FRACTION } from 'config';

import { useAppSelector } from 'store';

import {
  addPendingTransaction,
  popTransactionRequest,
} from 'reducers/scw/scwSlice';

import { CollectiblesPageCard } from 'pages/collectibles/components/CollectiblesPageCard/CollectiblesPageCard';

import MainActions from 'containers/common/MainActions/MainActions';
import { SettingsCell } from 'containers/common/SettingsCell/SettingsCell';
import { ConfirmTransactionModal } from 'containers/scw/ConfirmTransactionModal/ConfirmTransactionModal';
import { ConnectModal } from 'containers/scw/ConnectModal/ConnectModal';
import { PageCard } from 'containers/scw/PageCard/PageCard';
import SCWProfileDisplay from 'containers/scw/ProfileDisplay/ProfileDisplay';
import { SCWEventCell } from 'containers/scw/SCWEventCell/SCWEventCell';

import ActionButton from 'components/ActionButton/ActionButton';
import Avatar from 'components/Avatar/Avatar';
import { AvatarSkeleton } from 'components/AvatarSkeleton/AvatarSkeleton';
import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { printCryptoAmount, printFiatAmount } from 'utils/common/currency';
import { getHttpImageUrl } from 'utils/common/image';
import { logEvent } from 'utils/common/logEvent';
import { multiply } from 'utils/common/math';
import { TON_BLOCK_TIME_MS } from 'utils/scw/ton';
import { TonConnectSSEBridge } from 'utils/scw/tonConnect/tonConnectSSEBridge';

import { usePrevious } from 'hooks/utils/usePrevious';
import { useRemoteBridge } from 'hooks/utils/useRemoteBridge';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BuySVG } from 'images/buy.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';
import { ReactComponent as WarningTriangleSVG } from 'images/warning_triangle.svg';

import styles from './Main.module.scss';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useRemoteBridge();

  const { themeClassName, theme } = useTheme(styles);
  const {
    address,
    transactionRequests = [],
    pendingTransactions = [],
  } = useAppSelector((state) => state.scw);
  const [hasPendingEvents, setHasPendingEvents] = useState(false);
  const { data: eventsData, dataUpdatedAt: eventsUpdatedAt } =
    useAccountEvents(hasPendingEvents);
  const eventsLastData = usePrevious(eventsData);
  const eventsLastUpdatedAt = usePrevious(eventsUpdatedAt);
  const events = eventsData ? eventsData.events : [];
  const { fiatCurrency, languageCode } = useAppSelector(
    (state) => state.settings,
  );
  const { featureFlags } = useAppSelector((state) => state.user);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: assets,
    isLoading: isJettonsLoading,
    refetchJettonBalances,
  } = useAccountJettons(address);
  const {
    data: tonAsset,
    isLoading: isTonLoading,
    refetch: refetchTon,
  } = useAccountTonAsset(address);
  const { refetch: refetchCollectibles } =
    useCollectiblePreviewsNewest(address);

  const refetchBalances = () => {
    // Dont retry on first update because other use hooks already fetch
    // so calling refetch would force duplicate query even if data not stale
    if (
      eventsLastUpdatedAt &&
      eventsLastUpdatedAt !== eventsUpdatedAt &&
      eventsData?.events &&
      eventsLastData?.events
    ) {
      // check for new finalized transactions
      // this prevents double query when new event is pending
      // then a second time when event is complete
      const hasPendingEvent = eventsData?.events.some(
        (event) => event.in_progress,
      );
      if (hasPendingEvent && !hasPendingEvents) {
        setHasPendingEvents(true);
        return;
      }

      const finalizedEventIds = eventsData?.events
        .filter((event) => !event.in_progress)
        .map((event) => event.event_id);
      const lastFinalizedEventIds = eventsLastData?.events
        .filter((event) => !event.in_progress)
        .map((event) => event.event_id);

      const hasNewFinalEvent = finalizedEventIds.some(
        (eventId) => !lastFinalizedEventIds?.includes(eventId),
      );

      if (hasNewFinalEvent) {
        refetchTon();
        refetchJettonBalances();
        // give getgems time to process block
        // and update balances
        setTimeout(() => {
          refetchCollectibles();
        }, TON_BLOCK_TIME_MS * 2);
        setHasPendingEvents(false);
      }
    }
  };

  // only refetch balances when event data changes,
  // not each time query result time is updated
  useEffect(() => {
    refetchBalances();
  }, [eventsData]);

  const { baseRate = 0 } = useBaseRate(FrontendCryptoCurrencyEnum.Ton);

  const snackbarContext = useContext(SnackbarContext);

  const [searchParams] = useSearchParams();
  const connectionRequest = {
    id: searchParams.get('id') || '',
    v: searchParams.get('v') || '',
    r: searchParams.get('r') || '',
    ret: searchParams.get('ret') || 'none',
  };

  const [showConnectModal, setShowConnectModal] = useState(
    !!connectionRequest.id && !!connectionRequest.v && !!connectionRequest.r,
  );
  const [confirmingTransaction, setConfirmingTransaction] = useState(false);
  const [rejectingTransaction, setRejectingTransaction] = useState(false);

  const totalTonBalance = useMemo(() => {
    if (!assets || !tonAsset) {
      return undefined;
    }
    return (
      assets?.reduce((prev, cur) => {
        return cur.tonBalance ? prev + cur.tonBalance : prev;
      }, 0) + tonAsset.balance
    );
  }, [assets, tonAsset]);

  const sortedAssets = useMemo(() => {
    return [...assets].sort(
      (a, b) => (b.tonBalance || 0) - (a.tonBalance || 0),
    );
  }, [assets]);

  const AssetCellSkeleton = () => (
    <Cell
      start={
        <Cell.Part type={'avatar'}>
          <AvatarSkeleton size={theme === 'apple' ? 40 : 46} />
        </Cell.Part>
      }
      end={<Cell.Text skeleton title />}
    >
      <Cell.Text skeleton description title />
    </Cell>
  );

  const AssetCell = ({
    asset,
    isLoading,
  }: {
    asset?: SCWAsset;
    isLoading?: boolean;
  }) => (
    <Skeleton skeletonShown={isLoading} skeleton={<AssetCellSkeleton />}>
      {asset && (
        <Cell
          onClick={() =>
            navigate(
              generatePath(routePaths.SCW_ASSET, {
                currency: asset.currency,
              }),
            )
          }
          tappable
          key={asset.address}
          start={
            <Cell.Part type={'avatar'}>
              <Avatar
                src={getHttpImageUrl(asset.image)}
                size={theme === 'apple' ? 40 : 46}
              />
            </Cell.Part>
          }
          end={
            <Cell.Text
              title={
                typeof asset.tonBalance === 'number' &&
                printFiatAmount({
                  amount: multiply(
                    baseRate,
                    asset.tonBalance,
                    DEFAULT_FIAT_FRACTION,
                  ),
                  languageCode: languageCode,
                  currency: fiatCurrency,
                })
              }
            />
          }
        >
          <Cell.Text
            title={
              <div className={styles.warning}>
                {typeof asset.tonBalance !== 'number' && (
                  <WarningTriangleSVG height={18} width={18} />
                )}
                {asset.name}
              </div>
            }
            description={printCryptoAmount({
              amount: asset.balance,
              languageCode,
              currencyDisplay: 'code',
              currency: asset.currency,
            })}
          />
        </Cell>
      )}
    </Skeleton>
  );

  const handleOnConnect = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      TonConnectSSEBridge.handleConnectDeeplink(connectionRequest)
        .then(() => {
          setShowConnectModal(false);
        })
        .catch(() => {
          snackbarContext.showSnackbar({
            onShow: () => {
              window.Telegram.WebApp.HapticFeedback.notificationOccurred(
                'error',
              );
            },
            snackbarId: 'tonconnect',
            icon: 'warning',
            text: t('scw.connect_modal.failed_to_connect'),
            shakeOnShow: true,
          });
          reject(false);
        })
        .finally(() => {
          resolve(true);
        });
    });
  };

  return (
    <Page mode="secondary" headerColor="#1c1c1e">
      <BackButton onClick={() => navigate(routePaths.MAIN)} />
      <section className={themeClassName('root')}>
        <SCWProfileDisplay allowCopy={true} />
        <MainActions
          className={themeClassName('actionsContainer')}
          dense={false}
        >
          <ActionButton
            Component="button"
            layout="horizontal"
            icon={<SendSVG />}
            data-testid="tgcrawl"
            mode="overlay"
            onClick={() => {
              logEvent('Clicked send', { action: 'scw' });
              if (!totalTonBalance) {
                window.Telegram.WebApp.showPopup(
                  {
                    message: t('scw.main.empty_balance_popup_message'),
                    buttons: [
                      {
                        id: 'cancel',
                        type: 'cancel',
                      },
                      {
                        id: 'ok',
                        type: 'ok',
                      },
                    ],
                  },
                  (id: string) => {
                    if (id === 'ok') {
                      navigate(routePaths.SCW_RECEIVE_OPTIONS);
                    }
                  },
                );
              } else if (assets.length > 0) {
                navigate(routePaths.SCW_CHOOSE_ASSET);
              } else {
                navigate({
                  pathname: generatePath(routePaths.SCW_RECEIVER_SEARCH),
                  search: createSearchParams({
                    assetCurrency: FrontendCryptoCurrencyEnum.Ton,
                  }).toString(),
                });
              }
            }}
          >
            {t('scw.main.send_button')}
          </ActionButton>
          <ActionButton
            Component="button"
            layout="horizontal"
            icon={<BuySVG />}
            data-testid="tgcrawl"
            mode="overlay"
            onClick={() => {
              logEvent('Clicked deposit', { action: 'scw' });
              navigate(routePaths.SCW_RECEIVE_OPTIONS);
            }}
          >
            {t('scw.main.deposit_button')}
          </ActionButton>
        </MainActions>
      </section>
      <div className={styles.content}>
        <PageCard
          title={t('scw.main.assets_title')}
          aside={
            typeof totalTonBalance === 'number' && (
              <Text
                material={{ variant: 'headline6', color: 'text' }}
                apple={{ variant: 'title3', weight: 'bold', color: 'text' }}
              >
                {printFiatAmount({
                  amount: multiply(
                    baseRate,
                    totalTonBalance,
                    DEFAULT_FIAT_FRACTION,
                  ),
                  currency: fiatCurrency,
                  languageCode,
                })}
              </Text>
            )
          }
        >
          <Cell.List>
            <AssetCell asset={tonAsset} isLoading={isTonLoading} />
            {isJettonsLoading ? (
              <>
                <AssetCellSkeleton />
                <AssetCellSkeleton />
              </>
            ) : (
              sortedAssets.map((asset) => (
                <AssetCell asset={asset} key={asset.address} />
              ))
            )}
          </Cell.List>
        </PageCard>
        {featureFlags.collectibles && <CollectiblesPageCard />}
        {(events.length || pendingTransactions.length) > 0 && (
          <PageCard title={t('scw.main.transaction_history')}>
            <Cell.List>
              {pendingTransactions.map((event) => (
                <SCWEventCell
                  event={event}
                  key={event.event_id}
                  pending={true}
                />
              ))}
              {events.map((event) => (
                <SCWEventCell event={event} key={event.event_id} />
              ))}
            </Cell.List>
          </PageCard>
        )}
        <PageCard>
          <SettingsCell to={routePaths.SCW_SETTINGS} />
        </PageCard>
      </div>
      {showConnectModal && (
        <ConnectModal
          params={searchParams}
          address={address}
          onConnect={handleOnConnect}
          onClose={() => {
            setShowConnectModal(false);
          }}
        />
      )}
      {!showConnectModal && transactionRequests.length > 0 && (
        <ConfirmTransactionModal
          transactionRequest={transactionRequests[0]}
          isConfirming={confirmingTransaction}
          isRejecting={rejectingTransaction}
          onConfirm={async (event: AccountEvent) => {
            setConfirmingTransaction(true);
            await TonConnectSSEBridge.signTransactionRequest(
              transactionRequests[0].clientSessionId,
              transactionRequests[0].request,
            )
              .then(() => {
                dispatch(addPendingTransaction(event));
                dispatch(popTransactionRequest());
                TonConnectSSEBridge.handleRedirect(
                  transactionRequests[0].clientSessionId,
                );
              })
              .catch(() => {
                snackbarContext.showSnackbar({
                  icon: 'warning',
                  text: t('scw.failed_to_send_transaction'),
                });
              })
              .finally(() => {
                setConfirmingTransaction(false);
              });
          }}
          onClose={async () => {
            setRejectingTransaction(true);
            await TonConnectSSEBridge.rejectTransactionRequest(
              transactionRequests[0].clientSessionId,
              transactionRequests[0].request,
            )
              .catch(() => {
                console.error('Failed to reject transaction');
              })
              .finally(() => {
                dispatch(popTransactionRequest());
                setRejectingTransaction(false);
              });
          }}
        />
      )}
    </Page>
  );
};

export default memo(Main);
