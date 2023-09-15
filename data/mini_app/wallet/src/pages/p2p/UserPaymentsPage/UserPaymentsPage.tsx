import * as Sentry from '@sentry/react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserPayments } from 'query/p2p/useUserPayments';
import { useState } from 'react';
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

import {
  PaymentDetailsRestDto,
  PaymentMethodRestDto,
} from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import Page from 'components/Page/Page';

import { logEvent } from 'utils/common/logEvent';

interface UserPaymentsPagePage {
  onPaymentSelect: (
    paymentMethod: UserPaymentsPagePage['currentPayment'],
    currency: FiatCurrency,
  ) => void;
  onEditPayment: (data: PaymentDetailsRestDto) => void;
  onDeletePayment: () => void;
  onCreatePayment: (data: PaymentDetailsRestDto) => void;
  currentPayment: PaymentMethodRestDto;
  currentCurrency: FiatCurrency;
  isPaymentsLoading: boolean;
}

export function usePaymentDetailsPageContext() {
  return useOutletContext<UserPaymentsPagePage>();
}

function UserPaymentsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const { data: paymentDetails, isLoading: isPaymentsLoading } =
    useUserPayments();

  const [currentPayment, setCurrentPayment] = useState<
    UserPaymentsPagePage['currentPayment']
  >({
    code: searchParams.get('code') || '',
    name: searchParams.get('name') || '',
    nameEng: searchParams.get('nameEng') || '',
    originNameLocale: searchParams.get('originNameLocale') || '',
  });

  const [currentCurrency, setCurrentCurrency] = useState(
    searchParams.get('fiat') as FiatCurrency,
  );

  const updatePaymentDetails = (value: PaymentDetailsRestDto) =>
    paymentDetails.map((item) => {
      if (item.id === value.id) {
        return value;
      }
      return item;
    });

  const handleEditPayment = async (data: PaymentDetailsRestDto) => {
    const newPaymentDetails = updatePaymentDetails(data);

    queryClient.setQueryData(['findPaymentDetailsByUserId'], newPaymentDetails);

    navigate(routePaths.P2P_USER_PAYMENTS);
  };

  const handleDeletePayment = async (paymentId: number) => {
    const payment = paymentDetails.find((item) => item.id === paymentId);

    if (!payment) {
      Sentry.captureException(new Error('Payment details not found'));

      return;
    }

    const newPaymentDetails = paymentDetails.filter(
      (item) => item.id !== paymentId,
    );

    queryClient.setQueryData(['findPaymentDetailsByUserId'], newPaymentDetails);

    navigate(routePaths.P2P_USER_PAYMENTS);

    logEvent('Payment method removed', {
      category: 'p2p.merchant',
      currency: currentCurrency,
      payment_method: payment.paymentMethod.code,
    });
  };

  const handleCreatePayment = async (data: PaymentDetailsRestDto) => {
    queryClient.setQueryData(
      ['findPaymentDetailsByUserId'],
      [data, ...paymentDetails],
    );

    navigate(routePaths.P2P_USER_PAYMENTS);

    logEvent('Payment method created', {
      category: 'p2p.merchant',
      source: 'profile',
      currency: currentCurrency,
      payment_method: currentPayment.code,
    });
  };

  const handleSelectPayment = (
    paymentMethod: UserPaymentsPagePage['currentPayment'],
    currency: FiatCurrency,
  ) => {
    setCurrentPayment(paymentMethod);
    setCurrentCurrency(currency);
  };

  return (
    <Page mode="secondary">
      <Outlet
        context={{
          onEditPayment: handleEditPayment,
          onDeletePayment: handleDeletePayment,
          onCreatePayment: handleCreatePayment,
          onPaymentSelect: handleSelectPayment,
          currentPayment,
          currentCurrency,
          isPaymentsLoading,
        }}
      />
    </Page>
  );
}

export default UserPaymentsPage;
