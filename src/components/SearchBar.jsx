import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  // ✅ Show search everywhere if showSearch is true
  if (!showSearch) return null;

  return (
    <div className="w-full bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 flex flex-col items-center z-50">
      <div className="flex items-center w-full sm:w-1/2 bg-white border border-gray-300 rounded-full px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-yellow-100 transition-all duration-200">
        
        {/* Input field */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for items, categories..."
          className="flex-1 text-sm sm:text-base outline-none bg-transparent placeholder-gray-400 text-gray-700"
        />

        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="w-5 h-5 opacity-70 hover:opacity-100 transition"
        />

        {/* Close Button */}
        <button
          onClick={() => setShowSearch(false)}
          className="ml-3 w-5 h-5 opacity-60 hover:opacity-100 transition-transform duration-200 hover:scale-110"
        >
          <img src={assets.close_icon} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
