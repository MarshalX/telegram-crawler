import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { SelectPaymentCurrency as SelectPaymentCurrencyContainer } from 'containers/wallet/SelectPaymentCurrency/SelectPaymentCurrency';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

export const SettingsSelectPaymentCurrency = () => {
  const navigate = useNavigate();

  const { preferredAsset } = useAppSelector((state) => state.settings);
  const handleChoose = () => {
    navigate(routePaths.SETTINGS, { replace: true });
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <SelectPaymentCurrencyContainer
        onChoose={handleChoose}
        cryptoCurrency={preferredAsset}
      />
    </Page>
  );
};
