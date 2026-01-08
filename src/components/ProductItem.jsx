import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {

     const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer border-2 border-green-500 rounded-lg p-2 flex flex-col' to={`/product/${id}`}>
      <div className='overflow-hidden h-48 flex items-center justify-center'>
        <img className='hover:scale-110 transition ease-in-out max-h-full max-w-full object-contain' src={image[0]} alt="" />
      </div>
       <div className='flex-1 flex flex-col justify-between pt-3'>
         <p className='text-sm min-h-12'>{name}</p>
         <p className='text-sm font-medium mt-auto'>{currency}{price}</p>
       </div>
    </Link>
  )
}

export default ProductItem