import * as Sentry from '@sentry/react';
import { useEffect } from 'react';

export const NotFound = () => {
  useEffect(() => {
    Sentry.captureMessage(`Page not found: ${window.location.href}`);
  }, []);

  return null;
};
