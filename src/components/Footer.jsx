import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          
         <div>
            <img src={assets.logo} alt="logo" className='mb-5 w-32' />
            <p className='w-full md:w-2/3 text-gray-500'>
               We are a team of dedicated professionals who are passionate about providing the best possible service to our customers.
            </p>
         </div>

         <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>

            </ul>
         </div>

         <div>
            <p className='text-xl font-medium mb-5'>Get in touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>support@sunmega.co.ke</li>
                <li>+254 1190 27300</li>
                <li>Nairobi, Kenya</li>
            </ul>
         </div>
         

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center text-gray-500'>Copyright © 2026 Sunmega.co.ke - All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer