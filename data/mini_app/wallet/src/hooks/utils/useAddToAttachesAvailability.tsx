import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { TELEGRAM_UPDATE_LINK } from 'config';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

export const useAddToAttachesAvailability = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { t } = useTranslation();

  return () => {
    if (
      window.Telegram.WebView?.initParams?.tgWebAppLinkBug === '1' &&
      window.Telegram.WebApp.platform === 'android'
    ) {
      showSnackbar({
        showDuration: 4000,
        snackbarId: 'old_client',
        before: <WarningSVG />,
        text: t('common.attaches_old_client_text'),
        action: (
          <a target="_blank" href={TELEGRAM_UPDATE_LINK} rel="noreferrer">
            {t('common.update')}
          </a>
        ),
        actionPosition: 'bottom',
      });
      return false;
    }

    return true;
  };
};
