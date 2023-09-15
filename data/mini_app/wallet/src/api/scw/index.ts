import { captureException } from '@sentry/react';
import axios from 'axios';

import { config as appConfig } from 'config';

import { AddressesApi, StatusApi } from './generated';

const axiosInstance = axios.create();
const config = {
  basePath: appConfig.scwApiHost || `https://${appConfig.apiHost}/scwapi`,
  isJsonMime: () => false,
};

const API = {
  Status: new StatusApi(config, '', axiosInstance),
  Address: new AddressesApi(config, '', axiosInstance),
};

axiosInstance.interceptors.response.use(undefined, (error) => {
  captureException(
    `SCW API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
  );
});

export default API;
