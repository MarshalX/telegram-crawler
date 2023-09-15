import * as Sentry from '@sentry/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { TELEGRAM_UPDATE_LINK } from 'config';

import { RootState } from 'store';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import {
  generateTelegramLink,
  isClientSupportsInvoices,
} from 'utils/common/common';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

const resolvePaymentMethodDisableCode = (
  code?: string,
): 'country_code_is_forbidden' | 'unavailable' => {
  if (code === 'country_code_is_forbidden') {
    return 'country_code_is_forbidden';
  } else {
    return 'unavailable';
  }
};

export const usePurchaseAvailability = () => {
  const { featureFlags, purchaseByCard } = useSelector(
    (state: RootState) => state.user,
  );
  const { t } = useTranslation();
  const { botUsername } = useSelector((state: RootState) => state.wallet);
  const snackbarContext = useContext(SnackbarContext);

  return () => {
    if (purchaseByCard) {
      if (!featureFlags.paymentByCard) {
        window.Telegram.WebApp.openTelegramLink(
          generateTelegramLink(botUsername, { start: 'wallet' }),
        );
        return false;
      } else if (!purchaseByCard.available) {
        snackbarContext.showSnackbar({
          snackbarId: 'purchase_unavailable',
          before: <WarningSVG />,
          text:
            resolvePaymentMethodDisableCode(purchaseByCard.code) ===
            'country_code_is_forbidden'
              ? t('buy.country_code_is_forbidden')
              : t('buy.unavailable'),
        });
        return false;
      } else if (!isClientSupportsInvoices()) {
        snackbarContext.showSnackbar({
          showDuration: 4000,
          snackbarId: 'old_client',
          before: <WarningSVG />,
          title: t('buy.old_client_title'),
          text: t('buy.old_client_text'),
          action: (
            <a target="_blank" href={TELEGRAM_UPDATE_LINK} rel="noreferrer">
              {t('buy.old_client_link')}
            </a>
          ),
        });
        return false;
      } else {
        return true;
      }
    } else {
      Sentry.captureException(
        'User clicked "Buy" before payment methods info has been loaded',
      );
      return false;
    }
  };
};
