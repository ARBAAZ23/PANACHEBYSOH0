import React, { useState, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const { setToken, backendUrl } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const fromForgotPassword = location.state?.fromForgotPassword || false; // 🔑 check if coming from forgot password

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    toast.error("Email not provided for OTP verification.");
    navigate("/login");
    return null;
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
      // 🔑 Choose endpoint based on flow
      const endpoint = fromForgotPassword ? "verify-forgot-otp" : "verify-otp";

      const { data } = await axios.post(`${backendUrl}api/user/${endpoint}`, {
        email,
        otp,
      });

      if (data.success) {
        if (fromForgotPassword) {
          // 🔑 Forgot password flow → go to reset password
          toast.success("OTP verified ✅ Please reset your password");
          navigate("/reset-password", { state: { email } });
        } else {
          // 🔑 Normal signup verification → log user in
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success(data.message || "Email verified successfully 🎉");
          navigate("/");
        }
      } else {
        toast.error(data.message || "Invalid OTP, try again!");
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
      const endpoint = fromForgotPassword ? "forgot-password" : "resend-otp";

      const { data } = await axios.post(`${backendUrl}api/user/${endpoint}`, {
        email,
      });

      if (data.success) {
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
          Verify OTP
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
              type="button"
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
