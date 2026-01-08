import React, { useContext } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 sm:max-w-[480px]'>
 
       <div className='text-xl sm:text-2xl my-3'>
        <Title text1={'Delivery'} text2={'Information'} />
       </div>
       <div className='flex gap-3'>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' required/>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' required/>
       </div>
       <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address' required/>
       <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' required/>
       <div className='flex gap-3'>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' required/>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' required/>
       </div>
       <div className='flex gap-3'>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Zip Code' required/>
         <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' required/>
       </div>
       <input className='border border-green-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Phone Number' required/>
       <div className='w-full text-end'>
          <button onClick={() => navigate('/orders')} className='bg-green-500 text-white px-16 text-sm my-8 py-3 cursor-pointer'>Place Order</button>
         </div> 
      </div>
      
      {/* Right Side */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
           <CartTotal />
        </div>

        <div className='mt-12 max-w-[450px]'>
          <div className='flex justify-between items-center mb-4'>
            <Title text1={'Payment'} text2={'Method'} />
            <div className='flex items-center gap-2 text-gray-500'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'/>
              </svg>
              <p>Secure Payment</p>
            </div>
          </div>
          {/* Payment Methods */}
          <div className='flex flex-col gap-3'>
             <div className='flex items-center gap-3 border border-green-300 p-2 px-3 cursor-pointer'>
               <img className='h-50 mx-4' src={assets.pesapalLogo} alt="" />
    
             </div>

             <div className='border border-green-400 rounded p-4'>
               <div className='flex items-center justify-between'>
                 <h1 className='text-black text-lg font-semibold'>Your payment is secure with Pesapal</h1>
                 <svg className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                   <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'/>
                 </svg>
               </div>
               <p className='text-gray-700 mt-2 text-sm'>All transactions are processed securely through Pesapal's encrypted payment gateway. You'll be redirected to Pesapal's secure payment page to complete your transaction. We never store your payment details.</p>
             </div>
             <p className='border border-green-400 rounded p-4 text-sm'><span className='text-black font-semibold'>NOTE:</span><span className='text-gray-700'> After clicking "Place Order", you'll be redirected to Pesapal's secure payment page where you can choose your preferred payment method (M-Pesa, Airtel Money, Card, etc.).</span></p>
          </div>
        </div>



      </div>
    </div>
  )
}

export default PlaceOrder