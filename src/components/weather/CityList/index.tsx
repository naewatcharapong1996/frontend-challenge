import React, { memo } from 'react';
import Link from 'next/link';
import CityItem from '../CityItem';
import { getCityDetailRoute } from '@/constants/routes';
import { CityListProps } from './types';

const CityList = ({ cities, isLoading = false }: CityListProps) => {
  // Early return for empty state
  if (!cities.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-500 mb-4">No cities added yet</p>
        <p className="text-sm text-gray-400">
          Search for a city to add it to your list
        </p>
      </div>
    );
  }
  
  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
      {cities.map((city) => (
        <Link 
          key={city.id} 
          href={getCityDetailRoute(city.id)} 
          className="block border-b border-gray-200 md:border md:rounded-lg md:overflow-hidden hover:shadow-md transition-shadow"
        >
          <CityItem
            city={city}
            isLoading={isLoading && city.weather.main === 'Loading'}
          />
        </Link>
      ))}
    </div>
  );
};

export default memo(CityList);