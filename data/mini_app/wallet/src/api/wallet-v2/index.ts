import { captureException } from '@sentry/react';
import axios from 'axios';

import { interceptors } from 'api/interceptors';

import { config as appConfig } from 'config';

import {
  Configuration,
  PasscodeApi,
  RecoveryEmailApi,
  RecoveryKeysApi,
} from './generated';

const axiosInstance = axios.create();
const config = {
  basePath: `https://${appConfig.v2ApiHost}`,
  isJsonMime: new Configuration().isJsonMime,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const API = {
  RecoveryEmail: new RecoveryEmailApi(config, '', axiosInstance),
  Passcodes: new PasscodeApi(config, '', axiosInstance),
  RecoveryKeys: new RecoveryKeysApi(config, '', axiosInstance),
};

const { onRequest, onResponseError } = interceptors({
  customErrorHandler: (error) => {
    if (error?.response?.status && error.response.status >= 400) {
      captureException(
        `WalletV2 API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
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
