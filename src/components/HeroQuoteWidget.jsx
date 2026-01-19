import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Floating Widget Button
const FloatingButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Get a free quote"
    >
        <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         
        </div>
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Get a Quote
        </span>
    </button>
);

// Chat Header
const ChatHeader = ({ onClose }) => (
    <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                💡
            </div>
            <div>
                <h3 className="font-semibold">Sun Mega Limited</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
            </div>
        </div>
        <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chat"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);

// Welcome Message
const WelcomeMessage = () => (
    <div className="mb-4">
        <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
            <p className="text-sm text-gray-700">
                👋 Hi! Get a <strong>quote</strong> for solar installation in just 30 seconds!
            </p>
            <p className="text-xs text-gray-500 mt-1">
                We'll guide you through a few quick questions.
            </p>
        </div>
    </div>
);

// Step Indicator
const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex justify-between items-center mb-4 px-2">
        {steps.map((s, index) => (
            <div key={s.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    index === currentStep ? 'bg-green-500 text-white' :
                    index < currentStep ? 'bg-green-100 text-green-500' :
                    'bg-gray-200 text-gray-400'
                }`}>
                    {index + 1}
                </div>
                <span className="text-xs mt-1 text-gray-600">{s.title}</span>
            </div>
        ))}
    </div>
);

const HeroQuoteWidget = () => {
    const { backendUrl } = useContext(ShopContext);

    const [serviceType, setServiceType] = useState('Residential');
    const [location, setLocation] = useState('');
    const [systemSize, setSystemSize] = useState('');
    const [date, setDate] = useState('');
    const [contact, setContact] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); // For multi-step form

    const steps = [
        { id: 'service', title: 'Service Type' },
        { id: 'details', title: 'Project Details' },
        { id: 'contact', title: 'Contact Info' }
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (isLoading) {
            return;
        }
        
        // Validate all required fields
        if (!location.trim() || !systemSize.trim() || !date.trim() || !contact.trim()) {
            toast.error('Please fill all required fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        try {
            setIsLoading(true);

            const serviceTypeMap = {
                'Residential': 'Solar Panel Installation',
                'Commercial': 'System Design & Consultation',
                'Industrial': 'Battery & Energy Storage Solutions',
                'Consultation': 'System Design & Consultation'
            };
            const mappedServiceType = serviceTypeMap[serviceType] || serviceType;

            const email = contact.trim();
            const phone = '+254000000000';
            const name = contact.split('@')[0] || 'Quote Requester';

            const message = `System Size: ${systemSize}\nPreferred Date: ${date}`;

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
                // Reset form
                setLocation('');
                setSystemSize('');
                setDate('');
                setContact('');
                setStep(0);
                setIsOpen(false);
                setTimeout(() => setIsOpen(true), 3000); // Reopen after 3 seconds with welcome message
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

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <>
            {/* Add the animation styles - WITHOUT the jsx attribute */}
            <style>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
            
            {/* Floating Button */}
            <FloatingButton onClick={() => setIsOpen(true)} />

            {/* Chat Window */}
            {isOpen && (
                <div 
                    className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-gray-200 animate-slide-up"
                >
                    <ChatHeader onClose={() => setIsOpen(false)} />
                    
                    <div className="p-4 max-h-[500px] overflow-y-auto">
                        <WelcomeMessage />
                        
                        <form onSubmit={handleSubmit}>
                            <StepIndicator steps={steps} currentStep={step} />

                            {/* Step 1: Service Type */}
                            {step === 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">What type of service do you need?</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Residential", "Commercial", "Industrial", "Consultation"].map(tab => (
                                            <button
                                                key={tab}
                                                type="button"
                                                className={`p-3 rounded-lg border transition-all ${
                                                    serviceType === tab
                                                        ? "bg-green-50 border-green-500 text-green-600"
                                                        : "border-gray-200 hover:border-green-300"
                                                }`}
                                                onClick={() => {
                                                    setServiceType(tab);
                                                    nextStep();
                                                }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-lg mb-1">
                                                        {tab === 'Residential' && '🏠'}
                                                        {tab === 'Commercial' && '🏢'}
                                                        {tab === 'Industrial' && '🏭'}
                                                        {tab === 'Consultation' && '💬'}
                                                    </div>
                                                    <span className="text-sm font-medium">{tab}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Project Details */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">Tell us about your project</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                📍 Location
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Nairobi, Karen"
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                value={location}
                                                onChange={e => setLocation(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    ⚡ System Size
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="5 kW"
                                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                                    value={systemSize}
                                                    onChange={e => setSystemSize(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    📅 Installation Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                                    value={date}
                                                    onChange={e => setDate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Contact Info */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">How can we reach you?</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                📧 Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="your.email@example.com"
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                value={contact}
                                                onChange={e => setContact(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-xs text-blue-700">
                                                💡 We'll send your quote to this email within 24 hours.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-6 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Submit Quote Request'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroQuoteWidget;