import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import OTPInput from '../components/OTPInput';

const VerifyOTP = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { backendUrl, setToken } = useContext(ShopContext);

    const email = searchParams.get('email') || '';
    const purpose = searchParams.get('purpose') || 'signup';

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        if (!email) {
            toast.error('Invalid verification link');
            navigate('/login');
            return;
        }

        // Start countdown timer
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [email, navigate]);

    useEffect(() => {
        // Resend cooldown timer
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleVerifyClick = async () => {
        if (!email) {
            toast.error('Email is required. Please return to login.');
            return;
        }
        
        if (otp.length !== 6) {
            toast.error('Please enter the complete 6-digit code');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(backendUrl + '/api/user/verify-otp', {
                email,
                otpCode: otp,
                purpose
            });

            if (response.data.success) {
                if (purpose === 'signup' && response.data.token) {
                    // Store token and redirect
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success('Email verified successfully! Welcome to Sun Mega!');
                    navigate('/');
                } else if (purpose === 'password_change') {
                    // Redirect to reset password page with email and OTP
                    toast.success('Code verified! Please enter your new password.');
                    navigate(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
                } else if (purpose === 'account_delete') {
                    // Log user out and redirect to home
                    toast.success('Account deleted successfully');
                    setToken('');
                    localStorage.removeItem('token');
                    navigate('/');
                } else if (purpose === 'email_change') {
                    // Redirect back to profile
                    toast.success(response.data.message || 'Email updated successfully');
                    navigate('/profile');
                } else {
                    toast.success(response.data.message || 'Verified successfully!');
                    navigate('/profile');
                }
            } else {
                toast.error(response.data.message || 'Verification failed');
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Verification failed');
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendCooldown > 0) return;

        try {
            setIsResending(true);
            const response = await axios.post(backendUrl + '/api/user/send-otp', {
                email,
                purpose
            });

            if (response.data.success) {
                toast.success('Verification code sent to your email!');
                setResendCooldown(60); // 60 second cooldown
                setTimeRemaining(600); // Reset timer
                setOtp(''); // Clear current OTP
            } else {
                toast.error(response.data.message || 'Failed to send code');
            }
            setIsResending(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to send code');
            setIsResending(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const purposeText = {
        'signup': 'complete your registration',
        'password_change': 'change your password',
        'email_change': 'change your email',
        'verification': 'verify your email'
    }[purpose] || 'verify your account';

    return (
        <div className='flex flex-col items-center w-[90%] sm:max-w-90 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl'>Verify Email</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
            </div>

            <div className='text-center mb-4'>
                <p className='text-gray-600 mb-1'>We've sent a 6-digit code to</p>
                <p className='font-semibold text-gray-800'>{email}</p>
                <p className='text-sm text-gray-500 mt-2'>Use this code to {purposeText}</p>
            </div>

            <div className='w-full'>
                <OTPInput
                    length={6}
                    onChange={setOtp}
                    error={false}
                />
            </div>

            {timeRemaining > 0 ? (
                <p className='text-sm text-gray-500'>
                    Code expires in: <span className='font-semibold'>{formatTime(timeRemaining)}</span>
                </p>
            ) : (
                <p className='text-sm text-orange-600 font-semibold'>
                    Code expired. Please request a new one.
                </p>
            )}

            <div className='w-full text-center'>
                <p className='text-sm text-gray-500 mb-2'>Didn't receive code?</p>
                <button
                    type='button'
                    onClick={handleResendOTP}
                    disabled={isResending || resendCooldown > 0}
                    className={`text-sm ${resendCooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700 cursor-pointer'}`}
                >
                    {isResending
                        ? 'Sending...'
                        : resendCooldown > 0
                        ? `Resend in ${resendCooldown} seconds`
                        : 'Resend OTP'}
                </button>
            </div>

            <button
                type='button'
                onClick={handleVerifyClick}
                disabled={isLoading || otp.length !== 6 || timeRemaining === 0}
                className={`px-8 py-2 w-full bg-green-500 text-white hover:bg-amber-500 ${isLoading || otp.length !== 6 || timeRemaining === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isLoading ? 'Verifying...' : 'Verify'}
            </button>

            <button
                type='button'
                onClick={() => navigate('/login')}
                className='text-sm text-gray-500 hover:text-gray-700 cursor-pointer'
            >
                Back to Login
            </button>
        </div>
    );
};

export default VerifyOTP;
