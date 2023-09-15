import { PaymentForm } from 'containers/p2p/PaymentForm/PaymentForm';

import { BackButton } from 'components/BackButton/BackButton';

import { useGetPaymentMethodName } from 'hooks/p2p';

import { usePaymentDetailsPageContext } from '../UserPaymentsPage';

const CreatePayment = () => {
  const { onCreatePayment, currentCurrency, currentPayment } =
    usePaymentDetailsPageContext();

  const getPaymentMethodName = useGetPaymentMethodName();

  const paymentName = getPaymentMethodName(currentPayment);

  return (
    <>
      <BackButton />
      <PaymentForm
        onCreate={onCreatePayment}
        name={paymentName}
        paymentMethodName={`${paymentName} Â· ${currentCurrency}`}
        paymentMethodCode={currentPayment.code}
        currencyCode={currentCurrency}
        source="profile"
      />
    </>
  );
};

export default CreatePayment;
