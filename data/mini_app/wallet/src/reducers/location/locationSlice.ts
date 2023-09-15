import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Location } from 'react-router-dom';

interface LocationSlice {
  lastPathBeforeUserExit?: string;
  isUserNavigatedThroughPagesDuringCurrentSession: boolean;
  prevLocation?: Location;
  location?: Location;
}

const initialState: LocationSlice = {
  isUserNavigatedThroughPagesDuringCurrentSession: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Partial<LocationSlice>>) => {
      return (state = {
        ...state,
        ...action.payload,
        lastPathBeforeUserExit: action.payload.location?.pathname,
        isUserNavigatedThroughPagesDuringCurrentSession:
          state.isUserNavigatedThroughPagesDuringCurrentSession ||
          action.payload.location?.pathname !== state.lastPathBeforeUserExit,
        location: action.payload.location,
        prevLocation: state.location,
      });
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
