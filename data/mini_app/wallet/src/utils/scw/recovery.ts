import * as Sentry from '@sentry/react';

import SCWAPI from 'api/scw';
import APIV2 from 'api/wallet-v2';

import store from 'store';

import { updateSCW } from 'reducers/scw/scwSlice';

import { decryptMnemonic, encryptMnemonic } from 'utils/scw/encryption';
import {
  SCWNotificationActions,
  updateAddressNotifications,
} from 'utils/scw/notifications';
import { getWalletFromMnemonic } from 'utils/scw/ton';

export const clientAllowsRecovery = () => {
  const tgVersion = parseFloat(window.Telegram.WebApp.version);
  if (!tgVersion || isNaN(tgVersion) || tgVersion < 6.9) {
    return false;
  }
  return !!window.Telegram.WebApp.CloudStorage;
};

const CURRENTLY_SUPPORTED_PLATFORMS = [
  'android',
  'android_x',
  'ios',
  'macos',
  'webk',
  'webz',
];

export const platformAllowsRecovery = () => {
  if (!window.Telegram.WebApp.platform) return false;
  return CURRENTLY_SUPPORTED_PLATFORMS.includes(
    window.Telegram.WebApp.platform,
  );
};

export const shouldUpdateForRecovery = () => {
  return !clientAllowsRecovery() && platformAllowsRecovery();
};

export const backupMnemonic = async (
  rawAddress: string, // should start with 0: and not be the friendly address
  mnemonic: string[],
): Promise<boolean> => {
  // verify Telegram client supports CloudStorage
  const clientCanRecover = clientAllowsRecovery();
  if (!clientCanRecover) return false;

  const recoveryData = await encryptMnemonic(mnemonic);

  // Step 1. Send shard 1 to SCW service and get de-identified scw-address-id
  const authJwt = sessionStorage.getItem('scwAuthToken');
  if (!authJwt) return false;

  const scwAddressId = await SCWAPI.Address.backupAddress(
    { address: rawAddress, encryptedBackupShard: recoveryData.encryptedShard1 },
    {
      headers: {
        'Wallet-Authorization': authJwt,
      },
    },
  )
    .then((scwResp) => {
      if (
        !(scwResp && scwResp.status === 200 && scwResp.data.addressExternalId)
      ) {
        throw new Error('Failed to backup shard 1');
      }
      return scwResp.data.addressExternalId;
    })
    .catch(() => {
      Sentry.captureException('Failed to backup shard 1 in SCW Service');
    });

  if (!scwAddressId) return false;

  // Step 2. Send shard 2 in TG Cloud Storage
  const telegramCloudStorageSuccess = await new Promise<boolean>(
    (resolve, reject) => {
      window.Telegram.WebApp.CloudStorage.setItem(
        scwAddressId,
        recoveryData.encryptedShard2,
        (error, success) => {
          resolve((!error && success) || false);
        },
      );
      // Must eventually reject if cloud storage never returns
      setTimeout(() => {
        reject();
      }, 10000);
    },
  );

  if (!telegramCloudStorageSuccess) {
    Sentry.captureException('Telegram CloudStorage failed to backup shard 2');
    return false;
  }

  // Step 3. Send recovery key and scw-address-id to Wallet
  const sendRecoveryKeySuccess = await APIV2.RecoveryKeys.saveRecoveryKey({
    scwAddressId: scwAddressId,
    recoveryKey: recoveryData.recoveryKeyHex,
    recoveryIv: recoveryData.recoveryIvHex,
  })
    .then((resp) => {
      if (
        !(
          resp &&
          resp.status === 200 &&
          resp.data.code === 'recovery_key_saved'
        )
      ) {
        throw new Error('Failed to backup recovery key');
      }
      return true;
    })
    .catch(() => {
      Sentry.captureException('V2API failed to backup recovery key');
    });

  if (!sendRecoveryKeySuccess) return false;

  return true;
};

export const recoverMnemonic = async (
  rawAddress: string, // should start with 0: and not be the friendly address
  emailCode: string,
): Promise<boolean> => {
  // verify Telegram client supports CloudStorage
  const clientCanRecover = clientAllowsRecovery();
  if (!clientCanRecover) return false;

  // Step 1. Send shard 1 to SCW service and get de-identified scw-address-id
  const authJwt = sessionStorage.getItem('scwAuthToken');
  if (!authJwt) return false;

  const scwData = await SCWAPI.Address.recoverAddress(
    { address: rawAddress },
    {
      headers: {
        'Wallet-Authorization': authJwt,
      },
    },
  )
    .then((scwResp) => {
      if (!(scwResp && scwResp.status === 200 && scwResp.data)) {
        throw new Error('Failed to recover shard 1');
      }
      return scwResp.data;
    })
    .catch(() => {
      Sentry.captureException('Failed to recover shard 1 in SCW Service');
    });

  if (!scwData) return false;

  // Step 2. Send shard 2 in TG Cloud Storage
  const encryptedTelegramShard = await new Promise<string>(
    (resolve, reject) => {
      window.Telegram.WebApp.CloudStorage.getItem(
        scwData.addressExternalId,
        (_, value) => {
          resolve(value || '');
        },
      );
      // Must eventually reject if cloud storage never returns
      setTimeout(() => {
        reject();
      }, 10000);
    },
  );

  if (!encryptedTelegramShard) {
    Sentry.captureException('Telegram CloudStorage failed to recover shard 2');
    return false;
  }

  // Step 3. Send recovery key and scw-address-id to Wallet
  const recoveryKeyData = await APIV2.RecoveryKeys.getRecoveryKey({
    scwAddressId: scwData.addressExternalId,
    emailCode: emailCode,
  })
    .then((resp) => {
      if (!(resp && resp.status === 200 && resp.data)) {
        throw new Error('Failed to recover recovery key');
      }
      return resp.data;
    })
    .catch(() => {
      Sentry.captureException('V2API failed to recover recovery key');
    });

  if (!recoveryKeyData) return false;

  const recoveredMnemonic = await decryptMnemonic({
    recoveryKeyHex: recoveryKeyData.recoveryKey,
    recoveryIvHex: recoveryKeyData.recoveryIv,
    encryptedShard1: scwData.encryptedBackupShard,
    encryptedShard2: encryptedTelegramShard,
  });

  const recoveredWallet = await getWalletFromMnemonic(recoveredMnemonic);
  updateAddressNotifications(
    recoveredWallet.raw,
    SCWNotificationActions.register,
  );
  store.dispatch(
    updateSCW({
      ...recoveredWallet,
      setupComplete: true,
      recoveryComplete: true,
    }),
  );

  return true;
};
