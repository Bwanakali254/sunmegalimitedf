import React from "react";
import { assets } from "../assets/assets";
import HeroQuoteWidget from "../components/HeroQuoteWidget";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative border border-green-500">
        {/* hero image as full-width background */}
        <img
          className="w-full h-[500px] sm:h-[600px] object-cover"
          src={assets.hero}
          alt="Solar installation"
        />
        
        {/* left side content positioned over the image */}
        <div className="absolute inset-0 flex items-center justify-start py-10 sm:py-0 px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-[#414141] max-w-lg bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
              <p className="font-medium text-sm md:text-base">
                Lighting Africa, Powering Possibilities
              </p>
            </div>

            <h1 className="text-3xl sm:py-3 lg:text-2xl text-gray-500 leading-relaxed">
              Wholesale & Retail Solar Solutions <br />
              Installation, Maintenance, and <br />
              Sustainable Energy for Every Space.
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/collection")}
                className="font-semibold text-sm md:text-base cursor-pointer"
              >
                SHOP NOW
              </button>
              <p className="w-8 md:w-11 h-px bg-[#414141]"></p>
            </div>
          </div>
        </div>
      </div>

      <HeroQuoteWidget />
    </div>
  );
};

export default Hero;