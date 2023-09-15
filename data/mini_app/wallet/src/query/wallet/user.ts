import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import API from 'api/wallet';

import { useAppDispatch, useAppSelector } from 'store';

import { setPaymentCurrency } from 'reducers/settings/settingsSlice';

export const useLastUsedPaymentCurrencies = () => {
  const { authorized, id: userId } = useAppSelector((state) => state.user);
  const paymentCurrency = useAppSelector(
    (state) => state.settings.paymentCurrency,
  );
  const dispatch = useAppDispatch();

  const { data, ...rest } = useQuery({
    queryKey: [`getPaymentCurrency`, userId],
    queryFn: () =>
      API.Users.getPaymentCurrency().then((response) => response.data),
    enabled: authorized,
  });

  useEffect(() => {
    if (!paymentCurrency && data && data.length > 0) {
      dispatch(setPaymentCurrency(data[0]));
    }
  }, [data, dispatch, paymentCurrency]);

  return { data, ...rest };
};
