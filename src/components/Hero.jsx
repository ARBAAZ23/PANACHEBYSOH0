import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Hero = () => {
  const videoRef = useRef(null);
  const [heroData, setHeroData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL.endsWith("/")
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_BACKEND_URL + "/";

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/hero`);
        setHeroData(res.data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };

    fetchHero();
  }, [backendUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, [heroData]);

  const renderMedia = () => {
    if (!heroData?.mediaUrl) return null;

    const isVideo =
      heroData.mediaUrl.endsWith(".mp4") ||
      heroData.mediaUrl.toLowerCase().includes("video");

    const mediaSrc = `${backendUrl}uploads/${heroData.mediaUrl}`;

    if (isVideo) {
      return (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={mediaSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
          src={mediaSrc}
          alt={heroData.title || "Hero media"}
          className="w-full h-full object-cover"
        />
      );
    }
  };

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
            {heroData?.title || "Latest Arrivals"}
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
        {renderMedia()}
      </div>
    </div>
  );
};

export default Hero;
