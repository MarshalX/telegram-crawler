import {
  SCWAsset,
  useAccountJettons,
  useAccountTonAsset,
} from 'query/scw/account';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import Avatar from 'components/Avatar/Avatar';
import { AvatarSkeleton } from 'components/AvatarSkeleton/AvatarSkeleton';
import { Cell, SelectionCell, SelectionCellSkeleton } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import { PageWithOptions } from 'components/PageWithOptions/PageWithOptions';

import { repeat } from 'utils/common/common';
import { printCryptoAmount } from 'utils/common/currency';
import { getHttpImageUrl } from 'utils/common/image';

import { useTheme } from 'hooks/utils/useTheme';

const ChooseAsset: FC<{
  onChoose: (assetCurrency: string) => void;
  title: ReactNode;
}> = ({ onChoose, title }) => {
  const { data: assets, isLoading: isJettonsLoading } = useAccountJettons();
  const { data: tonAsset, isLoading: isTonLoading } = useAccountTonAsset();
  const { languageCode } = useAppSelector((state) => state.settings);

  const theme = useTheme();
  const { t } = useTranslation();

  const [selectedAssetCurrency, setSelectedAssetCurrency] = useState<string>(
    FrontendCryptoCurrencyEnum.Ton,
  );

  const isLoading = isJettonsLoading || isTonLoading;

  const shownAssets = useMemo(() => {
    if (!assets) {
      return [];
    }

    const shouldExcludeTon = !isLoading && tonAsset?.balance === 0;

    return shouldExcludeTon ? assets : [tonAsset as SCWAsset, ...assets];
  }, [assets, isLoading, tonAsset]);

  return (
    <PageWithOptions title={title}>
      <Cell.List mode="card">
        {isJettonsLoading
          ? repeat(
              (index) => (
                <SelectionCellSkeleton
                  key={index}
                  description
                  start={
                    <Cell.Part type="avatar">
                      <AvatarSkeleton size={theme === 'apple' ? 40 : 46} />
                    </Cell.Part>
                  }
                  checkmarkPlacement="end"
                />
              ),
              3,
            )
          : shownAssets.map((asset) => {
              return (
                <SelectionCell
                  value={asset.currency}
                  name="asset"
                  checked={selectedAssetCurrency === asset.currency}
                  checkmarkPlacement="end"
                  onChange={(value) => {
                    setSelectedAssetCurrency(value);
                    onChoose(value);
                  }}
                  start={
                    <Cell.Part type="avatar">
                      <Avatar
                        size={theme === 'apple' ? 40 : 46}
                        src={getHttpImageUrl(asset.image)}
                      />
                    </Cell.Part>
                  }
                  key={asset.name}
                  description={printCryptoAmount({
                    amount: asset.balance,
                    languageCode,
                    currencyDisplay: 'code',
                    currency: asset.currency,
                  })}
                >
                  {asset.name}
                </SelectionCell>
              );
            })}
      </Cell.List>
      <MainButton
        text={t('choose_asset.continue')}
        onClick={() => {
          onChoose(selectedAssetCurrency);
        }}
      />
    </PageWithOptions>
  );
};

export default ChooseAsset;
