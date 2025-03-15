import { WeatherData, ForecastData, HourlyForecast } from '@/redux/weather/types';
import { TemperatureUnit } from '@/constants/units';
import { WeatherResponse, ForecastResponse, OneCallResponse } from '@/types/api';

const mapTemperatureUnit = (unit: TemperatureUnit): string => {
  switch (unit) {
    case 'celsius':
      return 'metric';
    case 'fahrenheit':
      return 'imperial';
    case 'kelvin':
    default:
      return 'standard';
  }
};

const formatTimeFromTimestamp = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const getRainChance = (rain?: { [key: string]: number }, pop?: number): number => {
  if (pop !== undefined) return pop * 100;
  
  if (!rain) return 0;
  return rain['1h'] * 100 || rain['3h'] * 100 || 0;
};

export const fetchForecastById = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit
): Promise<ForecastData> => {
  try {
    const unitParam = mapTemperatureUnit(unit);
    
    const response = await fetch(
      `/api/weather/forecast?lat=${lat}&lon=${lon}&units=${unitParam}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch forecast data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.hourly) {
      const oneCallData = data as OneCallResponse;
      const timezone = oneCallData.timezone_offset || 0;
      
      const hourlyForecasts: HourlyForecast[] = oneCallData.hourly.slice(0, 6).map(item => ({
        time: formatTimeFromTimestamp(item.dt),
        temp: Math.round(item.temp),
        weather: item.weather[0].main,
        icon: item.weather[0].icon,
        timestamp: item.dt * 1000 
      }));
      
      return {
        cityId: `${lat}_${lon}`,
        hourly: hourlyForecasts
      };
    } else {
      const forecastData = data as ForecastResponse;
      
      const hourlyForecasts: HourlyForecast[] = forecastData.list.slice(0, 6).map(item => ({
        time: formatTimeFromTimestamp(item.dt),
        temp: Math.round(item.main.temp),
        weather: item.weather[0].main,
        icon: item.weather[0].icon,
        timestamp: item.dt * 1000 
      }));
      
      return {
        cityId: `${lat}_${lon}`,
        hourly: hourlyForecasts
      };
    }
  } catch (error) {
    throw error;
  }
};

export const fetchWeatherById = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit
): Promise<WeatherData> => {
  try {
    const unitParam = mapTemperatureUnit(unit);
    
    const response = await fetch(
      `/api/weather/current?lat=${lat}&lon=${lon}&units=${unitParam}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json() as WeatherResponse;
    
    return {
      cityId: `${lat}_${lon}`,
      temp: data.main.temp,
      main: data.weather[0].main,
      description: data.weather[0].description,
      min: data.main.temp_min,
      max: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      rainChance: getRainChance(data.rain),
      icon: data.weather[0].icon,
      time: formatTimeFromTimestamp(data.dt)
    };
  } catch (error) {
    throw error;
  }
};