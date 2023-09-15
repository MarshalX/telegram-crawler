import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { WhatAreDollars } from 'containers/wallet/WhatAreDollars/WhatAreDollars';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { CellCard } from 'components/Cells/CellCard/CellCard';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { Text } from 'components/Text/Text';

import { getCurrencyName } from 'utils/common/currency';
import { logEvent } from 'utils/common/logEvent';

import { usePurchaseAvailability } from 'hooks/common/usePurchaseAvailability';
import { useReceiveAvailability } from 'hooks/common/useReceiveAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as CardSVG } from 'images/credit_card.svg';
import { ReactComponent as MarketSVG } from 'images/market.svg';
import { ReactComponent as QRCodeSVG } from 'images/qr_code.svg';

import styles from './PurchaseOptions.module.scss';

export const PurchaseOptions = () => {
  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const isPurchaseAvailable = usePurchaseAvailability();
  const isReceiveAvailable = useReceiveAvailability();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const assetCurrency = searchParams.get(
    'assetCurrency',
  ) as FrontendCryptoCurrencyEnum | null;

  const currencyName = assetCurrency
    ? getCurrencyName({
        currency: assetCurrency,
        t,
      })
    : undefined;

  const handleClickBuyButton = () => {
    if (isPurchaseAvailable()) {
      if (!assetCurrency) {
        navigate(generatePath(routePaths.CHOOSE_ASSET, { type: 'purchase' }));
      } else {
        navigate(generatePath(routePaths.PURCHASE, { assetCurrency }));
      }
    }
  };

  const handleClickP2PButton = () => {
    logEvent('Market opened', {
      category: 'p2p',
      source: 'WV',
    });
    window.Telegram.WebApp.expand();

    navigate({
      pathname: routePaths.P2P_HOME,
      search: createSearchParams({
        back: 'true',
        highlight: 'buy',
        type: 'SALE',
      }).toString(),
    });
  };

  const handleClickReceiveButton = () => {
    logEvent('Clicked received button');
    if (isReceiveAvailable()) {
      navigate(generatePath(routePaths.CHOOSE_ASSET, { type: 'receive' }));
    }
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <InlineLayout className={themeClassName('header')}>
        <Text
          className={themeClassName('title')}
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
        >
          {assetCurrency === 'USDT'
            ? t('purchase_options.title_dollars')
            : assetCurrency
            ? t('purchase_options.title_asset', { currencyName })
            : t('purchase_options.title')}
        </Text>
        {assetCurrency === 'USDT' && (
          <WhatAreDollars className={styles.whatAreDollars} />
        )}
      </InlineLayout>
      <div className={themeClassName('options')}>
        <InlineLayout>
          <CellCard
            onClick={handleClickBuyButton}
            start={
              <Cell.Part type="roundedIcon">
                <RoundedIcon
                  backgroundColor={
                    theme === 'material'
                      ? 'button'
                      : 'linear-gradient(156.88deg, #00e7ff 14.96%, #007aff 85.04%)'
                  }
                  size={theme === 'apple' ? 40 : 46}
                >
                  <CardSVG />
                </RoundedIcon>
              </Cell.Part>
            }
            chevron
            tappable
          >
            <Cell.Text
              bold
              title={t('purchase_options.card_title')}
              description={
                assetCurrency === 'USDT'
                  ? t('purchase_options.card_text_dollars')
                  : assetCurrency
                  ? t('purchase_options.card_text_asset', { currencyName })
                  : t('purchase_options.card_text')
              }
            />
          </CellCard>
        </InlineLayout>

        <InlineLayout>
          <CellCard
            onClick={handleClickP2PButton}
            tappable
            chevron
            start={
              <Cell.Part type="roundedIcon">
                <RoundedIcon
                  backgroundColor={
                    theme === 'material'
                      ? 'button'
                      : 'linear-gradient(156.88deg, #00e7ff 14.96%, #007aff 85.04%)'
                  }
                  size={theme === 'apple' ? 40 : 46}
                >
                  <MarketSVG />
                </RoundedIcon>
              </Cell.Part>
            }
          >
            <Cell.Text
              bold
              title={t('purchase_options.p2p_title')}
              description={
                assetCurrency === 'USDT'
                  ? t('purchase_options.p2p_text_dollars')
                  : assetCurrency
                  ? t('purchase_options.p2p_text_asset', { currencyName })
                  : t('purchase_options.p2p_text')
              }
            />
          </CellCard>
        </InlineLayout>

        {!assetCurrency && (
          <InlineLayout>
            <CellCard
              onClick={handleClickReceiveButton}
              tappable
              chevron
              start={
                <Cell.Part type="roundedIcon">
                  <RoundedIcon
                    backgroundColor="linear-gradient(180deg, #A7ADB9 0%, #878B96 100%)"
                    size={theme === 'apple' ? 40 : 46}
                  >
                    <QRCodeSVG />
                  </RoundedIcon>
                </Cell.Part>
              }
            >
              <Cell.Text
                bold
                title={t('purchase_options.external_title')}
                description={t('purchase_options.external_text')}
              />
            </CellCard>
          </InlineLayout>
        )}
      </div>
    </Page>
  );
};
