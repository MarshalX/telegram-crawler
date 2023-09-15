import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './OperationsUnavailable.module.scss';

const OperationsUnavailable = () => {
  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const [searchParams] = useSearchParams();
  const backUrl = searchParams.get('backUrl');
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      window.history.back();
    }
  };

  return (
    <Page mode="secondary">
      <BackButton onClick={handleBackClick} />
      <div className="container">
        <div className={themeClassName('root')}>
          <div className={styles.description}>
            {t('p2p.operations_unavailable')}
          </div>
          <div
            className={styles.link}
            onClick={() => {
              window.Telegram.WebApp.openTelegramLink(WALLET_SUPPORT_BOT_LINK);
            }}
          >
            {t('p2p.contact_customer_support')}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default OperationsUnavailable;
