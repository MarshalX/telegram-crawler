import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import routePaths from 'routePaths';
import RoutePaths from 'routePaths';

import { CallToActionCell } from 'containers/wallet/CallToActionCell/CallToActionCell';

import ActionButton from 'components/ActionButton/ActionButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';

import { logEvent } from 'utils/common/logEvent';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useReceiveAvailability } from 'hooks/common/useReceiveAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CardSVG } from 'images/buy.svg';
import { ReactComponent as MarketSVG } from 'images/market.svg';
import { ReactComponent as DepositSVG } from 'images/receive.svg';

import styles from './FirstDeposit.module.scss';

export const FirstDeposit: FC = memo(() => {
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isPurchaseAvailable = usePurchaseAvailability();
  const isReceiveAvailable = useReceiveAvailability();

  useEffect(() => {
    logEvent('Opened welcome deposit screen');
  }, []);

  return (
    <Page>
      <div className={themeClassName('root')}>
        <h1 className={themeClassName('title')}>{t('first_deposit.title')}</h1>
        <p className={themeClassName('text')}>{t('first_deposit.text')}</p>
        <div className={themeClassName('callToActions')}>
          <CallToActionCell
            type="click"
            title={t('first_deposit.buy_with_card')}
            before={<CardSVG />}
            onClick={() => {
              logEvent('Clicked action (deposit)', { action: 'buy' });
              if (isPurchaseAvailable()) {
                navigate(
                  generatePath(routePaths.CHOOSE_ASSET, { type: 'purchase' }),
                );
              }
            }}
          />
          <CallToActionCell
            type="click"
            title={t('first_deposit.buy_via_p2p')}
            before={<MarketSVG />}
            onClick={() => {
              logEvent('Clicked action (deposit)', { action: 'p2p' });
              navigate({
                pathname: generatePath(RoutePaths.P2P_HOME),
                search: createSearchParams({
                  back: 'true',
                  type: 'SALE',
                }).toString(),
              });
            }}
          />
          <CallToActionCell
            type="click"
            title={t('first_deposit.deposit')}
            before={<DepositSVG />}
            onClick={() => {
              logEvent('Clicked action (deposit)', { action: 'receive' });
              if (isReceiveAvailable()) {
                navigate(
                  generatePath(routePaths.CHOOSE_ASSET, { type: 'receive' }),
                );
              }
            }}
          />
        </div>
        <BottomContent className={themeClassName('bottom')}>
          <ActionButton
            size="medium"
            stretched
            mode="transparent"
            onClick={() => {
              logEvent('Clicked later (deposit)');
              navigate(generatePath(routePaths.MAIN));
            }}
          >
            {t('first_deposit.later')}
          </ActionButton>
        </BottomContent>
      </div>
    </Page>
  );
});
