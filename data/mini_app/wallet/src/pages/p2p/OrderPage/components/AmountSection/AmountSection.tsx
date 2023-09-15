import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { CryptoCurrency } from 'api/wallet/generated';

import { Amount } from 'containers/common/Amount/Amount';
import OperationInfo from 'containers/common/OperationInfo/OperationInfo';

import { AliasAvatar } from 'components/AliasAvatar/AliasAvatar';
import { Identificator } from 'components/Identificator/Identificator';
import Section from 'components/Section/Section';

import { printCryptoAmount } from 'utils/common/currency';

import useABTests from 'hooks/p2p/useABTests';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import { OrderPageContext } from '../../OrderPage';
import styles from './AmountSection.module.scss';

interface Props {
  isSeparatorShown?: boolean;
}

export const AmountSection: FC<Props> = ({ isSeparatorShown = true }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const languageCode = useLanguage();

  const abTests = useABTests();
  const { order, isUserSeller } = useContext(OrderPageContext);

  const counterpartyUser = isUserSeller ? order?.buyer : order?.seller;

  if (!order) return null;

  const activeOrderTop = (
    <Amount
      align="center"
      isAmountCopyable
      top={
        <OperationInfo
          isVerifiedMerchant={
            abTests.data?.verifiedMerchantBadge && counterpartyUser?.isVerified
          }
          operation={
            isUserSeller
              ? t('p2p.order_detail.you_selling_to')
              : t('p2p.order_detail.you_buying_from')
          }
          merchant={counterpartyUser?.nickname}
          avatar={
            <AliasAvatar
              size={theme === 'apple' ? 32 : 24}
              id={Number(counterpartyUser?.userId || 0)}
              avatarCode={counterpartyUser?.avatarCode}
              loading={!counterpartyUser?.avatarCode}
            />
          }
        />
      }
      bottom={
        <Identificator className={styles.identificator} number={order.number} />
      }
      currency={order.volume.currencyCode}
      value={printCryptoAmount({
        amount: Number(order.volume.amount),
        currency: order.volume.currencyCode as CryptoCurrency,
        languageCode,
      })}
    />
  );

  if (theme === 'apple') return activeOrderTop;

  return <Section separator={isSeparatorShown}>{activeOrderTop}</Section>;
};
