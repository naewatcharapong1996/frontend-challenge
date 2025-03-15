import React from 'react';
import { TemperatureUnitSelectorProps } from './types';
import { TemperatureUnit, UNIT_DISPLAY_NAMES } from '@/constants/units';

const TemperatureUnitSelector = ({ 
  selectedUnit, 
  onUnitChange 
}: TemperatureUnitSelectorProps) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-3">Temperature Unit</h2>
      <div className="flex flex-wrap gap-2">
        {Object.values(TemperatureUnit).map((unit) => (
          <button
            key={unit}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedUnit === unit
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onUnitChange(unit)}
          >
            {UNIT_DISPLAY_NAMES[unit]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemperatureUnitSelector;