import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PasscodeTypeEnum } from 'api/wallet-v2/generated/api';

import { nullToUndefined } from 'utils/common/sanitize';

interface PasscodeState {
  // account settings
  passcodeType?: PasscodeTypeEnum;
  unlockDuration?: number;
  requiredOnOpen?: boolean;
  recoveryEmail?: string;

  // temporary storage for delayed API requests
  enteredPasscode?: string;

  // temporary storage for creating new passcode
  newPasscode?: string;
  newPasscodeType: PasscodeTypeEnum;
  newRecoveryEmail?: string;

  // app state
  openUnlocked: boolean;
  unlockedUntil?: number;
}

const initialState: PasscodeState = {
  passcodeType: undefined,
  unlockDuration: undefined,
  requiredOnOpen: undefined,
  recoveryEmail: undefined,
  enteredPasscode: undefined,
  newPasscode: undefined,
  newPasscodeType: PasscodeTypeEnum._4Digit,
  newRecoveryEmail: undefined,
  openUnlocked: false,
  unlockedUntil: undefined,
};

export const passcodeSlice = createSlice({
  name: 'passcode',
  initialState,
  reducers: {
    updatePasscode: (state, action: PayloadAction<Partial<PasscodeState>>) => {
      const payload = action.payload;
      const newState = {
        ...state,
        ...action.payload,
      };
      if (payload.passcodeType !== undefined) {
        newState.passcodeType = nullToUndefined(payload.passcodeType);
      }
      if (payload.unlockDuration !== undefined) {
        newState.unlockDuration = nullToUndefined(payload.unlockDuration);
      }
      if (payload.requiredOnOpen !== undefined) {
        newState.requiredOnOpen = nullToUndefined(payload.requiredOnOpen);
      }
      if (payload.recoveryEmail !== undefined) {
        newState.recoveryEmail = nullToUndefined(payload.recoveryEmail);
      }
      return newState;
    },
  },
});

export const { updatePasscode } = passcodeSlice.actions;

export default passcodeSlice.reducer;
