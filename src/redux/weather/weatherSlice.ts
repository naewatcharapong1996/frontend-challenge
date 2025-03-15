import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, WeatherData, ForecastData } from './types';

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherData | null>) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action: PayloadAction<ForecastData | null>) => {
      state.forecast = action.payload;
    },
    setWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWeatherError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetWeather: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentWeather,
  setForecast,
  setWeatherLoading,
  setWeatherError,
  resetWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;