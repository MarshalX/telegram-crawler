import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';

import Error from 'components/Error/Error';
import Page from 'components/Page/Page';

const CountryForbidden = () => {
  const { t } = useTranslation();

  Sentry.captureMessage('Country Forbidden');

  return (
    <Page>
      <Error
        header={t('country_is_forbidden.h1')}
        text={t('country_is_forbidden.p')}
      />
    </Page>
  );
};

export default CountryForbidden;
