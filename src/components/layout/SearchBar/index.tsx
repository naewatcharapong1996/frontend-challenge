import React from 'react';
import { SearchBarProps } from './types';

const SearchBar = ({ 
  value, 
  onChange, 
  onFocus,
  onBlur,
  placeholder = 'Search', 
  readOnly = false 
}: SearchBarProps) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
      <button className="p-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <input
        type="text"
        className="flex-1 py-2 px-4 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
      />
      <button className="p-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;