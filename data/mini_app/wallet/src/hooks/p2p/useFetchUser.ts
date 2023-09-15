import * as Sentry from '@sentry/react';
import { useDispatch } from 'react-redux';

import API from 'api/p2p';

import { setUser } from 'reducers/p2p/userSlice';

const STORAGE_KEY = 'wallet-fngrprnt-2';

const setDeviceId = (value: string) => {
  const expirationTimeInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const expirationTime = Date.now() + expirationTimeInMs;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, expirationTime }));
};

const getDeviceId = () => {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return null;
  }

  const { value: deviceId, expirationTime } = JSON.parse(value);

  if (Date.now() > expirationTime) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return deviceId;
};

export const useFetchUser = () => {
  const dispatch = useDispatch();

  const fetchUserV1 = async () => {
    const { data } = await API.User.getUser1();

    if (data.data) {
      dispatch(setUser(data.data));
    }

    return data.data;
  };

  const fetchUser = async () => {
    try {
      let deviceId = getDeviceId();

      if (!deviceId) {
        const fingerprintLib = await import(
          '@fingerprintjs/fingerprintjs-pro'
        ).then((module) => module.default);

        const fp = await fingerprintLib.load({
          apiKey: 'sIr9k1LhQgendgYm1jcc',
          region: 'eu',
          scriptUrlPattern: [
            '/static/js/fngr-loader-v3.8.3.js',
            fingerprintLib.defaultScriptUrlPattern,
          ],
          disableTls: true,
        });

        const {
          visitorId,
        }: {
          visitorId: string;
        } = await fp.get();

        if (!visitorId) {
          Sentry.captureMessage('FingerprintJS: visitorId is empty');
          return fetchUserV1();
        }

        setDeviceId(visitorId);

        deviceId = visitorId;
      }

      const { data } = await API.User.getUser({
        deviceId,
      });

      if (data.data) {
        dispatch(setUser(data.data));
      }

      return data.data;
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);

      return fetchUserV1();
    }
  };

  return { fetchUser };
};
