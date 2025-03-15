import { Location } from '@/types/city';
import { PlacesResponse, ZipCodeResponse } from '@/types/api';

export const searchCitiesByName = async (query: string): Promise<Location[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`/api/geocode/citiesname?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json() as PlacesResponse[];
    
    return data.map(item => ({
      id: `${item.lat}_${item.lon}`,
      name: item.name,
      country: item.country,
      state: item.state,
      coordinates: {
        lat: item.lat,
        lon: item.lon,
      },
    }));
  } catch (error) {
    throw error;
  }
};

export const searchCitiesByZipCode = async (query: string): Promise<Location[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`/api/geocode/zipcode?zip=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json() as ZipCodeResponse[];
    
    return data.map(item => ({
      id: `${item.lat}_${item.lon}`,
      name: item.name,
      country: item.country,
      zipCode: item.zip,
      coordinates: {
        lat: item.lat,
        lon: item.lon,
      },
    }));
  } catch (error) {
    throw error;
  }
};