import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getCartAmount, token, backendUrl, cartItems, delivery_fee } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Build items array from cart
  const finalProducts = Object.entries(cartItems).map(([itemId, item]) => ({
    id: itemId,
    ...item,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        items: finalProducts,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      };

      const response = await axios.post(
        `${backendUrl}api/order/place`,
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("🎉 Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Order failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t bg-gradient-to-b from-gray-50 to-white px-6 md:px-12 rounded-xl shadow-sm"
    >
      {/* ---------- LEFT: Delivery Info ---------- */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-4 w-full sm:w-[60%] p-6 bg-white rounded-2xl shadow-md"
      >
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"  
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
          className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
        />
      </motion.div>

      {/* ---------- RIGHT: Cart Summary & Payment ---------- */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-6 w-full sm:w-[40%] p-6 bg-white rounded-2xl shadow-md"
      >
        <CartTotal />
        <div className="mt-6">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row mt-3">
            <div className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-xl hover:shadow-md transition">
              <p className="min-w-4 h-4 border rounded-full bg-green-500 shadow-sm"></p>
              <img className="h-6 mx-3" src={assets.cod_icon} alt="" />
              <p className="font-medium">Cash on Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <div className="w-full flex justify-center mt-10">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 
               text-white font-medium tracking-wide 
               px-12 py-3 rounded-2xl shadow-md 
               hover:from-gray-800 hover:via-black hover:to-gray-700
               transition-all duration-500 ease-in-out"
              >
                PLACE ORDER
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default PlaceOrder;
