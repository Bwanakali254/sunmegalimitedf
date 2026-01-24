import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { backendUrl } = useContext(ShopContext);

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/request-password-reset', {
                email
            });

            if (response.data.success) {
                toast.success(response.data.message);
                // Redirect to OTP verification page
                navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=password_change`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Forgot Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            <p className='text-sm text-gray-600 text-center mb-4'>
                Enter your email address and we'll send you a verification code to reset your password.
            </p>

            <form onSubmit={onSubmitHandler} className='w-full'>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    required
                    disabled={isLoading}
                />

                <button
                    type='submit'
                    disabled={isLoading}
                    className={`${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-700'
                    } text-white font-light px-8 py-2 mt-4 w-full transition-colors`}
                >
                    {isLoading ? 'Sending...' : 'Send Reset Code'}
                </button>
            </form>

            <button
                onClick={() => navigate('/login')}
                className='text-sm text-gray-600 hover:text-black cursor-pointer mt-4'
            >
                Back to Login
            </button>
        </div>
    );
};

export default ForgotPassword;
