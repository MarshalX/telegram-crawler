import { useUserPayments } from 'query/p2p/useUserPayments';
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { PaymentForm } from 'containers/p2p/PaymentForm/PaymentForm';

import { BackButton } from 'components/BackButton/BackButton';

import { useGetPaymentMethodName } from 'hooks/p2p';

import { useOfferPageContext } from '../../OfferPage';

const CreatePayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { onPaymentSelect, offer } = useOfferPageContext();
  const getPaymentMethodName = useGetPaymentMethodName();

  const name = searchParams.get('name') as string;
  const code = searchParams.get('code') as string;
  const currency = searchParams.get('currency') as FiatCurrency;

  const { refetch } = useUserPayments({
    enabled: false,
  });

  return (
    <>
      <BackButton />
      <PaymentForm
        onCreate={async (payment) => {
          await refetch();

          onPaymentSelect({
            id: String(payment.id),
            name: getPaymentMethodName(payment.paymentMethod),
            code: payment.paymentMethod.code,
            originNameLocale: payment.paymentMethod.originNameLocale,
            nameEng: payment.paymentMethod.nameEng,
            attributes: payment.attributes,
          });

          navigate({
            pathname: generatePath(routePaths.P2P_OFFER, {
              id: String(offer?.id),
            }),
            search: createSearchParams({
              backButton: routePaths.P2P_OFFERS,
              isRestorePrevStateOnOffersPage: 'true',
            }).toString(),
          });
        }}
        source="order"
        name={name}
        paymentMethodName={`${name} Â· ${currency}`}
        paymentMethodCode={code}
        currencyCode={currency}
      />
    </>
  );
};

export default CreatePayment;
