import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleSignIn from '../components/GoogleSignIn';

const Login = () => {

 const [currentState, setCurrentState] = useState('Login');
const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


 const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if(currentState === 'Sign Up'){
      setIsLoading(true);
      const response = await axios.post(backendUrl + '/api/user/register', {
        name,
        email,
        password,
        confirmPassword
      })
      if(response.data.success){
        if(response.data.requiresVerification){
          // Redirect to OTP verification
          toast.info('Please verify your email to complete registration');
          navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=signup`);
        } else {
          // Legacy flow (shouldn't happen, but handle gracefully)
          toast.success('Account created successfully! Please login.');
          setCurrentState('Login');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } else {
        toast.error(response.data.message);
      }
      setIsLoading(false);

    } else {

      const response = await axios.post(backendUrl + '/api/user/login', {
        email,
        password
      })
      if (response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    }
    
  } catch (error) {
     console.log(error);
     toast.error(error.message);
     if(currentState === 'Sign Up'){
       setIsLoading(false);
     }
  }
}

useEffect(() => {
    if (token) {
      navigate('/');
    }
}, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-90 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-700'/>
      </div>
       {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-green-500 ' placeholder='Name' required/> }
       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-green-500 ' placeholder='Email' required/>
       
       {/* Password Input with Toggle */}
       <div className="relative w-full">
         <input 
           onChange={(e)=>setPassword(e.target.value)} 
           value={password} 
           type={showPassword ? "text" : "password"} 
           className='w-full px-3 py-2 pr-10 border border-green-500 ' 
           placeholder='Password' 
           required
         />
         <button
           type="button"
           onClick={() => setShowPassword(!showPassword)}
           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
           aria-label={showPassword ? "Hide password" : "Show password"}
         >
           {showPassword ? (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0L3 3m0 0l3.59 3.59M13 13l3.59 3.59M13 13l-3.59-3.59m0 0L13 13m0 0l-3.59-3.59" />
             </svg>
           ) : (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
             </svg>
           )}
         </button>
       </div>
       
       {/* Confirm Password Input with Toggle */}
       {currentState === 'Sign Up' ? (
         <div className="relative w-full">
           <input 
             onChange={(e)=>setConfirmPassword(e.target.value)} 
             value={confirmPassword} 
             type={showConfirmPassword ? "text" : "password"} 
             className='w-full px-3 py-2 pr-10 border border-green-500 ' 
             placeholder='Confirm Password' 
             required
           />
           <button
             type="button"
             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
             className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
             aria-label={showConfirmPassword ? "Hide password" : "Show password"}
           >
             {showConfirmPassword ? (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0L3 3m0 0l3.59 3.59M13 13l3.59 3.59M13 13l-3.59-3.59m0 0L13 13m0 0l-3.59-3.59" />
               </svg>
             ) : (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
               </svg>
             )}
           </button>
         </div>
       ) : ''}
       <div className='w-full flex justify-between text-sm mt-[-8px]'>
         {currentState === 'Login' ? (
           <p onClick={() => navigate('/forgot-password')} className='cursor-pointer text-gray-500 hover:text-black'>
             Forgot Password?
           </p>
         ) : (
           <p className='invisible'>Placeholder</p>
         )}
         {
          currentState === 'Login' 
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> 
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
         }
       </div>
       <button 
         type='submit' 
         disabled={isLoading}
         className={`w-full py-2 bg-green-500 text-white hover:bg-amber-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
       >
         {isLoading && currentState === 'Sign Up' ? 'Signing Up...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
       </button>
       
       {/* Google Sign-In */}
       <div className='w-full flex items-center gap-2 my-2'>
         <hr className='flex-1 border-gray-300'/>
         <span className='text-gray-500 text-sm'>OR</span>
         <hr className='flex-1 border-gray-300'/>
       </div>
       <div className='w-full flex justify-center items-center'>
         <GoogleSignIn />
       </div>
    </form>
  )
}

export default Login;