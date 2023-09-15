import {
  useActiveSCWAddress,
  useBackupSCWAddress,
  useSCWAddresses,
} from 'query/scw/address';
import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import { Cell } from 'components/Cells';
import { CellCard } from 'components/Cells/CellCard/CellCard';
import { InlineLayout } from 'components/InlineLayout/InlineLayout';
import Page from 'components/Page/Page';
import { RoundedIcon } from 'components/RoundedIcon/RoundedIcon';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';
import { Text } from 'components/Text/Text';

import {
  platformAllowsRecovery,
  shouldUpdateForRecovery,
} from 'utils/scw/recovery';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as ArrowSVG } from 'images/square_srrow_down.svg';
import { ReactComponent as TelegramSVG } from 'images/telegram.svg';

import styles from './ChooseMethod.module.scss';

const ChooseMethod = () => {
  const { t } = useTranslation();
  const { themeClassName, theme } = useTheme(styles);
  const navigate = useNavigate();
  const { data: scwAddresses } = useSCWAddresses();
  const activeAddress = useActiveSCWAddress();
  const activeHasBackup =
    !!activeAddress &&
    scwAddresses &&
    scwAddresses.backups.some((address) => address.address == activeAddress);
  const backupAddress = useBackupSCWAddress();
  const snackbarContext = useContext(SnackbarContext);

  const recoveryAvailable =
    (!!activeAddress && activeHasBackup) || (!activeAddress && !!backupAddress);

  const manuallyCard = (
    <InlineLayout>
      <CellCard
        tappable
        chevron
        onClick={() =>
          navigate(routePaths.SCW_IMPORT_CONFIRMATION, { replace: true })
        }
        start={
          <Cell.Part type="roundedIcon">
            <RoundedIcon
              size={theme === 'apple' ? 40 : 46}
              iconSize={28}
              backgroundColor="linear-gradient(180deg, #a0de7e 0%, #54cb68 100%)"
            >
              <ArrowSVG />
            </RoundedIcon>
          </Cell.Part>
        }
      >
        <Cell.Text
          title={t('scw.import.choose_method.manually_title')}
          description={t('scw.import.choose_method.manually_description')}
          multilineDescription
        />
      </CellCard>
    </InlineLayout>
  );

  const handleRecoveryClick = () => {
    if (!platformAllowsRecovery()) {
      snackbarContext.showSnackbar({
        snackbarId: 'scw',
        icon: 'warning',
        text: t('scw.update.recovery_not_yet_supported', {
          platform: window.Telegram.WebApp.platform,
        }),
      });
      return;
    }
    if (recoveryAvailable) {
      if (shouldUpdateForRecovery()) {
        navigate(routePaths.SCW_UPDATE);
      } else {
        navigate(routePaths.SCW_RECOVER, { replace: true });
      }
    }
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <div className={styles.root}>
        <Text
          apple={{ variant: 'title1' }}
          material={{ variant: 'headline5' }}
          className={themeClassName('title')}
        >
          {t('scw.import.choose_method.title')}
        </Text>
        <div className={themeClassName('options')}>
          {!recoveryAvailable && manuallyCard}
          <InlineLayout>
            <CellCard
              tappable={recoveryAvailable}
              chevron={recoveryAvailable}
              onClick={handleRecoveryClick}
              className={
                recoveryAvailable
                  ? undefined
                  : themeClassName('disabledCellCard')
              }
              start={
                <Cell.Part type="roundedIcon">
                  <RoundedIcon
                    size={theme === 'apple' ? 40 : 46}
                    iconSize={28}
                    className={
                      recoveryAvailable ? styles.tgLogo : styles.disabledTgLogo
                    }
                    backgroundColor={
                      recoveryAvailable
                        ? 'linear-gradient(180deg, #a7adb9 0%, #878b96 100%)'
                        : '#C8C7CB'
                    }
                  >
                    <TelegramSVG />
                  </RoundedIcon>
                </Cell.Part>
              }
            >
              <Cell.Text
                title={t('scw.import.choose_method.recovery_title')}
                description={t('scw.import.choose_method.recovery_description')}
                titleAppearance={recoveryAvailable ? undefined : 'disabled'}
                descriptionAppearance={
                  recoveryAvailable ? undefined : 'disabled'
                }
                multilineDescription
                className={styles.paddedCell}
              />
            </CellCard>
          </InlineLayout>
          {recoveryAvailable && manuallyCard}
        </div>
      </div>
    </Page>
  );
};

export default memo(ChooseMethod);
