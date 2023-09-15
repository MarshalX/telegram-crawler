import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { RootState, useAppSelector } from 'store';

import MainActions from 'containers/common/MainActions/MainActions';

import ActionButton from 'components/ActionButton/ActionButton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { logEvent } from 'utils/common/logEvent';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useSendAvailability } from 'hooks/common/useSendAvailability';

import { ReactComponent as CreditCardSVG } from 'images/credit_card.svg';
import { ReactComponent as ExchangeSVG } from 'images/exchange.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';
import { ReactComponent as WarningSVG } from 'images/warning.svg';

export const Actions: FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  const snackbarContext = useContext(SnackbarContext);
  const { permissions } = useAppSelector((state: RootState) => state.user);
  const { addedToAttachmentMenu } = useAppSelector(
    (state: RootState) => state.session,
  );

  const isBalanceZero = useAppSelector(
    (state) => !state.wallet.assets.some((asset) => asset.balance > 0),
  );
  const isPurchaseAvailable = usePurchaseAvailability();
  const isSendAvailable = useSendAvailability();
  const { t } = useTranslation();

  const handleClickBuyButton = () => {
    if (isPurchaseAvailable()) {
      navigate({
        pathname: routePaths.PURCHASE_OPTIONS,
      });
    }
  };

  const handleClickP2PButton = () => {
    logEvent('Market opened', {
      category: 'p2p',
      source: 'WV',
    });
    if (isBalanceZero) {
      showEmptyBalancePopup();
    } else {
      window.Telegram.WebApp.expand();

      navigate({
        pathname: routePaths.P2P_HOME,
        search: createSearchParams({
          highlight: 'sell',
          type: 'PURCHASE',
        }).toString(),
      });
    }
  };

  const showEmptyBalancePopup = () => {
    window.Telegram.WebApp.showPopup(
      {
        message: t('main.empty_balance_popup_message'),
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
            if (!addedToAttachmentMenu) {
              navigate({
                pathname: routePaths.ATTACHES_PROMO,
                search: createSearchParams({
                  target: routePaths.CHOOSE_ASSET,
                }).toString(),
              });
            } else {
              navigate(generatePath(routePaths.SEND_OPTIONS));
            }
          }
        }}
      >
        {t('main.send')}
      </ActionButton>
      <ActionButton
        alternative
        layout={'vertical'}
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
            navigate(routePaths.EXCHANGE);
          }
        }}
      >
        {t('main.exchange')}
      </ActionButton>
      <ActionButton
        alternative
        layout="vertical"
        mode="transparent"
        icon={<CreditCardSVG />}
        onClick={handleClickP2PButton}
      >
        {t('main.sell')}
      </ActionButton>
    </MainActions>
  );
};
