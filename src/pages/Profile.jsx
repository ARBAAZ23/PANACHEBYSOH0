import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { token, logout, wishlist, cartItems, products, getUserCart } =
    useContext(ShopContext);
  const [user, setUser] = useState(null);

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

  const deleteAccount = async () => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/delete`, {
        method: "DELETE",
        headers: { token },
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        logout();
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!token)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please login to view your profile.
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );

  const cartCount = Object.values(cartItems).reduce(
    (acc, item) => acc + Object.values(item).reduce((sum, qty) => sum + qty, 0),
    0
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      <motion.div
        className="max-w-5xl mx-auto backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-10 space-y-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 👤 User Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 border-b pb-8">
          <div className="flex items-center gap-6">
            <img
              src={
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <p className="mt-3 text-sm text-gray-500 italic">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={logout}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-all"
            >
              Logout
            </button>
            <button
              onClick={deleteAccount}
              className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl shadow-md transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* 🛒 Cart Summary */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 rounded-2xl shadow-lg flex justify-between items-center"
          whileHover={{ scale: 1.01 }}
        >
          <div>
            <h2 className="text-2xl font-semibold">Cart Summary</h2>
            <p className="mt-2 text-gray-200">
              You have{" "}
              <span className="font-bold text-white">{cartCount}</span> item
              {cartCount !== 1 && "s"} in your cart.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt="Cart"
            className="w-14 h-14 opacity-80"
          />
        </motion.div>

        {/* ❤️ Wishlist */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Wishlist
          </h2>

          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-lg text-center py-10">
              Your wishlist is empty. Start adding some favorites!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {wishlist.map((item, index) => {
                const product = products.find(
                  (p) => String(p._id) === String(item._id || item.itemId)
                );
                if (!product) return null;

                return (
                  <motion.div
                    key={index}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4 space-y-2">
                      <p className="text-gray-900 font-semibold line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-orange-600 font-bold text-lg">
                        £{product.price}
                      </p>
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
