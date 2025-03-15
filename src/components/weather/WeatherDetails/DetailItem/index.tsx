import React, { memo } from 'react';
import { DetailItemProps } from './types';

const DetailItem = ({ 
  label, 
  value, 
  icon, 
  highlight = false 
}: DetailItemProps) => {
  return (
    <div className={`
      flex justify-between items-center p-2 rounded-md
      ${highlight ? 'bg-blue-50' : ''}
    `}>
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className={`
        text-sm font-medium 
        ${highlight ? 'text-blue-700' : 'text-gray-900'}
      `}>
        {value}
      </span>
    </div>
  );
};

export default memo(DetailItem);