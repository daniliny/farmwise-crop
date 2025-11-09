'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'
import Navigation from '@/components/Navigation'
import VoiceAlerts from '@/components/VoiceAlerts'

export default function Home() {
  const router = useRouter()
  const [alerts, setAlerts] = useState<string[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      if (typeof window === 'undefined') return
      
      const storedUser = localStorage.getItem('farmer_user')
      const storedToken = localStorage.getItem('farmer_token')

      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser))
          setLoading(false)
        } catch (error) {
          // Invalid user data, redirect to login
          localStorage.removeItem('farmer_user')
          localStorage.removeItem('farmer_token')
          router.push('/login')
          setLoading(false)
        }
      } else {
        // Redirect to login if not authenticated
        setLoading(false)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlerts = [
        'Optimal planting window opens in 3 days',
        'Soil moisture levels are ideal for corn',
        'Weather forecast: Light rain expected tomorrow',
      ]
      const randomAlert = newAlerts[Math.floor(Math.random() * newAlerts.length)]
      setAlerts(prev => [randomAlert, ...prev.slice(0, 4)])
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your farm dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation user={user} />
      <VoiceAlerts 
        alerts={alerts} 
        enabled={voiceEnabled}
        onToggle={() => setVoiceEnabled(!voiceEnabled)}
      />
      <main className="container mx-auto px-4 py-8">
        <Dashboard alerts={alerts} user={user} />
      </main>
    </div>
  )
}

