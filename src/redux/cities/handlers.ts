import { createAsyncThunk } from '@reduxjs/toolkit';
import { City } from './types';
import { setCities, setCitiesLoading, setCitiesError } from './citiesSlice';

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { dispatch }) => {
    try {
      dispatch(setCitiesLoading(true));
    
      const mockResponse: City[] = [];
      
      dispatch(setCities(mockResponse));
      return mockResponse;
    } catch (error) {
      dispatch(setCitiesError((error as Error).message));
      throw error;
    } finally {
      dispatch(setCitiesLoading(false));
    }
  }
);

export const addCityAsync = createAsyncThunk(
  'cities/addCity',
  async (cityId: string, { dispatch }) => {
    try {
      dispatch(setCitiesLoading(true));
      
      return cityId;
    } catch (error) {
      dispatch(setCitiesError((error as Error).message));
      throw error;
    } finally {
      dispatch(setCitiesLoading(false));
    }
  }
);