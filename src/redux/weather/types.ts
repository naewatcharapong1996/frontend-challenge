export interface WeatherData {
    cityId: string;
    temp: number;
    main: string;
    description: string;
    min: number;
    max: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    rainChance: number;
    icon: string;
    time:string;
  }
  
  export interface HourlyForecast {
    time: string;
    temp: number;
    weather: string;
    icon: string;
  }
  
  export interface ForecastData {
    cityId: string;
    hourly: HourlyForecast[];
  }
  
  export interface WeatherState {
    currentWeather: WeatherData | null;
    forecast: ForecastData | null;
    loading: boolean;
    error: string | null;
  }