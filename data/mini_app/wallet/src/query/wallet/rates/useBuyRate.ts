import { useQuery } from '@tanstack/react-query';

import API from 'api/wallet';
import { FiatCurrency, FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { RootState, useAppSelector } from 'store';

const getBuyRate = ({
  purchaseByCard,
  fiatCurrency,
  paymentFiatCurrency,
  currency,
}: {
  purchaseByCard: RootState['user']['purchaseByCard'];
  fiatCurrency: FiatCurrency;
  paymentFiatCurrency?: FiatCurrency;
  currency: FrontendCryptoCurrencyEnum;
}) => {
  if (!purchaseByCard) throw new Error('Payment methods are not provided');

  if (purchaseByCard.available) {
    const secondaryCurrency = paymentFiatCurrency
      ? paymentFiatCurrency
      : fiatCurrency === FiatCurrency.Eur
      ? FiatCurrency.Eur
      : FiatCurrency.Usd;
    return API.Prices.getEstimatePrice({
      base_currency: currency,
      secondary_currency: secondaryCurrency,
      base_amount: 1,
      payment_method: 'card_default',
    }).then((response) => {
      if (!response) return 0;
      return response.data.payable_amount;
    });
  }
};

export const useBuyRate = ({
  currency,
  fiatCurrency: paymentFiatCurrency,
  enabled = true,
}: {
  currency: FrontendCryptoCurrencyEnum;
  fiatCurrency?: FiatCurrency;
  enabled?: boolean;
}) => {
  const fiatCurrency = useAppSelector((state) => state.settings.fiatCurrency);

  const purchaseByCard = useAppSelector((state) => state.user.purchaseByCard);
  const { data, ...rest } = useQuery({
    queryKey: [`buyRate`, { currency, fiatCurrency, paymentFiatCurrency }],
    queryFn: () =>
      getBuyRate({
        currency,
        fiatCurrency,
        paymentFiatCurrency,
        purchaseByCard,
      }),
    enabled: !!fiatCurrency && !!purchaseByCard && enabled,
    refetchOnMount: false,
  });

  return { buyRate: data, ...rest };
};
