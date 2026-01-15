import React from "react";
import { assets } from "../assets/assets";
import HeroQuoteWidget from "../components/HeroQuoteWidget";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row border border-green-500">
        {/* Left side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center px-6 py-10 sm:py-0">
          <div className="text-[#414141] max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
              <p className="font-medium text-xs sm:text-sm md:text-base">
                Lighting Africa, Powering Possibilities
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-600 leading-snug mb-4">
              Wholesale & Retail Solar Solutions <br />
              Installation, Maintenance, and <br />
              Sustainable Energy for Every Space.
            </h1>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/collection")}
                className="font-semibold text-sm sm:text-base px-5 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-600 hover:text-white transition"
              >
                SHOP NOW
              </button>
              <p className="w-8 md:w-11 h-px bg-[#414141]"></p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full sm:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={assets.hero}
            alt="Solar solutions"
          />
        </div>
      </div>

      <HeroQuoteWidget />
    </div>
  );
};

export default Hero;
