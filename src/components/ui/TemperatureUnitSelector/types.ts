import { TemperatureUnit } from '@/constants/units';

export interface TemperatureUnitSelectorProps {
  selectedUnit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}