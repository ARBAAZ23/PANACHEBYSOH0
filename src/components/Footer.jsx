import React from 'react';
import { assets } from '../assets/assets';
import { FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 sm:px-20 font-poppins">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm text-gray-700">
        {/* Column 1: Logo & Description */}
        <div>
          <img src={assets.logo} className="mb-4 w-44" alt="PanacheBySoh" />
          <p className="text-gray-600 leading-relaxed">
            <span className="text-lg text-gray-800 font-semibold">PanacheBySoh</span> is your one-stop
            destination for stylish and elegant fashion. Elevate your wardrobe with us.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-black transition">Home</a></li>
            <li><a href="/collection" className="hover:text-black transition">Collection</a></li>
            <li><a href="/about" className="hover:text-black transition">About</a></li>
            <li><a href="/contact" className="hover:text-black transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-black transition">FAQ</a></li>
            <li><a href="/returns" className="hover:text-black transition">Return Policy</a></li>
            <li><a href="/shipping" className="hover:text-black transition">Shipping Info</a></li>
            <li><a href="/terms" className="hover:text-black transition">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-6 border-t pt-6 text-gray-600 text-sm">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <span>support@panachebysoh.com</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/panachebysoh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black text-xl transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/919920433647 "
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black text-xl transition"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-xs text-gray-500 font-mono">
        © {new Date().getFullYear()} PanacheBySoh. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
