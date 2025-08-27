import React from "react";
import { assets } from "../assets/assets.js";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-200 min-h-[720px] overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-0 animate-slide-in-left">
        <div className="text-[#414141] max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[2px] bg-[#414141]"></div>
            <p className="text-sm md:text-base font-medium tracking-widest">
              OUR BESTSELLERS
            </p>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-4 transition duration-700 ease-in-out">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-3 group cursor-pointer hover:gap-4 transition-all duration-300 ease-in-out">
            <p className="text-sm md:text-base font-semibold group-hover:underline">
              SHOP NOW
            </p>
            <div className="w-10 h-[2px] bg-[#414141] group-hover:w-14 transition-all duration-300 ease-in-out"></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="relative w-full sm:w-1/2 h-[70vh] sm:h-auto"> {/* aspect-square keeps it from jumping layout */}
          <video
            src={assets.home_video}
            autoPlay  // Automatically starts the video
            loop      // Loops the video
            muted     // Mutes the video (required for autoplay in most browsers)
            playsInline // Important for iOS to prevent fullscreen
            className="w-full h-full object-cover" // Ensures video fills the container
          >
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
  );
};

export default Hero;
