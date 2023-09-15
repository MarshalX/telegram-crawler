import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ValidationError } from 'types/receiverSearch';

import { ErrorCell } from 'containers/common/ReceiverSearch/ErrorCell/ErrorCell';

import { getNetworkByCurrency } from 'utils/common/network';

interface ErrorsProps {
  error: ValidationError;
  assetCurrency: FrontendCryptoCurrencyEnum;
}

export const Errors: FC<ErrorsProps> = ({ error, assetCurrency }) => {
  const { t } = useTranslation();
  return (
    <>
      {error === 'invalid_address' && (
        <ErrorCell
          title={t('receiver_search.invalid_address')}
          text={t('receiver_search.invalid_address_text', {
            currency: `${assetCurrency} ${getNetworkByCurrency(assetCurrency)}`,
          })}
        />
      )}
      {error === 'invalid_domain' && (
        <ErrorCell
          title={t('receiver_search.invalid_domain')}
          text={t('receiver_search.invalid_domain_text')}
        />
      )}
      {error === 'invalid_length' && (
        <ErrorCell
          title={t('receiver_search.invalid_address')}
          text={t('receiver_search.invalid_address_length_text')}
        />
      )}
      {error === 'yourself' && (
        <ErrorCell
          title={t('receiver_search.invalid_address')}
          text={t('receiver_search.invalid_address_yourself_text')}
        />
      )}
      {error === 'address_forbidden' && (
        <ErrorCell
          title={t('receiver_search.invalid_address')}
          text={t('receiver_search.address_forbidden_text')}
        />
      )}
      {error === 'invalid_web3_domain' && (
        <ErrorCell
          title={t('receiver_search.invalid_address')}
          text={t('receiver_search.invalid_web3_domain_text')}
        />
      )}
    </>
  );
};
