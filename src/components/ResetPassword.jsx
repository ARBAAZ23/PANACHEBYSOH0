import React, { useState, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  if (!email) {
    toast.error("Email missing for reset password.");
    navigate("/forgot-password");
    return null;
  }

  // ✅ Password validation rules
  const validatePassword = (pass) => {
    const rules = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
    return rules;
  };

  const rules = validatePassword(password);
  const isValidPassword =
    rules.length && rules.uppercase && rules.lowercase && rules.number && rules.symbol;

  const handleReset = async (e) => {
    e.preventDefault();
    if (!isValidPassword) return toast.error("Password does not meet requirements");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}api/user/reset-password`, {
        email,
        newPassword:password,
      });
      if (data.success) {
        toast.success("Password reset successful 🎉");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(password.length > 0)}
            className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          {/* 🔹 Password rules (show only if user is typing) */}
          {showRules && (
            <div className="text-sm text-gray-600 space-y-1">
              <p className={rules.length ? "text-green-600" : "text-red-600"}>
                • At least 8 characters
              </p>
              <p className={rules.uppercase ? "text-green-600" : "text-red-600"}>
                • At least 1 uppercase letter
              </p>
              <p className={rules.lowercase ? "text-green-600" : "text-red-600"}>
                • At least 1 lowercase letter
              </p>
              <p className={rules.number ? "text-green-600" : "text-red-600"}>
                • At least 1 number
              </p>
              <p className={rules.symbol ? "text-green-600" : "text-red-600"}>
                • At least 1 special symbol
              </p>
            </div>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isValidPassword
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
