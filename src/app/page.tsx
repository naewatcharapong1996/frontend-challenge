'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CityList from '@/components/weather/CityList';
import PageContainer from '@/components/layout/PageContainer';
import TemperatureUnitSelector from '@/components/ui/TemperatureUnitSelector';
import SearchBar from '@/components/layout/SearchBar';
import SearchResults from '@/components/weather/SearchResults';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setTemperatureUnit } from '@/redux/settings/settingsSlice';
import { searchCities } from '@/redux/places/handlers';
import { addCity } from '@/redux/cities/citiesSlice';
import { fetchCityWeather } from '@/redux/weather/handlers';
import { TemperatureUnit } from '@/constants/units';

const SEARCH_DEBOUNCE_DELAY = 300;
const SEARCH_BLUR_DELAY = 200;

const IndexPage = () => {
  const dispatch = useAppDispatch();
  
  const { cities } = useAppSelector(state => state.cities);
  const { temperatureUnit } = useAppSelector(state => state.settings);
  const { searchResults, loading: searchLoading } = useAppSelector(state => state.places);
  const { loading: weatherLoading, currentWeather } = useAppSelector(state => state.weather);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const updateCitiesWeather = useCallback((unit: TemperatureUnit) => {
    cities.forEach(city => {
      dispatch(fetchCityWeather({
        cityId: city.id,
        lat: city.coordinates.lat,
        lon: city.coordinates.lon,
        unit
      }));
    });
  }, [cities, dispatch]);

  const handleTemperatureUnitChange = useCallback((unit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(unit));
    updateCitiesWeather(unit);
  }, [dispatch, updateCitiesWeather]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchTerm.trim().length > 0) {
      setShowResults(true);
    }
  }, [searchTerm]);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => setShowResults(false), SEARCH_BLUR_DELAY);
  }, []);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length === 0) return;
    
    const delayDebounce = setTimeout(() => {
      dispatch(searchCities(trimmedSearchTerm));
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const handleSelectLocation = useCallback((locationId: string) => {
    const selectedLocation = searchResults.find(location => location.id === locationId);
    
    if (!selectedLocation) return;
    
    dispatch(addCity({
      id: selectedLocation.id,
      name: selectedLocation.name,
      country: selectedLocation.country,
      localTime: 'Loading...',
      coordinates: selectedLocation.coordinates,
      weather: {
        temp: 0,
        main: 'Loading',
        description: 'Loading weather data...',
        min: 0,
        max: 0,
        humidity: 0,
        pressure: 0,
        windSpeed: 0,
        rainChance: 0
      }
    }));
    
    // Fetch real weather data
    dispatch(fetchCityWeather({
      cityId: selectedLocation.id,
      lat: selectedLocation.coordinates.lat,
      lon: selectedLocation.coordinates.lon,
      unit: temperatureUnit
    }));
    
    // Clear search
    setSearchTerm('');
    setShowResults(false);
  }, [searchResults, dispatch, temperatureUnit]);

  // Determine if search results should be shown
  const shouldShowResults = showResults && searchTerm.trim().length > 0;
  
  // Prepare city list with loading states
  const citiesWithLoadingState = cities.map(city => ({
    ...city,
    isLoading: weatherLoading && currentWeather?.cityId === city.id
  }));

  return (
    <PageContainer>
      <div className="relative">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-2">
            <SearchBar 
              value={searchTerm} 
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Search by city name or ZIP code" 
            />
          </div>
        </header>
        
        {/* Search results dropdown */}
        {shouldShowResults && (
          <div className="absolute z-20 w-full">
            <div className="container mx-auto px-4">
              {searchLoading ? (
                <div className="flex justify-center py-4 bg-white shadow-md rounded-b-md">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="bg-white shadow-md rounded-b-md overflow-hidden">
                  <SearchResults 
                    locations={searchResults} 
                    onSelectLocation={handleSelectLocation} 
                  />
                </div>
              ) : (
                <div className="bg-white rounded-b-md shadow-md p-4 text-center">
                  <p className="text-gray-500">No results found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try searching for a city name like "London" or a ZIP code like "10001"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 container mx-auto px-4 py-4">
        <h1 className="sr-only">Weather App</h1>
        
        <CityList cities={citiesWithLoadingState} />
        
        <div className="mt-8">
          <TemperatureUnitSelector 
            selectedUnit={temperatureUnit} 
            onUnitChange={handleTemperatureUnitChange} 
          />
        </div>
      </main>
    </PageContainer>
  );
};

export default IndexPage;