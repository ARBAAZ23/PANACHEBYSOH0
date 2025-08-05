import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount,navigate } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-12">
      <div className="text-2xl mb-6">
        <Title text1="CART  " text2="TOTALS" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 text-gray-700 max-w-md ml-auto">
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">
              {currency}
              {delivery_fee.toFixed(2)}
            </span>
          </div>

          <hr className="border-gray-300 my-2" />

          <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
        onClick={()=>navigate('/place-order')}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
