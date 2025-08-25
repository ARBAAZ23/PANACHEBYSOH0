import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, sizes }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      to={`/product/${id}`} 
      className="text-gray-800 cursor-pointer block group"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 ease-in-out transform transition-transform duration-300" 
          src={image[0]} 
          alt={name} 
        />
      </div>

      {/* Product Info (centered) */}
      <div className="text-center mt-3">
        <p 
          className="text-base font-medium truncate group-hover:text-blue-600 transition-colors duration-300" 
          title={name}
        >
          {name}
        </p>
        <p className="text-lg font-semibold text-blue-700">
          {currency}{price}
        </p>

        {/* Sizes */}
        {sizes && sizes.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 text-sm">
            {sizes.map((size, index) => (
              <span 
                key={index} 
                className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
