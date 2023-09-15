import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SbpBankRestDto } from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import { DetailCell } from 'components/Cells';
import Section from 'components/Section/Section';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { copyToClipboard } from 'utils/common/common';
import { printFiatAmount } from 'utils/common/currency';
import { getRecipientNumberFromAttributes } from 'utils/p2p/getRecipientNumberFromAttributes';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useLanguage } from 'hooks/utils/useLanguage';

import { ReactComponent as ArrowUpIcon } from 'images/arrow_up-icon.svg';
import { ReactComponent as BankIcon } from 'images/bank.svg';
import { ReactComponent as CopyIcon } from 'images/copy_icon.svg';
import { ReactComponent as CreditCardIcon } from 'images/credit_card_icon.svg';

import { OrderPageContext } from '../../OrderPage';
import styles from './PaymentInfoSection.module.scss';

interface Props {
  description?: JSX.Element;
  separator?: boolean;
  title?: string;
  canCopy?: boolean;
}

export const PaymentInfoSection: FC<Props> = ({
  description,
  separator = true,
  title,
  canCopy = true,
}) => {
  const { t } = useTranslation();
  const { order, offer } = useContext(OrderPageContext);
  const snackbarContext = useContext(SnackbarContext);
  const languageCode = useLanguage();
  const getPaymentMethodName = useGetPaymentMethodName();

  const chosenPaymentMethod = order
    ? getPaymentMethodName(
        order.paymentDetails.paymentMethod,
        order?.paymentDetails?.attributes?.values?.find(
          (value) => value.name === 'BANKS',
        )?.value as SbpBankRestDto[],
      )
    : '';

  if (!order || !offer) return null;

  const copyFiatAmountToClipboard = () => {
    const amountWithoutInsignificantTrailingZero = String(
      Number(order.amount.amount),
    );

    copyToClipboard(amountWithoutInsignificantTrailingZero).then(() => {
      snackbarContext.showSnackbar({
        text: t('common.copied_to_clipboard'),
      });
    });
  };

  return (
    <Section
      apple={{ fill: 'secondary' }}
      title={title}
      separator={separator}
      description={description}
    >
      <DetailCell
        header={t(`p2p.order_detail.fiat_amount`)}
        before={<ArrowUpIcon className={styles.icon} />}
        after={
          canCopy && (
            <CopyIcon
              className={styles.icon}
              onClick={copyFiatAmountToClipboard}
            />
          )
        }
      >
        {printFiatAmount({
          amount: order.amount.amount,
          currency: order.amount.currencyCode as FiatCurrency,
          languageCode,
          currencyDisplay: 'code',
        })}
      </DetailCell>
      <DetailCell
        header={t(`p2p.order_detail.payment_method`)}
        before={<BankIcon className={styles.icon} />}
      >
        {chosenPaymentMethod}
      </DetailCell>
      {order.paymentDetails.attributes?.values
        ?.filter((attribute) => {
          if (
            attribute.name === 'PHONE' ||
            attribute.name === 'PAYMENT_DETAILS_NUMBER'
          ) {
            return true;
          }

          return false;
        })
        .map((attribute) => {
          const placeholder = {
            PHONE: t(`p2p.order_detail.phone`),
            PAYMENT_DETAILS_NUMBER: t(`p2p.order_detail.payment_number`),
            BANKS: '',
          }[attribute.name];

          return (
            <DetailCell
              key={attribute.name}
              header={placeholder}
              before={<CreditCardIcon className={styles.icon} />}
              after={
                canCopy && (
                  <CopyIcon
                    className={styles.icon}
                    onClick={() => {
                      const value = getRecipientNumberFromAttributes(attribute);

                      copyToClipboard(value).then(() => {
                        snackbarContext.showSnackbar({
                          text: t('common.copied_to_clipboard'),
                        });
                      });
                    }}
                  />
                )
              }
            >
              <div className={styles.userSelectText}>
                {getRecipientNumberFromAttributes(attribute)}
              </div>
            </DetailCell>
          );
        })}
    </Section>
  );
};
