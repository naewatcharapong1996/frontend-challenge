import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  setCurrentWeather, 
  setForecast, 
  setWeatherLoading, 
  setWeatherError 
} from './weatherSlice';
import { fetchWeatherById, fetchForecastById } from '@/services/weather-service';
import { TemperatureUnit } from '@/constants/units';
import { updateCity } from '../cities/citiesSlice';
import { RootState } from '../store';

interface FetchWeatherParams {
  cityId: string;
  lat: number;
  lon: number;
  unit: TemperatureUnit;
}

export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async ({ cityId, lat, lon, unit }: FetchWeatherParams, { dispatch, getState }) => {
    try {
      dispatch(setWeatherLoading(true));
      
      const weatherData = await fetchWeatherById(lat, lon, unit);
      
      const weatherWithCityId = {
        ...weatherData,
        cityId
      };
      
      dispatch(setCurrentWeather(weatherWithCityId));
      
      const state = getState() as RootState;
      const cityToUpdate = state.cities.cities.find(city => city.id === cityId);
      
      if (cityToUpdate) {
        dispatch(updateCity({
          ...cityToUpdate,
          localTime: weatherData.time,
          weather: {
            temp: weatherData.temp,
            main: weatherData.main,
            description: weatherData.description,
            min: weatherData.min,
            max: weatherData.max,
            humidity: weatherData.humidity,
            pressure: weatherData.pressure,
            windSpeed: weatherData.windSpeed,
            rainChance: weatherData.rainChance
          }
        }));
      }
      
      return weatherWithCityId;
    } catch (error) {
      dispatch(setWeatherError((error as Error).message));
      throw error;
    } finally {
      dispatch(setWeatherLoading(false));
    }
  }
);

export const fetchCityForecast = createAsyncThunk(
  'weather/fetchCityForecast',
  async ({ cityId, lat, lon, unit }: FetchWeatherParams, { dispatch }) => {
    try {
      dispatch(setWeatherLoading(true));
      
      const forecastData = await fetchForecastById(lat, lon, unit);
      
      const forecastWithCityId = {
        ...forecastData,
        cityId
      };
      
      dispatch(setForecast(forecastWithCityId));
      
      return forecastWithCityId;
    } catch (error) {
      dispatch(setWeatherError((error as Error).message));
      throw error;
    } finally {
      dispatch(setWeatherLoading(false));
    }
  }
);