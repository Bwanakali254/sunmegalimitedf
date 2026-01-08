import React from 'react'


const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-semibold text-gray-700'>Subscribe to our newsletter</p>
        <p className='text-gray-400 mt-3'>Be the first to know about new products, discounts, and more!   
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button type='submit' className='bg-orange-400 text-white text-sm px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox