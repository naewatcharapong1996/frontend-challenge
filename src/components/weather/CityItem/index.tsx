import React, { memo } from 'react';
import WeatherIcon from '../WeatherIcon';
import { CityItemProps } from './types';

const CityItem = ({ city, isLoading = false, onClick }: CityItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(city.id);
    }
  };

  const roundedTemp = Math.round(city.weather.temp);
  
  return (
    <div 
      className={`flex items-center justify-between py-4 px-2 hover:bg-gray-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div>
        <h2 className="text-xl font-medium text-gray-900">
          {city.name}
        </h2>
        <p className="text-sm text-gray-500">
          {city.localTime}
        </p>
      </div>
      
      <div className="flex items-center">
        {isLoading ? (
          <div className="animate-pulse flex space-x-2">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <WeatherIcon
              weatherType={city.weather.main}
              className="w-10 h-10 text-gray-400"
            />
            <span className="ml-2 text-2xl font-semibold text-gray-700">
              {roundedTemp}°
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CityItem);