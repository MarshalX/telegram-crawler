import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import API from 'api/wallet';
import {
  FrontendCryptoCurrencyEnum,
  ValidateAmountResult,
  ValidateAmountStatusEnum,
} from 'api/wallet/generated';

import { debounceRequest } from 'utils/common/debounce';

export const ValidateErrorsCodes = {
  AMOUNT_IS_NOT_VALID: 'amount_is_not_valid',
  ADDRESS_NOT_DEFINED: 'address_not_defined',
  MIN_LIMIT_EXCEEDED: 'min_limit_exceeded',
  MAX_LIMIT_EXCEEDED: 'max_limit_exceeded',
} as const;

type UseValidateAmountProps = {
  cryptoAmount: number;
  assetCurrency: FrontendCryptoCurrencyEnum;
  address?: string;
  receiverId?: number;
};

type UseValidateAmountOptions = UseQueryOptions<
  boolean,
  ValidateAmountResult
> & {
  timeout?: number;
};

/**
 Custom hook for validating amounts for wallet address.
 @param {UseValidateAmountProps} props
 @props cryptoAmount (number): The amount to be validated.
 @props assetCurrency (AvailableAssets): The name of the asset currency to be validated.
 @props address (string): The address which with to validate the amount of crypto.
 @param {UseValidateAmountOptions=} options Optional configuration parameters for the hook.
 @options timeout (number?): The timeout in milliseconds to wait before making the request. Defaults to 0.
 @options enabled (boolean?): Whether the query should be enabled or not. Extends the !!address.
 @returns {object} An object containing the data from the valid query and additional properties.
 */
export const useValidateAmount = (
  { cryptoAmount, assetCurrency, address, receiverId }: UseValidateAmountProps,
  options?: UseValidateAmountOptions,
) => {
  const { enabled = true, timeout, ...restOptions } = options || {};

  const { data: valid, ...rest } = useQuery({
    queryKey: [
      'validateAmount',
      { cryptoAmount, assetCurrency, receiver: address || receiverId },
    ],
    queryFn: async ({ signal }) => {
      if (cryptoAmount === 0) {
        return false;
      }

      if (!address && !receiverId) {
        throw new Error('Address or receiverId is required');
      }

      const { data } = await debounceRequest(
        () =>
          API.Withdrawals.validateAmount(
            cryptoAmount,
            assetCurrency,
            address,
            receiverId,
            {
              signal,
            },
          ),
        signal,
        timeout,
      );

      if (data.status !== ValidateAmountStatusEnum.Ok) {
        throw data;
      }

      return true;
    },
    enabled: (!!address || !!receiverId) && enabled,
    retry: false,
    ...restOptions,
  });

  return { valid, ...rest };
};
