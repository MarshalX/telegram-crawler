import { useUsdtRuffle } from 'query/wallet/ruffle/useUsdtRuffle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import RoutePaths from 'routePaths';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { useAppDispatch, useAppSelector } from 'store';

import { setFilters } from 'reducers/p2p/domSlice';
import { selectIsReceiverValid } from 'reducers/session/sessionSlice';

import { CallToActionCell } from 'containers/wallet/CallToActionCell/CallToActionCell';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { generateTelegramLink } from 'utils/common/common';
import { generateStartAttach } from 'utils/common/startattach';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CardSVG } from 'images/credit_card.svg';
import { ReactComponent as ExchangeSVG } from 'images/exchange.svg';
import { ReactComponent as MarketSVG } from 'images/market.svg';
import { ReactComponent as DepositSVG } from 'images/receive.svg';
import { ReactComponent as SendSVG } from 'images/send.svg';

import styles from './UsdtRuffleGetMore.module.scss';

export const UsdtRuffleGetMore: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const isPurchaseAvailable = usePurchaseAvailability();
  const isAllBalanceZero = useAppSelector(
    (state) =>
      state.wallet.assets.reduce((acc, asset) => acc + asset.balance, 0) === 0,
  );
  const { permissions, purchaseByCard } = useAppSelector((state) => state.user);

  const {
    settings: { data: ruffleSettings, isLoading },
  } = useUsdtRuffle();
  const { settingsPerTask } = ruffleSettings ?? {};

  const handleClickBuyButton = () => {
    if (isPurchaseAvailable()) {
      navigate(
        generatePath(RoutePaths.PURCHASE, {
          assetCurrency: FrontendCryptoCurrencyEnum.Usdt,
        }),
      );
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { botUsername } = useAppSelector((state) => state.wallet);
  const isReceiverValid = useAppSelector((state) =>
    selectIsReceiverValid(state),
  );

  const handleDeposit = () => {
    if (!permissions.canReceive) {
      snackbarContext.showSnackbar({
        snackbarId: 'receive_unavailable',
        icon: 'warning',
        text: t('common.feature_is_blocked'),
        action: (
          <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact_support')}</a>
        ),
        actionPosition: 'bottom',
      });

      return;
    }

    navigate({
      pathname: generatePath(RoutePaths.CHOOSE_ASSET, { type: 'receive' }),
    });
  };

  const handleSend = () => {
    if (isAllBalanceZero) {
      showEmptyBalancePopup();
      return;
    }

    if (!permissions.canWithdrawInner) {
      snackbarContext.showSnackbar({
        snackbarId: 'send_unavailable',
        icon: 'warning',
        text: t('common.feature_is_blocked'),
        action: (
          <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact_support')}</a>
        ),
        actionPosition: 'bottom',
      });

      return;
    }

    if (isReceiverValid) {
      navigate({
        pathname: generatePath(RoutePaths.CHOOSE_ASSET, { type: 'send' }),
      });
    } else {
      window.Telegram.WebApp.openTelegramLink(
        generateTelegramLink(botUsername, {
          startattach: generateStartAttach('send', {
            assetCurrency: FrontendCryptoCurrencyEnum.Usdt,
          }),
          choose: 'users',
        }),
      );
    }
  };

  const snackbarContext = useContext(SnackbarContext);

  const handlePurchase = () => {
    if (purchaseByCard && !purchaseByCard?.available) {
      const resolvePaymentMethodDisableCode = (
        code?: string,
      ): 'country_code_is_forbidden' | 'unavailable' => {
        if (code === 'country_code_is_forbidden') {
          return 'country_code_is_forbidden';
        } else {
          return 'unavailable';
        }
      };

      snackbarContext.showSnackbar({
        snackbarId: 'purchase_unavailable',
        icon: 'warning',
        text:
          resolvePaymentMethodDisableCode(purchaseByCard.code) ===
          'country_code_is_forbidden'
            ? t('buy.country_code_is_forbidden')
            : t('buy.unavailable'),
      });
      return;
    }

    navigate({
      pathname: generatePath(RoutePaths.CHOOSE_ASSET, { type: 'purchase' }),
    });
  };

  const handleP2PPurchase = () => {
    dispatch(
      setFilters({
        cryptoCurrency: FrontendCryptoCurrencyEnum.Usdt,
      }),
    );

    navigate({
      pathname: generatePath(RoutePaths.P2P_OFFERS, { type: 'SALE', '*': '' }),
      search: createSearchParams({
        back: 'true',
      }).toString(),
    });
  };

  const handleSwapClick = () => {
    if (!permissions.canExchange) {
      snackbarContext.showSnackbar({
        snackbarId: 'exchange',
        icon: 'warning',
        text: t('common.feature_is_blocked'),
        action: (
          <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact_support')}</a>
        ),
        actionPosition: 'bottom',
      });

      return;
    }

    navigate({
      pathname: RoutePaths.EXCHANGE,
      search: createSearchParams({
        payCurrency: FrontendCryptoCurrencyEnum.Ton,
      }).toString(),
    });
  };

  return (
    <div {...props}>
      <h2 className={themeClassName('title')}>
        {t('marketing.how_to_get.title')}
      </h2>
      <div className={styles.options}>
        <CallToActionCell
          type="click"
          before={<CardSVG />}
          title={t('marketing.how_to_get.buy_title')}
          description={t('marketing.how_to_get.buy_description', {
            tickets: t('marketing.shared.xx_tickets_count', {
              count: Number(settingsPerTask?.purchase?.ticketBatchSize),
            }),
            usdtAmount:
              settingsPerTask?.purchase?.operationAmountInUSDTPerTicketBatch,
            tonAmount:
              settingsPerTask?.purchase?.operationAmountInTONPerTicketBatch,
          })}
          onClick={handlePurchase}
          isLoadingDescription={isLoading}
        />

        <CallToActionCell
          type="click"
          before={<MarketSVG />}
          title={t('marketing.how_to_get.buy_p2p_title')}
          description={t('marketing.how_to_get.buy_p2p_description', {
            tickets: t('marketing.shared.xx_tickets_count', {
              count: Number(settingsPerTask?.p2pPurchase?.ticketBatchSize),
            }),
            usdtAmount:
              settingsPerTask?.p2pPurchase?.operationAmountInUSDTPerTicketBatch,
            tonAmount:
              settingsPerTask?.p2pPurchase?.operationAmountInTONPerTicketBatch,
          })}
          onClick={handleP2PPurchase}
          isLoadingDescription={isLoading}
        />

        <CallToActionCell
          type="click"
          before={<DepositSVG />}
          title={t('marketing.how_to_get.deposit_title')}
          description={t('marketing.how_to_get.deposit_description', {
            tickets: t('marketing.shared.xx_tickets_count', {
              count: Number(settingsPerTask?.deposit?.ticketBatchSize),
            }),
            usdtAmount:
              settingsPerTask?.deposit?.operationAmountInUSDTPerTicketBatch,
            tonAmount:
              settingsPerTask?.deposit?.operationAmountInTONPerTicketBatch,
          })}
          isLoadingDescription={isLoading}
          onClick={handleDeposit}
        />

        <CallToActionCell
          type="click"
          before={<SendSVG />}
          title={t('marketing.how_to_get.transfer_title')}
          description={t('marketing.how_to_get.transfer_description', {
            tickets: t('marketing.shared.xx_tickets_count', {
              count: Number(settingsPerTask?.transfer?.ticketBatchSize),
            }),
            usdtAmount: settingsPerTask?.transfer?.minAmountTON,
            tonAmount: settingsPerTask?.transfer?.minAmountUSDT,
          })}
          onClick={handleSend}
          isLoadingDescription={isLoading}
        />

        <CallToActionCell
          type="click"
          before={<ExchangeSVG />}
          title={t('marketing.how_to_get.swap')}
          description={t('marketing.how_to_get.swap_description', {
            tickets: t('marketing.shared.xx_tickets_count', {
              count: Number(settingsPerTask?.swap?.ticketBatchSize),
            }),
            usdtAmount:
              settingsPerTask?.swap?.operationAmountInUSDTPerTicketBatch,
            tonAmount:
              settingsPerTask?.swap?.operationAmountInTONPerTicketBatch,
          })}
          onClick={handleSwapClick}
          isLoadingDescription={isLoading}
        />
      </div>
      <div className={themeClassName('description')}>
        {t('marketing.main.note')}
      </div>
    </div>
  );
};
