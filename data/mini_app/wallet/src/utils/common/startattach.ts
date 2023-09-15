import { CryptoCurrency } from 'api/wallet/generated';

export type Operations =
  | 'gift'
  | 'send_gift'
  | 'kyc_retry'
  | 'purchasing'
  | 'click_button'
  | `offerid_${string}_${string}`
  | `orderid_${string}_${string}`
  | 'market'
  | 'marketads'
  | `profile_${string}`
  | `wpay_order_${string}`
  | 'usdt_raffle'
  | 'usdt_raffle_tickets'
  | 'sendOptions'
  | 'scw_beta_waitlist_success'
  | 'scw_onboarding'
  | `collectible_${string}`
  | 'firstDeposit'
  | 'settings';

export type OperationsWithParams =
  | 'send'
  | 'wpay_order'
  | 'kyc_success'
  | 'st'
  | 'receiverSearch'
  | 'chooseAsset'
  | 'tonconnect';

export type OperationParams = {
  kyc_success: {
    assetCurrency: string;
  };
  send: {
    assetCurrency?: string;
    value?: number;
  };
  wpay_order: {
    orderId: string;
  };
  st: {
    sentTransactionId: string;
    senderId: number;
    receiverId: number;
  };
  receiverSearch: {
    assetCurrency: string;
  };
  chooseAsset: {
    type: string;
  };
  tonconnect: {
    v: number;
    id: string;
    r: string;
    ret: string;
  };
};

/**
 * Генерирует строку для значения query-параметра startattach в ссылках вида t.me. Ограничение длины строки — 64 символа
 */
export function generateStartAttach(operation: Operations): string;
export function generateStartAttach<O extends OperationsWithParams>(
  operation: O,
  params: OperationParams[O],
): string;
export function generateStartAttach<O extends OperationsWithParams>(
  operation: O,
  params?: OperationParams[O],
) {
  return [
    operation,
    ...Object.entries(params || {}).map(([key, value]) => {
      return [
        key,
        typeof value === 'number' ? encodeStartAttachNumber(value) : value,
      ].join('__');
    }),
  ].join('-');
}

export function parseStartAttach(startAttach: string):
  | {
      operation: 'wpay_order';
      params: OperationParams['wpay_order'];
    }
  | {
      operation: 'send';
      params: OperationParams['send'];
    }
  | {
      operation: 'kyc_success';
      params: OperationParams['kyc_success'];
    }
  | {
      operation: 'st';
      params: OperationParams['st'];
    }
  | {
      operation: 'receiverSearch';
      params: OperationParams['receiverSearch'];
    }
  | {
      operation: 'chooseAsset';
      params: OperationParams['chooseAsset'];
    }
  | {
      operation: 'tonconnect';
      params: OperationParams['tonconnect'];
    }
  | { operation: Operations; params: null } {
  const [operation, ...params] = startAttach.replace(/--/g, '%').split('-');

  const parsedParams = params
    .map((param) => param.split('__'))
    .reduce((acc: Record<string, string>, param) => {
      acc[param[0]] = param[1];
      return acc;
    }, {});

  switch (operation) {
    case 'send':
      return {
        operation: 'send',
        params: {
          assetCurrency: parsedParams.assetCurrency,
          value: parsedParams.value
            ? decodeStartAttachNumber(parsedParams.value)
            : undefined,
        },
      };
    case 'wpay_order':
      return {
        operation: 'wpay_order',
        params: {
          orderId: parsedParams.orderId,
        },
      };
    case 'kyc_success':
      return {
        operation: 'kyc_success',
        params: {
          assetCurrency: parsedParams.assetCurrency || CryptoCurrency.Ton,
        },
      };
    case 'st':
      return {
        operation: 'st',
        params: {
          sentTransactionId: parsedParams.sid,
          senderId: Number(parsedParams.s),
          receiverId: Number(parsedParams.r),
        },
      };
    case 'receiverSearch':
      return {
        operation: 'receiverSearch',
        params: {
          assetCurrency: parsedParams.assetCurrency,
        },
      };
    case 'chooseAsset':
      return {
        operation: 'chooseAsset',
        params: {
          type: parsedParams.type,
        },
      };
    case 'tonconnect':
      return {
        operation: 'tonconnect',
        params: {
          v: Number(parsedParams.v),
          id: parsedParams.id,
          r: parsedParams.r,
          ret: parsedParams.ret,
        },
      };
    default:
      return { operation: operation as Operations, params: null };
  }
}

export function encodeStartAttachNumber(value: number): string {
  return `${value}`.replace('.', '_');
}

export function decodeStartAttachNumber(value: string): number {
  return Number(value.replace('_', '.'));
}
