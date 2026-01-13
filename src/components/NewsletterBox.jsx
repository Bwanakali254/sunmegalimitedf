import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const { backendUrl } = useContext(ShopContext);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(backendUrl + '/api/newsletter/subscribe', {
        email
      });
      if (response.data.success) {
        toast.success(response.data.message || 'Subscribed successfully!');
        setIsSubscribed(true);
        setEmail('');
      } else {
        toast.error(response.data.message || 'Failed to subscribe');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Failed to subscribe');
      setIsLoading(false);
    }
  }

  return (
    <div className='text-center'>
        <p className='text-2xl font-semibold text-gray-700'>Subscribe to our newsletter</p>
        <p className='text-gray-400 mt-3'>Be the first to know about new products, discounts, and more!   
        </p>
        {!isSubscribed ? (
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
              <input 
                className='w-full sm:flex-1 outline-none' 
                type='email' 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type='submit' 
                disabled={isLoading || isSubscribed}
                className={`bg-orange-400 hover:bg-green-400 text-white text-sm px-10 py-4 ${isLoading || isSubscribed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isLoading ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
          </form>
        ) : (
          <div className='w-full sm:w-1/2 mx-auto my-6 p-4 bg-green-100 border border-green-500 rounded'>
            <p className='text-green-700 font-semibold'>Thank you! You're subscribed to our newsletter.</p>
          </div>
        )}
    </div>
  )
}

export default NewsletterBox