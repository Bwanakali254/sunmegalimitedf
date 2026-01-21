import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const GoogleSignIn = () => {
    const { backendUrl, setToken, navigate } = useContext(ShopContext);

    const handleSuccess = async (credentialResponse) => {
        try {
            // Send the ID token to backend
            const response = await axios.post(
                backendUrl + '/api/user/google',
                { idToken: credentialResponse.credential },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                // Store token same way as email/password login
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Google authentication failed');
            }
        } catch (error) {
            console.error('Google auth error:', error);
            toast.error(error.response?.data?.message || error.message || 'Google authentication failed');
        }
    };

    const handleError = () => {
        toast.error('Google sign-in failed. Please try again.');
    };

    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap={false}
            />
        </div>
    );
};

export default GoogleSignIn;
