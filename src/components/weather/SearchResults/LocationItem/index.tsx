import React, { memo } from 'react';
import { LocationItemProps } from './types';

const ZIP_ICON_PATH = "M17 1.5h-10c-2.761 0-5 2.239-5 5v11c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5v-11c0-2.761-2.239-5-5-5zm1 14h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z";
const CITY_ICON_PATH = "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";

const LocationItem = ({ location, onClick }: LocationItemProps) => {
  const handleClick = () => {
    onClick(location.id);
  };
  
  const getDisplayName = () => {
    if (location.zipCode) {
      return location.state 
        ? `${location.name}, ${location.state} ${location.zipCode}, ${location.country}`
        : `${location.name} ${location.zipCode}, ${location.country}`;
    } 
    return location.state
      ? `${location.name}, ${location.state}/${location.country}`
      : `${location.name}, ${location.country}`;
  };

  const iconPath = location.zipCode ? ZIP_ICON_PATH : CITY_ICON_PATH;
  const displayName = getDisplayName();

  return (
    <button
      className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
      onClick={handleClick}
      aria-label={`Select ${displayName}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={iconPath}
        />
      </svg>
      <span className="truncate">{displayName}</span>
    </button>
  );
};

export default memo(LocationItem);