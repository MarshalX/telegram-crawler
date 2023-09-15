import cn from 'classnames';
import { useActiveSCWAddress } from 'query/scw/address';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { useAppDispatch } from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import ActionButton from 'components/ActionButton/ActionButton';
import { BackButton } from 'components/BackButton/BackButton';
import { BottomContent } from 'components/BottomContent/BottomContent';
import Page from 'components/Page/Page';
import { Text } from 'components/Text/Text';

import { createWallet } from 'utils/scw/ton';

import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as SadSmileSVG } from 'images/sad.svg';

import styles from './Failed.module.scss';

const SadAnimation = lazy(
  () => import('components/animations/SadSmileAnimation/SadSmileAnimation'),
);

const Failed = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const scwAddress = useActiveSCWAddress();

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
    if (scwAddress) {
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

      navigate(routePaths.SCW_BACKUP_CHOOSE_METHOD, { replace: true });
    }
  };

  return (
    <Page>
      <BackButton />
      <>
        <div className={themeClassName('root')}>
          <Suspense
            fallback={<SadSmileSVG className={cn(themeClassName('media'))} />}
          >
            <SadAnimation className={cn(themeClassName('media'))} />
          </Suspense>
          <Text
            apple={{ variant: 'title1' }}
            material={{ variant: 'headline5' }}
            className={themeClassName('title')}
          >
            {t('scw.import.failed.unable_to_import')}
          </Text>
          <Text
            apple={{ variant: 'body', weight: 'regular', color: 'text' }}
            material={{ variant: 'body', weight: 'regular', color: 'hint' }}
          >
            {t('scw.import.failed.without_recovery_cant_restore')}
          </Text>
        </div>
        <BottomContent className={themeClassName('bottom')}>
          <ActionButton
            data-testid="tgcrawl"
            stretched
            size="medium"
            onClick={() =>
              navigate(routePaths.SWC_IMPORT_MNEMONIC, { replace: true })
            }
            className={styles.button}
          >
            {t('scw.import.failed.enter_recovery_phrase')}
          </ActionButton>
          <ActionButton
            data-testid="tgcrawl"
            size="medium"
            stretched
            mode="transparent"
            onClick={handleCreateWallet}
            className={styles.button}
          >
            {t('scw.import.failed.secondary_button')}
          </ActionButton>
        </BottomContent>
      </>
    </Page>
  );
};

export default memo(Failed);
