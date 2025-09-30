import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import OtpVerification from "./components/OtpVerification";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ScrollToTop from "./utils/ScrollToTop";
import PaypalSuccess from "./utils/PaypalSuccess";
import PaymentCancelled from "./utils/PaymentCancelled";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Return";
// import PaypalSuccess from "./utils/PaypalSuccess";
// import PaymentCancelled from './utils/PaymentCancelled'

const App = () => {
  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm]">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Navbar />
      <SearchBar />
      <ScrollToTop /> {/* 👈 Always reset scroll on route change */}
      <Routes>
        <Route path="/" element={<Home />} />\
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-success" element={<PaypalSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
