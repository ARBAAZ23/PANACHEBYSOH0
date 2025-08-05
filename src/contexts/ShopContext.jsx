/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [distance, setDistance] = useState(0); // in KM
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate()

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (typeof quantity === "number" && quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const calculateShippingCost = () => {
    const costPerKm = 2;
    const cost = distance * costPerKm;
    setShippingCost(cost);
    return cost;
  };

  const getTotalAmount = () => {
    const subtotal = getCartAmount();
    return subtotal + delivery_fee + shippingCost;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getTotalAmount,
    clearCart,
    distance,
    setDistance,
    shippingCost,
    calculateShippingCost,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
