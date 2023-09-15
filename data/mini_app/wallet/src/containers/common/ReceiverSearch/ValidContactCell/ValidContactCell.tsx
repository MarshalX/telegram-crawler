import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { ContactCell } from 'containers/common/ReceiverSearch/ContactCell/ContactCell';

import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo';

import { isTONDomain, isWeb3Domain } from 'utils/common/ton';
import { squashAddress } from 'utils/wallet/transactions';

interface ValidContactCellProps {
  assetCurrency: FrontendCryptoCurrencyEnum;
  trimmedInputAddress: string;
  validAddress: string;
  avatarSize: number;
  onSubmit: VoidFunction;
}

export const ValidContactCell: FC<ValidContactCellProps> = ({
  assetCurrency,
  trimmedInputAddress,
  validAddress,
  avatarSize,
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <ContactCell
      before={
        <CurrencyLogo
          currency={assetCurrency}
          style={{ width: avatarSize, height: avatarSize }}
        />
      }
      top={
        isTONDomain(trimmedInputAddress) || isWeb3Domain(trimmedInputAddress)
          ? trimmedInputAddress
          : squashAddress(validAddress, { start: 4, end: 4 })
      }
      bottom={
        isTONDomain(trimmedInputAddress)
          ? `TON DNS · ${squashAddress(validAddress, {
              start: 4,
              end: 4,
            })}`
          : isWeb3Domain(trimmedInputAddress)
          ? `${t('receiver_search.web3_domain')} · ${squashAddress(
              validAddress,
              {
                start: 4,
                end: 4,
              },
            )}`
          : t('receiver_search.address_description', {
              currency: assetCurrency,
            })
      }
      separator={false}
      onClick={onSubmit}
    />
  );
};
