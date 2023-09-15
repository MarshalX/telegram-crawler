import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PaymentDetailsRestDto } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import { PaymentForm } from 'containers/p2p/PaymentForm/PaymentForm';

import { useGetPaymentMethodName } from 'hooks/p2p';

import {
  UserPaymentDetails,
  useCreateEditOfferPageContext,
} from '../../CreateEditOffer';

const AddPaymentDetails: FC = () => {
  const { selectedPaymentMethodToAdd, draftOffer, setDraftOffer, settings } =
    useCreateEditOfferPageContext();

  const getPaymentMethodName = useGetPaymentMethodName();

  const navigate = useNavigate();

  const maxPaymentDetailsCount = Number(
    settings?.offerSettings?.maxPaymentDetailsQuantityInclusive || 0,
  );

  const handlePaymentDetailsCreate = useCallback(
    async (data: PaymentDetailsRestDto) => {
      const enabledUserPaymentDetailsCount = draftOffer.paymentDetails.filter(
        (item) =>
          item.isEnabled && item.currency === draftOffer.quoteCurrencyCode,
      ).length;

      const userPaymentDetail = {
        ...data,
        isEnabled:
          enabledUserPaymentDetailsCount < maxPaymentDetailsCount
            ? true
            : false,
      } as UserPaymentDetails;

      setDraftOffer((offer) => ({
        ...offer,
        paymentDetails: [...offer.paymentDetails, userPaymentDetail],
      }));

      // Go to previous page
      navigate(-1);
    },
    [
      draftOffer.paymentDetails,
      draftOffer.quoteCurrencyCode,
      maxPaymentDetailsCount,
      navigate,
      setDraftOffer,
    ],
  );

  const paymentMethodName = getPaymentMethodName(selectedPaymentMethodToAdd);

  return (
    <PaymentForm
      onCreate={handlePaymentDetailsCreate}
      name={paymentMethodName}
      paymentMethodName={`${paymentMethodName} · ${draftOffer.quoteCurrencyCode}`}
      paymentMethodCode={selectedPaymentMethodToAdd.code || ''}
      currencyCode={draftOffer.quoteCurrencyCode as FiatCurrency}
      source="ad"
    />
  );
};

export default AddPaymentDetails;
