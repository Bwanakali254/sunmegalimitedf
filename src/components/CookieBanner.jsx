import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] xl:px-[10vw] py-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-700 text-center sm:text-left'>
            We use cookies to improve your experience. You can accept or reject cookies. See our{' '}
            <Link to='/privacy-policy' className='text-green-600 hover:text-green-700 underline'>
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <div className='flex gap-3 flex-shrink-0'>
            <button
              onClick={handleReject}
              className='px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition text-sm font-medium'
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium'
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
