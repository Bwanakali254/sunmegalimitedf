import React, { useContext, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart: addToCartContext} = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const ProductData = useMemo(() => {
    return products.find(item => item._id === productId) || null;
  }, [products, productId]);

  const initialImage = useMemo(() => {
    return ProductData && ProductData.image && ProductData.image.length > 0 ? ProductData.image[0] : '';
  }, [ProductData]);

  const [image, setImage] = useState(initialImage);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = (id) => {
    addToCartContext(id, quantity);
  };

  const handleBuyNow = (id) => {
    addToCartContext(id, quantity);
    window.location.href = '/place-order';
  };

  React.useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  return ProductData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start sm:justify-normal sm:w-[18.7%] w-full gap-2 sm:gap-3'>
            {ProductData.image.map((item,index)=>(
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-0 shrink-0 cursor-pointer border-2 border-green-500 rounded'
                alt=''
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%] border-2 border-orange-500 rounded'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-mediam text-2xl mt-2'>{ProductData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.starIcon} alt="" className="w-3 5" />
            <img src={assets.starIcon} alt="" className="w-3 5" />
            <img src={assets.starIcon} alt="" className="w-3 5" />
            <img src={assets.starIcon} alt="" className="w-3 5" />
            <img src={assets.starDullIcon} alt="" className="w-3 5" />
            <p className='pl-2'>(5)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{ProductData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{ProductData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <div className='flex items-center gap-4'>
              <p className='text-sm font-medium'>Quantity:</p>
              <div className='flex items-center border border-gray-300 rounded'>
                <button onClick={decrementQuantity} className='px-3 py-1 text-lg hover:bg-amber-400'>-</button>
                <p className='px-4 py-1 border-x border-gray-300'>{quantity}</p>
                <button onClick={incrementQuantity} className='px-3 py-1 text-lg hover:bg-amber-400'>+</button>
              </div>
            </div>

            <div className='flex gap-4'>
              <button
                onClick={() => handleAddToCart(ProductData._id)}
                className='bg-green-500 text-white active:bg-amber-500 hover:bg-amber-500 px-8 py-3 rounded text-sm font-medium cursor-pointer'
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(ProductData._id)}
                className='border border-green-500 text-green-500 active:bg-gray-400 px-8 py-3 rounded text-sm font-medium'
              >
                Buy Now
              </button>
            </div>

            <hr className='mt-8 sm:w-4/5' />

            <div className='flex items-center gap-2 mt-4'>
              <img src={assets.exchangeIcon} alt="" className='w-5' />
              <p className='text-sm text-gray-600'>7 Days Return</p>
            </div>
            <div className='flex items-center gap-2'>
              <img src={assets.qualityIcon} alt="" className='w-5' />
              <p className='text-sm text-gray-600'>Warranty Available</p>
            </div>
            <div className='flex items-center gap-2'>
              <img src={assets.supportImg} alt="" className='w-5' />
              <p className='text-sm text-gray-600'>24/7 Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* description & review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (5)</p>
        </div>
        <div className='flex flex-col gap-4 border border-green-500 px-6 text-sm text-gray-500'>
          {ProductData.description
            ?.split('\n')
            .filter(line => line.trim() !== '')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>

      <RelatedProducts
        category={ProductData.category}
        subCategory={ProductData.subCategory}
      />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
