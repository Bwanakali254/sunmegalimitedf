import { GoogleLogin } from '@react-oauth/google';
import { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const GoogleSignIn = () => {
    const { backendUrl, setToken, navigate } = useContext(ShopContext);
    const wrapperRef = useRef(null);

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

    useEffect(() => {
        const applyFullWidth = () => {
            if (wrapperRef.current) {
                // Find all buttons and divs within the wrapper
                const buttons = wrapperRef.current.querySelectorAll('button');
                const divs = wrapperRef.current.querySelectorAll('div');
                
                // Apply full width to all buttons
                buttons.forEach(button => {
                    button.style.width = '100%';
                    button.style.maxWidth = '100%';
                });
                
                // Apply full width to container divs
                divs.forEach(div => {
                    if (div.querySelector('button')) {
                        div.style.width = '100%';
                        div.style.display = 'flex';
                        div.style.justifyContent = 'center';
                    }
                });
            }
        };

        // Apply immediately
        applyFullWidth();

        // Use MutationObserver to watch for DOM changes
        const observer = new MutationObserver(() => {
            applyFullWidth();
        });

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }

        // Also use interval as backup (check every 100ms for first 3 seconds)
        const interval = setInterval(() => {
            applyFullWidth();
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
        }, 3000);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="w-full">
            <style>
                {`
                    .google-signin-wrapper {
                        width: 100% !important;
                    }
                    .google-signin-wrapper > div {
                        width: 100% !important;
                        display: flex !important;
                        justify-content: center !important;
                    }
                    .google-signin-wrapper > div > div {
                        width: 100% !important;
                    }
                    .google-signin-wrapper button,
                    .google-signin-wrapper > div > div > button,
                    .google-signin-wrapper iframe + div button {
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                `}
            </style>
            <div ref={wrapperRef} className="google-signin-wrapper w-full">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    useOneTap={false}
                />
            </div>
        </div>
    );
};

export default GoogleSignIn;
