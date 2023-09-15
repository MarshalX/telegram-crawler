import { Action, ActionTypeEnum } from 'api/tonapi/generated/api';
import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import { CRYPTO_FRACTION } from 'config';

import { getFriendlyAddress } from 'utils/scw/ton';

export const isTransferAction = (action: Action): boolean => {
  return (
    action.type === ActionTypeEnum.TonTransfer ||
    action.type === ActionTypeEnum.JettonTransfer ||
    action.type === ActionTypeEnum.NftItemTransfer
  );
};

export const isNftAction = (action: Action): boolean => {
  return (
    action.type === ActionTypeEnum.NftItemTransfer ||
    action.type === ActionTypeEnum.NftPurchase
  );
};

export const getActionNftAddress = (action: Action): string | undefined => {
  if (!isNftAction(action)) return undefined;
  // NOTE: Possible optimization of skip loading Nft for NftPurchase because metadata already returned
  const rawAddress =
    action.NftItemTransfer?.nft || action.NftPurchase?.nft.address;

  if (rawAddress) {
    return getFriendlyAddress(rawAddress);
  } else {
    return undefined;
  }
};

export const getActionRecipient = (
  action: Action,
): { address: string; name?: string } => {
  const accounts = action.simple_preview.accounts;
  if (action.TonTransfer) {
    return {
      name: action.TonTransfer.recipient.name,
      address: getFriendlyAddress(action.TonTransfer.recipient.address),
    };
  } else if (action.JettonTransfer) {
    return {
      name: action.JettonTransfer.recipient?.name,
      address: getFriendlyAddress(
        action.JettonTransfer.recipient?.address || '',
      ),
    };
  } else if (action.NftItemTransfer) {
    return {
      name: action.NftItemTransfer.recipient?.name,
      address: getFriendlyAddress(
        action.NftItemTransfer.recipient?.address || '',
      ),
    };
  } else if (action.NftPurchase) {
    return {
      name: action.NftPurchase?.seller?.name,
      address: getFriendlyAddress(action.NftPurchase.buyer.address),
    };
  } else {
    if (accounts && accounts.length > 0) {
      return {
        name: accounts[accounts.length - 1].name,
        address: getFriendlyAddress(accounts[accounts.length - 1].address),
      };
    } else {
      return {
        name: '',
        address: '',
      };
    }
  }
};

export const getActionSender = (
  action: Action,
): { address: string; name?: string } => {
  const accounts = action.simple_preview.accounts;
  if (action.TonTransfer) {
    return {
      name: action.TonTransfer.sender.name,
      address: getFriendlyAddress(action.TonTransfer.sender.address),
    };
  } else if (action.JettonTransfer) {
    return {
      name: action.JettonTransfer.sender?.name,
      address: getFriendlyAddress(action.JettonTransfer.sender?.address || ''),
    };
  } else if (action.NftItemTransfer) {
    return {
      name: action.NftItemTransfer.sender?.name,
      address: getFriendlyAddress(action.NftItemTransfer.sender?.address || ''),
    };
  } else if (action.NftPurchase) {
    return {
      name: action.NftPurchase?.seller?.name,
      address: getFriendlyAddress(action.NftPurchase.seller.address),
    };
  } else {
    if (accounts && accounts.length > 0) {
      return {
        name: accounts[0].name,
        address: getFriendlyAddress(accounts[0].address),
      };
    } else {
      return {
        name: '',
        address: '',
      };
    }
  }
};

export const getActionAmount = (
  action: Action,
): {
  currency: string;
  amount: number;
  decimals: number;
  nftId?: string;
} => {
  if (action.TonTransfer) {
    return {
      currency: FrontendCryptoCurrencyEnum.Ton,
      amount: action.TonTransfer.amount,
      decimals: CRYPTO_FRACTION[FrontendCryptoCurrencyEnum.Ton],
    };
  } else if (action.JettonTransfer) {
    return {
      currency: action.JettonTransfer.jetton.symbol,
      amount: parseInt(action.JettonTransfer.amount),
      decimals: action.JettonTransfer.jetton.decimals,
    };
  } else if (action.NftItemTransfer) {
    return {
      currency: '',
      nftId: action.NftItemTransfer.nft,
      amount: 1,
      decimals: 1,
    };
  }
  return {
    currency: '',
    amount: 0,
    decimals: 0,
  };
};

export const getActionDetails = (action: Action): string | undefined => {
  if (isTransferAction(action)) {
    return undefined;
  }
  const details = JSON.parse(JSON.stringify(action));
  delete details.type;
  delete details.status;
  delete details.TonTransfer;
  delete details.JettonTransfer;
  delete details.NftItemTransfer;
  delete details.simple_preview;
  return JSON.stringify(details, null, 2);
};
