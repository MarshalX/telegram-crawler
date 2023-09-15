import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import {
  Outlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import API from 'api/p2p';
import {
  AttributesRestDto,
  BuyOfferRestDto,
  PaymentMethodRestDto,
  SellOfferRestDto,
} from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import Page from 'components/Page/Page';

import { logEvent } from 'utils/common/logEvent';

import { useOfferPriceChangedWarning } from 'hooks/p2p';

type ContextType = {
  offer?: BuyOfferRestDto | SellOfferRestDto;
  isLoading: boolean;
  setInputValue: (value: string) => void;
  setInputNum: (value: BigNumber) => void;
  inputValue: string;
  inputValueNum: BigNumber;
  isCryptoCurrency: boolean;
  setIsCryptoCurrency: (value: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  selectedPayment?: SelectedPayment;
  onPaymentSelect: (payment: SelectedPayment) => void;
};

interface SelectedPayment extends PaymentMethodRestDto {
  id: string;
  attributes?: AttributesRestDto;
}

export function useOfferPageContext() {
  return useOutletContext<ContextType>();
}

const OfferPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  const { checkPriceChangeAndShowWarning } = useOfferPriceChangedWarning();

  const [inputValueNum, setInputNum] = useState<BigNumber>(BigNumber(0));
  const [inputValue, setInputValue] = useState('0');
  const [selectedPayment, setSelectedPayment] = useState<SelectedPayment>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: offer, isLoading } = useQuery({
    queryKey: ['getOffer', id],
    queryFn: async () => {
      const { data } = await API.Offer.getOfferV2({
        offerId: Number(id),
      });

      if (data.status !== 'SUCCESS') {
        console.error(data);
        return undefined;
      }

      const previousPrice = Number(searchParams.get('previousPrice'));
      const offerPrice = Number(data.data?.price?.estimated);
      const quoteCurrencyCode = data.data?.price?.quoteCurrencyCode;

      checkPriceChangeAndShowWarning({
        previousPrice,
        currentPrice: offerPrice,
        currency: quoteCurrencyCode as FiatCurrency,
        onOkClick: () => {
          inputRef.current?.focus();
        },
      });

      return data.data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (offer?.type) {
      logEvent('Taker. Order page viewed', {
        category: 'p2p.buyer.order',
        type: offer?.type === 'SALE' ? 'sell' : 'buy',
        offer_id: offer?.id,
      });
    }
  }, [offer?.id, offer?.type]);

  return (
    <Page>
      <Outlet
        context={{
          offer,
          isLoading,
          setInputNum,
          setInputValue,
          inputValueNum,
          inputValue,
          inputRef,
          selectedPayment,
          onPaymentSelect: (payment: SelectedPayment) =>
            setSelectedPayment(payment),
        }}
      />
    </Page>
  );
};

export default OfferPage;
