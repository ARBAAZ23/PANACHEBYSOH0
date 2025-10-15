import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Filter and limit bestseller products
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter((item) => item.bestseller === true);
      setBestSeller(isMobile ? filtered.slice(0, 6) : filtered.slice(0, 5));
    }
  }, [products, isMobile]);

  return (
    <div className="my-10 animate-fade-up">
      {/* 🔹 Section Title and Description */}
      <div className="text-center text-2xl py-8 transition duration-700 ease-in-out">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4">
          Explore our bestselling women's styles that everyone is talking about.
          From timeless classics to on-trend essentials, these customer favorites
          are loved for a reason. Handpicked from our most popular pieces, this
          top-rated collection brings together the perfect blend of style,
          comfort, and elegance. Whether you're shopping for a statement look or
          everyday wear, our most-loved outfits are sure to impress. Don’t miss
          out on these fashion must-haves that are flying off the shelves!
        </p>
      </div>

      {/* 🔹 Product Grid */}
      {bestSeller.length === 0 ? (
        <p className="text-center text-sm text-gray-400">
          No bestsellers found.
        </p>
      ) : (
        <motion.div
          key={bestSeller.length}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="
            grid grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            gap-x-4 gap-y-8 px-4
            transition-all duration-700 ease-in-out
          "
        >
          {bestSeller.map((item) => (
            <motion.div
              key={item._id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={`/product/${item._id}`} className="group text-center block">
                {/* ✅ Image wrapper — matches Collection.jsx */}
                <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* ✅ Product Name and Price */}
                <h3 className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-1 text-base font-bold text-gray-900">£{item.price}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BestSeller;
