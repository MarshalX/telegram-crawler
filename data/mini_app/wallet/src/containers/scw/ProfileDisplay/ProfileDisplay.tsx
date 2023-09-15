import { memo, useContext } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store';

import Avatar from 'components/Avatar/Avatar';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import { copyToClipboard } from 'utils/common/common';
import { squashAddress } from 'utils/wallet/transactions';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './ProfileDisplay.module.scss';

export interface SCWProfileDisplayProps {
  allowCopy?: boolean;
}

const SCWProfileDisplay: React.FC<SCWProfileDisplayProps> = ({
  allowCopy = false,
}) => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const snackbarContext = useContext(SnackbarContext);

  const { address } = useAppSelector((state) => state.scw);
  const userPhotoUrl = useAppSelector((state) => state.user.photo_url);

  const handleCopy = () => {
    copyToClipboard(address).then(() => {
      snackbarContext.showSnackbar({
        onShow: () =>
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success'),
        showDuration: 2000,
        snackbarId: 'receive_address_copied',
        text: t('receive.copied'),
      });
    });
  };

  return (
    <div className={styles.header}>
      <Avatar size={88} src={userPhotoUrl} />
      <Text
        apple={{ variant: 'body', weight: 'medium', color: 'hint' }}
        material={{ variant: 'body', color: 'hint', weight: 'regular' }}
        className={themeClassName('addressTitle')}
      >
        {t('scw.address_title', { currency: 'TON' })}
      </Text>
      <Text
        apple={{ variant: 'title1', color: 'overlay', rounded: true }}
        material={{
          variant: 'headline5',
          color: 'overlay',
        }}
        onClick={allowCopy ? handleCopy : undefined}
      >
        {squashAddress(address, { start: 4, end: 4 })}
      </Text>
    </div>
  );
};

export default memo(SCWProfileDisplay);
