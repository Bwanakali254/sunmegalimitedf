import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero image */}
      <img
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
        src={assets.hero}
        alt="Solar installation"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Left content */}
      <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16 z-10">
        <div className="max-w-md text-white">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-green-400"></span>
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide">
              Lighting Africa, Powering Possibilities
            </p>
          </div>

          {/* Main heading */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug mb-4">
            Wholesale & Retail Solar Solutions 
          </h1>

          {/* CTA */}
          <button
            onClick={() => navigate("/collection")}
            className="group inline-flex items-center gap-2 border border-green-400 px-4 py-2 text-xs sm:text-sm md:text-base font-semibold hover:bg-green-500 hover:text-black transition-all"
          >
            SHOP NOW
            <span className="w-5 h-[2px] bg-green-400 group-hover:bg-black transition-all"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
