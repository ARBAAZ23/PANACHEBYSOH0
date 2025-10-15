import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size for responsive limit
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Limit products based on screen
  useEffect(() => {
    if (isMobile) setLatestProduct(products.slice(0, 6));
    else setLatestProduct(products.slice(0, 5));
  }, [products, isMobile]);

  return (
    <section className="my-16 px-4 sm:px-8 lg:px-12">
      {/* ✨ Section Title */}
      <div className="text-center mb-10">
        <Title text1="LATEST " text2="COLLECTIONS" />
        <p className="w-11/12 sm:w-3/4 mx-auto text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
          Discover our new arrivals in women's fashion, showcasing the latest
          trends and styles in ladies' wear. From elegant dresses to chic
          everyday outfits, this fresh collection is designed to elevate your
          wardrobe for any occasion.
        </p>
      </div>

      {/* 🛍️ Animated Product Grid (matches Collection.jsx) */}
      <motion.div
        key={latestProduct.length}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8"
      >
        {latestProduct.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to={`/product/${item._id}`}
              className="group block text-center bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
            >
              {/* 🖼️ Product Image */}
              <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* 🏷️ Product Info */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {item.name}
                </h3>
                <p className="mt-1 text-base font-bold text-gray-900">
                  £{item.price}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestCollection;
