import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { RootState } from 'store';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

export const useReceiveAvailability = () => {
  const { permissions } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const snackbarContext = useContext(SnackbarContext);

  return () => {
    if (!permissions.canReceive) {
      snackbarContext.showSnackbar({
        snackbarId: 'receive_unavailable',
        before: <WarningSVG />,
        text: t('common.feature_is_blocked'),
        action: (
          <a href={WALLET_SUPPORT_BOT_LINK}>{t('common.contact_support')}</a>
        ),
        actionPosition: 'bottom',
      });
      return false;
    }

    return true;
  };
};
