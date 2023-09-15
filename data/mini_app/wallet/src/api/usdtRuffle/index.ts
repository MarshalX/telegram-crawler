import { captureException } from '@sentry/react';
import axios from 'axios';

import { interceptors } from 'api/interceptors';

import { config as appConfig } from 'config';

import { ParticipationApi, SettingsApi, TicketsApi } from './generated';

const axiosInstance = axios.create();
const config = {
  basePath: `https://${appConfig.apiHost}`,
  isJsonMime: () => false,
};

const API = {
  Settings: new SettingsApi(config, '', axiosInstance),
  Tickets: new TicketsApi(config, '', axiosInstance),
  Participation: new ParticipationApi(config, '', axiosInstance),
};

const { onRequest, onResponseError } = interceptors({
  customErrorHandler: (error) => {
    if (error?.response?.status && error.response.status >= 400) {
      captureException(
        `USDT ruffle API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
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
