export interface ForecastItem {
    time: string;
    temp: number;
    weather: string;
    timestamp?: number; 
  }
  
  export interface HourlyForecastProps {
    forecast: ForecastItem[];
    loading?: boolean;
  }