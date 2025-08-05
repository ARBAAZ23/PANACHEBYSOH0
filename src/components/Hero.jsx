import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-200 min-h-[720px]">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-0">
        <div className="text-[#414141] max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[2px] bg-[#414141]"></div>
            <p className="text-sm md:text-base font-medium tracking-widest">OUR BESTSELLERS</p>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-4">Latest Arrivals</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm md:text-base font-semibold">SHOP NOW</p>
            <div className="w-10 h-[2px] bg-[#414141]"></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 h-[500px] sm:h-[720px] overflow-hidden flex items-center justify-center">
        <img
          src={assets.hero_icon}
          alt="Latest Arrival"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
