import { useSelector } from 'react-redux';

import { CryptoCurrency } from 'api/wallet/generated';

import { WalletAsset } from 'reducers/wallet/walletSlice';

import { RootState } from '../../store';

export function useAsset(assetCurrency: CryptoCurrency): WalletAsset {
  const { assets } = useSelector((state: RootState) => state.wallet);

  return assets.find(
    (asset) => asset.currency === assetCurrency,
  ) as WalletAsset; // TODO придумать чо делать, если ассета нет
}
