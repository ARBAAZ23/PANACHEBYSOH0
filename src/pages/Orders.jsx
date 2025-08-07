import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-20 bg-gray-50 min-h-screen">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6 mb-3">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="p-5 border bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Product Image */}
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-26 h-[130px] object-contain rounded-md"
              />

              {/* Product Info */}
              <div className="flex flex-col gap-2 text-sm sm:text-base w-full">
                {/* Name and Date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Date: <span className="text-gray-700">4 Aug, 2025</span>
                  </p>
                </div>

                {/* Price, Quantity, Size */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-2">
                  <p>
                    Price:{" "}
                    <span className="font-medium text-black">
                      {currency}
                      {item.price}
                    </span>
                  </p>
                  <p>
                    Quantity: <span className="font-medium">1</span>
                  </p>
                  <p>
                    Size: <span className="font-medium">M</span>
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                  <p className="text-yellow-600 font-semibold">
                    Status: Ready to Deliver
                  </p>
                  <button className="mt-2 sm:mt-0 px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
