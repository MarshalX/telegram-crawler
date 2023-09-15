import { useUserPayments } from 'query/p2p/useUserPayments';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { FiatCurrency } from 'api/wallet/generated';

import { PaymentForm } from 'containers/p2p/PaymentForm/PaymentForm';

import { BackButton } from 'components/BackButton/BackButton';
import Skeleton from 'components/Skeleton/Skeleton';

import { useGetPaymentMethodName } from 'hooks/p2p';

import { usePaymentDetailsPageContext } from '../UserPaymentsPage';

const EditPayment = () => {
  const { data: paymentDetails } = useUserPayments();

  const { isPaymentsLoading, onEditPayment, onDeletePayment } =
    usePaymentDetailsPageContext();
  const getPaymentMethodName = useGetPaymentMethodName();
  const { id: paymentId } = useParams();

  const selectedPayment = useMemo(() => {
    const item = paymentDetails.find((item) => {
      return item.id === Number(paymentId);
    });

    return item;
  }, [paymentDetails, paymentId]);

  const bankCodes = (() => {
    const banks = selectedPayment?.attributes?.values?.find(
      (v) => v.name === 'BANKS',
    )?.value;

    if (Array.isArray(banks)) {
      return banks.map((bank) => bank.code);
    }

    return [];
  })();

  if (!selectedPayment) {
    return null;
  }

  return (
    <>
      <BackButton />
      <Skeleton skeleton={null} skeletonShown={isPaymentsLoading}>
        <PaymentForm
          name={selectedPayment.name}
          paymentMethodName={`${getPaymentMethodName(
            selectedPayment.paymentMethod,
          )} Â· ${selectedPayment?.currency}`}
          currencyCode={selectedPayment?.currency as FiatCurrency}
          paymentId={selectedPayment?.id}
          paymentMethodCode={selectedPayment?.paymentMethod?.code || ''}
          attributes={selectedPayment?.attributes}
          bankCodes={bankCodes}
          onEdit={onEditPayment}
          onDelete={onDeletePayment}
          source="profile"
        />
      </Skeleton>
    </>
  );
};

export default EditPayment;
