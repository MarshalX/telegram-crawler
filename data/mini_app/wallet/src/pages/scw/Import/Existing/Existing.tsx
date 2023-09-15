import cn from 'classnames';
import { useActiveSCWAddress, useBackupSCWAddress } from 'query/scw/address';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { updateSCW } from 'reducers/scw/scwSlice';

import AddressDisplay from 'containers/scw/AddressDisplay/AddressDisplay';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { createWallet, getFriendlyAddress } from 'utils/scw/ton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WriteSVG } from 'images/write.svg';

import styles from './Existing.module.scss';

const WriteAnimation = lazy(
  () => import('components/animations/WriteAnimation/WriteAnimation'),
);

// For users who already have existing wallet, but not wallet on current device
const Existing = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeSCWAddress = useActiveSCWAddress();
  const backupSCWAddress = useBackupSCWAddress();
  const importSCWAddress = activeSCWAddress
    ? activeSCWAddress
    : backupSCWAddress;
  const friendlyAddress = importSCWAddress
    ? getFriendlyAddress(importSCWAddress)
    : undefined;

  const showHasScwAddressAlert = () => {
    window.Telegram.WebApp.showPopup({
      message: t('scw.onboarding.multiple_ton_space_text'),
      buttons: [
        {
          type: 'ok',
        },
      ],
    });
  };

  const handleCreateWallet = async () => {
    if (activeSCWAddress) {
      showHasScwAddressAlert();
    } else {
      const wallet = await createWallet();

      dispatch(
        updateSCW({
          ...wallet,
          setupComplete: false,
          recoveryComplete: false,
        }),
      );

      navigate(routePaths.SCW_BACKUP_CHOOSE_METHOD);
    }
  };

  return (
    <Page>
      <BackButton />
      <div className={themeClassName('root')}>
        <Suspense
          fallback={<WriteSVG className={cn(themeClassName('media'))} />}
        >
          <WriteAnimation className={cn(themeClassName('media'))} />
        </Suspense>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.import.existing.title')}
        </Text>
        <Text
          apple={{ variant: 'body', weight: 'regular' }}
          material={{ variant: 'body', weight: 'regular', color: 'hint' }}
        >
          {t('scw.import.existing.description')}
        </Text>
        {!!friendlyAddress && <AddressDisplay address={friendlyAddress} />}
      </div>
      <BottomContent className={themeClassName('bottom')}>
        <ActionButton
          data-testid="tgcrawl"
          stretched
          size="medium"
          onClick={() => navigate(routePaths.SCW_IMPORT_CHOOSE_METHOD)}
          className={styles.button}
        >
          {t('scw.import.existing.main_button')}
        </ActionButton>
        <ActionButton
          data-testid="tgcrawl"
          size="medium"
          stretched
          mode="transparent"
          onClick={handleCreateWallet}
          className={styles.button}
        >
          {t('scw.import.existing.secondary_button')}
        </ActionButton>
      </BottomContent>
    </Page>
  );
};

export default memo(Existing);
