import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products.filter(
        (item) => item.category === category && item._id !== currentProductId
      );
      setRelated(relatedProducts);
    }
  }, [products, category, currentProductId]);

  if (related.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-5 py-10 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">You may also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="bg-white shadow rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={Array.isArray(item.image) ? item.image[0] : item.image}
              alt={item.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
              <p className="text-orange-600 font-bold">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
