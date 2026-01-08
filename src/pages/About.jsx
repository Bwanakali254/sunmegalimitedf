import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

       <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
       </div>

       <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img src={assets.aboutus} alt="about" className='w-full h-100 md:max-w-[450px]' />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>Sun Mega Limited was born from a vision to merge soulful living with sustainable energy. Starting in Mombasa, the company set out to empower communities through light and clean power.</p>
         <p> What began as a local initiative has grown into a brand that celebrates milestones with heart, nurtures relationships with suppliers and clients, and builds bridges between tradition and innovation.</p>
         <b>Our Mission</b>
         <p>To deliver accessible, reliable, and soulful solar solutions that empower individuals, businesses, and communities while nurturing the environment and celebrating human connection.</p>
       </div>
       </div>

       <div className='text-4xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'} />
       </div>

       <div className='flex flex-col sm:flex-row gap-4 text-sm mb-20'>
         <div className='border border-green-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1'>
           <b>Quality Assurance:</b>
           <p className='text-gray-500'> We use the best materials and the latest technology to ensure the best quality products.</p>
         </div>
         <div className='border border-green-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1'>
           <b>Trusted Expertise:</b>
           <p className='text-gray-500'> Our team of experts ensures seamless installations and long-lasting performance.</p>
         </div>
         <div className='border border-green-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1'>
           <b>Comprehensive Services:</b>
           <p className='text-gray-500'> We offer a wide range of services including installation, maintenance, and repair.</p>
         </div>

       </div>
        <NewsletterBox />
    </div>
  )
}

export default About