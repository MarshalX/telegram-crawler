import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

const useAntifraudStatus = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { t } = useTranslation();

  const showSnackbarForBannedUser = useCallback(() => {
    snackbarContext.showSnackbar({
      icon: 'warning',
      title: t('p2p.operation_unavailable'),
      text: t('p2p.please_contact_support_for_details'),
      action: (
        <div
          onClick={() =>
            window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK)
          }
        >
          {t('common.contact')}
        </div>
      ),
      showDuration: 5000,
    });
  }, [snackbarContext, t]);

  return { showSnackbarForBannedUser };
};

export default useAntifraudStatus;
