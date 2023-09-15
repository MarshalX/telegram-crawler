import { useEffect, useRef, useState } from 'react';

import { FrontendCryptoCurrencyEnum } from 'api/wallet/generated';

import {
  ReceiverSearchValidationState,
  ValidationError,
} from 'types/receiverSearch';

import { useTimeout } from 'hooks/utils/useTimeout';

type ValidateDataPayload =
  | {
      typename: 'success';
      address: string;
      currency?: FrontendCryptoCurrencyEnum;
    }
  | {
      typename: 'error';
      error: ValidationError;
    }
  | {
      typename: 'canceled';
    };

type ValidateFunction = (
  address: string,
  abortController: AbortController,
) => Promise<ValidateDataPayload>;

export const useValidateWalletAddress = ({
  currentUserAddress,
  address,
  validateFunction,
}: {
  currentUserAddress?: string;
  address: string;
  validateFunction: ValidateFunction;
}) => {
  const validationRequestController = useRef<AbortController>();
  const validAddressRef = useRef('');

  const [validation, setValidation] = useState<ReceiverSearchValidationState>(
    address.length > 0 ? 'progress' : 'void',
  );
  const [error, setError] = useState<ValidationError>(false);
  const [setValidateTimeout, validateTimeout] = useTimeout();
  const [assetCurrency, setAssetCurrency] =
    useState<FrontendCryptoCurrencyEnum>(FrontendCryptoCurrencyEnum.Ton);

  const validate = async (address: string) => {
    if (currentUserAddress && currentUserAddress === address) {
      validAddressRef.current = '';
      setValidation('error');
      setError('yourself');
      return;
    }
    setValidation('progress');
    validationRequestController.current?.abort();
    setValidateTimeout(() => {
      validationRequestController.current = new AbortController();

      validateFunction(address, validationRequestController.current).then(
        (payload) => {
          if (payload.typename === 'canceled') {
            return;
          }
          if (payload.typename === 'success') {
            validAddressRef.current = payload.address;
            if (payload.currency) {
              setAssetCurrency(payload.currency);
            }

            setValidation('success');
            setError(false);
          } else {
            validAddressRef.current = '';
            setValidation('error');
            setError(payload.error);
          }
        },
      );
    }, 500);
  };

  useEffect(() => {
    if (address.length > 0) {
      validate(address);
    } else {
      setError(false);
      setValidation('void');
      validationRequestController.current?.abort();
      validAddressRef.current = '';
      clearTimeout(validateTimeout);
    }

    return () => {
      validationRequestController.current?.abort();
    };
  }, [address]);

  return { validAddressRef, validation, error, assetCurrency };
};
