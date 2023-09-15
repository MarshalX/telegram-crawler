import { captureException } from '@sentry/react';
import axios, { AxiosError } from 'axios';

import { CollectiblesApi, Configuration } from 'api/getGems/generated';

import { config as appConfig } from 'config';

const axiosInstance = axios.create();
const config = {
  basePath: appConfig.getGemsApiHost || 'https://api.getgems.io/wallet',
  isJsonMime: new Configuration().isJsonMime,
};

const API = {
  Collectibles: new CollectiblesApi(config, '', axiosInstance),
};

const onResponseError = (error: AxiosError) => {
  if (error?.response?.status && error.response.status >= 400) {
    captureException(
      `GetGems API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
    );
  }
};

axiosInstance.interceptors.response.use(undefined, onResponseError);

export default API;
