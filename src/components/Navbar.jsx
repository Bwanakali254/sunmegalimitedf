import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';


const Navbar = () => {

     const [visible, setVisible] = useState(false);

     const {setShowSearch ,getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext)

     const logout = () => {
      navigate('/login');
       localStorage.removeItem('token');
       setToken('');
       setCartItems({});  
     }

  return (
   
    <div className='flex items-center justify-between py-5 font-medium'>

        <Link to='/'> 
        <img src={assets.logo} alt="logo" className='w-15 h-15' /> </Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'> 
          <NavLink to='/' className='flex flex-col items-center gap-1'>
             <p>Home</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-orange-500 hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
             <p>Shop</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-orange-500 hidden' />
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'>
             <p>About</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-orange-500 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
             <p>Contact</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-orange-500 hidden' />
          </NavLink>

        </ul>

        <div className='flex items-center gap-6'>
            <img src={assets.searchIcon} alt="search" className='w-5 cursor-pointer' onClick={() => setShowSearch(true)}/>

            <div className='group relative z-50'>
                <img onClick={()=> token ? null : navigate('/login')} src={assets.profileIcon} alt="profile" className='w-5 cursor-pointer' />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                   <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                      <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-orange-600'>My Profile</p>
                      <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-orange-600'>Orders</p>
                      <p onClick={logout} className='cursor-pointer hover:text-orange-600'>Logout</p>
                   </div>
                </div>}
                
            </div>
            <Link to='/cart' className='relative'>
            <img src={assets.cartIcon} alt="cart" className='w-5 cursor-pointer' />
            <p className='absolute -bottom-1 -right-2 w-4 h-4 text-center leading-4 bg-orange-500 text-white rounded-full text-[8px] flex items-center justify-center'>{getCartCount()}</p>
           </Link>
           <img onClick={() => setVisible(true)} src={assets.menuIcon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            
        </div>
        
        {/* Backdrop Overlay */}
        {visible && (
          <div 
            className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300'
            onClick={() => setVisible(false)}
          />
        )}

        {/* Sidebar Menu for small screens */}
        <div className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 ${visible ? 'w-[280px]' : 'w-0'}`}>
           <div className='flex flex-col h-full'>
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
               <h2 className='text-xl font-semibold text-gray-800'>Menu</h2>
               <button 
                 onClick={() => setVisible(false)} 
                 className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
               >
                 <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                 </svg>
               </button>
            </div>

            {/* Navigation Links */}
            <nav className='flex-1 overflow-y-auto py-6 px-4'>
              <div className='space-y-2'>
                <NavLink 
                  onClick={()=>setVisible(false)} 
                  className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                    }
                  `}
                  to='/'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                  </svg>
                  <span>Home</span>
                </NavLink>

                <NavLink 
                  onClick={()=>setVisible(false)} 
                  className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                    }
                  `}
                  to='/collection'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                  </svg>
                  <span>Shop</span>
                </NavLink>

                <NavLink 
                  onClick={()=>setVisible(false)} 
                  className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                    }
                  `}
                  to='/about'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span>About</span>
                </NavLink>

                <NavLink 
                  onClick={()=>setVisible(false)} 
                  className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                    }
                  `}
                  to='/contact'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                  <span>Contact</span>
                </NavLink>
              </div>
            </nav>

            {/* Footer - User Actions */}
            {token && (
              <div className='border-t border-gray-200 p-4'>
                <div className='space-y-2'>
                  <button 
                    onClick={() => {navigate('/profile'); setVisible(false);}}
                    className='w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium transition-all duration-200'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                    <span>My Profile</span>
                  </button>
                  <button 
                    onClick={() => {navigate('/orders'); setVisible(false);}}
                    className='w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium transition-all duration-200'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                    </svg>
                    <span>My Orders</span>
                  </button>
                  <button 
                    onClick={() => {logout(); setVisible(false);}}
                    className='w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
           </div>
        </div>

    </div>
  )
}

export default Navbar