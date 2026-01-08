import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-10 border-t'>
      <Title text1={'Contact'} text2={'Us'} />
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img src={assets.contact} alt="contact" className='w-full h-full md:max-w-[450px]' />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Contact Details</p>
        <p className='text-gray-500'>Saramala round, 2nd floor <br />2c Mombasa, Kenya.</p>
        <p className='text-gray-500'> Phone: +254 1190 27300 <br />Email: support@sunmega.co.ke</p>
        <p className='font-semibold text-xl text-gray-600'>Get in touch with us</p>
        <div className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <input type="text" placeholder='Input your name' className='w-full px-3 py-2 border border-green-500 ' required/>
            <input type="email" placeholder='Input your email' className='w-full px-3 py-2 border border-green-500 ' required/>
          </div>
          <input type="text" placeholder='Subject' className='w-full px-3 py-2 border border-green-500 mt-3' required/>
          <textarea placeholder='Submit your message request' className='w-full px-3 py-2 border border-green-500 mt-3 h-48' required></textarea>
          <button type='submit' className='w-full bg-green-500 text-white py-3 mt-4 cursor-pointer'>Send message</button>
        </div>
      </div>
    </div>
    <NewsletterBox />
    </div>
  );
};

export default Contact;