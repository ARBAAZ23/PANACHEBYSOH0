import React, { useState, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom"; // Import useLocation

const OtpVerification = () => { // Removed `email` prop, use useLocation
  const { setToken, navigate, backendUrl } = useContext(ShopContext);
  const location = useLocation(); // Get location object
  const email = location.state?.email; // Extract email from state

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // If email is not present in state, redirect to login or home
  if (!email) {
    toast.error("Email not provided for OTP verification.");
    navigate("/login"); // Or to the home page
    return null; // Don't render component if no email
  }

  // 🔹 Handle OTP submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}api/user/verify-otp`, {
        email,
        otp,
      });

      if (data.success) { // Check data.success
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Email verified successfully 🎉");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid response from server");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP, try again!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend OTP
  const resendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}api/user/resend-otp`, {
        email,
      });
      if(data.success) {
        toast.success(data.message || "OTP resent successfully ✅");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            maxLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn’t receive the code?{" "}
            <button
              type="button" // Important to specify type="button" to prevent form submission
              onClick={resendOtp}
              className="text-black font-medium underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;