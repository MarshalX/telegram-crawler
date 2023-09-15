import { FiatCurrency } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import useSettings from './useSettings';
import useSupportedFiatCurrencies from './useSupportedFiatCurrencies';

export const useUserDefaultFiatCurrency = (): FiatCurrency => {
  const { userCountryPhoneAlpha2Code, userCountryAlpha2Code } = useAppSelector(
    (state) => state.p2pUser,
  );

  const { data: supportedFiatCurrencies = [] } = useSupportedFiatCurrencies();
  const { data: settings } = useSettings();

  const countryAlpha2Code = userCountryPhoneAlpha2Code || userCountryAlpha2Code;

  const userCountryCurrency =
    countryAlpha2Code &&
    settings?.currencySettings?.localCountryAlpha2CodeToCurrencyMap?.[
      countryAlpha2Code
    ];

  if (userCountryCurrency) {
    const doWeSupportUserNativeCurrency =
      supportedFiatCurrencies.includes(userCountryCurrency);

    if (doWeSupportUserNativeCurrency) {
      return userCountryCurrency as FiatCurrency;
    }
  }

  return 'EUR';
};
