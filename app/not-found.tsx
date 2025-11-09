'use client'

import { useRouter } from 'next/navigation'
import { Home, LogIn } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = () => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('farmer_user')
    if (storedUser) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">404 - Page Not Found</h2>
          <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Go to Login</span>
          </button>
        </div>
      </div>
    </div>
  )
}

