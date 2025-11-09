'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CommunityFeed from '@/components/CommunityFeed'

export default function CommunityPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (optional - adjust based on your auth)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('farmer_user')
      if (!storedUser) {
        // Optional: redirect to login if not authenticated
        // router.push('/login')
      }
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Farm Community
          </h1>
          <p className="text-gray-600">
            Share updates, ask questions, and get AI-powered summaries and advice
          </p>
        </div>

        <CommunityFeed />
      </div>
    </div>
  )
}

