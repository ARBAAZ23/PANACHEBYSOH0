import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-12 px-4 sm:px-8 animate-fade-up">
      {/* Section Title */}
      <div className="text-center py-8 transition duration-700 ease-in-out">
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
        <p className="w-11/12 sm:w-3/4 mx-auto text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
          Discover our new arrivals in women's fashion, showcasing the latest
          trends and styles in ladies' wear. From elegant dresses to chic
          everyday outfits, this fresh collection for women is designed to
          elevate your wardrobe. Explore our modern looks and must-have pieces,
          perfect for any occasion.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProduct.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 animate-zoom-in"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
