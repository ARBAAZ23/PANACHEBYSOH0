import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

// Shipping rates per kg
const UK_STANDARD_RATE_PER_KG = 4.99;
const UK_NEXT_DAY_RATE_PER_KG = 8.99;
const INTERNATIONAL_RATE_PER_KG = 9.99;

const CartTotal = (
  // { setGrandTotal }
) => {
  const {
    currency = "£",
    cartItems,
    products,
    shippingMethod = "standard", // "standard" or "next_day"
    country = "UK", // "UK" or any other country
    getCartAmount,
    getCartWeight,
    getGrandTotal,
    deliveryFee,
    setDeliveryFee
  } = useContext(ShopContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalWeightGrams = getCartWeight();

    // Convert total weight from grams to kilograms
    const totalWeightKg = totalWeightGrams / 1000;

    let fee = 0;
    if (country.toLowerCase() === "uk") {
      fee =
        shippingMethod === "next_day"
          ? totalWeightKg * UK_NEXT_DAY_RATE_PER_KG
          : totalWeightKg * UK_STANDARD_RATE_PER_KG;
    } else {
      fee = totalWeightKg * INTERNATIONAL_RATE_PER_KG;
    }

    setDeliveryFee(Math.round(fee * 100) / 100); // Round to 2 decimal places
  }, [cartItems, products, country, shippingMethod, getCartWeight, setDeliveryFee]);


  // useEffect(() => {
  //   setGrandTotal(subtotal + deliveryFee);
  // }, [subtotal, deliveryFee, setGrandTotal])

  useEffect(() => {
    setTotal(getGrandTotal());
  }, [deliveryFee, getGrandTotal])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-12">
      <div className="text-2xl mb-6">
        <Title text1="CART " text2="TOTALS" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 text-gray-700 max-w-md ml-auto">
        <div className="space-y-4 text-sm sm:text-base">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">
              {currency}
              {deliveryFee.toFixed(2)}
            </span>
          </div>

          <hr className="border-gray-300 my-2" />

          {/* Total */}
          <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>

          {/* Note about weight-based shipping */}
          {deliveryFee > 0 && (
            <div className="text-xs text-gray-500 text-right">
              Shipping cost based on total weight and method
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
