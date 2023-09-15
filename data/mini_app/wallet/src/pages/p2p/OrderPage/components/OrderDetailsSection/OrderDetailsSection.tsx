import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SbpBankRestDto } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import { DetailCell } from 'components/Cells';
import { CroppingText } from 'components/CroppingText/CroppingText';
import Section from 'components/Section/Section';

import { printFiatAmount } from 'utils/common/currency';
import { printDuration } from 'utils/common/date';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useLanguage } from 'hooks/utils/useLanguage';

import { OrderPageContext } from '../../OrderPage';

interface Props {
  timeLimit?: string;
  separator?: boolean;
}

export const OrderDetailsSection: FC<Props> = ({
  timeLimit,
  separator = true,
}) => {
  const languageCode = useLanguage();
  const { t } = useTranslation();
  const { order, offer } = useContext(OrderPageContext);
  const getPaymentMethodName = useGetPaymentMethodName();

  if (!order || !offer) return null;

  const chosenPaymentMethod = order
    ? getPaymentMethodName(
        order.paymentDetails.paymentMethod,
        order?.paymentDetails?.attributes?.values?.find(
          (value) => value.name === 'BANKS',
        )?.value as SbpBankRestDto[],
      )
    : '';

  return (
    <Section apple={{ fill: 'secondary' }} separator={separator}>
      <DetailCell
        header=""
        before={t('p2p.fiat_amount')}
        after={printFiatAmount({
          amount: order.amount.amount,
          currency: order.amount.currencyCode as FiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        })}
      />
      <DetailCell
        header=""
        before={t(`p2p.order_detail.order_price`, {
          code: order.price.baseCurrencyCode,
        })}
        after={printFiatAmount({
          amount: +order.price.value,
          currency: order.price.quoteCurrencyCode as FiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        })}
      />
      {chosenPaymentMethod && (
        <DetailCell
          header=""
          before={t(`p2p.order_detail.payment_method`)}
          after={
            <CroppingText
              languageCode={languageCode}
              value={chosenPaymentMethod}
            />
          }
        />
      )}
      {timeLimit && (
        <DetailCell
          header=""
          before={t(`p2p.order_detail.time_limit`)}
          after={printDuration(timeLimit)}
        />
      )}
    </Section>
  );
};
