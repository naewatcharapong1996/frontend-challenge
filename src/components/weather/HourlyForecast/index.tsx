import React, { memo, useMemo } from 'react';
import ForecastItem from './HourlyForecastItem';
import { HourlyForecastProps } from './types';

const HourlyForecast = ({ forecast, loading = false }: HourlyForecastProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-6">
        <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="flex overflow-x-auto pb-2 -mx-2">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="px-2 flex-shrink-0 w-20 md:flex-1">
              <div className="flex flex-col items-center animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecast.length) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-6">
        <h2 className="text-sm font-medium text-gray-700 uppercase mb-4">
          24 Hours Forecast
        </h2>
        <p className="text-gray-500 text-center">Forecast data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <h2 className="text-sm font-medium text-gray-700 uppercase mb-4">
        24 Hours Forecast
      </h2>

      <div className="grid grid-cols-6 gap-2 md:gap-4">
        {forecast.map((item, index) => (
          <div key={`forecast-${item.time}-${index}`} className="flex justify-center">
            <ForecastItem
              time={item.time}
              temp={item.temp}
              weather={item.weather}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HourlyForecast);