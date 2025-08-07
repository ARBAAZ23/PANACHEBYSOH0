import React, { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFilters.includes(item.category)
      );
    }

    if (showSearch && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption === "lowToHigh") {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  return (
    <div className="bg-white min-h-screen px-4 sm:px-10 pt-10 border-t font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold transition-all duration-300">
          <Title text1="All " text2="COLLECTION" />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md text-sm sm:text-base bg-white text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ease-in-out"
        >
          <option value="relevant">Sort: Relevant</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full sm:w-64 border border-gray-200 rounded-md bg-white p-4 mb-6 shadow-sm">
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="text-base sm:text-lg font-semibold text-gray-800 flex items-center justify-between cursor-pointer border-b pb-2 transition duration-300"
          >
            <span>FILTERS</span>
            <span className="text-xl font-light text-gray-600">
              {showFilter ? "−" : "+"}
            </span>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showFilter ? "max-h-[400px] mt-4" : "max-h-0"
            } sm:max-h-full sm:mt-4`}
          >
            <p className="mb-3 text-sm sm:text-base font-medium text-gray-700">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {["Kaftans", "Gowns", "Suits", "Luxury Pret", "Drapes"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={selectedFilters.includes(item)}
                      onChange={() => handleFilterChange(item)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    {item.toUpperCase()}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item, index) => (
              <Link
                key={index}
                to={`/product/${item._id}`}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-3 text-center group animate-fade-in"
              >
                <div className="text-[10px] text-gray-500 font-mono mb-1 truncate">
                  ID: {item._id}
                </div>

                <div className="overflow-hidden rounded-md aspect-[3/4] relative">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="text-base font-semibold text-gray-800 mt-3">
                  {item.name}
                </h2>
                <p className="text-pink-600 font-bold mt-1">${item.price}</p>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 italic">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
