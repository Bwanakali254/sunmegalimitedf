import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { backendUrl, token, user, setUser, fetchUserProfile } = useContext(ShopContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ country: '', city: '', street: '' });
    const [currency, setCurrency] = useState('KES');
    const [notificationPreferences, setNotificationPreferences] = useState({
        orderUpdates: true,
        marketingEmails: false
    });

    const [isLoadingBasic, setIsLoadingBasic] = useState(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
    const [isSendingVerification, setIsSendingVerification] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState(null);

    // Load user data when component mounts or user changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress({
                country: user.address?.country || '',
                city: user.address?.city || '',
                street: user.address?.street || ''
            });
            setCurrency(user.currency || 'KES');
            setNotificationPreferences({
                orderUpdates: user.notificationPreferences?.orderUpdates !== undefined ? user.notificationPreferences.orderUpdates : true,
                marketingEmails: user.notificationPreferences?.marketingEmails !== undefined ? user.notificationPreferences.marketingEmails : false
            });
            setProfileError(null);
            setIsProfileLoading(false);
        } else if (token && !user) {
            setIsProfileLoading(true);
            setProfileError(null);
            fetchUserProfile(token)
                .then(() => {
                    setIsProfileLoading(false);
                })
                .catch((error) => {
                    setIsProfileLoading(false);
                    setProfileError('Session expired or account not found');
                });
        }
    }, [user, token, fetchUserProfile]);

    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleBasicInfoSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        try {
            setIsLoadingBasic(true);
            const response = await axios.put(
                backendUrl + '/api/user/profile',
                { name, phone },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Basic information updated successfully!');
                if (setUser) {
                    setUser(response.data.user);
                } else {
                    fetchUserProfile(token);
                }
            } else {
                toast.error(response.data.message || 'Failed to update');
            }
            setIsLoadingBasic(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update');
            setIsLoadingBasic(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        try {
            setIsLoadingAddress(true);
            const response = await axios.put(
                backendUrl + '/api/user/profile',
                { address },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Address updated successfully!');
                if (setUser) {
                    setUser(response.data.user);
                } else {
                    fetchUserProfile(token);
                }
            } else {
                toast.error(response.data.message || 'Failed to update');
            }
            setIsLoadingAddress(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update');
            setIsLoadingAddress(false);
        }
    };

    const handlePreferencesSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        try {
            setIsLoadingPreferences(true);
            const response = await axios.put(
                backendUrl + '/api/user/profile',
                { currency, notificationPreferences },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Preferences updated successfully!');
                if (setUser) {
                    setUser(response.data.user);
                } else {
                    fetchUserProfile(token);
                }
            } else {
                toast.error(response.data.message || 'Failed to update');
            }
            setIsLoadingPreferences(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update');
            setIsLoadingPreferences(false);
        }
    };

    const handleResendVerification = async () => {
        if (!token || !user?.email) return;

        try {
            setIsSendingVerification(true);
            const response = await axios.post(
                backendUrl + '/api/user/send-otp',
                { email: user.email, purpose: 'verification' },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Verification code sent to your email!');
            } else {
                toast.error(response.data.message || 'Failed to send verification');
            }
            setIsSendingVerification(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to send verification');
            setIsSendingVerification(false);
        }
    };

    if (!token) {
        return null; // Will redirect via useEffect
    }

    // Loading state
    if (isProfileLoading) {
        return (
            <div className='border-t pt-16'>
                <div className='text-2xl mb-8'>
                    <Title text1={'My'} text2={'Profile'} />
                </div>
                <div className='flex flex-col items-center justify-center py-20'>
                    <p className='text-gray-500 text-lg'>Loading profile...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (profileError || (token && !user)) {
        return (
            <div className='border-t pt-16'>
                <div className='text-2xl mb-8'>
                    <Title text1={'My'} text2={'Profile'} />
                </div>
                <div className='flex flex-col items-center justify-center py-20'>
                    <div className='bg-white border border-gray-300 rounded-lg p-8 max-w-md w-full text-center'>
                        <div className='mb-4'>
                            <svg className='w-16 h-16 mx-auto text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                            </svg>
                        </div>
                        <h2 className='text-xl font-semibold text-gray-700 mb-2'>Session expired or account not found</h2>
                        <p className='text-gray-600 text-sm mb-6'>Please login again to access your profile</p>
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-green-500 hover:bg-amber-500 text-white px-8 py-3 rounded cursor-pointer'
                        >
                            Login Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-8'>
                <Title text1={'My'} text2={'Profile'} />
            </div>

            {/* Basic Information Section */}
            <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
                <h2 className='font-semibold text-xl text-gray-700 mb-4 border-b border-gray-200 pb-2'>
                    Basic Information
                </h2>
                <form onSubmit={handleBasicInfoSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full px-3 py-2 border border-green-500 rounded'
                            placeholder='Your name'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type='email'
                            value={user?.email || ''}
                            className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100'
                            readOnly
                            disabled
                        />
                        <p className='text-xs text-gray-500 mt-1'>
                            Email cannot be changed
                        </p>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                        <input
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className='w-full px-3 py-2 border border-green-500 rounded'
                            placeholder='+254 700 000 000'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isLoadingBasic}
                        className={`bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded ${isLoadingBasic ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoadingBasic ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>

            {/* Address Information Section */}
            <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
                <h2 className='font-semibold text-xl text-gray-700 mb-4 border-b border-gray-200 pb-2'>
                    Address Information
                </h2>
                <form onSubmit={handleAddressSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
                            <input
                                type='text'
                                value={address.country}
                                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                className='w-full px-3 py-2 border border-green-500 rounded'
                                placeholder='Kenya'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                            <input
                                type='text'
                                value={address.city}
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                className='w-full px-3 py-2 border border-green-500 rounded'
                                placeholder='Mombasa'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Street</label>
                        <input
                            type='text'
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            className='w-full px-3 py-2 border border-green-500 rounded'
                            placeholder='Street address'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isLoadingAddress}
                        className={`bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded ${isLoadingAddress ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoadingAddress ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>

            {/* Security Section */}
            <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
                <h2 className='font-semibold text-xl text-gray-700 mb-4 border-b border-gray-200 pb-2'>
                    Security
                </h2>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email Verification</label>
                        <div className='flex items-center gap-3'>
                            {user?.emailVerified ? (
                                <span className='text-green-600 font-semibold flex items-center gap-2'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                    </svg>
                                    Verified
                                </span>
                            ) : (
                                <span className='text-orange-600 font-semibold flex items-center gap-2'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                    </svg>
                                    Not Verified
                                </span>
                            )}
                        </div>
                        {!user?.emailVerified && (
                            <button
                                type='button'
                                onClick={handleResendVerification}
                                disabled={isSendingVerification}
                                className={`mt-2 text-sm text-orange-600 hover:text-orange-700 ${isSendingVerification ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {isSendingVerification ? 'Sending...' : 'Resend Verification Email'}
                            </button>
                        )}
                    </div>
                    {user?.authProvider === 'email' && (
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                            <p className='text-sm text-gray-500 mb-2'>Change your password (requires OTP verification)</p>
                            <button
                                type='button'
                                className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded text-sm'
                                disabled
                            >
                                Change Password (Coming Soon)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Preferences Section */}
            <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
                <h2 className='font-semibold text-xl text-gray-700 mb-4 border-b border-gray-200 pb-2'>
                    Preferences
                </h2>
                <form onSubmit={handlePreferencesSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className='w-full px-3 py-2 border border-green-500 rounded'
                        >
                            <option value='KES'>KES - Kenyan Shilling</option>
                            <option value='USD'>USD - US Dollar</option>
                            <option value='EUR'>EUR - Euro</option>
                        </select>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-3'>Email Notifications</label>
                        <div className='space-y-2'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={notificationPreferences.orderUpdates}
                                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, orderUpdates: e.target.checked })}
                                    className='w-4 h-4 text-green-500 border-gray-300 rounded'
                                />
                                <span className='text-sm text-gray-700'>Order updates</span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={notificationPreferences.marketingEmails}
                                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, marketingEmails: e.target.checked })}
                                    className='w-4 h-4 text-green-500 border-gray-300 rounded'
                                />
                                <span className='text-sm text-gray-700'>Marketing emails</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type='submit'
                        disabled={isLoadingPreferences}
                        className={`bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded ${isLoadingPreferences ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoadingPreferences ? 'Saving...' : 'Save Preferences'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
