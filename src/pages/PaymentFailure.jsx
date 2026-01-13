import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const PaymentFailure = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    toast.error('Payment failed. Please try again.')
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold text-red-500'>Payment Failed</h1>
      <p className='mt-4'>Order ID: {orderId}</p>
      <button 
        onClick={() => navigate('/place-order')}
        className='mt-4 bg-green-500 text-white px-8 py-3 rounded'
      >
        Try Again
      </button>
    </div>
  )
}

export default PaymentFailure