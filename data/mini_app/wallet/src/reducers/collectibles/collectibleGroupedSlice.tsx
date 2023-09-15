import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CollectibleGroupedState {
  [collectionAddress: string]: boolean;
}

const initialState: CollectibleGroupedState = {};

export const collectibleGroupedSlice = createSlice({
  name: 'collectibleGrouped',
  initialState,
  reducers: {
    collapseCollectibleGroup: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    expandCollectibleGroup: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { collapseCollectibleGroup, expandCollectibleGroup } =
  collectibleGroupedSlice.actions;

export default collectibleGroupedSlice.reducer;
