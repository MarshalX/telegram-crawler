import { captureException } from '@sentry/react';
import axios from 'axios';

import { interceptors } from 'api/interceptors';

import { config as appConfig } from 'config';

import { PaymentApi } from './generated';

const axiosInstance = axios.create();

const config = {
  basePath: `https://${appConfig.apiHost}`,
  isJsonMime: () => false,
};

const API = {
  Payment: new PaymentApi(config, '', axiosInstance),
};

const { onRequest, onResponseError } = interceptors({
  customErrorHandler: (error) => {
    if (error?.response?.status && error.response.status >= 400) {
      captureException(
        `WPay API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
      );
    }
    return Promise.reject(error);
  },
});

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(undefined, (error) =>
  onResponseError(error, axiosInstance),
);

export default API;
