import React from "react";
import { assets } from "../assets/assets";
import {
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    // Use the semantic <footer> tag for the main container
    <footer className="bg-gray-100 py-12 px-6 sm:px-20 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[3fr_1fr_1fr] gap-14 text-sm text-gray-700">
        {/* Column 1: Logo & Description */}
        <div>
          <img
            src={assets.logo}
            className="mb-4 w-[100px]"
            alt="PanacheBySoh"
          />
          <p className="text-gray-600 leading-relaxed">
            <span className="text-lg text-gray-800 font-semibold">
              PanacheBySoh
            </span>{" "}
            is your one-stop destination for stylish and elegant fashion.
            Elevate your wardrobe with us.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-black transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/collection"
                className="hover:text-black transition-colors"
              >
                Collection
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-black transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-black transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Support
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/faq" className="hover:text-black transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-black transition-colors">
                Return Policy
              </a>
            </li>
            <li>
              <a
                href="/shipping"
                className="hover:text-black transition-colors"
              >
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-black transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 border-t pt-8 text-gray-600 text-sm">
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-gray-500" />
            {/* IMPROVEMENT: Made phone number clickable with the `tel:` protocol */}
            <a
              href="tel:+44 7442 276 432"
              className="hover:text-black transition-colors"
            >
              +44 7442 276 432
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-500" />
            {/* CHANGED: Wrapped email in an <a> tag with a `mailto:` link */}
            <a
              href="mailto:Panachebysoh@gmail.com"
              className="hover:text-black transition-colors"
            >
              Panachebysoh@gmail.com
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/panachebysoh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-500 hover:text-black text-2xl transition-transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/447442276432"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-500 hover:text-black text-2xl transition-transform hover:scale-110"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © since 2017 PanacheBySoh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
