import React, { useContext, useState, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products, search} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState('newest');

  const toggleCategory = (e) => {

    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
     else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const filterProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      filtered = filtered.filter(product => category.includes(product.category));
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-low-to-high':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-high-to-low':
          return parseInt(b.price) - parseInt(a.price);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, search, category, sort]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdownIcon} alt="dropdown"  />  
        </p>

          {/* Categoryt Filter */}
          <div className={`border border-green-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
             <p className='mb-3 text-sm font-medium'>Categories</p>
             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'batteries'} onChange={toggleCategory} />
                <p>Batteries</p>
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'controllers'} onChange={toggleCategory} />
                <p>Controllers</p>
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'converters'} onChange={toggleCategory} />
                <p>Converters</p>
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'energy-storage-systems'} onChange={toggleCategory} />
                <p>Energy Storage Systems</p>
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'inverters'} onChange={toggleCategory} />
                <p>Inverters</p>
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'portable-power'} onChange={toggleCategory} />
                <p>Portable Power</p>
               </p>
             </div>
          </div>
          </div>
      
       {/* Right side */}
       <div className='flex-1'>

        <div className='flex justify-between test-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* sort by */}
          <select className='border-2 border-green-500 text-sm px-2' value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((Item,index)=>(<ProductItem key={index} id={Item._id} name={Item.name} price={Item.price} image={Item.image} />))
          }
        </div>

       </div>

    </div>
  )
}

export default Collection