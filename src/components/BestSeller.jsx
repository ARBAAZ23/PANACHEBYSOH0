import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller === true);

      if (isMobile) {
        setBestSeller(bestProduct.slice(0, 6)); // 6 for mobile
      } else {
        setBestSeller(bestProduct.slice(0, 5)); // 5 for laptop/desktop
      }
    }
  }, [products, isMobile]);

  return (
    <div className="my-10 animate-fade-up">
      <div className="text-center text-2xl py-8 transition duration-700 ease-in-out">
        <Title text1={"BEST  "} text2={"SELLERS"} />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4 transition duration-700 ease-in-out">
          Explore our bestselling women's styles that everyone is talking about.
          From timeless classics to on-trend essentials, these customer favorites
          are loved for a reason. Handpicked from our most popular pieces, this
          top-rated collection brings together the perfect blend of style,
          comfort, and elegance. Whether you're shopping for a statement look or
          everyday wear, our most-loved outfits are sure to impress. Don’t miss
          out on these fashion must-haves that are flying off the shelves!
        </p>
      </div>

      {bestSeller.length === 0 ? (
        <p className="text-center text-sm text-gray-400">No bestsellers found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
          {bestSeller.map((item) => (
            <div key={item._id} className="animate-zoom-in">
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
