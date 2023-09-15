import classNames from 'classnames';
import { useUsdtRuffle } from 'query/wallet/ruffle/useUsdtRuffle';
import { useTransactions } from 'query/wallet/transactions/useTransactions';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { KycStatusPublicDtoLevelEnum } from 'api/p2p/generated-userservice';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM } from 'config';

import { useAppSelector } from 'store';

import { updateSession } from 'reducers/session/sessionSlice';

import { Action as KycAction } from 'pages/wallet/KYC/components/Action/Action';

import { Cell } from 'components/Cells';
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { Text } from 'components/Text/Text';

import {
  getCurrencyName,
  printCryptoAmount,
  printFiatAmount,
  roundDownFractionalDigits,
} from 'utils/common/currency';

import { useAsset } from 'hooks/common/useAsset';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Assets.module.scss';
import { AssetCellCard } from './components/AssetCellCard/AssetCellCard';
import { SCWBetaWaitlistCell } from './components/SCWBetaWaitlistCell/SCWBetaWaitlistCell';
import { SCWCell } from './components/SCWCell/SCWCell';
import { UsdtRuffleCell } from './components/UsdtRuffleCell/UsdtRuffleCell';
import { ReactComponent as CryptoSVG } from './rest_crypto.svg';
import { ReactComponent as ShowLessSVG } from './show_less.svg';

