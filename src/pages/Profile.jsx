import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { token, logout, wishlist, cartItems, products, getUserCart } =
    useContext(ShopContext);
  const [user, setUser] = useState(null)
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
 
// Delete account
const deleteAccount = async () => {
  if (!window.confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.")) {
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/delete`, {
      method: "DELETE",
      headers: { token },
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      logout(); // clear context + token
      window.location.href = "/"; // redirect to home
    }
  } catch (err) {
    console.error("Failed to delete account:", err);
    alert("Something went wrong. Please try again.");
  }
};


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
    (acc, item) => acc + Object.values(item).reduce((sum, qty) => sum + qty, 0),
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
          <div className="flex items-center gap-4">
            <img
              src={
                user.profilePic ||
                "https://www.flaticon.com/free-icon/profile_16869838?term=profile&page=1&position=55&origin=search&related_id=16869838" // fallback image
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                {user.name}
              </h1>
              <p className="text-gray-500 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        {/* <div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>
          {showPasswordForm && (
            <div className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Password
              </button>
            </div>
          )}
        </div> */}

        {/* Cart Summary */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <p className="text-gray-700 mt-2 text-lg">
            You have <span className="font-bold">{cartCount}</span> item
            {cartCount !== 1 && "s"} in your cart.
          </p>
        </div>

        {/* Wishlist */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Wishlist
          </h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {wishlist.map((item, index) => {
                const product = products.find(
                  (p) => String(p._id) === String(item._id || item.itemId)
                );
                if (!product) return null;

                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <p className="text-gray-900 font-medium text-base line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-orange-600 font-bold mt-2 text-lg">
                        £{product.price}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          <div className="flex gap-4">
  <button
    onClick={logout}
    className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
  >
    Logout
  </button>
  <button
    onClick={deleteAccount}
    className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-black transition-all duration-300"
  >
    Delete Account
  </button>
</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
