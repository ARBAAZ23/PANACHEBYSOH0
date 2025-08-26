import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount , navigate , token, setToken ,setCartItems} = useContext(ShopContext);

  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({}) 
  }

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  return (
    <div className="flex items-center justify-between font-medium px-20 max-[639px]:px-4">
      <Link to={"/"}>
        <img
  src={assets.logo}
  className="w-20 h-20 sm:w-24 sm:h-24"
  alt="Logo"/>
      </Link>

      {/* Main Nav */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item === "HOME" ? "" : item.toLowerCase()}`}
            className="group flex flex-col items-center gap-1"
          >
            <p className="font-mono text-lg group-hover:text-black transition-all duration-300">
              {item}
            </p>
            <hr className="w-2/3 h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(prev => !prev)}
          src={assets.search_icon}
          className="w-8 cursor-pointer"
          alt="Search"
        />
        <div className="group relative">
            <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className="w-6 cursor-pointer" alt="Profile" />
          {token && <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-6 min-w-6" alt="Cart" />
          <p className="absolute left-[15px] bottom-[15px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-7 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0  h-full z-50 bg-white transition-all duration-300 ease-in-out ${
          visible ? "w-3/4 max-w-xs shadow-lg" : "w-0"
        } overflow-x-hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
            <p>Back</p>
          </div>

          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              to={`/${item === "HOME" ? "" : item.toLowerCase()}`}
              className="py-6 pl-6 font-mono text-center"
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
