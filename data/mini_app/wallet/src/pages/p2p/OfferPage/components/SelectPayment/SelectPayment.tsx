import cn from 'classnames';
import { useUserPayments } from 'query/p2p/useUserPayments';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';

import { PaymentMethodRestDto, SbpBankRestDto } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell, DetailCell } from 'components/Cells';
import { ListItemCell } from 'components/Cells/ListItemCell/ListItemCell';
import Page from 'components/Page/Page';
import Section from 'components/Section/Section';

import { getRecipientNumberFromAttributes } from 'utils/p2p/getRecipientNumberFromAttributes';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useTheme } from 'hooks/utils/useTheme';

import { useOfferPageContext } from '../../OfferPage';
import styles from './SelectPayment.module.scss';

const SelectPayment = () => {
  const { themeClassName, theme } = useTheme(styles);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getPaymentMethodName = useGetPaymentMethodName();
  const { offer, onPaymentSelect } = useOfferPageContext();

  const { data: payments, isLoading: isPaymentsLoading } = useUserPayments();

  const isBuyOffer = offer && 'paymentMethods' in offer;
  const fiatCurrencyCode = offer?.price?.quoteCurrencyCode;

  const paymentsThatMatchOfferPayments = payments
    .filter((payment) => {
      return payment.currency === fiatCurrencyCode;
    })
    .filter((payment) => {
      const paymentMethods = isBuyOffer ? offer.paymentMethods : [];

      return paymentMethods.some(({ code }) => {
        return code === payment.paymentMethod.code;
      });
    });

  const isUsersPaymentMethodsExist = paymentsThatMatchOfferPayments.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectPaymentClick = ({
    paymentMethod,
  }: {
    paymentMethod: PaymentMethodRestDto;
  }) => {
    navigate({
      pathname: generatePath(routePaths.P2P_OFFER_CREATE_PAYMENT, {
        id: String(offer?.id),
      }),
      search: createSearchParams({
        code: paymentMethod.code,
        name: getPaymentMethodName(paymentMethod),
        currency: offer?.price?.quoteCurrencyCode || '',
      }).toString(),
    });
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={themeClassName('root')}>
        {theme === 'apple' && isUsersPaymentMethodsExist && (
          <div className={cn(themeClassName('sectionTitle'))}>
            {t('p2p.offer_page.select_from_your_payments')}
          </div>
        )}

        {isPaymentsLoading && (
          <Section separator>
            <DetailCell fetching header after />
            <DetailCell fetching header after />
            <DetailCell fetching header after />
          </Section>
        )}

        <Section
          separator={isUsersPaymentMethodsExist && theme === 'material'}
          title={
            isUsersPaymentMethodsExist && theme === 'material'
              ? t('p2p.offer_page.select_from_your_payments')
              : undefined
          }
        >
          {paymentsThatMatchOfferPayments.map(
            ({ id, name, paymentMethod, currency, attributes }) => (
              <ListItemCell
                onClick={() => {
                  onPaymentSelect({
                    id: String(id),
                    name: getPaymentMethodName(paymentMethod),
                    code: paymentMethod.code,
                    originNameLocale: paymentMethod.originNameLocale,
                    nameEng: paymentMethod.nameEng,
                    attributes,
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
                key={id}
                perenniallyСhevron
              >
                <div>
                  <div className={themeClassName('cellPaymentDetailName')}>
                    {name}
                  </div>
                  <div className={themeClassName('cellPaymentDetailInfo')}>
                    {getPaymentMethodName(
                      paymentMethod,
                      attributes?.values?.find(
                        (attribute) => attribute.name === 'BANKS',
                      )?.value as SbpBankRestDto[],
                    )}{' '}
                    · {currency}
                  </div>
                  <div className={themeClassName('cellPaymentDetailInfo')}>
                    {getRecipientNumberFromAttributes(attributes)}
                  </div>
                </div>
              </ListItemCell>
            ),
          )}
        </Section>

        {theme === 'apple' && (
          <div className={cn(themeClassName('sectionTitle'))}>
            {isUsersPaymentMethodsExist
              ? t('p2p.offer_page.or_add_a_new_one')
              : t('p2p.offer_page.add_payment_method_full')}
          </div>
        )}

        <Section
          separator
          title={
            theme === 'apple'
              ? undefined
              : isUsersPaymentMethodsExist
              ? t('p2p.offer_page.or_add_a_new_one')
              : t('p2p.offer_page.add_payment_method_full')
          }
        >
          <Cell.List>
            {isBuyOffer
              ? offer.paymentMethods.map((paymentMethod) => (
                  <Cell
                    key={paymentMethod.code}
                    tappable
                    chevron
                    onClick={() => {
                      handleSelectPaymentClick({
                        paymentMethod,
                      });
                    }}
                  >
                    <Cell.Text title={getPaymentMethodName(paymentMethod)} />
                  </Cell>
                ))
              : null}
          </Cell.List>
        </Section>
      </div>
    </Page>
  );
};

export default SelectPayment;
