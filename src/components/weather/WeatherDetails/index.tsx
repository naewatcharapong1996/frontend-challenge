import React, { memo } from 'react';
import DetailItem from './DetailItem';

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  rainChance: number;
  loading?: boolean;
}

const WeatherDetails = ({ 
  humidity, 
  windSpeed, 
  pressure, 
  rainChance,
  loading = false 
}: WeatherDetailsProps) => {
  const weatherIcons = {
    humidity: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    wind: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    ),
    pressure: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12z" />
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    rain: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
      </svg>
    )
  };

  const formattedValues = {
    humidity: `${humidity}%`,
    windSpeed: `${windSpeed} km/h`,
    pressure: `${pressure} mBar`,
    rainChance: `${rainChance}%`
  };

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isHighHumidity = humidity > 80;
  const isHighWind = windSpeed > 25;
  const isHighRain = rainChance > 70;

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-sm font-medium text-gray-700 uppercase mb-4">
        Current Details
      </h2>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
        <DetailItem 
          label="Humidity" 
          value={formattedValues.humidity} 
          icon={weatherIcons.humidity}
          highlight={isHighHumidity}
        />
        <DetailItem 
          label="Wind" 
          value={formattedValues.windSpeed} 
          icon={weatherIcons.wind}
          highlight={isHighWind}
        />
        <DetailItem 
          label="Pressure" 
          value={formattedValues.pressure} 
          icon={weatherIcons.pressure}
        />
        <DetailItem 
          label="Chance of rain" 
          value={formattedValues.rainChance} 
          icon={weatherIcons.rain}
          highlight={isHighRain}
        />
      </div>
    </div>
  );
};

export default memo(WeatherDetails);