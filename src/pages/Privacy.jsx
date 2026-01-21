import React from 'react'
import Title from '../components/Title'

const Privacy = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'Privacy'} text2={'Policy'} />
      </div>

      <div className='my-10 flex flex-col gap-6 text-gray-600'>
        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>1. Information We Collect</h2>
          <p className='mb-3'>We collect information that you provide directly to us, including:</p>
          <ul className='list-disc list-inside ml-4 space-y-2'>
            <li>Personal information (name, email address, phone number, shipping address)</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Order history and preferences</li>
            <li>Communications with our customer service team</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>2. How We Use Your Information</h2>
          <p className='mb-3'>We use the information we collect to:</p>
          <ul className='list-disc list-inside ml-4 space-y-2'>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and our services</li>
            <li>Provide customer support</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>3. Information Sharing</h2>
          <p className='mb-3'>We do not sell your personal information. We may share your information with:</p>
          <ul className='list-disc list-inside ml-4 space-y-2'>
            <li>Service providers who assist in operating our business (payment processors, shipping partners)</li>
            <li>Professional advisors (lawyers, accountants)</li>
            <li>Law enforcement or regulatory authorities when required by law</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>5. Your Rights</h2>
          <p className='mb-3'>You have the right to:</p>
          <ul className='list-disc list-inside ml-4 space-y-2'>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>6. Cookies</h2>
          <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>8. Contact Us</h2>
          <p className='mb-2'>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className='list-none ml-4 space-y-1'>
            <li>Email: support@sunmega.co.ke</li>
            <li>Phone: +254 1190 27300</li>
            <li>Address: Nairobi, Kenya</li>
          </ul>
        </div>

        <div className='text-sm text-gray-500 mt-6'>
          <p>Last Updated: January 20, 2026</p>
        </div>
      </div>
    </div>
  )
}

export default Privacy
