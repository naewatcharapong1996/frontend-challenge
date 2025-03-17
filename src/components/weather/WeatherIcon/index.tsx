import React, { memo } from 'react';
import { WeatherIconProps } from './types';

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  weatherType, 
  className = '',
  size = 24,
  color = 'currentColor'
}) => {
  // Function to get the appropriate icon path based on weather type
  const getIconPath = (): string => {
    switch (weatherType) {
      case 'Clear':
        return 'M12 2v2m0 16v2m9-9h-2M5 12H3m14.364-6.364l-1.414 1.414M7.05 7.05L5.636 5.636m12.728 12.728l-1.414-1.414M7.05 16.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z';
      
      case 'Clouds':
        return 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z';
      
      case 'Rain':
        return 'M7 16.5v.5m4-5v16m4-11v11M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z';
      
      case 'Drizzle':
        return 'M7 16.5v.5m4-5v3m4-6v3M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z';
      
      case 'Thunderstorm':
        return 'M13 10V3L4 14h7v7l9-11h-7z M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z';
      
      case 'Snow':
        return 'M12 22v-6m0-10V0m-2 2l2 2 2-2M6 8l6 3.5L18 8m-12 8l6-3.5 6 3.5M10 20l2 2 2-2 M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z';
      
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return 'M3 15h18M3 12h18M3 9h18M3 18h18';
      
      case 'Smoke':
      case 'Dust':
      case 'Sand':
        return 'M3 15h6m3 0h9M3 12h18M3 9h12m3 0h3M3 18h9m3 0h6';
      
      case 'Ash':
      case 'Squall':
        return 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z';
      
      case 'Tornado':
        return 'M9.75 17L9 20l-1 .5M3.375 7.5h17.25m-17.25 4.5h17.25m-7.5-9L3.375 15M6 20.25h.008v.008H6v-.008zm2.25 0h.008v.008H8.25v-.008zm2.25 0h.008v.008H10.5v-.008z';
      
      case 'Loading':
        return 'M12 3v3m0 4.5v4.5m0-12v.75m0 13.5v.75M6.75 7.5h-3m13.5 0h-3m-13.5 6h3m16.5 0h-3M7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z';
      
      default:
        return 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';
    }
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      width={size} 
      height={size} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label={`${weatherType} weather`}
    >
      <path d={getIconPath()} />
    </svg>
  );
};

export default memo(WeatherIcon);