import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSliders, FiX } from "react-icons/fi";

// --- Reusable Filter Component ---
// This self-contained panel is used in both the desktop sidebar and the mobile drawer.
const FilterPanel = ({ selectedFilters, onFilterChange }) => {
  const categories = ["Kaftans", "Gowns", "Suits", "Luxury Pret", "Drapes"];
  
  const handleClearFilters = () => {
    onFilterChange([]); // Sending an empty array is the signal to clear all filters.
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        {selectedFilters.length > 0 && (
          <button 
            onClick={handleClearFilters}
            className="text-sm text-orange-600 hover:underline font-medium transition"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Category Filter Section */}
      <div className="pt-4">
        <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value={category}
                checked={selectedFilters.includes(category)}
                onChange={() => onFilterChange(category)}
                className="w-4 h-4 accent-orange-500 rounded border-gray-300 focus:ring-orange-500"
              />
              <span className="text-gray-600 group-hover:text-black transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Collection Page Component ---
const Collection = () => {
  const { products } = useContext(ShopContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // A single, robust handler for toggling a category or clearing all filters
  const handleFilterChange = (category) => {
    setSelectedFilters((prev) => {
      if (Array.isArray(category)) return []; // Handle the "Clear All" case
      // Toggle a single category
      return prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];
    });
  };

  // Memoizing this function with useMemo could be an optimization, but is not critical here.
// --- FIXED VERSION ---
const getFilteredAndSortedProducts = () => {
    let filtered = products;

    if (selectedFilters.length > 0) {
      // BUG FIX: Make the filtering case-insensitive
      // We convert the selected filters to lowercase once for efficiency
      const lowercasedFilters = selectedFilters.map(filter => filter.toLowerCase());
      
      filtered = filtered.filter((item) =>
        // Then, we check if the product's lowercase category is in our lowercase filter list
        item.category && lowercasedFilters.includes(item.category.toLowerCase())
      );
    }

    // Sorting logic remains the same
    if (sortOption === "lowToHigh") {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
};

  const finalProducts = getFilteredAndSortedProducts();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ====== Mobile Filter Drawer w/ Animation & Z-Index Fix ====== */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* The Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 z-50 w-full max-w-xs h-full bg-white shadow-xl lg:hidden" // z-50 ensures it's on top of everything
            >
              <div className="flex justify-end p-2">
                <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-500 hover:text-black">
                  <FiX size={24} />
                </button>
              </div>
              <FilterPanel selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
            </motion.div>

            {/* The Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden" // z-40 is behind the drawer but in front of content
            />
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title with initial load animation */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">All Collections</h1>
          <p className="mt-2 text-gray-500">Discover our curated selection of fine apparel.</p>
        </div>

        <div className="flex items-start gap-8">
          {/* ====== Desktop Sticky Sidebar ====== */}
          <aside className="hidden lg:block w-64 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <FilterPanel selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
          </aside>

          <div className="flex-1">
            {/* Controls Header: Item Count, Filter Button, Sort Dropdown */}
            <div className="flex justify-between items-center border-b pb-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-gray-600 text-sm font-medium">{finalProducts.length} items</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100"
                >
                  <FiSliders /><span>Filters</span>
                </button>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="relevant">Sort: Relevant</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* ====== Animated Product Grid ====== */}
            {finalProducts.length > 0 ? (
              <motion.div
                // This key is crucial. It tells React to re-render and re-animate the grid whenever filters or sort change.
                key={JSON.stringify(selectedFilters) + sortOption}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8"
              >
                {finalProducts.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Link to={`/product/${item._id}`} className="group text-center block">
                      <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                      <p className="mt-1 text-base font-bold text-gray-900">£{item.price}</p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Message to show when no products match the filters
              <div className="text-center py-20 col-span-full">
                <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collection;