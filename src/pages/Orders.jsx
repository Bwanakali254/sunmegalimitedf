import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

 const {products,currency} = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div>
        {
          products.slice(1,4).map((item,index)=>(
            <div key={index} className='py-4 bprder-t border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-4'>
              {/* Left side - Image and Info */}
              <div className='flex items-start gap-6 text-sm flex-1'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                     <p className='text-base'>{currency}{item.price}</p>
                     <p>Quantity: 1</p>
                     <p>Total</p>
                  </div>
                  <p className='mt-2 text-sm'>Date: <span></span></p>
                </div>
              </div>
              
              {/* Middle - Green circle for order placed */}
              <div className='flex items-center justify-center gap-2'>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                <p className='text-sm text-gray-700'>Order placed</p>
              </div>
              
              {/* Right side - Track order button */}
              <div className='flex items-center'>
                <button className='bg-green-500 text-white px-4 py-2 rounded text-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders