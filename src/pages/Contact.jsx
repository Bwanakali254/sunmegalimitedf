import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(backendUrl + '/api/contact', {
        name,
        email,
        subject,
        message
      });
      if (response.data.success) {
        toast.success(response.data.message || 'Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error(response.data.message || 'Failed to send message');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Failed to send message');
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <input 
              type="text" 
              placeholder='Input your name' 
              className='w-full px-3 py-2 border border-green-500 ' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder='Input your email' 
              className='w-full px-3 py-2 border border-green-500 ' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <input 
            type="text" 
            placeholder='Subject' 
            className='w-full px-3 py-2 border border-green-500 mt-3' 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea 
            placeholder='Submit your message request' 
            className='w-full px-3 py-2 border border-green-500 mt-3 h-48' 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button 
            type='submit' 
            disabled={isLoading}
            className={`w-full bg-green-500 hover:bg-amber-500 text-white py-3 mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
    <NewsletterBox />
    </div>
  );
};

export default Contact;