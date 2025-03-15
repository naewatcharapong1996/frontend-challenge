import React, { memo } from 'react';
import WeatherIcon from '../../WeatherIcon';

interface ForecastItemProps {
  time: string;
  temp: number;
  weather: string;
  icon?: string;
}

const ForecastItem = ({ 
  time, 
  temp, 
  weather, 
  icon
}: ForecastItemProps) => {
  const displayTemp = Number.isInteger(temp) ? temp : Math.round(temp);
  
  return (
    <div 
      className={`
        flex flex-col items-center justify-center w-full
        py-3 px-2 rounded-lg
      `}
    >
      <div className="text-sm font-medium text-gray-700 mb-2">
        {time}
      </div>
      
      {icon ? (
        <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather}
          className="w-14 h-14 mb-2"
        />
      ) : (
        <WeatherIcon 
          weatherType={weather} 
          className="w-12 h-12 mb-2 text-gray-500"
        />
      )}
      
      <div className="text-lg md:text-xl font-semibold text-gray-900">
        {displayTemp}°
      </div>
    </div>
  );
};

export default memo(ForecastItem);