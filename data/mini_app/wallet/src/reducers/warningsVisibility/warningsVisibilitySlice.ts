import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface WarningsVisibilitySlice {
  russianCardRestriction: boolean;
  russianCardRestrictionPopup: boolean;
  shareGiftIsOver: boolean;
  whatAreDollars: boolean;
  hasScwAddress: boolean;
  expandCryptocurrency: boolean;
  displaySCW: boolean;
}

const initialState: WarningsVisibilitySlice = {
  russianCardRestriction: false,
  russianCardRestrictionPopup: false,
  shareGiftIsOver: false,
  whatAreDollars: false,
  hasScwAddress: false,
  expandCryptocurrency: false,
  displaySCW: false,
};

export const warningsVisibilitySlice = createSlice({
  name: 'warningsVisibility',
  initialState,
  reducers: {
    updateWarningsVisibility: (
      state,
      action: PayloadAction<Partial<WarningsVisibilitySlice>>,
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateWarningsVisibility } = warningsVisibilitySlice.actions;

export default warningsVisibilitySlice.reducer;
