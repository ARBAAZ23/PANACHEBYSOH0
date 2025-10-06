import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);

  // ✅ Show search everywhere if showSearch is true
  if (!showSearch) return null;

  // Filter products by search input
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* ✅ Show filtered results below */}
      {search && (
        <div className="mt-4 w-full sm:w-1/2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // navigate to product page if needed
                  window.location.href = `/product/${p._id}`;
                  setShowSearch(false);
                }}
              >
                <img
                  src={p.image[0]}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-3 text-gray-500 text-sm text-center">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
