import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from 'api/p2p/generated-userservice';

interface UserState extends Partial<User> {
  userCountryAlpha2Code?: string;
  userCountryPhoneAlpha2Code?: string;
}

interface UpdatePropertyType<T> {
  key: keyof T;
  value: T[keyof T];
}

const initialState: UserState = {
  nickname: '',
  displayNickname: '',
  avatarCode: '',
  canUseP2p: false,
  isBanned: false,
  p2pInitialized: false,
};

export const userSlice = createSlice({
  name: 'p2pUser',
  initialState,
  reducers: {
    updateUserProperty: (
      state,
      action: PayloadAction<UpdatePropertyType<UserState>>,
    ) => {
      const { key, value } = action.payload;
      return (state = { ...state, [key]: value });
    },
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return (state = { ...state, ...action.payload });
    },
  },
});

export const { setUser, updateUserProperty } = userSlice.actions;

export default userSlice.reducer;
