import { captureException } from '@sentry/react';
import axios from 'axios';

import { interceptors } from 'api/interceptors';

import { config as appConfig } from 'config';

import {
  AccountsApi,
  CampaignsApi,
  ClientsApi,
  CurrenciesApi,
  CurrencyApi,
  ExchangesApi,
  LanguageApi,
  LanguagesApi,
  PricesApi,
  PurchasesApi,
  TransactionsApi,
  TransfersApi,
  UsersApi,
  WVSettingsApi,
  WalletsApi,
  WithdrawalsApi,
} from './generated';

const config = {
  basePath: `https://${appConfig.apiHost}`,
  isJsonMime: () => false,
};

const API = {
  Currency: new CurrencyApi(config),
  Currencies: new CurrenciesApi(config),
  Language: new LanguageApi(config),
  Languages: new LanguagesApi(config),
  Prices: new PricesApi(config),
  Transactions: new TransactionsApi(config),
  Purchases: new PurchasesApi(config),
  Transfers: new TransfersApi(config),
  AccountsApi: new AccountsApi(config),
  Users: new UsersApi(config),
  Campaigns: new CampaignsApi(config),
  WVSettings: new WVSettingsApi(config),
  Wallets: new WalletsApi(config),
  Withdrawals: new WithdrawalsApi(config),
  Exchange: new ExchangesApi(config),
  Clients: new ClientsApi(config),
};

const { onRequest, onResponseError } = interceptors({
  authHeaderPrefix: '',
  customErrorHandler: (error) => {
    if (error?.response?.status && error.response.status >= 500) {
      captureException(
        `Wallet API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
      );
    }
    return Promise.reject(error);
  },
});

axios.interceptors.request.use(onRequest);
axios.interceptors.response.use(undefined, onResponseError);

export default API;
