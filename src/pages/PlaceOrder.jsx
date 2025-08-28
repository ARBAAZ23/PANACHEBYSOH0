import React, { useContext, useState } from "react";
import { Country, State, City } from "country-state-city";
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
    country: "",
    state: "",
    city: "",
    zipcode: "",
    phone: "",
    phoneCode: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod"); // ✅ Default COD

  // --- Validation Function ---
  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Enter a valid email address";
      }
      if (name === "zipcode" && !/^\d{4,10}$/.test(value)) {
        error = "Enter a valid zipcode";
      }
      if (name === "phone" && !/^\d{7,15}$/.test(value)) {
        error = "Enter a valid phone number";
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "phoneCode") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle input change ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // --- Country change handler ---
  const handleCountryChange = (e) => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.isoCode === e.target.value
    );

    setFormData({
      ...formData,
      country: selectedCountry?.isoCode || "",
      state: "",
      city: "",
      phoneCode: selectedCountry ? `+${selectedCountry.phonecode}` : "",
    });
    setErrors({ ...errors, country: "" });
  };

  // --- State change handler ---
  const handleStateChange = (e) => {
    setFormData({
      ...formData,
      state: e.target.value,
      city: "",
    });
    setErrors({ ...errors, state: "" });
  };

  // --- City change handler ---
  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      city: e.target.value,
    });
    setErrors({ ...errors, city: "" });
  };

  // --- Final Cart Items ---
  const finalProducts = Object.entries(cartItems).map(([itemId, item]) => ({
    id: itemId,
    ...item,
  }));

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return; // ❌ stop if invalid

  try {
    const orderData = {
      items: finalProducts,
      amount: getCartAmount() + delivery_fee,
      address: formData,
      paymentMethod,
    };

    let response; // ✅ declare outside switch

    switch (paymentMethod) {
      case "cod":
        response = await axios.post(
          `${backendUrl}api/order/place`,
          orderData,
          { headers: { token } }
        );
        break;

      case "razorpay":
        response = await axios.post(
          `${backendUrl}api/order/razorpay`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          console.log("✅ Razorpay order created:", response.data);

          // You’ll need to open Razorpay checkout here
          // Example (pseudo-code):
          // openRazorpayCheckout(response.data.orderId);

        }
        break;

      default:
        toast.error("⚠️ Please select a payment method");
        return;
    }

    // ✅ Common success check
    if (response?.data?.success) {
      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } else {
      toast.error(response?.data?.message || "Order failed");
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

        {/* Name */}
        <div className="flex gap-3">
          <div className="w-full">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Street */}
        <div>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* Country + State */}
        <div className="flex gap-3">
          <div className="w-full">
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              onBlur={handleBlur}
              className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div className="w-full">
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              onBlur={handleBlur}
              disabled={!formData.country}
              className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(formData.country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        {/* City */}
        <div>
          <select
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            onBlur={handleBlur}
            disabled={!formData.state}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          >
            <option value="">Select City</option>
            {City.getCitiesOfState(formData.country, formData.state).map(
              (city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              )
            )}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Zipcode */}
        <div>
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.zipcode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
          )}
        </div>

        {/* Phone with auto country code */}
        <div className="flex gap-3">
          <input
            type="text"
            value={formData.phoneCode}
            readOnly
            className="border rounded-xl p-3 w-24 shadow-sm bg-gray-100 text-center"
          />
          <div className="w-full">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
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
            {/* COD Option */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-xl hover:shadow-md transition ${
                paymentMethod === "cod" ? "border-green-500" : ""
              }`}
            >
              <div
                className={`min-w-4 h-4 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-500" : "bg-white"
                }`}
              ></div>
              <img className="h-6 mx-3" src={assets.cod_icon} alt="COD" />
              <p className="font-medium">Cash on Delivery</p>
            </div>

            {/* Razorpay Option */}
            <div
              onClick={() => setPaymentMethod("razorpay")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-xl hover:shadow-md transition ${
                paymentMethod === "razorpay" ? "border-green-500" : ""
              }`}
            >
              <div
                className={`min-w-4 h-4 border rounded-full ${
                  paymentMethod === "razorpay" ? "bg-green-500" : "bg-white"
                }`}
              ></div>
              <img
                className="h-6 mx-3"
                src={assets.razorpay_icon}
                alt="Razorpay"
              />
              <p className="font-medium">RazorPay</p>
            </div>
          </div>

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
      </motion.div>
    </motion.form>
  );
};

export default PlaceOrder;
