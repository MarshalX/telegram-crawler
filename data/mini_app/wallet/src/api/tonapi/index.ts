import { captureException } from '@sentry/react';
import axios, { AxiosRequestConfig } from 'axios';

import {
  AccountsApi,
  BlockchainApi,
  Configuration,
  ConnectApi,
  DNSApi,
  EmulationApi,
  EventsApi,
  JettonsApi,
  NFTApi,
  RatesApi,
  StakingApi,
  StorageApi,
  TracesApi,
  WalletApi,
} from './generated';

const axiosInstance = axios.create();
const config = {
  basePath: 'https://tonapi.io',
  isJsonMime: new Configuration().isJsonMime,
};

const API = {
  Accounts: new AccountsApi(config, '', axiosInstance),
  Blockchain: new BlockchainApi(config, '', axiosInstance),
  Connect: new ConnectApi(config, '', axiosInstance),
  DNS: new DNSApi(config, '', axiosInstance),
  Events: new EventsApi(config, '', axiosInstance),
  Emulation: new EmulationApi(config, '', axiosInstance),
  Jettons: new JettonsApi(config, '', axiosInstance),
  NFT: new NFTApi(config, '', axiosInstance),
  Rates: new RatesApi(config, '', axiosInstance),
  Staking: new StakingApi(config, '', axiosInstance),
  Storage: new StorageApi(config, '', axiosInstance),
  Traces: new TracesApi(config, '', axiosInstance),
  Wallet: new WalletApi(config, '', axiosInstance),
};

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization:
          'Bearer AFKHERANWTOVP2QAAAAFE43CBWITJAM6VFIR2EEREIYXPD6REN4UF7Q3ZLRI347TFZFFZLI',
      },
    };
  },
);
axiosInstance.interceptors.response.use(undefined, (error) => {
  captureException(
    `TonApi API error. URL: ${error.config.url}. STATUS: ${error.response.status}`,
  );
});

export default API;
