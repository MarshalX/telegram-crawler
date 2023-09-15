import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { WALLET_SUPPORT_BOT_LINK } from 'config';

import Error from 'components/Error/Error';

import Page from '../components/Page/Page';

const Unavailable = () => {
  const { t } = useTranslation();
  useEffect(() => {
    Sentry.captureMessage('Content Unavailable');
  }, []);

  return (
    <Page>
      <Error
        header={t('unavailable.h1')}
        text={
          <Trans
            i18nKey="unavailable.p"
            t={t}
            components={[<a href={WALLET_SUPPORT_BOT_LINK} />]}
          />
        }
      />
    </Page>
  );
};

export default Unavailable;
