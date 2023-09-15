import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import {
  Route,
  Routes,
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import API from 'api/p2p';
import { PaymentMethodRestDto } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import routePaths from 'routePaths';

import { DEPRECATED_P2P_PAYMENT_METHODS } from 'config';

import { useAppDispatch, useAppSelector } from 'store';

import { setP2P } from 'reducers/p2p/p2pSlice';

import { SelectCurrency } from 'containers/p2p/SelectCurrency/SelectCurrency';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';

import { repeat } from 'utils/common/common';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useUserDefaultFiatCurrency } from 'hooks/p2p/useUserDefaultFiatCurrency';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SelectArrowSVG } from 'images/select-arrow.svg';

import { usePaymentDetailsPageContext } from '../../UserPaymentsPage';
import styles from './AddNewPayment.module.scss';

const SELECT_FIAT_CURRENCY_PATH = 'select-fiat-currency';

const AddNewPayment = () => {
  const dispatch = useAppDispatch();
  const { onPaymentSelect } = usePaymentDetailsPageContext();

  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const getPaymentMethodName = useGetPaymentMethodName();

  const defaultFiatCurrency = useUserDefaultFiatCurrency();

  const fiatCurrency = useAppSelector((state) => {
    const currency =
      state.p2p.lastFiatCurrencyChooseToCreatePaymentMethod ||
      defaultFiatCurrency;

    return currency;
  });

  const handleClickPaymentMethod =
    ({ payment }: { payment: PaymentMethodRestDto }) =>
    () => {
      onPaymentSelect(
        {
          ...payment,
        },
        fiatCurrency,
      );

      navigate({
        pathname: routePaths.P2P_USER_PAYMENTS_CREATE,
        search: createSearchParams({
          code: payment.code,
          name: payment.name,
          nameEng: payment.nameEng,
          originNameLocale: payment.originNameLocale,
          fiat: fiatCurrency,
        }).toString(),
      });
    };

  const { data: paymentMethods, isLoading } = useQuery(
    ['findAllPaymentMethodsByCurrencyCode', fiatCurrency],
    async () => {
      const { data } =
        await API.PaymentDetails.findAllPaymentMethodsByCurrencyCodeV2({
          currencyCode: fiatCurrency,
        });

      if (data.status === 'SUCCESS' && data.data) {
        return data.data
          .filter((item) => {
            return !DEPRECATED_P2P_PAYMENT_METHODS.includes(item.code);
          })
          .map((paymentMethod) => ({
            code: paymentMethod.code,
            name: getPaymentMethodName(paymentMethod),
            nameEng: paymentMethod.nameEng,
            originNameLocale: paymentMethod.originNameLocale,
            banks: paymentMethod.banks,
          }));
      }

      return [];
    },
  );

  const handleFiatCurrencySelect = (value: string) => {
    // ReactRouter officially support going back with -1, buy TypeScript doesn't
    // eslint-disable-next-line
    // @ts-ignore
    navigate(-1, { replace: true });

    dispatch(
      setP2P({
        lastFiatCurrencyChooseToCreatePaymentMethod: value as FiatCurrency,
      }),
    );
  };

  return (
    <>
      <BackButton />
      <Routes>
        <Route
          path="/"
          element={
            <div className={themeClassName('root')}>
              <Section separator>
                <Cell
                  tappable
                  onClick={() =>
                    navigate(
                      generatePath(routePaths.P2P_USER_PAYMENTS_NEW, {
                        '*': SELECT_FIAT_CURRENCY_PATH,
                      }),
                    )
                  }
                  end={
                    <Cell.Text
                      title={
                        <div className={themeClassName('selectButton')}>
                          {fiatCurrency} <SelectArrowSVG />
                        </div>
                      }
                    />
                  }
                >
                  <Cell.Text title={t('p2p.payment_details_page.currency')} />
                </Cell>
              </Section>
              <Section separator>
                <Skeleton
                  skeleton={
                    <Cell.List>
                      {repeat((i) => {
                        return (
                          <Cell key={i} chevron>
                            <Cell.Text skeleton />
                          </Cell>
                        );
                      }, 10)}
                    </Cell.List>
                  }
                  skeletonShown={isLoading}
                >
                  <Cell.List>
                    {!isLoading &&
                      paymentMethods &&
                      paymentMethods.map((item) => (
                        <Cell
                          key={item.code}
                          onClick={handleClickPaymentMethod({
                            payment: item,
                          })}
                          tappable
                          chevron
                        >
                          <Cell.Text title={getPaymentMethodName(item)} />
                        </Cell>
                      ))}
                  </Cell.List>
                </Skeleton>
              </Section>
            </div>
          }
        />

        <Route
          path={`/${SELECT_FIAT_CURRENCY_PATH}`}
          element={
            <SelectCurrency
              value={fiatCurrency}
              onSelect={handleFiatCurrencySelect}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AddNewPayment;
