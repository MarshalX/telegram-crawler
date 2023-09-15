import {
  ReceiverSearchValidationState,
  ValidationError,
} from 'types/receiverSearch';

export const useReceiverSearchState = (
  validAddress: string,
  validation: ReceiverSearchValidationState,
  error: ValidationError,
  trimmedInputAddress: string,
) => {
  return {
    displayControls:
      !error &&
      (validation === 'void' || (validation === 'progress' && !validAddress)),
    displayValidContact: validation === 'success' || validAddress,
    displayButton: !!trimmedInputAddress.length,
    buttonProgress: validation === 'progress' || validation === 'void',
    buttonDisabled: validation === 'error' || validation === 'progress',
  };
};