export const Assets: FC = () => {
  const { theme, themeClassName } = useTheme(styles);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { languageCode, fiatCurrency } = useAppSelector(
    (state) => state.settings,
  );
  const { featureFlags, permissions } = useAppSelector((state) => state.user);
  const { canApplyToSCWBetaWaitlist, isCryptoExpanded } = useAppSelector(
    (state) => state.session,
  );
  const { assets } = useAppSelector((state) => state.wallet);
  const { expandCryptocurrency, displaySCW } = useAppSelector(
    (state) => state.warningsVisibility,
  );
  const { address: scwAddress } = useAppSelector((state) => state.scw);
  const TONAsset = useAsset(FrontendCryptoCurrencyEnum.Ton);
  const { transactions } = useTransactions({
    assetCurrency: assets.map((item) => item.currency),
    pageSize: 10,
  });

  const restAssets = assets.filter(
    ({ currency }) => currency !== FrontendCryptoCurrencyEnum.Ton,
  );

  //TODO: Remove after adding an endpoint for checking blocked user.
  // task - https://wallet-bot.atlassian.net/browse/WAL-1576
  const KycNextLevel = useMemo(() => {
    const blockedTransaction = transactions.find(
      (transaction) =>
        transaction.block && transaction.block.type === 'kyc_required',
    );
    return blockedTransaction &&
      blockedTransaction.block.type === 'kyc_required'
      ? (blockedTransaction.block.kyc_level as KycStatusPublicDtoLevelEnum)
      : null;
  }, [transactions]);

  const showUsdtRuffleWidget =
    featureFlags.usdtRuffle && permissions.canUsdtRuffle;

  const avatarSize = theme === 'apple' ? 40 : 46;

  // Prerender
  useUsdtRuffle(showUsdtRuffleWidget);

  return (
    <InlineLayout>
      <div className={themeClassName('assets')}>
        {KycNextLevel && (
          <AssetCellCard RootElement={Cell.List}>
            <KycAction nextLevel={KycNextLevel} />
          </AssetCellCard>
        )}
        {displaySCW || (featureFlags.scw && !!scwAddress) ? (
          <SCWCell />
        ) : featureFlags.scwBetaWaitlist || canApplyToSCWBetaWaitlist ? (
          <SCWBetaWaitlistCell />
        ) : null}
        {showUsdtRuffleWidget && <UsdtRuffleCell />}

        <AssetCellCard
          tappable
          onClick={() =>
            navigate(
              generatePath(routePaths.ASSETS, {
                assetCurrency: FrontendCryptoCurrencyEnum.Ton,
              }),
            )
          }
          start={
            <Cell.Part type="avatar">
              <CurrencyLogo
                currency={FrontendCryptoCurrencyEnum.Ton}
                size={avatarSize}
              />
            </Cell.Part>
          }
          end={
            <Cell.Text
              title={printFiatAmount({
                languageCode,
                amount: TONAsset.fiatBalance,
                currency: TONAsset.fiatCurrency,
              })}
              doubledecker
            />
          }
        >
          <Cell.Text
            bold
            title={getCurrencyName({
              currency: FrontendCryptoCurrencyEnum.Ton,
              t,
            })}
            description={printCryptoAmount({
              languageCode,
              amount: TONAsset.balance,
              currency: TONAsset.currency,
              currencyDisplay: 'code',
            })}
          />
        </AssetCellCard>
        <div
          className={classNames(
            styles.crypto,
            (isCryptoExpanded || expandCryptocurrency) && styles.expanded,
          )}
        >
          <AssetCellCard
            className={styles.cryptoCell}
            onClick={() => {
              dispatch(updateSession({ isCryptoExpanded: true }));
            }}
            start={
              <Cell.Part type="roundedIcon">
                <RoundedIcon size={avatarSize} iconSize={avatarSize}>
                  <CryptoSVG />
                </RoundedIcon>
              </Cell.Part>
            }
            end={
              <Cell.Text
                doubledecker
                title={printFiatAmount({
                  languageCode,
                  amount: restAssets.reduce((acc, item) => {
                    return acc + item.fiatBalance;
                  }, 0),
                  currency: fiatCurrency,
                })}
              />
            }
          >
            <Cell.Text doubledecker title={t('main.more_crypto')} bold />
          </AssetCellCard>
          {!expandCryptocurrency && (
            <div className={styles.cryptoHeader}>
              <Text
                apple={{ variant: 'title3', weight: 'bold' }}
                material={{ variant: 'headline6' }}
                className={themeClassName('cryptoHeaderInner')}
                onClick={() => {
                  dispatch(updateSession({ isCryptoExpanded: false }));
                }}
              >
                <span>{t('main.crypto')}</span>
                <Text
                  apple={{ variant: 'body', weight: 'regular', color: 'link' }}
                  material={{
                    variant: 'body',
                    weight: 'regular',
                    color: 'link',
                  }}
                  className={themeClassName('showLess')}
                >
                  {theme === 'apple' && <ShowLessSVG />}
                  <span>{t('main.show_less')}</span>
                </Text>
              </Text>
            </div>
          )}
          <div className={styles.cryptoAssets}>
            {restAssets.map(
              ({ currency, fiatCurrency, fiatBalance, balance }) => {
                return (
                  <AssetCellCard
                    tappable
                    key={currency}
                    className={themeClassName('cryptoAsset')}
                    start={
                      <Cell.Part type="avatar">
                        <CurrencyLogo currency={currency} size={avatarSize} />
                      </Cell.Part>
                    }
                    end={
                      <Cell.Text
                        title={printFiatAmount({
                          languageCode,
                          amount: fiatBalance,
                          currency: fiatCurrency,
                        })}
                      />
                    }
                    onClick={() =>
                      navigate(
                        generatePath(routePaths.ASSETS, {
                          assetCurrency: currency,
                        }),
                      )
                    }
                  >
                    <Cell.Text
                      bold
                      title={getCurrencyName({
                        currency,
                        t,
                      })}
                      description={printCryptoAmount({
                        languageCode,
                        amount: roundDownFractionalDigits(
                          balance.toFixed(10),
                          CRYPTO_CURRENCY_TO_FRACTION_DIGITS_TRIM[currency],
                        ),
                        currency,
                        currencyDisplay: 'code',
                      })}
                    ></Cell.Text>
                  </AssetCellCard>
                );
              },
            )}
          </div>
        </div>
      </div>
    </InlineLayout>
  );
};
