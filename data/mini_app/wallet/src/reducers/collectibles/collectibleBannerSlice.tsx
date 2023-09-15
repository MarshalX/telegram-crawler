import { createSlice } from '@reduxjs/toolkit';

interface CollectibleBannerState {
  isHidden: boolean;
}

const initialState: CollectibleBannerState = {
  isHidden: false,
};

export const collectibleBannerSlice = createSlice({
  name: 'collectibleBanner',
  initialState,
  reducers: {
    hideBanner: (state) => {
      state.isHidden = true;
    },
  },
});

export const { hideBanner } = collectibleBannerSlice.actions;

export default collectibleBannerSlice.reducer;
