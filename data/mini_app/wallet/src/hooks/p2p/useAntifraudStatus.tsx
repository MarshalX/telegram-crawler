import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from 'api/p2p';
import { RestResponseCheckUserResponseStatusStatusEnum } from 'api/p2p/generated-common';

import { useAppSelector } from 'store';

import { useTgBotLink } from 'hooks/utils/useTgBotLink';

const useAntifraudStatus = () => {
  const { userId, p2pInitialized } = useAppSelector((state) => state.p2pUser);
  const tgBotLink = useTgBotLink();

  const { t } = useTranslation();

  const showShareNumberModal = useCallback(
    ({
      onCancel,
    }: {
      onCancel?: () => void;
    } = {}) => {
      window.Telegram.WebApp.showPopup(
        {
          message: t('p2p.share_your_phone_number_in_the_bot'),
          buttons: [
            {
              id: 'cancel',
              text: t('common.cancel'),
            },
            {
              id: 'goToBot',
              text: t('p2p.go_to_bot'),
            },
          ],
        },
        (result) => {
          if (result === 'goToBot') {
            window.Telegram.WebApp.openTelegramLink(tgBotLink);
            return;
          }

          onCancel && onCancel();
        },
      );
    },
    [t, tgBotLink],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] =
    useState<RestResponseCheckUserResponseStatusStatusEnum>();

  useEffect(() => {
    if (!userId || !p2pInitialized) {
      return;
    }

    const init = async () => {
      setIsLoading(true);
      try {
        const { data } = await API.Antifraud.checkUserV2();

        setData(data.status);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    init();
  }, [userId, p2pInitialized]);

  return { data, isLoading, showShareNumberModal };
};

export default useAntifraudStatus;
