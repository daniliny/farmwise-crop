'use client'

import { useState } from 'react'
import { Brain, BookOpen, CheckCircle, AlertCircle } from 'lucide-react'

interface Principle {
  id: number
  name: string
  description: string
  status: 'implemented' | 'partial' | 'needs-work'
  advice: string
  impact: string
}

export default function AIMentor() {
  // Gabe Brown's 6 Principles of Regenerative Agriculture
  const [principles, setPrinciples] = useState<Principle[]>(() => [
    {
      id: 1,
      name: 'Context',
      description: 'Farm in your environment',
      status: 'implemented',
      advice: 'Your farm is well-suited for no-till practices. Continue monitoring local weather patterns.',
      impact: 'High - Your practices align with regional climate',
    },
    {
      id: 2,
      name: 'Least Disturbance',
      description: 'No-till farming',
      status: 'implemented',
      advice: 'Excellent! You\'ve maintained no-till for 3 seasons. Soil structure is improving.',
      impact: 'High - Fungal networks are rebuilding',
    },
    {
      id: 3,
      name: 'Soil Armor',
      description: 'Keep the soil covered',
      status: 'partial',
      advice: 'Field C has bare soil. Plant a cover crop mix immediately to protect against erosion.',
      impact: 'Critical - Bare soil loses 2.5 tons/acre/year',
    },
    {
      id: 4,
      name: 'Diversity',
      description: 'No monocultures',
      status: 'needs-work',
      advice: 'Consider a 12-species cover crop mix. Diversity builds resilience and nutrient cycling.',
      impact: 'Medium - Current rotation is good, but could be more diverse',
    },
    {
      id: 5,
      name: 'Living Root',
      description: 'Keep plants growing as long as possible',
      status: 'partial',
      advice: 'Extend your cover crop season by 30 days. Living roots feed soil biology year-round.',
      impact: 'High - Extends soil food web activity',
    },
    {
      id: 6,
      name: 'Animal Integration',
      description: 'Use livestock to build soil',
      status: 'needs-work',
      advice: 'Consider rotational grazing. Animals add biology and nutrients, worth $50-100/acre.',
      impact: 'High - Can increase organic matter 1% in 2 years',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'needs-work':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'needs-work':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Regenerative Mentor</h2>
          <p className="text-sm text-gray-600 mt-1">Guided by Gabe Brown&apos;s 6 Principles</p>
        </div>
        <Brain className="h-6 w-6 text-primary-600" />
      </div>

      {/* Principles Overview */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-700">The 6 Principles of Regenerative Agriculture</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getStatusIcon(principle.status)}
                    <h4 className="font-bold text-gray-800">{principle.id}. {principle.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{principle.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(principle.status)}`}>
                  {principle.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                <p className="text-sm font-semibold text-blue-800 mb-1">AI Advice:</p>
                <p className="text-sm text-blue-700">{principle.advice}</p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Impact: <span className="font-semibold">{principle.impact}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-primary-500 p-4 rounded">
        <p className="font-semibold text-gray-800 mb-2">🎯 Regenerative Philosophy</p>
        <p className="text-sm text-gray-700">
          These principles work together as a system. When you implement all six, you create a 
          self-sustaining ecosystem that builds soil, increases profits, and creates resilience. 
          Gabe Brown transformed his degraded farm into a thriving ecosystem using these exact principles.
        </p>
      </div>
    </div>
  )
}

