import * as Sentry from '@sentry/react';
import SumsubWebSdk from '@sumsub/websdk-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';

import API from 'api/p2p';

import routePaths from 'routePaths';

import { useAppSelector } from 'store';

import { BackButton } from 'components/BackButton/BackButton';
import { MainButton } from 'components/MainButton/MainButton';
import Page from 'components/Page/Page';

import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useLanguage } from 'hooks/utils/useLanguage';
import { useTheme } from 'hooks/utils/useTheme';

import styles from './Sumsub.module.scss';

const Sumsub = () => {
  const { t } = useTranslation();
  const languageCode = useLanguage();
  const { theme } = useTheme(styles);
  const colorScheme = useColorScheme();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string>();
  const [isButtonDisplayed, setIsButtonDisplayed] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  const { nextLevel = 'LEVEL_2' } = useAppSelector((state) => state.kyc);

  async function getSumsubToken() {
    const response = await API.User.startKyc({
      level: nextLevel,
    });

    if (response.data.data) {
      return response.data.data.accessToken;
    } else {
      return Promise.reject();
    }
  }

  const messageHandler = (message: unknown, data: { reviewStatus: string }) => {
    if ('idCheck.applicantStatus' === message) {
      if (data.reviewStatus === 'pending') {
        setIsButtonDisplayed(true);
        setIsClosed(true);
      }

      if (data.reviewStatus === 'completed') {
        setIsButtonDisplayed(true);
        setIsClosed(false);
      }
    }
  };

  const handleClick = () => {
    if (isClosed) {
      window.Telegram.WebApp.close();
    } else {
      navigate(routePaths.MAIN);
    }
  };

  useEffect(() => {
    API.User.startKyc({
      level: nextLevel,
    })
      .then((response) => {
        if (response.data.status === 'ALREADY') {
          navigate({
            pathname: routePaths.KYC_SETTINGS,
            search: createSearchParams({
              backPath: routePaths.MAIN,
            }).toString(),
          });
          return;
        }

        setAccessToken(response.data.data?.accessToken);
      })
      .catch((error) => {
        Sentry.captureMessage(error, {
          extra: {
            level: nextLevel,
          },
        });
      });
  }, []);

  return (
    <Page>
      <BackButton />
      {accessToken && (
        <SumsubWebSdk
          className={styles.iframe}
          onMessage={messageHandler}
          config={{
            lang: languageCode,
            uiConf: {
              customBodyClass: [
                `color-scheme-${colorScheme}-sumsub`,
                `theme-${theme}-sumsub`,
              ],
              customCss:
                process.env.NODE_ENV === 'development'
                  ? `${location.origin}/css/sumsub.css`
                  : '',
            },
          }}
          accessToken={accessToken}
          expirationHandler={getSumsubToken}
        />
      )}
      {isButtonDisplayed && (
        <MainButton text={t('kyc.button')} onClick={handleClick} />
      )}
    </Page>
  );
};

export default Sumsub;
