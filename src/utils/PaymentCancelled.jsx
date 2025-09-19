import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
        alt="Cancelled"
        className="w-24 h-24 mb-4"
      />
      <h1 className="text-3xl font-bold text-red-600 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 mb-6">
        You have cancelled the PayPal transaction. No money has been deducted.
      </p>
      <button
        onClick={() => navigate("/cart")}
        className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300"
      >
        Back to Cart
      </button>
    </motion.div>
  );
};

export default PaymentCancelled;
