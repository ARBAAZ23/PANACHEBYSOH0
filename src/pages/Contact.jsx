import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="animate-fade-in-up font-poppins text-gray-800 bg-white">
      {/* Title Section */}
      <div className="text-center text-2xl pt-16 border-t border-gray-200">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-16 mb-28 px-4 md:px-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <img
          src={assets.contact_us}
          alt="Contact Illustration"
          className="w-full md:max-w-[500px] rounded-lg shadow-md animate-zoom-in"
        />

        {/* Contact Info */}
        <div className="flex flex-col gap-5 animate-slide-in-right">
          <h2 className="text-3xl font-prata text-black mb-2">Our Store</h2>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              PANACHE by SOH<br />
              Ground Floor, Block A, Fashion Street,<br />
              Bandra West, Mumbai, Maharashtra - 400050
            </p>

            <p>
              <span className="font-semibold text-gray-700">Phone:</span> +91 98765 43210
            </p>

            <p>
              <span className="font-semibold text-gray-700">Email:</span> contact@panachebysoh.com
            </p>

            <p>
              <span className="font-semibold text-gray-700">Working Hours:</span><br />
              Monday - Saturday | 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
