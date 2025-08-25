/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [distance, setDistance] = useState(0); // in KM
  const [shippingCost, setShippingCost] = useState(0);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ✅ Load cart + token from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Save/remove token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ Fetch user cart from backend
  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const productExists = products.some((p) => String(p._id) === String(itemId));
    if (!productExists) {
      toast.error("Product not found");
      return;
    }

    const prevCart = structuredClone(cartItems);
    const cartData = structuredClone(cartItems);
    const id = String(itemId);

    if (cartData[id]) {
      cartData[id][size] = (cartData[id][size] || 0) + 1;
    } else {
      cartData[id] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Added to cart");

    if (token) {
      try {
        await axios.post(
          backendUrl + "api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        await getUserCart(); // ✅ sync
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart); // rollback
      }
    }
  };

  // ✅ Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const prevCart = structuredClone(cartItems);
    const cartData = structuredClone(cartItems);
    const id = String(itemId);

    if (quantity <= 0) {
      if (cartData[id]) {
        delete cartData[id][size];
        if (Object.keys(cartData[id]).length === 0) {
          delete cartData[id];
        }
      }
    } else {
      if (!cartData[id]) cartData[id] = {};
      cartData[id][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        await getUserCart(); // ✅ sync
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart); // rollback
      }
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    const prevCart = structuredClone(cartItems);
    setCartItems({});
    localStorage.removeItem("cartItems");

    if (token) {
      try {
        await axios.post(
          backendUrl + "api/cart/clear",
          {},
          { headers: { token } }
        );
        await getUserCart();
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart); // rollback
      }
    }
  };

  // ✅ Cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  // ✅ Cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => String(p._id) === String(itemId));
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  // ✅ Shipping cost
  const calculateShippingCost = () => {
    const costPerKm = 2;
    const cost = distance * costPerKm;
    setShippingCost(cost);
    return cost;
  };

  // ✅ Total
  const getTotalAmount = () => {
    const subtotal = getCartAmount();
    return subtotal + delivery_fee + shippingCost;
  };

  // ✅ Fetch products
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/product/list`);
      if (response.data.success) {
        const updatedProducts = response.data.products.map((product) => ({
          ...product,
          image: product.image.map((imgPath) =>
            imgPath.startsWith("http") ? imgPath : `${backendUrl}${imgPath}`
          ),
        }));
        setProducts(updatedProducts);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getProductData();
    if (token) getUserCart();
  }, [token]);

  // ✅ Logout
  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    navigate("/login");
    toast.success("Logged out successfully");
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
    backendUrl,
    token,
    setToken,
    logout,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
