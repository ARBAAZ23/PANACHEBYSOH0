import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { token, logout, wishlist, cartItems, products, getUserCart } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  // Fetch user profile
  useEffect(() => {
    if (!token) return;
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/profile`, {
      headers: { token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      })
      .catch((err) => console.error("Failed to fetch user:", err));

    getUserCart();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg font-medium">
        Please login to view your profile.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  // Calculate cart summary
  const cartCount = Object.values(cartItems).reduce(
    (acc, item) =>
      acc + Object.values(item).reduce((sum, qty) => sum + qty, 0),
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* User Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <p className="text-gray-700 mt-2 text-lg">
            You have <span className="font-bold">{cartCount}</span> item
            {cartCount !== 1 && "s"} in your cart.
          </p>
        </div>

        {/* Wishlist */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {wishlist.map((item, index) => {
                const product =
                  products.find((p) => String(p._id) === String(item._id || item.itemId));
                if (!product) return null;

                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <p className="text-gray-900 font-medium text-base line-clamp-2">{product.name}</p>
                      <p className="text-orange-600 font-bold mt-2 text-lg">£{product.price}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
