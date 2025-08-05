import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className=" flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-base text-gray-700">
      <div>
          <img src={assets.exchange_icon} className="w-20 m-auto mb-5"alt="Exchange Icon"/>
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free Exchange</p>
      </div>
      <div>
          <img src={assets.days_icon} className="w-12 m-auto mb-5"alt="Exchange Icon"/>
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days  free return policy</p>
      </div>
      <div>
          <img src={assets.support_icon} className="w-12 m-auto mb-5"alt="Exchange Icon"/>
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
