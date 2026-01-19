import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative border border-green-500 z-10">
        {/* hero image as full-width background */}
        <img
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
          src={assets.hero}
          alt="Solar installation"
        />
        
        {/* left side content positioned over the image */}
        <div className="absolute inset-0 flex items-center justify-start py-4 sm:py-10 px-4 sm:px-8 md:px-12 lg:px-16 ">
          <div className="text-[#414141] max-w-xs sm:max-w-sm md:max-w-lg bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg z-20">
            <div className="flex items-center gap-2">
              <p className="w-6 sm:w-8 md:w-11 h-0.5 bg-[#414141]"></p>
              <p className="font-medium text-xs sm:text-sm md:text-base">
                Lighting Africa, Powering Possibilities
              </p>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl py-2 sm:py-3 text-gray-500 leading-relaxed">
              Wholesale & Retail Solar Solutions <br />
              Installation, Maintenance, and <br />
              Sustainable Energy for Every Space.
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => navigate("/collection")}
                className="font-semibold text-xs sm:text-sm md:text-base cursor-pointer hover:text-green-600 transition-colors"
              >
                SHOP NOW
              </button>
              <p className="w-6 sm:w-8 md:w-11 h-px bg-[#414141]"></p>
            </div>
          </div>
        </div>
      </div>
      {/* Quote widget removed from here - it's now fixed to viewport */}
    </div>
  );
};

export default Hero;