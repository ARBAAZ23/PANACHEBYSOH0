import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    const tempData = [];
    let total = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          tempData.push({ _id: productId, size, quantity, product });

          if (product) {
            total += product.price * quantity;
          }
        }
      }
    }

    setCartData(tempData);
    setProductTotal(total);
  }, [cartItems, products]);

  const handleDelete = (productId, size) => {
    updateQuantity(productId, size, 0);
  };

  const handleQuantityChange = (productId, size, amount) => {
    const currentQty = cartItems[productId]?.[size] || 0;
    const newQty = currentQty + amount;
    if (newQty >= 0) {
      updateQuantity(productId, size, newQty);
    }
  };

  return (
    <div className="border-t pt-14 max-w-5xl mx-auto px-4">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR "} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500 text-center py-20 text-lg">
          🛒 Your cart is empty. Go grab something!
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-white p-4 rounded-xl shadow-sm border"
              >
                <img
                  src={item.product?.image[0]}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>

                    <div className="text-lg font-semibold text-gray-800 mt-2 sm:mt-0">
                      {currency}
                      {(item.product?.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, -1)}
                      className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-lg"
                    >
                      –
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, 1)}
                      className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-lg"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleDelete(item._id, item.size)}
                      className="ml-auto"
                    >
                      <img
                        src={assets.delete_icon}
                        alt="Delete"
                        className="w-5 h-5 hover:opacity-70"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Totals Section */}
          <div className="flex justify-end mt-2 mb-4 sm:mt-5 sm:mb-2">
            <div className="w-full sm:w-[450px]">
              <CartTotal productTotal={productTotal} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
