import React, { useEffect, useRef } from "react"; // 1. Import useEffect and useRef
import { assets } from "../assets/assets.js";

const Hero = () => {
  // 2. Create a ref to hold the video element
  const videoRef = useRef(null);

  // 3. Use an effect to play the video when the component mounts
  useEffect(() => {
    // The .play() method returns a promise which can be rejected 
    // if autoplay is blocked by the browser.
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // This catch block is important to handle cases where autoplay is prevented.
        console.error("Video autoplay was prevented:", error);
        // You could optionally show a play button here for the user to manually start the video.
      });
    }
  }, []); // The empty dependency array [] ensures this effect runs only once

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
      <div className="relative w-full sm:w-1/2 h-[70vh] sm:h-auto">
        <video
          ref={videoRef} // 4. Attach the ref to the video element
          src={assets.home_video}
          autoPlay  // Still good to keep as a fallback
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;