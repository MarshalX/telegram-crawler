import classNames from 'classnames';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import Mono from 'components/Mono/Mono';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './AddressWithQR.module.scss';
import { QR, render as renderQR } from './qr_utils';

const COMPACT_HEIGHT = window.innerHeight < 540;

export const AddressWithQR: FC<{
  address?: string;
  logo: ReactNode;
  currency: FrontendCryptoCurrencyEnum;
  className?: string;
}> = ({ address, logo, currency, className }) => {
  const { themeClassName, theme } = useTheme(styles);
  const colorScheme = useColorScheme();
  const QR_SIZE = COMPACT_HEIGHT ? 120 : theme === 'apple' ? 200 : 180;
  const snackbarContext = useContext(SnackbarContext);
  const { t } = useTranslation();
  const [qrImage, setQrImage] = useState<QR>();

  useEffect(() => {
    if (address) {
      renderQR({
        address: address,
        data:
          currency === FrontendCryptoCurrencyEnum.Ton
            ? `ton://transfer/${address}`
            : address,
        qrSize: QR_SIZE,
      }).then((res) => {
        setQrImage(res);
      });
    }
  }, [address, colorScheme, currency, QR_SIZE]);

  const copyAddressToClipboard = () => {
    if (address) {
      copyToClipboard(address).then(() => {
        snackbarContext.showSnackbar({
          onShow: () =>
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(
              'success',
            ),
          showDuration: 2000,
          snackbarId: 'receive_address_copied',
          text: t('receive.copied'),
        });
      });
    }
  };

  const hasAddress = !!address;

  return (
    <div
      className={classNames(
        themeClassName('qr'),
        COMPACT_HEIGHT && styles.compactHeight,
        styles[colorScheme],
        className,
      )}
    >
      <Skeleton
        skeleton={
          <section
            className={themeClassName('qrContainer')}
            style={{
              width: QR_SIZE,
              height: QR_SIZE,
            }}
            data-testid="tgcrawl"
          >
            <div className={styles.qrSkeleton} />
          </section>
        }
        skeletonShown={!hasAddress || !qrImage}
      >
        <section
          className={themeClassName('qrContainer')}
          style={{
            width: QR_SIZE,
            height: QR_SIZE,
          }}
          data-testid="tgcrawl"
        >
          <div
            className={styles.qrLogo}
            style={{
              width: qrImage?.holeSize,
              height: qrImage?.holeSize,
            }}
          >
            {logo}
          </div>
          <div
            className={styles.qrImage}
            style={{
              backgroundImage: `url(${qrImage?.dataURL})`,
            }}
          />
        </section>
      </Skeleton>
      <div className={themeClassName('address')}>
        <Skeleton
          skeleton={
            <div
              className={classNames(
                themeClassName('addressContainer'),
                styles.skeleton,
              )}
            />
          }
          skeletonShown={!hasAddress}
        >
          <div className={themeClassName('addressContainer')}>
            {hasAddress && (
              <Mono
                className={themeClassName('addressValue')}
                onClick={copyAddressToClipboard}
              >
                {address.slice(0, address.length / 2)}
                <br />
                {address.slice(address.length / 2)}
              </Mono>
            )}
          </div>
        </Skeleton>
        <Text
          apple={{ variant: 'subheadline1', weight: 'regular', color: 'hint' }}
          material={{ variant: 'subtitle2', weight: 'regular', color: 'hint' }}
          data-testid="tgcrawl"
        >
          {t('receive.address', {
            currencyCode: currency,
          })}
        </Text>
      </div>
    </div>
  );
};
