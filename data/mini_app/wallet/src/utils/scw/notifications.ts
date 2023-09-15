import * as Sentry from '@sentry/react';

import SCWAPI from 'api/scw';

import store from 'store';

export const SCW_CLIENT_ID = 'scw-service';

export enum SCWNotificationActions {
  register = 'register',
  unregister = 'unregister',
  subscribe = 'subscribe',
  unsubscribe = 'unsubscribe',
}

export const updateAddressNotifications = async (
  rawAddress: string, // should start with 0: and not be the friendly address
  action:
    | SCWNotificationActions.register
    | SCWNotificationActions.unregister
    | SCWNotificationActions.subscribe,
): Promise<boolean> => {
  const { id: userId = 0 } = store.getState().user;
  if (!rawAddress || !SCW_CLIENT_ID) {
    return false;
  }

  try {
    const authJwt = sessionStorage.getItem('scwAuthToken');
    if (!authJwt) {
      throw new Error(`No ClientAuthToken for ${SCW_CLIENT_ID}`);
    }

    try {
      let resp = null;
      if (
        action == SCWNotificationActions.register ||
        action === SCWNotificationActions.subscribe
      ) {
        resp = await SCWAPI.Address.upsertAddress(
          { address: rawAddress },
          {
            headers: {
              'Wallet-Authorization': authJwt,
            },
          },
        );
      } else if (action === SCWNotificationActions.unregister) {
        resp = await SCWAPI.Address.removeAddress(
          { address: rawAddress },
          {
            headers: {
              'Wallet-Authorization': authJwt,
            },
          },
        );
      }
      return !!resp && resp.status === 200 && resp.data.success;
    } catch {
      Sentry.captureException(
        `SCW Service action failed (${action}, ${userId}, ${rawAddress})`,
      );
      return false;
    }
  } catch {
    Sentry.captureException(
      `Failed to get ClientAuthToken (${SCW_CLIENT_ID}) for SCW Service (${action}, ${userId}, ${rawAddress})`,
    );
    return false;
  }
};
