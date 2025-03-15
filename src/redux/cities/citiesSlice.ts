import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesState, City } from './types';

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      if (!state.cities.find(city => city.id === action.payload.id)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const index = state.cities.findIndex(city => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    setCitiesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCitiesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addCity,
  removeCity,
  updateCity,
  setCities,
  setCitiesLoading,
  setCitiesError,
} = citiesSlice.actions;

export default citiesSlice.reducer;