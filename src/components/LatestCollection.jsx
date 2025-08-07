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
    <div className="my-10 animate-fade-up">
      <div className="text-center py-8 text-3xl transition duration-700 ease-in-out">
        <Title text1={"LATEST "} text2={" COLLECTIONS"} />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4 transition duration-700 ease-in-out">
          Discover our new arrivals in women's fashion, showcasing the latest
          trends and styles in ladies' wear. From elegant dresses to chic
          everyday outfits, this fresh collection for women is designed to
          elevate your wardrobe. Explore our modern looks and must-have pieces,
          perfect for any occasion. Whether you're updating your closet or
          looking for something bold and new, our trending outfits for women
          bring you the best of the season in one place.
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => (
          <div
            key={index}
            className="animate-zoom-in"
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
