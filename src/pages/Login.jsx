import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [mode, setMode] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === "Login" ? "login" : "register";
      const { data } = await axios.post(
        `${backendUrl}api/user/${endpoint}`,
        formData
      );

      if (data?.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(`${mode} successful ✅`);
        navigate("/");
      } else {
        toast.error("No token received from server");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      if (message.toLowerCase().includes("exists")) {
        toast.error("This email is already registered, please login.");
        setMode("Login");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon 🚀");
  };

  const handleForgotPassword = () => {
  navigate("/forgot-password"); // 👈 send user to ForgotPassword.jsx
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "Login" ? "Welcome to PanacheBySoh" : "Create Your Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "Sign Up" && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {mode === "Login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            {loading ? "Please wait..." : mode === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <div className="mt-6 text-center text-gray-600">
          {mode === "Login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("Sign Up")}
                className="text-blue-500 hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("Login")}
                className="text-blue-500 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>

        {/* Google Login */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
