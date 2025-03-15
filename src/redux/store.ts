import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/weatherSlice';
import placesReducer from './places/placesSlice';
import settingsReducer from './settings/settingsSlice';
import citiesReducer from './cities/citiesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    places: placesReducer,
    settings: settingsReducer,
    cities: citiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;