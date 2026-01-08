import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        
       <div>
         <img src={assets.exchangeIcon} className='w-12 m-auto mb-5' alt="exchange" />
         <p className='font-semibold'>Easy Exchange Policy</p>
         <p className='text-gray-400'>We offer a 100% satisfaction guarantee on all our products.</p>
       </div>
       <div>
         <img src={assets.qualityIcon} className='w-12 m-auto mb-5' alt="quality" />
         <p className='font-semibold'>Quality Assurance</p>
         <p className='text-gray-400'>We use the best materials and the latest technology to ensure the best quality products.</p>
       </div>
       <div>
         <img src={assets.supportImg} className='w-12 m-auto mb-5' alt="support" />
         <p className='font-semibold'>24/7 Support</p>
         <p className='text-gray-400'>Our support team is here to help you with any questions or concerns.</p>
       </div>

    </div>
  )
}

export default OurPolicy