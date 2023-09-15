import { FC, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import Mono from 'components/Mono/Mono';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';

import styles from './AddressDiplay.module.scss';

const AddressDisplay: FC<{ address: string }> = ({ address }) => {
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);

  const copyAddressToClipboard = () => {
    copyToClipboard(address).then(() => {
      snackbarContext.showSnackbar({
        text: t('transaction.address_copied'),
      });
    });
  };

  return (
    <>
      <div className={styles.addressContainer}>
        <Mono onClick={copyAddressToClipboard}>
          {address.slice(0, address.length / 2)}
          <br />
          {address.slice(address.length / 2)}
        </Mono>
      </div>
      <Text
        apple={{ variant: 'subheadline1', weight: 'regular', color: 'hint' }}
        material={{ variant: 'subtitle2', weight: 'regular', color: 'hint' }}
        data-testid="tgcrawl"
      >
        {t('receive.address', {
          currencyCode: FrontendCryptoCurrencyEnum.Ton,
        })}
      </Text>
    </>
  );
};

export default memo(AddressDisplay);
