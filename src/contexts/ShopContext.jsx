/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "£";
  const [deliveryFee, setDeliveryFee] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [distance, setDistance] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [products, setProducts] = useState([]);
  // lazy init token + user from localStorage to avoid calling setters during render
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  // make sure we do NOT call setState during render anywhere below

  useEffect(() => {
    // persist user safely
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fetch user cart
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

  // Add to cart
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
        await axios.post(backendUrl + "api/cart/add", { itemId, size }, { headers: { token } });
        await getUserCart();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart); // rollback
      }
    }
  };

  // Update cart item quantity
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
        await getUserCart();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart); // rollback
      }
    }
  };

  // Clear cart
  const clearCart = async () => {
    const prevCart = structuredClone(cartItems);
    setCartItems({});
    localStorage.removeItem("cartItems");

    if (token) {
      try {
        await axios.post(backendUrl + "api/cart/clear", {}, { headers: { token } });
        await getUserCart();
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
        setCartItems(prevCart);
      }
    }
  };

  // Cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const getCartWeight = () => {
    let totalWeightGrams = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => String(p._id) === String(itemId));

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        let quantity = cartItems[itemId][size];
        totalWeightGrams += (itemInfo.weight || 0) * quantity;
      }

    }
    return totalWeightGrams;
  }

  // Cart amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => String(p._id) === String(itemId));

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        let quantity = cartItems[itemId][size];
        totalAmount += itemInfo.price * quantity;
      }
    }
    return totalAmount;
  };

  // Shipping cost
  const calculateShippingCost = () => {
    const costPerKm = 2;
    const cost = distance * costPerKm;
    setShippingCost(cost);
    return cost;
  };

  // Total
  const getGrandTotal = () => {
    return getCartAmount() + deliveryFee;
  }

  // Fetch products
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
    if (token) getUserWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // run when token changes

  // Logout
  const logout = () => {
    setToken("");
    setCartItems({});
    setWishlist([]);
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishlist");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Wishlist functions (unchanged)
  const getUserWishlist = async () => {
    if (!token) return;
    try {
      const response = await axios.get(backendUrl + "api/wishlist/list", {
        headers: { token },
      });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addToWishlist = async (itemId, size = null) => {
    const exists = wishlist.some((item) => item.itemId === itemId && item.size === size);
    if (exists) {
      toast.info("Already in wishlist");
      return;
    }

    setWishlist((prev) => [...prev, { itemId, size }]); // optimistic update
    toast.success("Added to wishlist");

    if (token) {
      try {
        await axios.post(backendUrl + "api/wishlist/add", { itemId, size }, { headers: { token } });
        await getUserWishlist();
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const removeFromWishlist = async (itemId, size = null) => {
    setWishlist((prev) => prev.filter((item) => !(item.itemId === itemId && item.size === size)));
    toast.success("Removed from wishlist");

    if (token) {
      try {
        await axios.post(backendUrl + "api/wishlist/remove", { itemId, size }, { headers: { token } });
        await getUserWishlist();
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) =>
        String(item._id) === String(productId) || String(item.itemId) === String(productId)
    );
  };

  const toggleWishlist = async (productId) => {
    try {
      if (!token) {
        toast.error("Please login to manage wishlist");
        return;
      }

      if (isInWishlist(productId)) {
        await axios.post(backendUrl + "api/wishlist/remove", { productId }, { headers: { token } });
        setWishlist((prev) =>
          prev.filter(
            (item) =>
              String(item._id) !== String(productId) && String(item.itemId) !== String(productId)
          )
        );
        toast.info("Removed from wishlist");
      } else {
        await axios.post(backendUrl + "api/wishlist/add", { productId }, { headers: { token } });
        setWishlist((prev) => [...prev, { _id: productId }]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Save cart & wishlist to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch { /* empty */ }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch { /* empty */ }
  }, [wishlist]);

  // Save/remove token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    setDeliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getCartWeight,
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

    // Wishlist
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    user,
    setUser,
    getGrandTotal
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
