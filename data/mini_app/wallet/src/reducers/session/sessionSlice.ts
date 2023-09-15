import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { WebViewUser } from 'types/webViewUser';

import { select } from 'utils/common/redux';

interface SessionState {
  receiver?: WebViewUser;
  isYourSelf?: boolean;
  isBot?: boolean;
  startParam?: string;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  canApplyToSCWBetaWaitlist?: boolean;
  isCryptoExpanded?: boolean;
}

const initialState: SessionState = {};

export const userSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      return action.payload;
    },
    updateSession: (state, action: PayloadAction<SessionState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSession, updateSession } = userSlice.actions;

export default userSlice.reducer;

const selectSelf = select((state) => state.session);

export const selectIsReceiverValid = select((state) => {
  const { isBot, receiver, isYourSelf } = selectSelf(state);
  return receiver && !isBot && !isYourSelf;
});
