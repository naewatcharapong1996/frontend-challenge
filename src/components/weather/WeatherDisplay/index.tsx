import React, { memo } from 'react';
import WeatherIcon from '../WeatherIcon';
import { WeatherDisplayProps } from './types';

const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SunriseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const SunsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <p className="mb-1">
    <span className="inline-block mr-2">
      {icon}
      {label}
    </span>
    {value}
  </p>
);

const WeatherDisplay = ({ 
  city, 
  loading = false 
}: WeatherDisplayProps) => {
  const displayData = city ? {
    name: city.name,
    date: city.date,
    localTime: city.localTime,
    temperature: Math.round(city.weather.temp),
    condition: city.weather.main,
    description: city.weather.description,
    min: city.weather.min,
    max: city.weather.max,
    feelsLike: city.weather.feelsLike,
    uvIndex: city.weather.uvIndex,
    sunrise: city.weather.sunrise,
    sunset: city.weather.sunset
  } : {
    name: "Current Location",
    date: new Date().toLocaleDateString(),
    localTime: new Date().toLocaleTimeString(),
    temperature: 0,
    condition: "",
    description: "",
    min: 0,
    max: 0,
    feelsLike: null,
    uvIndex: null,
    sunrise: null,
    sunset: null
  };

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-6 animate-pulse">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            <div className="h-8 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-36"></div>
              <div className="h-3 bg-gray-200 rounded w-28"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="flex flex-col items-center my-8 md:my-0">
            <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <div className="md:flex md:justify-between md:items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{displayData.name}</h1>
          <p className="text-sm text-gray-600 mb-1">
            {displayData.date}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            <span className="inline-block mr-3">MIN {displayData.min}°</span>
            <span className="inline-block">MAX {displayData.max}°</span>
          </p>
          
          <div className="text-xs text-gray-600 mt-4">
            <InfoItem 
              icon={<TimeIcon />}
              label="Local time:"
              value={displayData.localTime}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center my-8 md:my-0">
          <WeatherIcon 
            weatherType={displayData.condition} 
            className="w-24 h-24 mb-4 text-gray-400"
          />
          <div className="text-7xl font-semibold text-gray-900 mb-2">
            {displayData.temperature}°
          </div>
          <p className="text-xl text-gray-600 mb-1">{displayData.condition}</p>
          <p className="text-sm text-gray-500">{displayData.description}</p>
          
          {displayData.sunrise && displayData.sunset && (
            <div className="mt-4 flex items-center text-xs text-gray-600">
              <span className="flex items-center mr-3">
                <SunriseIcon />
                {displayData.sunrise}
              </span>
              <span className="flex items-center">
                <SunsetIcon />
                {displayData.sunset}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(WeatherDisplay);