import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FiatCurrency } from 'api/wallet/generated';

import { setDefaultCurrencies } from 'reducers/p2p/adFormSlice';

import { SelectCurrency } from 'containers/p2p/SelectCurrency/SelectCurrency';

import { useCreateEditOfferPageContext } from '../CreateEditOffer';

const SelectFiatCurrency = () => {
  const { draftOffer, setDraftOffer } = useCreateEditOfferPageContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <SelectCurrency
      value={draftOffer.quoteCurrencyCode}
      onSelect={(currency) => {
        dispatch(
          setDefaultCurrencies({
            fiat: currency as FiatCurrency,
          }),
        );

        setDraftOffer((offer) => ({
          ...offer,
          quoteCurrencyCode: currency,
        }));

        // ReactRouter officially support going back with -1, buy TypeScript doesn't
        // eslint-disable-next-line
        // @ts-ignore
        navigate(-1, { replace: true });
      }}
    />
  );
};

export default SelectFiatCurrency;
