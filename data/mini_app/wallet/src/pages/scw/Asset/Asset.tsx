import { useAccountJettons, useAccountTonAsset } from 'query/scw/account';
import { useAccountEventsByCurrency } from 'query/scw/account';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { AccountEvent, ActionTypeEnum } from 'api/tonapi/generated';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import RoutePaths from 'routePaths';
import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import MainActions from 'containers/common/MainActions/MainActions';
import { PageCard } from 'containers/scw/PageCard/PageCard';
import { SCWEventCell } from 'containers/scw/SCWEventCell/SCWEventCell';

import ActionButton from 'components/ActionButton/ActionButton';
import Avatar from 'components/Avatar/Avatar';
import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { printCryptoAmount } from 'utils/common/currency';
import { getHttpImageUrl } from 'utils/common/image';
import { logEvent } from 'utils/common/logEvent';

import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BuySVG } from 'images/buy.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';
import { ReactComponent as WarningTriangleSVG } from 'images/warning_triangle.svg';

import s from './Asset.module.scss';

const filterEventsByAsset = (events: AccountEvent[], asset: string) => {
  return events.filter((event) => {
    if (asset === FrontendCryptoCurrencyEnum.Ton) {
      return event.actions[0].type === ActionTypeEnum.TonTransfer;
    } else {
      return (
        event.actions[0].type === ActionTypeEnum.JettonTransfer &&
        event.actions[0].JettonTransfer?.jetton?.symbol === asset
      );
    }
  });
};

const Asset = () => {
  const { currency } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { themeClassName } = useTheme(s);
  const languageCode = useLanguage();
  const { pendingTransactions = [] } = useAppSelector((state) => state.scw);

  const { data: assets, isLoading: isJettonsLoading } = useAccountJettons();
  const { data: tonAsset, isLoading: isTonLoading } = useAccountTonAsset();

  const assetEvents = useAccountEventsByCurrency(currency || '');
  const isTon = currency === 'TON';

  const assetPendingTransactions = useMemo(() => {
    return filterEventsByAsset(pendingTransactions, currency || '');
  }, [pendingTransactions, currency]);

  // TODO: add skeletons
  if (isJettonsLoading || (isTonLoading && isTon)) {
    return null;
  }

  const asset = isTon
    ? tonAsset
    : assets?.find((item) => item.currency === currency);

  if (!asset) {
    return <Navigate to={RoutePaths.SCW_MAIN} replace={true} />;
  }

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={themeClassName('root')}>
        <Avatar size={88} src={getHttpImageUrl(asset.image)} />
        <Text
          apple={{ variant: 'body', weight: 'medium', color: 'overlay' }}
          material={{ variant: 'body', color: 'overlay', weight: 'regular' }}
          className={themeClassName('assetName')}
        >
          {t('scw.asset.currency_balance', { currency: asset.name })}
        </Text>
        <Text
          apple={{ variant: 'title1', color: 'overlay', rounded: true }}
          material={{
            variant: 'headline5',
            color: 'overlay',
          }}
        >
          {printCryptoAmount({
            amount: asset.balance,
            currency: asset.currency,
            languageCode,
            currencyDisplay: 'code',
          })}
        </Text>
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
              if (asset.balance === 0) {
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
              } else if (asset.currency === FrontendCryptoCurrencyEnum.Ton) {
                navigate(routePaths.SCW_SEND_TON_OPTIONS);
              } else {
                navigate({
                  pathname: routePaths.SCW_RECEIVER_SEARCH,
                  search: createSearchParams({
                    assetCurrency: asset.currency,
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
      </div>
      <div className={s.content}>
        {asset.tonBalance === undefined && (
          <PageCard>
            <div className={s.warningWrapper}>
              <WarningTriangleSVG height={28} width={28} />
              <Text
                apple={{ variant: 'body', weight: 'regular' }}
                material={{ variant: 'body', weight: 'regular' }}
              >
                {t('scw.asset.no_much_jetton_info_warning')}
              </Text>
            </div>
          </PageCard>
        )}
        {(assetEvents.length > 0 || assetPendingTransactions.length > 0) && (
          <PageCard title={t('scw.asset.activity')}>
            <Cell.List>
              {assetPendingTransactions.map((event) => (
                <SCWEventCell
                  event={event}
                  key={event.event_id}
                  pending={true}
                />
              ))}
              {assetEvents.map((event) => (
                <SCWEventCell event={event} key={event.event_id} />
              ))}
            </Cell.List>
          </PageCard>
        )}
      </div>
    </Page>
  );
};

export default Asset;
