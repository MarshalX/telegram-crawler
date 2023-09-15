import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import API from 'api/wallet';

export function interceptors({
  authHeaderPrefix = 'Bearer ',
  customErrorHandler,
}: {
  authHeaderPrefix?: string;
  customErrorHandler: (error: AxiosError) => unknown;
}) {
  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const authToken = sessionStorage.getItem('authToken') || '';
    if (authToken) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `${authHeaderPrefix}${authToken}`,
        },
      };
    }
    return config;
  };

  const onResponseError = async (
    error: AxiosError,
    axiosInstance: AxiosInstance = axios,
  ) => {
    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401) {
      if (error.response.data.code === 'token_corrupted') {
        window.Telegram.WebApp.close();
      } else if (window.Telegram.WebApp.initData) {
        try {
          const response = await API.Users.authUser({
            web_view_init_data_raw: window.Telegram.WebApp.initData,
          });
          error.config.headers = {
            ...error.config.headers,
            Authorization: `${authHeaderPrefix}${response.data.value}`,
          };
          sessionStorage.setItem('authToken', response.data.value);
          return axiosInstance(error.config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else {
        return Promise.reject(error);
      }
    } else if (customErrorHandler) {
      return customErrorHandler(error);
    } else {
      return Promise.reject(error);
    }
  };

  return { onRequest, onResponseError };
}
