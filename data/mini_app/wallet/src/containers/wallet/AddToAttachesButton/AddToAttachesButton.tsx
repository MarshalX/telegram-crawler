import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store';

import ActionButton from 'components/ActionButton/ActionButton';

import {
  generateTelegramLink,
  isClientSupportsSideMenu,
} from 'utils/common/common';
import { logEvent } from 'utils/common/logEvent';

import { useAddToAttachesAvailability } from 'hooks/utils/useAddToAttachesAvailability';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as AttachesSVG } from 'images/attaches.svg';
import { ReactComponent as GearSVG } from 'images/gear.svg';

import styles from './AddToAttachesButton.module.scss';

export const AddToAttachesButton: FC<{
  startattach: string;
  from?: string;
}> = ({ startattach, from }) => {
  const { theme, themeClassName } = useTheme(styles);
  const { botUsername } = useAppSelector((state) => state.wallet);
  const { t } = useTranslation();
  const isAddToAttachesAvailable = useAddToAttachesAvailability();

  const Icon = isClientSupportsSideMenu() ? GearSVG : AttachesSVG;

  return (
    <ActionButton
      shiny
      size="medium"
      stretched
      onClick={() => {
        logEvent('Clicked Add to attach', { from });
        if (isAddToAttachesAvailable()) {
          window.Telegram.WebApp.openTelegramLink(
            generateTelegramLink(botUsername, {
              attach: botUsername,
              startattach,
            }),
          );
        }
      }}
    >
      <div className={themeClassName('buttonInner')}>
        {t('common.attaches_banner_button')}
        <Icon
          width={theme === 'apple' ? 20 : 16}
          height={theme === 'apple' ? 22 : 18}
        />
      </div>
    </ActionButton>
  );
};
