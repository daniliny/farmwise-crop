'use client'

import { Sprout, Menu, X, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  user?: {
    name: string
    farmName: string
    email: string
  } | null
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('farmer_user')
    localStorage.removeItem('farmer_token')
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-800">FarmWise</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
              Dashboard
            </a>
            <a href="#farm-map" className="text-gray-700 hover:text-primary-600 font-medium">
              Farm Map
            </a>
            <a href="#predictions" className="text-gray-700 hover:text-primary-600 font-medium">
              Predictions
            </a>
            <a href="#soil-health" className="text-gray-700 hover:text-primary-600 font-medium">
              Soil Health
            </a>
            <a href="#advice" className="text-gray-700 hover:text-primary-600 font-medium">
              Planting Advice
            </a>
            <a href="/marketplace" className="text-gray-700 hover:text-primary-600 font-medium">
              Marketplace
            </a>
            <a href="/starter-kit" className="text-gray-700 hover:text-primary-600 font-medium">
              Starter Kit
            </a>
            <a href="/transactions" className="text-gray-700 hover:text-primary-600 font-medium">
              Transactions
            </a>
            
            {user && (
              <div className="flex items-center space-x-3 pl-6 border-l border-gray-300">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.farmName}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#dashboard" className="block text-gray-700 hover:text-primary-600 font-medium">
              Dashboard
            </a>
            <a href="#farm-map" className="block text-gray-700 hover:text-primary-600 font-medium">
              Farm Map
            </a>
            <a href="#predictions" className="block text-gray-700 hover:text-primary-600 font-medium">
              Predictions
            </a>
            <a href="#soil-health" className="block text-gray-700 hover:text-primary-600 font-medium">
              Soil Health
            </a>
            <a href="#advice" className="block text-gray-700 hover:text-primary-600 font-medium">
              Planting Advice
            </a>
            <a href="/marketplace" className="block text-gray-700 hover:text-primary-600 font-medium">
              Marketplace
            </a>
            <a href="/starter-kit" className="block text-gray-700 hover:text-primary-600 font-medium">
              Starter Kit
            </a>
            <a href="/transactions" className="block text-gray-700 hover:text-primary-600 font-medium">
              Transactions
            </a>
            {user && (
              <>
                <div className="pt-4 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.farmName}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

