import React, { useState } from 'react';

const SearchBar = ({ placeholder = "Search products...", onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch?.(searchTerm.trim());
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="rounded-l px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[400px]"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white rounded-r px-3 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar; 