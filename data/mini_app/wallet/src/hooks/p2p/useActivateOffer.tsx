import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/p2p';
import {
  ActivateOfferRestRequestTypeEnum,
  DetailedRestResponseActivateOfferRestStatusKycPromotionRequiredDetails,
} from 'api/p2p/generated-common';
import { CryptoCurrency } from 'api/wallet/generated';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { printCryptoAmount } from 'utils/common/currency';

import { useKycPopup } from 'hooks/common/useKycPopup';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTgBotLink } from 'hooks/utils/useTgBotLink';

import useSettings from './useSettings';

const useActivateOffer = () => {
  const snackbarContext = useContext(SnackbarContext);
  const tgBotLink = useTgBotLink();
  const { t } = useTranslation();
  const languageCode = useLanguage();
  const showKycPopup = useKycPopup();

  const settings = useSettings();

  const getSnackbarMessage = ({
    activeOfferLimit,
    status,
    baseCurrencyCode,
  }: {
    activeOfferLimit?: number;
    status: DetailedRestResponseActivateOfferRestStatusKycPromotionRequiredDetails['status'];
    baseCurrencyCode: CryptoCurrency;
  }) => {
    if (status === 'ACTIVE_OFFER_COUNT_LIMIT_REACHED') {
      return t('p2p.you_reached_max_of_active_ads', {
        count: activeOfferLimit,
      });
    } else if (status === 'NO_VOLUME_ENOUGH') {
      return t('p2p.user_profile.funds_reservation_failed');
    } else if (status === 'ACCESS_DENIED') {
      return t('p2p.please_contact_support_for_details');
    } else if (status === 'PHONE_NUMBER_REQUIRED') {
      return t('p2p.share_your_phone_number_in_the_bot');
    } else if (status === 'NO_OFFER_REMAINING_VOLUME_ENOUGH') {
      return t('p2p.ad_cannot_renewed', {
        amount: printCryptoAmount({
          amount:
            settings.data?.offerSettings.offerVolumeLimitsByCurrencyCode[
              baseCurrencyCode
            ].minInclusive || '0',
          currency: baseCurrencyCode,
          languageCode,
          currencyDisplay: 'code',
        }),
      });
    } else {
      return t('p2p.create_offer_page.something_went_wrong');
    }
  };

  const getSnackbarTitle = ({
    status,
  }: {
    status: DetailedRestResponseActivateOfferRestStatusKycPromotionRequiredDetails['status'];
  }) => {
    if (status === 'ACCESS_DENIED') {
      return t('p2p.operation_unavailable');
    }

    return null;
  };

  const getSnackbarAction = ({
    status,
  }: {
    status: DetailedRestResponseActivateOfferRestStatusKycPromotionRequiredDetails['status'];
  }) => {
    if (status === 'PHONE_NUMBER_REQUIRED') {
      return (
        <button
          type="button"
          onClick={() => {
            window.Telegram.WebApp.openTelegramLink(tgBotLink);
          }}
        >
          {t('p2p.go_to_bot')}
        </button>
      );
    }

    if (status === 'ACCESS_DENIED') {
      return (
        <button
          type="button"
          onClick={() =>
            window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK)
          }
        >
          {t('common.contact')}
        </button>
      );
    }

    return null;
  };

  const activateOffer = async ({
    offerType,
    offerId,
    baseCurrencyCode,
  }: {
    offerType: ActivateOfferRestRequestTypeEnum;
    offerId: number;
    baseCurrencyCode: CryptoCurrency;
  }) => {
    const { data } = await API.Offer.activateOfferV2({
      type: offerType,
      offerId,
    });

    if (data.status === 'KYC_PROMOTION_REQUIRED') {
      showKycPopup(data.errorDetails?.promotionKYCLevel);
    } else if (data.status !== 'SUCCESS') {
      const text = getSnackbarMessage({
        status: data.status,
        activeOfferLimit:
          settings.data?.offerSettings.activeBuyOffersCountLimit,
        baseCurrencyCode,
      });

      const title = getSnackbarTitle({
        status: data.status,
      });

      const action = getSnackbarAction({
        status: data.status,
      });

      snackbarContext.showSnackbar({
        snackbarId: 'activateOffer',
        icon: 'warning',
        text,
        title,
        action,
        showDuration: 5000,
      });
    }

    return data;
  };

  return activateOffer;
};

export default useActivateOffer;
