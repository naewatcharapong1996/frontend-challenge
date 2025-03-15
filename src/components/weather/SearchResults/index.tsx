import React, { memo } from 'react';
import LocationItem from './LocationItem';
import { SearchResultsProps } from './types';

const SearchResults = ({ 
  locations, 
  onSelectLocation,
  maxResults = 10
}: SearchResultsProps) => {
  const displayedLocations = locations.slice(0, maxResults);
  
  if (displayedLocations.length === 0) {
    return (
      <div className="py-4 px-4 text-center text-gray-500">
        No locations found
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <ul className="divide-y divide-gray-100">
        {displayedLocations.map(location => (
          <li key={location.id}>
            <LocationItem 
              location={location} 
              onClick={onSelectLocation} 
            />
          </li>
        ))}
      </ul>
      
      {locations.length > maxResults && (
        <div className="py-2 px-4 text-xs text-center text-gray-500 bg-gray-50">
          Showing top {maxResults} results of {locations.length}
        </div>
      )}
    </div>
  );
};

export default memo(SearchResults);