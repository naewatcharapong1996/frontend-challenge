
export enum TemperatureUnit {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit',
  KELVIN = 'kelvin',
}
export const TEMPERATURE_UNIT_SYMBOLS: Record<TemperatureUnit, string> = {
  [TemperatureUnit.CELSIUS]: '°C',
  [TemperatureUnit.FAHRENHEIT]: '°F',
  [TemperatureUnit.KELVIN]: 'K',
};

export const UNIT_DISPLAY_NAMES: Record<TemperatureUnit, string> = {
  [TemperatureUnit.CELSIUS]: 'Celsius',
  [TemperatureUnit.FAHRENHEIT]: 'Fahrenheit',
  [TemperatureUnit.KELVIN]: 'Kelvin',
};