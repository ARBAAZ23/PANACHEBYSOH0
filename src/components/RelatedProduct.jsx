import React, { useContext, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);

  const related = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products
      .filter(
        (item) => item.category === category && item._id !== currentProductId
      )
      .slice(0, 6); // max 6
  }, [products, category, currentProductId]);

  if (!products || products.length === 0) {
    return <p className="text-center py-10">Loading related products...</p>;
  }

  if (related.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-5 py-10 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        You may also like
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="min-w-[180px] flex-shrink-0 bg-white shadow rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={Array.isArray(item.image) ? item.image[0] : item.image}
              alt={item.name || "Related product"}
              className="
    w-full 
    h-60 sm:h-50 md:h-56 lg:h-64 xl:h-72 
    object-contain lg:object-cover
    bg-white
    rounded-2xl
  "
            />

            <div className="p-3 space-y-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.name || "Unnamed product"}
              </h3>
              <p className="text-orange-600 font-bold">
                ${item.price ?? "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
