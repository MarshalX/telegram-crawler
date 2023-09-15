import {
  SEND_TRANSACTION_ERROR_CODES,
  SendTransactionRpcResponseError,
} from '@tonconnect/protocol';

export class SendTransactionError implements SendTransactionRpcResponseError {
  id: SendTransactionRpcResponseError['id'];
  error: SendTransactionRpcResponseError['error'];

  constructor(
    requestId: string,
    code: SEND_TRANSACTION_ERROR_CODES,
    message: string,
    // eslint-disable-next-line
    data?: any,
  ) {
    this.id = requestId;
    this.error = {
      code,
      message,
      data,
    };
  }
}
