import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesState, Location } from './types';

const initialState: PlacesState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Location[]>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setPlacesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPlacesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchResults,
  clearSearchResults,
  setPlacesLoading,
  setPlacesError,
} = placesSlice.actions;

export default placesSlice.reducer;