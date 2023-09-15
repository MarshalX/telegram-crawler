import { resetTransactions } from 'query/wallet/transactions/useTransactions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import API from 'api/wallet';
import {
  BotKycPollingQuery,
  FiatCurrency,
  FrontendCryptoCurrencyEnum,
} from 'api/wallet/generated';

import { InvoiceStatus } from 'types/webApp';

import routePaths from 'routePaths';

import customPalette from 'customPalette';

import { RootState, useAppSelector } from 'store';

import { createPurchase } from 'reducers/purchase/purchaseSlice';
import { updatePurchaseByCard } from 'reducers/user/userSlice';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';

import { isIOS } from 'utils/common/common';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';
import { usePurchase } from 'hooks/wallet/usePurchase';

import styles from './KYC.module.scss';

const KYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [progress, setProgress] = useState(false);
  const [message, setMessage] = useState<
    'applicantSubmitted' | 'verificationFinished'
  >();

  const theme = useTheme();
  const colorScheme = useColorScheme();
  const kyc = useSelector((state: RootState) => state.kyc);
  const { purchase_id } = useAppSelector((state) => state.purchase);

  const { featureFlags } = useAppSelector((state) => state.user);
  const isNewPurchaseFlow = featureFlags.rcards;

  const initKycPool = () => {
    const kycData = {
      btn_kyc_retry_url: kyc.btn_kyc_retry_url,
      btn_kyc_success_text: kyc.btn_kyc_success_text,
      btn_kyc_success_url: kyc.btn_kyc_success_url,
    } as BotKycPollingQuery;

    if (isNewPurchaseFlow && purchase_id) {
      return API.Purchases.initBotKycPollOfPurchase({
        ...kycData,
        purchase_internal_id: purchase_id,
      });
    } else {
      return API.Users.initBotKycPoll({ ...kycData, purchase_id: kyc.id }).then(
        (response) => {
          return response.data;
        },
      );
    }
  };

  const makePurchase = usePurchase();

  const openInvoice = async () => {
    try {
      const purchase = await makePurchase({
        baseAmount: kyc.inputNumValue as number,
        baseCurrency: kyc.baseCurrency as
          | FrontendCryptoCurrencyEnum
          | FiatCurrency,
        secondaryCurrency: kyc.secondaryCurrency as
          | FrontendCryptoCurrencyEnum
          | FiatCurrency,
      });

      if (!purchase) {
        return;
      }

      dispatch(
        createPurchase({
          method: 'card_default',
          status: 'pending',
          ...purchase,
        }),
      );

      resetTransactions();

      return purchase?.payment_url;
    } catch (error) {
      console.error(error);
    }

    setProgress(false);
  };

  const getKycStatus = () => {
    if (isNewPurchaseFlow && purchase_id) {
      return API.Purchases.getKycStatusOfPurchase({
        purchase_internal_id: purchase_id,
      }).then((response) => {
        return response.data;
      });
    } else {
      return API.Users.getKycStatus(kyc.id).then((response) => {
        return response.data;
      });
    }
  };

  useEffect(() => {
    const messageListner = (event: MessageEvent) => {
      const messageEvent = JSON.parse(event.data) as {
        type: 'applicantSubmitted' | 'verificationFinished' | undefined;
      };

      if (
        messageEvent.type === 'applicantSubmitted' ||
        messageEvent.type === 'verificationFinished'
      ) {
        setMessage(messageEvent.type);
      }
    };

    window.addEventListener('message', messageListner, false);
    return () => window.removeEventListener('message', messageListner, false);
    // eslint-disable-next-line
  }, []);

  const openInvoiceCallback = (status: InvoiceStatus) => {
    if (status === 'paid' || status === 'pending') {
      navigate(routePaths.PURCHASE_STATUS);
    } else if (status === 'cancelled') {
      // На версиях ниже 6.2 в iOS клиенте есть баг из-за которого инвойс всегда закрывается со статусом cancelled
      // Редиректим таких юзеров на главную, где они будут видеть платеж с поллингом
      isIOS() &&
        !window.Telegram.WebApp.isVersionAtLeast('6.2') &&
        navigate(routePaths.MAIN);
    }
  };

  const handleKycClick = () => {
    getKycStatus().then((data) => {
      if (data.reject_status) {
        API.Users.getPaymentMethods().then(({ data }) => {
          dispatch(
            updatePurchaseByCard({
              code: data.card_default.reason_code,
              available: data.card_default.is_available,
            }),
          );
          navigate(routePaths.MAIN);
        });
      } else {
        if (message === 'applicantSubmitted') {
          setProgress(true);
          initKycPool().then(() => {
            window.Telegram.WebApp.close();
          });
        } else if (message === 'verificationFinished') {
          setProgress(true);
          openInvoice().then((invoiceLink) => {
            if (!invoiceLink) {
              return;
            }

            window.Telegram.WebApp.openInvoice(
              invoiceLink,
              openInvoiceCallback,
            );
          });
        }
      }
    });
  };

  const isButtonDisabled =
    message !== 'verificationFinished' && message !== 'applicantSubmitted';

  const buttonColor = isButtonDisabled
    ? customPalette[theme][colorScheme].button_disabled_color
    : customPalette[theme][colorScheme].button_confirm_color;

  const textButtonColor = isButtonDisabled
    ? customPalette[theme][colorScheme].button_disabled_text_color
    : customPalette[theme][colorScheme].button_confirm_text_color;

  return (
    <Page>
      <BackButton />
      <div>
        {kyc?.kycUrl && (
          <iframe className={styles.iframe} src={kyc.kycUrl} allow="camera" />
        )}
        <MainButton
          text={t('kyc.button')}
          disabled={isButtonDisabled}
          color={buttonColor}
          textColor={textButtonColor}
          progress={progress}
          onClick={handleKycClick}
        />
      </div>
    </Page>
  );
};

export default KYC;
