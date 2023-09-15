import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import customPalette from 'customPalette';

import { MainButton } from 'components/MainButton/MainButton';

import { useColorScheme } from 'hooks/utils/useColorScheme';

import { AppearanceContext } from '../../../../AppearanceProvider';

interface ContinueButtonProps {
  progress: boolean;
  disabled: boolean;
  onSubmit: VoidFunction;
}

export const ContinueButton: FC<ContinueButtonProps> = ({
  progress,
  disabled,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(AppearanceContext);
  const colorScheme = useColorScheme();

  return (
    <MainButton
      progress={progress}
      disabled={disabled}
      onClick={onSubmit}
      text={t('receiver_search.continue').toLocaleUpperCase()}
      color={
        disabled
          ? customPalette[theme][colorScheme].button_disabled_color
          : window.Telegram.WebApp.themeParams.button_color
      }
      textColor={
        disabled
          ? customPalette[theme][colorScheme].button_disabled_text_color
          : window.Telegram.WebApp.themeParams.button_text_color
      }
    />
  );
};
