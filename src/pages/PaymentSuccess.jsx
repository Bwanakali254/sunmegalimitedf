import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    toast.success('Payment successful!')
    // Redirect to orders page after 3 seconds
    setTimeout(() => {
      navigate('/orders')
    }, 3000)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold text-green-500'>Payment Successful!</h1>
      <p className='mt-4'>Order ID: {orderId}</p>
      <p className='mt-2'>Redirecting to orders page...</p>
    </div>
  )
}

export default PaymentSuccess