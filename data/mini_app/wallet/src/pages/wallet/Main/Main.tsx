import { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { Balance } from 'containers/common/Balance/Balance';
import { SettingsCell } from 'containers/common/SettingsCell/SettingsCell';
import Transactions from 'containers/wallet/Transactions/Transactions';

import { Cell } from 'components/Cells';
import Page from 'components/Page/Page';
import { PageCard } from 'components/PageCard/PageCard';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useReceiveAvailability } from 'hooks/common/useReceiveAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as BuySVG } from 'images/buy.svg';
import { ReactComponent as MarketSVG } from 'images/market.svg';
import { ReactComponent as DepositSVG } from 'images/receive.svg';

import styles from './Main.module.scss';
import { Actions } from './components/Actions/Actions';
import { Assets } from './components/Assets/Assets';

const Main: FC = () => {
  const { theme, themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { totalFiatAmount, totalFiatCurrency, assets } = useAppSelector(
    (state) => state.wallet,
  );
  const isPurchaseAvailable = usePurchaseAvailability();
  const isReceiveAvailable = useReceiveAvailability();

  const hasTransactions = assets.some((asset) => asset.hasTransactions);

  const [searchParams] = useSearchParams();
  const isScrollToTop = searchParams.get('isScrollToTop');

  useLayoutEffect(() => {
    if (isScrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [isScrollToTop]);

  return (
    <Page mode="secondary">
      <Balance
        amount={totalFiatAmount}
        currency={totalFiatCurrency}
        className={themeClassName('balance')}
      />
      <Actions className={styles.actions} />
      <Assets />
      {hasTransactions ? (
        <PageCard title={t('main.transactions')}>
          <Transactions pageSize={10} fetchMode="button" />
        </PageCard>
      ) : (
        <PageCard title={t('main.ways_to_add_money')}>
          <Cell.List>
            <Cell
              chevron
              tappable
              start={
                <Cell.Part type="roundedIcon">
                  <RoundedIcon
                    size={theme === 'material' ? 46 : 40}
                    backgroundColor="button"
                  >
                    <BuySVG />
                  </RoundedIcon>
                </Cell.Part>
              }
              onClick={() => {
                if (isPurchaseAvailable()) {
                  navigate(
                    generatePath(routePaths.CHOOSE_ASSET, {
                      type: 'purchase',
                    }),
                  );
                }
              }}
            >
              <Cell.Text
                doubledecker
                bold
                title={t('first_deposit.buy_with_card')}
              />
            </Cell>
            <Cell
              chevron
              tappable
              start={
                <Cell.Part type="roundedIcon">
                  <RoundedIcon
                    size={theme === 'material' ? 46 : 40}
                    backgroundColor="button"
                  >
                    <MarketSVG />
                  </RoundedIcon>
                </Cell.Part>
              }
              onClick={() => {
                navigate({
                  pathname: generatePath(routePaths.P2P_HOME),
                  search: createSearchParams({
                    back: 'true',
                    type: 'SALE',
                  }).toString(),
                });
              }}
            >
              <Cell.Text
                doubledecker
                bold
                title={t('first_deposit.buy_via_p2p')}
              />
            </Cell>
            <Cell
              chevron
              tappable
              start={
                <Cell.Part type="roundedIcon">
                  <RoundedIcon
                    size={theme === 'material' ? 46 : 40}
                    backgroundColor="button"
                  >
                    <DepositSVG />
                  </RoundedIcon>
                </Cell.Part>
              }
              onClick={() => {
                if (isReceiveAvailable()) {
                  navigate(
                    generatePath(routePaths.CHOOSE_ASSET, {
                      type: 'receive',
                    }),
                  );
                }
              }}
            >
              <Cell.Text doubledecker bold title={t('first_deposit.deposit')} />
            </Cell>
          </Cell.List>
        </PageCard>
      )}
      <PageCard>
        <SettingsCell />
      </PageCard>
    </Page>
  );
};

export default Main;
