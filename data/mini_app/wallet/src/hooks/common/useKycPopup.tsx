import { useKycStatus } from 'query/wallet/kyc/useKycStatus';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KycPromotionRequiredDetailsPromotionKYCLevelEnum } from 'api/p2p/generated-common';

import routePaths from 'routePaths';

import { useAppDispatch } from 'store';

import { updateKyc } from 'reducers/kyc/kycSlice';

export const useKycPopup = () => {
  const { t } = useTranslation();
  const { kycStatus } = useKycStatus();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    promotionKYCLevel:
      | KycPromotionRequiredDetailsPromotionKYCLevelEnum
      | undefined,
  ) =>
    window.Telegram.WebApp.showPopup(
      {
        title: t('kyc.popup_title'),
        message: t('kyc.popup_description'),
        buttons: [
          {
            id: 'yes',
            text: t('kyc.popup_ok'),
          },
          {
            id: 'cancel',
            text: t('kyc.popup_cancel'),
          },
        ],
      },
      async (id) => {
        if (id === 'yes') {
          dispatch(
            updateKyc({
              nextLevel: promotionKYCLevel,
            }),
          );

          navigate(
            kycStatus?.level ===
              KycPromotionRequiredDetailsPromotionKYCLevelEnum._0
              ? routePaths.KYC_FIRST_CONFIRMATION
              : routePaths.KYC_CONFIRMATION,
          );
        }
      },
    );
};
