import React from 'react'
import { assets } from '../assets/assets'
import HeroQuoteWidget from '../components/HeroQuoteWidget'
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
    <div className='flex flex-col sm:flex-row border border-green-500'>
      {/* hero left side */}
       <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
         <div className='text-[#414141]'>
           <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>Lighting Africa, Powering Possibilities</p>
           </div>
           <h1 className='text-3xl sm:py-3 lg:text-2xl text-gray-500 loading-relaxed'>Wholesale & Retail Solar Solutions <br />
           Installation, Maintenance, and <br />
           Sustainable Energy for Every Space.</h1>
           <div className='flex items-center gap-2'>
             <button onClick={() => navigate("/collection")} className='font-semibold text-sm md:text-base cursor-pointer'>SHOP NOW</button>
             <p className='w-8 md:w-11 h-px bg-[#414141]'></p>
           </div>
         </div>
       </div>
       {/* hero right side */}
       <img className='w-full sm:w-1/2' src={assets.hero} alt="" />
    </div>
    <HeroQuoteWidget />
    </div>
    
  )
}

export default Hero