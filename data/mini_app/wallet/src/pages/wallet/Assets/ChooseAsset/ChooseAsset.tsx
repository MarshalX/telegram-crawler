import { useBuyRate } from 'query/wallet/rates/useBuyRate';
import { useLastUsedPaymentCurrencies } from 'query/wallet/user';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import RoutePaths from 'routePaths';
import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { updatePreferredAsset } from 'reducers/settings/settingsSlice';

import AssetCell from 'containers/common/AssetCell/AssetCell';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ChooseAsset.module.scss';

const ChooseType = ['purchase', 'receive', 'send'] as const;

type ChooseType = typeof ChooseType[number];

const assertChooseType = (type: string | undefined): type is ChooseType => {
  return ChooseType.includes(type as ChooseType);
};

const ChooseAsset: FC = () => {
  const { themeClassName } = useTheme(styles);
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { featureFlags } = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();

  const availableAssets = useAppSelector((state) => state.wallet.assets);
  const isHideBtc = !!searchParams.get('hideBtc');
  const backPath = searchParams.get('backPath');
  const preferredAsset = useAppSelector((state) => {
    if (
      (isHideBtc && state.settings.preferredAsset === 'BTC') ||
      !state.settings.preferredAsset
    ) {
      return FrontendCryptoCurrencyEnum.Ton;
    }

    return state.settings.preferredAsset;
  });

  const { data: recentlyUsedCurrencies = [] } = useLastUsedPaymentCurrencies();

  const recentlyUsedCurrency = recentlyUsedCurrencies[0];
  const fiatCurrency = featureFlags.multicurrency
    ? recentlyUsedCurrency
    : undefined;

  useBuyRate({
    currency: FrontendCryptoCurrencyEnum.Usdt,
    fiatCurrency,
  });
  useBuyRate({
    currency: FrontendCryptoCurrencyEnum.Ton,
    fiatCurrency,
  });
  useBuyRate({
    currency: FrontendCryptoCurrencyEnum.Btc,
    fiatCurrency,
    enabled: !isHideBtc,
  });

  if (!assertChooseType(type)) {
    return <Navigate to={RoutePaths.MAIN} replace />;
  }

  const handleContinue = (selectedAsset: FrontendCryptoCurrencyEnum) => {
    dispatch(updatePreferredAsset(selectedAsset));
    switch (type) {
      case 'purchase':
        return navigate(
          generatePath(RoutePaths.PURCHASE, {
            assetCurrency: selectedAsset,
          }),
        );
      case 'receive':
        return navigate(`${RoutePaths.RECEIVE}?assetCurrency=${selectedAsset}`);
      case 'send':
        return navigate(
          generatePath(routePaths.RECEIVER_SEARCH, {
            assetCurrency: selectedAsset,
          }),
        );
    }
  };

  function getTitle() {
    switch (type) {
      case 'purchase':
        return t('choose_asset.purchase_title');
      case 'receive':
        return t('choose_asset.receive_title');
      case 'send':
        return t('choose_asset.send_title');
    }
  }

  const assets = isHideBtc
    ? availableAssets.filter((asset) => asset.currency !== 'BTC')
    : availableAssets;

  return (
    <Page mode="secondary">
      <BackButton
        onClick={() => {
          if (backPath) {
            navigate(backPath);
          } else {
            window.history.back();
          }
        }}
      />
      <InlineLayout className={themeClassName('header')}>
        <Text
          className={themeClassName('title')}
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
        >
          {getTitle()}
        </Text>
      </InlineLayout>
      <InlineLayout>
        <Cell.List mode="card">
          {assets.map((asset) => (
            <AssetCell
              key={asset.currency}
              type="select"
              variant="simple"
              currency={asset.currency}
              balance={asset.balance}
              checked={asset.currency === preferredAsset}
              onClick={() => handleContinue(asset.currency)}
            />
          ))}
        </Cell.List>
      </InlineLayout>
      <MainButton
        text={t('choose_asset.continue')}
        onClick={() => handleContinue(preferredAsset)}
      />
    </Page>
  );
};

export default ChooseAsset;
