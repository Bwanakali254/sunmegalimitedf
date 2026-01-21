import React from 'react'
import { Link } from 'react-router-dom'
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
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><Link to="/" className='hover:text-gray-900 cursor-pointer'>Home</Link></li>
                <li><Link to="/about" className='hover:text-gray-900 cursor-pointer'>About</Link></li>
                <li><Link to="/contact" className='hover:text-gray-900 cursor-pointer'>Delivery</Link></li>
                <li><Link to="/privacy-policy" className='hover:text-gray-900 cursor-pointer'>Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className='hover:text-gray-900 cursor-pointer'>Terms & Conditions</Link></li>

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