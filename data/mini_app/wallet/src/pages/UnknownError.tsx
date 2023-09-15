import * as Sentry from '@sentry/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorComponent from 'components/Error/Error';

const UnknownError: FC = () => {
  const { t } = useTranslation();
  const text = t('error.unknown');

  Sentry.captureException(text);
  console.error(text);

  return <ErrorComponent text={text} />;
};

export default UnknownError;
