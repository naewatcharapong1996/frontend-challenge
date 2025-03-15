import React from 'react';
import Link from 'next/link';
import SearchBar from '../SearchBar';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <Link href="/search" className="block">
          <SearchBar readOnly placeholder="Search by city name or ZIP code" />
        </Link>
      </div>
    </header>
  );
};

export default Header;