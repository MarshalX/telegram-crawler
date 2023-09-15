import { ConnectRequest } from '@tonconnect/protocol';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import customPalette from 'customPalette';

import { MainButton } from 'components/MainButton/MainButton';
import { Modal } from 'components/Modal/Modal';
import Skeleton from 'components/Skeleton/Skeleton';
import { Text } from 'components/Text/Text';

import { INIT_DAPP_MANIFEST, getDomainFromURL } from 'utils/scw/ton';
import { TonConnect } from 'utils/scw/tonConnect/tonConnect';
import { DAppManifest } from 'utils/scw/tonConnect/types';
import { squashAddress } from 'utils/wallet/transactions';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './ConnectModal.module.scss';

const isWeb = window.Telegram.WebApp.platform === 'unknown';

const ConnectSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonLogo} />
      <Text
        apple={{ variant: 'body', weight: 'semibold' }}
        material={{ variant: 'headline7' }}
        className={styles.title}
        skeleton
        skeletonWidth={250}
      />
      <Text
        apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
        material={{ variant: 'subtitle1', color: 'hint' }}
        className={styles.text}
        skeleton
        skeletonWidth={250}
      />
      <div
        className={cn(styles.text, styles.separator, {
          [styles.webSpacing]: isWeb,
        })}
      >
        <Text
          apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
          material={{ variant: 'subtitle1', color: 'hint' }}
          skeleton
          skeletonWidth={200}
        />
      </div>
    </div>
  );
};

export const ConnectModal: FC<{
  onClose: VoidFunction;
  onConnect: () => Promise<boolean>;
  params: URLSearchParams;
  address: string;
}> = ({ onClose, onConnect, params, address }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [manifest, setManifest] = useState<DAppManifest>(INIT_DAPP_MANIFEST);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const connectionRequest = params.get('r');
  const manifestNotFound = manifestLoaded && !manifest.url && !manifest.name;
  const isButtonDisabled = !manifestLoaded || connecting || manifestNotFound;

  const handleUpdateManifest = async (request: ConnectRequest) => {
    TonConnect.getManifest(request)
      .then((response) => {
        setManifest(response);
      })
      .finally(() => {
        setManifestLoaded(true);
      });
  };

  useEffect(() => {
    if (connectionRequest && connectionRequest !== 'undefined') {
      const request = JSON.parse(
        decodeURIComponent(connectionRequest),
      ) as ConnectRequest;
      handleUpdateManifest(request);
    }
  }, [connectionRequest]);

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  return (
    <Modal onClose={onClose}>
      <Skeleton skeletonShown={!manifestLoaded} skeleton={<ConnectSkeleton />}>
        <Skeleton
          skeletonShown={!iconLoaded}
          skeleton={
            <>
              <div className={styles.skeletonLogo} />
              <img
                src={manifest?.iconUrl}
                onLoad={async () => {
                  setIconLoaded(true);
                }}
                className={styles.logoHidden}
              />
            </>
          }
        >
          <img src={manifest?.iconUrl} className={styles.logo} />
        </Skeleton>
        {manifest.name && (
          <Text
            apple={{ variant: 'body', weight: 'semibold' }}
            material={{ variant: 'headline7' }}
            className={styles.title}
          >
            {t('scw.connect_modal.connect_to_app', {
              appName: manifest?.name,
            })}
          </Text>
        )}
        {manifest.url && (
          <Text
            apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
            material={{ variant: 'subtitle1', color: 'hint' }}
            className={styles.text}
          >
            <a href={manifest?.url} target="_blank" rel="noreferrer">
              {getDomainFromURL(manifest?.url || '')}
            </a>
            &nbsp;
            {t('scw.connect_modal.requesting_access_to_address')}
          </Text>
        )}
        {manifestNotFound && (
          <Text
            apple={{ variant: 'body', weight: 'semibold' }}
            material={{ variant: 'headline7' }}
            className={styles.title}
          >
            {t('scw.connect_modal.dapp_manifest_not_found')}
          </Text>
        )}
        <Text
          apple={{ variant: 'callout', weight: 'regular', color: 'hint' }}
          material={{ variant: 'subtitle1', color: 'hint' }}
          className={cn(styles.text, styles.separator, {
            [styles.webSpacing]: isWeb,
          })}
        >
          {squashAddress(address, { start: 4, end: 4 })}
        </Text>
      </Skeleton>
      <MainButton
        disabled={isButtonDisabled}
        progress={connecting}
        color={
          isButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : window.Telegram.WebApp.themeParams.button_color
        }
        textColor={
          isButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : window.Telegram.WebApp.themeParams.button_text_color
        }
        onClick={() => {
          setConnecting(true);
          onConnect()
            .catch(() => {})
            .finally(() => {
              setConnecting(false);
            });
        }}
        text={t('scw.connect_modal.connect_wallet')}
      />
    </Modal>
  );
};
