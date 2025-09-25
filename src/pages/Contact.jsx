import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="animate-fade-in-up font-poppins text-gray-800 bg-white">
      {/* Title Section */}
      <div className="text-center text-xl sm:text-2xl pt-12 sm:pt-16 border-t border-gray-200">
        <Title text1="CONTACT " text2="US" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 mb-20 sm:mb-28 px-4 sm:px-8 md:px-20 flex flex-col md:flex-row items-center gap-10 sm:gap-12">
        
       {/* Image */}
        <img
          src={assets.contact_us}
          alt="Contact Illustration"
          className="w-full md:max-w-[500px] rounded-lg shadow-md animate-zoom-in"
        />

        {/* Contact Info */}
        <div className="flex flex-col gap-4 sm:gap-5 animate-slide-in-right text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-prata text-black mb-2">Our Store</h2>

          <div className="space-y-3 sm:space-y-4 text-gray-600">
            <p>
              PANACHE by SOH Online Store<br />
            </p>

            <p>
              <span className="font-semibold text-gray-700">Phone:</span> +44 7442 276 432
            </p>

            <p>
              <span className="font-semibold text-gray-700">Email:</span> Panachebysoh@gmail.com
            </p>

            <p>
              <span className="font-semibold text-gray-700">Working Hours:</span><br />
              Monday - Saturday | 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default Contact;
