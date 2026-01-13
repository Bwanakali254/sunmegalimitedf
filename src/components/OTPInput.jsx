import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onChange, onComplete, error = false }) => {
    const [values, setValues] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Only allow numeric input
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        // Call onChange with combined OTP
        const otpString = newValues.join('');
        if (onChange) {
            onChange(otpString);
        }

        // Auto-focus next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits entered
        if (otpString.length === length && onComplete) {
            onComplete(otpString);
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        
        if (/^\d+$/.test(pastedData)) {
            const newValues = Array(length).fill('');
            pastedData.split('').forEach((digit, index) => {
                if (index < length) {
                    newValues[index] = digit;
                }
            });
            setValues(newValues);
            
            const otpString = newValues.join('');
            if (onChange) {
                onChange(otpString);
            }
            if (otpString.length === length && onComplete) {
                onComplete(otpString);
            }
            
            // Focus last filled input or last input
            const lastIndex = Math.min(pastedData.length - 1, length - 1);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    return (
        <div className='flex justify-center gap-2 mb-4'>
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={values[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl border rounded focus:outline-none focus:border-green-700 ${
                        error ? 'border-red-500' : 'border-green-500'
                    }`}
                />
            ))}
        </div>
    );
};

export default OTPInput;
