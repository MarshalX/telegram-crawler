import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { BackButton } from 'components/BackButton/BackButton';
import Page from 'components/Page/Page';

import { useTheme } from 'hooks/utils/useTheme';

import styles from './NotificationsPage.module.scss';

const NotificationPage = () => {
  const { themeClassName } = useTheme(styles);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToHome = () => {
    navigate(generatePath(routePaths.P2P_HOME));
  };

  return (
    <Page mode="secondary">
      <BackButton />
      <section className="container">
        <div className={themeClassName('emptyPayments')}>
          <p className={themeClassName('emptyText')}>
            {t('p2p.notifications.empty_text')}
          </p>
          <p
            className={themeClassName('button')}
            onClick={handleNavigateToHome}
          >
            {t('p2p.notifications.empty_button_text')}
          </p>
        </div>
      </section>
    </Page>
  );
};

export default NotificationPage;
