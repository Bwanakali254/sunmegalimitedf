import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const HeroQuoteWidget = () => {
    const { backendUrl } = useContext(ShopContext);

    const [serviceType, setServiceType] = useState('Residential');
    const [location, setLocation] = useState('');
    const [systemSize, setSystemSize] = useState('');
    const [date, setDate] = useState('');
    const [contact, setContact] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Guard: Prevent double submission
        if (isLoading) {
            return;
        }
        
        try {
            setIsLoading(true);

            // Map tab serviceType to backend-compatible values
            const serviceTypeMap = {
                'Residential': 'Solar Panel Installation',
                'Commercial': 'System Design & Consultation',
                'Industrial': 'Battery & Energy Storage Solutions',
                'Consultation': 'System Design & Consultation'
            };
            const mappedServiceType = serviceTypeMap[serviceType] || serviceType;

            // Parse contact field (now email field) to extract email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(contact.trim());
            
            let email, phone, name;
            if (isEmail) {
                email = contact.trim();
                phone = '+254000000000'; // Default phone for validation
                name = contact.split('@')[0] || 'Quote Requester';
            } else {
                // Invalid email format - use defaults but still try to send
                email = contact.trim() || 'quote@sunmega.co.ke';
                phone = '+254000000000';
                name = 'Quote Requester';
            }

            // Build message from optional fields
            let message = '';
            if (systemSize) message += `System Size: ${systemSize}\n`;
            if (date) message += `Preferred Date: ${date}\n`;
            if (message) message = message.trim();

            const response = await axios.post(backendUrl + '/api/quote', {
                name: name || 'Quote Requester',
                email,
                phone,
                serviceType: mappedServiceType,
                location,
                message
            });
            if (response.data.success) {
                toast.success(response.data.message || 'Quote request submitted successfully!');
                setLocation('');
                setSystemSize('');
                setDate('');
                setContact('');
            } else {
                toast.error(response.data.message || 'Failed to submit quote request');
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to submit quote request');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-green-600 shadow-xl w-full max-w-7xl mt-6 p-4 sm:p-6 lg:p-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 border-b pb-3 mb-4 sm:mb-6 text-sm font-medium overflow-x-auto">
                    {["Residential","Commercial","Industrial","Consultation"].map(tab => (
                        <button
                            key={tab}
                            type="button"
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-nowrap ${
                                serviceType === tab
                                    ? "bg-green-100 text-green-600"
                                    : "text-gray-600 hover:text-green-600"
                            }`}
                            onClick={() => setServiceType(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {/* Location - takes full width on mobile, adjusts on larger screens */}
                        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">📍</span>
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* System Size */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">System Size</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">📊</span>
                                <input
                                    type="text"
                                    placeholder="5 kW"
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                                    value={systemSize}
                                    onChange={e => setSystemSize(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Installation Date */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Installation Date</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">📅</span>
                                <input
                                    type="date"
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="lg:col-span-1 xl:col-span-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">📧</span>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-green-500 hover:bg-amber-500 cursor-pointer text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto text-sm whitespace-nowrap"
                        >
                            🔍 {isLoading ? "Submitting..." : "Get Quote"}
                        </button>
                    </div>
                </div>

                {/* Footer hint */}
                <div className="text-xs text-gray-500 mt-4 sm:mt-6 flex items-center gap-2">
                    <span>Last searching</span>
                    <span className="text-lg">›</span>
                </div>
            </div>
        </div>
    );
};

export default HeroQuoteWidget;