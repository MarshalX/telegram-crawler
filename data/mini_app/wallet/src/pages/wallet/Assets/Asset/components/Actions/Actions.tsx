import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { RootState, useAppSelector } from 'store';

import MainActions from 'containers/common/MainActions/MainActions';

import ActionButton from 'components/ActionButton/ActionButton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { getCurrencyName, isTgTransferAllowed } from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import { useAsset } from 'hooks/common/useAsset';
import { useReceiveAvailability } from 'hooks/common/useReceiveAvailability';
import { useSendAvailability } from 'hooks/common/useSendAvailability';

import { ReactComponent as BuySVG } from 'images/buy.svg';
import { ReactComponent as ExchangeSVG } from 'images/exchange.svg';
import { ReactComponent as ReceiveSVG } from 'images/receive.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

export const Actions: FC<{
  assetCurrency: FrontendCryptoCurrencyEnum;
  className?: string;
}> = ({ assetCurrency, className }) => {
  const navigate = useNavigate();
  const snackbarContext = useContext(SnackbarContext);
  const { permissions, featureFlags } = useAppSelector(
    (state: RootState) => state.user,
  );
  const { addedToAttachmentMenu } = useAppSelector(
    (state: RootState) => state.session,
  );
  const asset = useAsset(assetCurrency);
  const isSendAvailable = useSendAvailability();
  const isReceiveAvailable = useReceiveAvailability();
  const { t } = useTranslation();

  const isBalanceZero = asset.balance === 0;

  const handleClickBuyButton = () => {
    navigate({
      pathname: routePaths.PURCHASE_OPTIONS,
      search: createSearchParams({ assetCurrency }).toString(),
    });
  };

  const showEmptyBalancePopup = () => {
    window.Telegram.WebApp.showPopup(
      {
        message:
          assetCurrency === 'USDT'
            ? t('asset.empty_balance_popup_message_dollars')
            : t('asset.empty_balance_popup_message', {
                currencyName: getCurrencyName({ currency: assetCurrency, t }),
              }),
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
          handleClickBuyButton();
        }
      },
    );
  };

  return (
    <MainActions className={className}>
      <ActionButton
        alternative
        Component="button"
        layout="vertical"
        mode="transparent"
        icon={<SendSVG />}
        data-testid="tgcrawl"
        onClick={() => {
          logEvent('Clicked send');
          if (isBalanceZero) {
            showEmptyBalancePopup();
          } else if (isSendAvailable()) {
            if (!isTgTransferAllowed(assetCurrency, featureFlags)) {
              navigate(
                generatePath(routePaths.RECEIVER_SEARCH, { assetCurrency }),
              );
            } else if (!addedToAttachmentMenu) {
              navigate({
                pathname: routePaths.ATTACHES_PROMO,
                search: createSearchParams({
                  target: routePaths.RECEIVER_SEARCH,
                  assetCurrency,
                }).toString(),
              });
            } else {
              navigate({
                pathname: routePaths.SEND_OPTIONS,
                search: createSearchParams({ assetCurrency }).toString(),
              });
            }
          }
        }}
      >
        {t('asset.send')}
      </ActionButton>
      <ActionButton
        alternative
        layout="vertical"
        mode="transparent"
        icon={<ReceiveSVG />}
        data-testid="tgcrawl"
        onClick={() => {
          logEvent('Clicked received button');
          if (isReceiveAvailable()) {
            navigate({
              pathname: routePaths.RECEIVE,
              search: createSearchParams({
                assetCurrency,
                freeze: 'true',
              }).toString(),
            });
          }
        }}
      >
        {t('asset.receive')}
      </ActionButton>
      <ActionButton
        alternative
        layout="vertical"
        mode="transparent"
        icon={<BuySVG />}
        onClick={handleClickBuyButton}
      >
        {t('asset.buy')}
      </ActionButton>
      <ActionButton
        alternative
        layout="vertical"
        mode="transparent"
        icon={<ExchangeSVG />}
        onClick={() => {
          if (isBalanceZero) {
            showEmptyBalancePopup();
          } else if (!permissions.canExchange) {
            snackbarContext.showSnackbar({
              snackbarId: 'exchange',
              before: <WarningSVG />,
              text: t('common.feature_is_blocked'),
              action: (
                <a href={WALLET_SUPPORT_BOT_LINK}>
                  {t('common.contact_support')}
                </a>
              ),
              actionPosition: 'bottom',
            });
          } else {
            navigate({
              pathname: routePaths.EXCHANGE,
              search: createSearchParams({
                payCurrency: assetCurrency,
              }).toString(),
            });
          }
        }}
      >
        {t('asset.exchange')}
      </ActionButton>
    </MainActions>
  );
};
