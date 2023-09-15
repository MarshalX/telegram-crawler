import { useDispatch } from 'react-redux';

import API from 'api/wallet';
import {
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
  TelegramPaymentResponse,
} from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { updatePurchase } from 'reducers/purchase/purchaseSlice';

export const usePurchase = () => {
  const { featureFlags } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const isNewPurchaseFlow = featureFlags.rcards;

  const purchase = async ({
    baseAmount,
    baseCurrency,
    secondaryCurrency,
  }: {
    baseAmount: number;
    baseCurrency: FiatCurrency | FrontendCryptoCurrencyEnum;
    secondaryCurrency: FiatCurrency | FrontendCryptoCurrencyEnum;
  }) => {
    let purchase: TelegramPaymentResponse & {
      payment_provider?: string;
    };

    const purchaseData = {
      base_amount: baseAmount,
      base_currency: baseCurrency,
      secondary_currency: secondaryCurrency,
    };

    if (isNewPurchaseFlow) {
      const init = await API.Purchases.initPurchase(purchaseData);

      dispatch(
        updatePurchase({
          purchase_id: init.data.purchase_internal_id,
        }),
      );

      const { data } = await API.Purchases.createPurchase({
        purchase_internal_id: init.data.purchase_internal_id,
      });

      purchase = {
        purchase_id: data.purchase_internal_id,
        payment_url: data.payment_url,
        payment_id: data.purchase_external_id,
        amount: data.crypto_amount,
        pay_amount: data.fiat_amount,
        pay_currency: data.fiat_currency,
        created_at: data.created_at,
        payment_provider: init.data.payment_provider,
      };
    } else {
      const { data } = await API.Purchases.createPurchaseWithTelegramPayments(
        purchaseData,
      );

      purchase = data;
    }

    return purchase;
  };

  return purchase;
};
