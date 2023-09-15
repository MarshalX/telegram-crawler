import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';

import SCWAPI from 'api/scw';
import { GetAddressesResponse } from 'api/scw/generated';
import API from 'api/wallet';
import { AuthTokenRequest, ClientScopes } from 'api/wallet/generated';

import { useAppSelector } from 'store';

import { SCW_CLIENT_ID } from 'utils/scw/notifications';

export const NO_SCW_ADDRESSES: GetAddressesResponse = {
  actives: [],
  backups: [],
};

export const useSCWAuthToken = () => {
  const { authorized, featureFlags } = useAppSelector((state) => state.user);
  const { displaySCW } = useAppSelector((state) => state.warningsVisibility);
  const { address } = useAppSelector((state) => state.scw);
  const walletAuthToken = sessionStorage.getItem('authToken');

  const scwAuthRequest: AuthTokenRequest = {
    client_id: SCW_CLIENT_ID,
    scopes: [ClientScopes.ProfileRead, ClientScopes.MessagesSend],
  };

  return useQuery({
    queryKey: ['scw', 'getAuthToken', walletAuthToken],
    queryFn: () => {
      return API.Clients.createAuthToken(scwAuthRequest)
        .then((response) => {
          sessionStorage.setItem('scwAuthToken', response.data.jwt);
          return response?.data?.jwt;
        })
        .catch(() => {
          Sentry.captureException(
            `Failed to get ClientAuthToken for ${SCW_CLIENT_ID}`,
          );
          return '';
        });
    },
    enabled: authorized && (featureFlags.scw || displaySCW || !!address),
    staleTime: Infinity,
  });
};

const fetchSCWAddresses = async (scwAuthToken: string) => {
  return SCWAPI.Address.getAddresses({
    headers: {
      'Wallet-Authorization': scwAuthToken,
    },
  })
    .then((response) => {
      return response?.data;
    })
    .catch(() => {
      const errorMessage = 'Failed to get addresses in SCW Service';
      Sentry.captureException(errorMessage);
      return NO_SCW_ADDRESSES;
    });
};

export const useSCWAddresses = () => {
  const { authorized } = useAppSelector((state) => state.user);
  const { data: scwAuthToken } = useSCWAuthToken();

  return useQuery({
    queryKey: ['scw', 'getAddresses', scwAuthToken],
    queryFn: async () => {
      if (!scwAuthToken) {
        return NO_SCW_ADDRESSES;
      }
      return await fetchSCWAddresses(scwAuthToken);
    },
    enabled: authorized && !!scwAuthToken,
    staleTime: Infinity,
  });
};

export const useHasActiveSCWAddress = () => {
  const { data } = useSCWAddresses();
  return data && data?.actives.length > 0;
};

export const useActiveSCWAddress = () => {
  const { data } = useSCWAddresses();

  if (data && data.actives.length > 0) {
    return data.actives[0].address;
  }
};

export const useBackupSCWAddress = () => {
  const { data } = useSCWAddresses();

  if (data && data.backups.length > 0) {
    return data.backups[0].address;
  }
};
