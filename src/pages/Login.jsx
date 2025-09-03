import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on typing
  };

  // Validate inputs
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    let newErrors = {};

    if (mode === "Sign Up" && !name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else {
      const strongPass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#._-]).{6,}$/;
      if (!strongPass.test(password)) {
        newErrors.password =
          "Password must include uppercase, lowercase, number, and special character";
      }
    }

    if (mode === "Sign Up" && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = mode === "Login" ? "login" : "register";
      const payload =
        mode === "Login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const { data } = await axios.post(
        `${backendUrl}api/user/${endpoint}`,
        payload
      );

      if (data.success) {
        if (mode === "Login") {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success("Login successful ✅");
          navigate("/");
        } else {
          // after registration -> go to OTP
          toast.success(data.message || "Registration successful! Verify your email 🔑");
          navigate("/verify-otp", { state: { email: formData.email } });
        }
      } else {
        // Handle specific messages from the backend
        if (data.message.toLowerCase().includes("exists") && mode === "Sign Up") {
          toast.info("This email is already registered. Switching to login mode.");
          setMode("Login");
        } else if (data.message.toLowerCase().includes("verify your email first")) {
          toast.warn(data.message);
          navigate("/verify-otp", { state: { email: formData.email } }); // Guide them to OTP page
        }
        else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {mode === "Login" ? "Welcome to PanacheBySoh" : "Create Your Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "Sign Up" && (
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {mode === "Sign Up" && (
            <div>
              <div className="relative">
                <ShieldCheck
                  className="absolute left-3 top-3 text-gray-500"
                  size={20}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {mode === "Login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  toast.info("Forgot password flow coming soon 🔑")
                }
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {loading ? "Please wait..." : mode === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <div className="mt-6 text-center text-gray-700">
          {mode === "Login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setMode("Sign Up");
                  setErrors({}); // Clear errors when switching modes
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Clear form data
                }}
                className="text-black font-medium underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("Login");
                  setErrors({}); // Clear errors when switching modes
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Clear form data
                }}
                className="text-black font-medium underline"
              >
                Login
              </button>
            </p>
          )}
        </div>

        {/* Google Login */}
        <div className="mt-6">
          <button
            onClick={() => toast.info("Google login coming soon 🚀")}
            className="w-full flex items-center justify-center gap-3 border border-gray-400 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <img src={assets.google_icon} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;