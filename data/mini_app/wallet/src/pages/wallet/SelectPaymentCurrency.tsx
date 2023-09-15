import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { SelectPaymentCurrency as SelectPaymentCurrencyContainer } from 'containers/wallet/SelectPaymentCurrency/SelectPaymentCurrency';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

export const SelectPaymentCurrency = () => {
  const navigate = useNavigate();

  const { preferredAsset } = useAppSelector((state) => state.settings);
  const [searchParams] = useSearchParams();
  const assetCurrencyFromSearch = searchParams.get('assetCurrency') as
    | FrontendCryptoCurrencyEnum
    | undefined;
  const value = searchParams.get('value') as string | undefined;

  const handleChoose = () => {
    const searchParams: {
      value?: string;
    } = {};

    if (value) {
      searchParams['value'] = value;
    }

    navigate({
      pathname: generatePath(routePaths.PURCHASE, {
        assetCurrency: assetCurrencyFromSearch || preferredAsset,
      }),
      search: createSearchParams(searchParams).toString(),
    });
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <SelectPaymentCurrencyContainer
        onChoose={handleChoose}
        cryptoCurrency={assetCurrencyFromSearch || preferredAsset}
      />
    </Page>
  );
};
