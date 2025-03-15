export enum WeatherType {
    CLEAR = 'Clear',
    CLOUDS = 'Clouds',
    RAIN = 'Rain',
    DRIZZLE = 'Drizzle',
    THUNDERSTORM = 'Thunderstorm',
    SNOW = 'Snow',
    MIST = 'Mist',
    SMOKE = 'Smoke',
    HAZE = 'Haze',
    DUST = 'Dust',
    FOG = 'Fog',
    SAND = 'Sand',
    ASH = 'Ash',
    SQUALL = 'Squall',
    TORNADO = 'Tornado',
  }
  
  export const WEATHER_ICON_MAP: Record<WeatherType, string> = {
    [WeatherType.CLEAR]: 'clear',
    [WeatherType.CLOUDS]: 'clouds',
    [WeatherType.RAIN]: 'rain',
    [WeatherType.DRIZZLE]: 'drizzle',
    [WeatherType.THUNDERSTORM]: 'thunderstorm',
    [WeatherType.SNOW]: 'snow',
    [WeatherType.MIST]: 'mist',
    [WeatherType.SMOKE]: 'smoke',
    [WeatherType.HAZE]: 'haze',
    [WeatherType.DUST]: 'dust',
    [WeatherType.FOG]: 'fog',
    [WeatherType.SAND]: 'sand',
    [WeatherType.ASH]: 'ash',
    [WeatherType.SQUALL]: 'squall',
    [WeatherType.TORNADO]: 'tornado',
  };
  
  export enum Season {
    SPRING = 'spring',
    SUMMER = 'summer',
    AUTUMN = 'autumn',
    WINTER = 'winter',
  }
  
  export enum TimeOfDay {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    EVENING = 'evening',
    NIGHT = 'night',
  }