import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from './types';
import { TemperatureUnit } from '@/constants/units';

const initialState: SettingsState = {
  temperatureUnit: TemperatureUnit.CELSIUS, // Default unit
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const { setTemperatureUnit } = settingsSlice.actions;

export default settingsSlice.reducer;