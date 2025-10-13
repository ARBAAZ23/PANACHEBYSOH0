import React, { useContext, useState } from "react";
import { Country, City } from "country-state-city";
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
  const { token, backendUrl, cartItems, getGrandTotal, getCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    country: "",
    city: "",
    zipcode: "",
    phone: "",
    phoneCode: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod"); // ✅ Default COD

  // --- Validation ---
  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Enter a valid email address";
      }
      if (name === "zipcode" && !/^[A-Za-z0-9\s-]{3,10}$/.test(value)) {
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

  // --- Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.isoCode === e.target.value
    );
    setFormData({
      ...formData,
      country: selectedCountry?.isoCode || "",
      city: "",
      phoneCode: selectedCountry ? `+${selectedCountry.phonecode}` : "",
    });
    setErrors({ ...errors, country: "" });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
    setErrors({ ...errors, city: "" });
  };

  // --- Final Cart Items ---
  const finalProducts = Object.entries(cartItems).map(([itemId, item]) => ({
    id: itemId,
    ...item,
  }));

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const orderData = {
        items: finalProducts,
        amount: getCartAmount(),
        address: formData,
      };

      if (paymentMethod === "cod") {
        const response = await axios.post(`${backendUrl}api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          toast.success("🎉 COD Order placed!");
          navigate("/orders");
        }
      } else if (paymentMethod === "paypal") {
        const response = await axios.post(`${backendUrl}api/order/paypal`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          window.location.href = response.data.approvalUrl;
        }
      }
    } catch (error) {
      toast.error("❌ Order failed");
      console.error(error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto flex flex-col gap-8 pt-8 sm:pt-14 min-h-[80vh] border-t bg-gradient-to-b from-gray-50 to-white px-6 md:px-10 rounded-xl shadow-sm"
    >
      {/* ---------- DELIVERY INFO ---------- */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <Title text1="DELIVERY" text2="INFORMATION" />

        {/* Name */}
        <div className="flex gap-3 mt-4">
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
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="mt-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Street */}
        <div className="mt-3">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>

        {/* Country */}
        <div className="mt-3">
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          >
            <option value="">Select Country / Region</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* City */}
        <div className="mt-3">
          <select
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            onBlur={handleBlur}
            disabled={!formData.country}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          >
            <option value="">Select City</option>
            {City.getCitiesOfCountry(formData.country).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Zipcode */}
        <div className="mt-3">
          <input
            type="text"
            name="zipcode"
            placeholder="Postcode / ZIP"
            value={formData.zipcode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-black/80 outline-none"
          />
          {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
        </div>

        {/* Phone */}
        <div className="flex gap-3 mt-3">
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
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* ---------- CART & PAYMENT ---------- */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <CartTotal />

        <div className="mt-6">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            {/* COD */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-xl hover:shadow-md transition ${paymentMethod === "cod" ? "border-green-500" : ""
                }`}
            >
              <div
                className={`min-w-4 h-4 border rounded-full ${paymentMethod === "cod" ? "bg-green-500" : "bg-white"
                  }`}
              ></div>
              <img className="h-6 mx-3" src={assets.cod_icon} alt="COD" />
              <p className="font-medium">Cash on Delivery</p>
            </div>

            {/* PayPal */}
            <div
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-xl hover:shadow-md transition ${paymentMethod === "paypal" ? "border-green-500" : ""
                }`}
            >
              <div
                className={`min-w-4 h-4 border rounded-full ${paymentMethod === "paypal" ? "bg-green-500" : "bg-white"
                  }`}
              ></div>
              <img className="h-6 mx-3" src={assets.paypal_icon} alt="PayPal" />
              <p className="font-medium">PayPal</p>
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
      </div>
    </motion.form>
  );
};

export default PlaceOrder;
