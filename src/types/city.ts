import { WeatherType } from '@/constants/weather';

export interface City {
  id: string;
  name: string;
  country: string;
  state?: string;
  zipCode?: string;
  localTime: string;
  date?: string;
  weather: {
    temp: number;
    feelsLike?: number;
    main: WeatherType | string;
    description: string;
    min: number;
    max: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection?: string;
    rainChance: number;
    visibility?: number;
    sunrise?: string;
    sunset?: string;
    uvIndex?: number;
  };
  coordinates: {
    lat: number;
    lon: number;
  };
  isLoading?: boolean;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  state?: string;
  zipCode?: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}