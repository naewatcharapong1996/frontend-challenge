import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  setSearchResults, 
  setPlacesLoading, 
  setPlacesError, 
  clearSearchResults 
} from './placesSlice';
import { searchCitiesByName, searchCitiesByZipCode } from '@/services/places-service';
import { formatZipCodeQuery, isZipCode } from './utils';

export const searchCities = createAsyncThunk(
  'places/searchCities',
  async (query: string, { dispatch }) => {
    try {
      if (!query.trim()) {
        dispatch(clearSearchResults());
        return [];
      }
      
      dispatch(setPlacesLoading(true));
      
      let results;
      
      if (isZipCode(query)) {
        const formattedQuery = formatZipCodeQuery(query);
        results = await searchCitiesByZipCode(formattedQuery);
      } else {
        results = await searchCitiesByName(query);
      }
      
      dispatch(setSearchResults(results));
      return results;
    } catch (error) {
      dispatch(setPlacesError((error as Error).message));
      throw error;
    } finally {
      dispatch(setPlacesLoading(false));
    }
  }
);