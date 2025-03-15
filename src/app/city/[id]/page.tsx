'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import PageContainer from '@/components/layout/PageContainer';
import WeatherDisplay from '@/components/weather/WeatherDisplay';
import HourlyForecast from '@/components/weather/HourlyForecast';
import WeatherDetails from '@/components/weather/WeatherDetails';
import { AppRoute } from '@/constants/routes';
import { fetchForecastById } from '@/services/weather-service';
import { HourlyForecast as HourlyForecastType } from '@/redux/weather/types';

const CityDetailPage = () => {
  const { id } = useParams() as { id: string };
  
  const { cities } = useAppSelector(state => state.cities);
  const { loading } = useAppSelector(state => state.weather);
  const { temperatureUnit } = useAppSelector(state => state.settings);

  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecastType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const city = cities.find(city => city.id === id);

  useEffect(() => {
    if (!city) return;

    const fetchForecastData = async () => {
      setIsLoadingForecast(true);
      setError(null);
      
      try {
        const forecastData = await fetchForecastById(
          city.coordinates.lat,
          city.coordinates.lon,
          temperatureUnit
        );
        
        setHourlyForecastData(forecastData.hourly);
      } catch (err) {
        setError('Failed to load forecast data. Please try again later.');
      } finally {
        setIsLoadingForecast(false);
      }
    };

    fetchForecastData();
  }, [city, temperatureUnit]);

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!city) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-full p-4">
          <h1 className="text-xl font-semibold mb-4">City not found</h1>
          <Link
            href={AppRoute.HOME}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  const cityWithFormattedData = {
    ...city,
    date: formatDate(),
  };

  return (
    <PageContainer>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center">
            <Link href={AppRoute.HOME} className="mr-2">
              <button className="p-2 text-gray-500" aria-label="Go back">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div className="flex-1">
              <div className="p-2 font-medium text-gray-800">
                {city.name}, {city.country}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <WeatherDisplay 
              city={cityWithFormattedData}
              loading={loading}
            />
            
            {error ? (
              <div className="bg-white rounded-md shadow-sm p-6 mb-6">
                <h2 className="text-sm font-medium text-gray-700 uppercase mb-4">
                  24 Hours Forecast
                </h2>
                <p className="text-red-500 text-center">{error}</p>
              </div>
            ) : (
              <HourlyForecast 
                forecast={hourlyForecastData}
                loading={isLoadingForecast}
              />
            )}
            
            <WeatherDetails
              humidity={city.weather.humidity}
              pressure={city.weather.pressure}
              windSpeed={city.weather.windSpeed}
              rainChance={city.weather.rainChance}
              loading={loading}
            />
          </>
        )}
      </main>
    </PageContainer>
  );
};

export default CityDetailPage;