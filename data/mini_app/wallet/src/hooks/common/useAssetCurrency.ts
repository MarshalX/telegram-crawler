import { useParams } from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

export const useAssetCurrency = () => {
  const { assetCurrency } = useParams();

  return assetCurrency as FrontendCryptoCurrencyEnum;
};
