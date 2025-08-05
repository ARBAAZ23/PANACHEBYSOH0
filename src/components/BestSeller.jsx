import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const products = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestSeller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST  "} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our bestselling women's styles that everyone is talking about.
          From timeless classics to on-trend essentials, these customer favorites
          are loved for a reason. Handpicked from our most popular pieces, this
          top-rated collection brings together the perfect blend of style,
          comfort, and elegance. Whether you're shopping for a statement look or
          everyday wear, our most-loved outfits are sure to impress. Don’t miss
          out on these fashion must-haves that are flying off the shelves!
        </p>
      </div>
      {bestSeller.length === 0? (
        <p className="text-center text-sm text-gray-400">No bestsellers found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
          {bestSeller.map((item,index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
