import { captureException } from '@sentry/react';
import axios from 'axios';

import { interceptors } from 'api/interceptors';

import { config as appConfig } from 'config';

import {
  AntifraudApi,
  AppealApi,
  Configuration,
  CountryApi,
  CurrencyApi as CurrencyApiP2p,
  OfferApi,
  OrderApi,
  OrderChatApi,
  PaymentDetailsApi,
  UserSettingsApi,
  UserStatisticsApi,
} from './generated-common';
import { RateApi } from './generated-exchange';
import { UserApi } from './generated-userservice';

const axiosInstance = axios.create();
const config = {
  basePath: `https://${appConfig.apiHost}`,
  isJsonMime: new Configuration().isJsonMime,
};

const API = {
  PaymentDetails: new PaymentDetailsApi(config, '', axiosInstance),
  Order: new OrderApi(config, '', axiosInstance),
  Offer: new OfferApi(config, '', axiosInstance),
  UserSettings: new UserSettingsApi(config, '', axiosInstance),
  User: new UserApi(config, '', axiosInstance),
  Rate: new RateApi(config, '', axiosInstance),
  UserStatistics: new UserStatisticsApi(config, '', axiosInstance),
  Country: new CountryApi(config, '', axiosInstance),
  Chat: new OrderChatApi(config, '', axiosInstance),
  Appeal: new AppealApi(config, '', axiosInstance),
  Currency: new CurrencyApiP2p(config, '', axiosInstance),
  Antifraud: new AntifraudApi(config, '', axiosInstance),
};

const { onRequest, onResponseError } = interceptors({
  customErrorHandler: (error) => {
    if (error?.response?.status && error.response.status >= 400) {
      captureException(
        `P2P API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
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
