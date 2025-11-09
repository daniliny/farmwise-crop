'use client'

import { useState, useEffect } from 'react'
import { Leaf, Droplets, Activity, AlertCircle } from 'lucide-react'

export default function SoilHealth() {
  const [soilData, setSoilData] = useState<any>(() => {
    // Initialize with mock data immediately
    return {
      overallScore: 82,
      metrics: [
        { name: 'Organic Matter', value: 4.2, optimal: 4.0, status: 'good', unit: '%' },
        { name: 'pH Level', value: 6.8, optimal: 6.5, status: 'excellent', unit: '' },
        { name: 'Nitrogen', value: 28, optimal: 25, status: 'good', unit: 'ppm' },
        { name: 'Phosphorus', value: 18, optimal: 20, status: 'fair', unit: 'ppm' },
        { name: 'Potassium', value: 145, optimal: 150, status: 'good', unit: 'ppm' },
        { name: 'Moisture', value: 68, optimal: 65, status: 'excellent', unit: '%' },
      ],
      recommendations: [
        'Add compost to Field B to increase organic matter',
        'Phosphorus levels are slightly low - consider bone meal application',
        'Soil moisture is optimal - maintain current irrigation schedule',
      ],
    }
  })

  useEffect(() => {
    // Try to fetch real data in background
    fetch('/api/soil-health')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('API not available')
      })
      .then(data => setSoilData(data))
      .catch(() => {
        // Keep using mock data
        console.log('Using mock soil health data')
      })
  }, [])


  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: 'bg-green-100 text-green-800 border-green-300',
      good: 'bg-blue-100 text-blue-800 border-blue-300',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      poor: 'bg-red-100 text-red-800 border-red-300',
    }
    return colors[status] || colors.fair
  }

  const getStatusIcon = (value: number, optimal: number) => {
    const diff = Math.abs(value - optimal) / optimal
    if (diff < 0.05) return <Activity className="h-4 w-4 text-green-600" />
    if (value < optimal) return <AlertCircle className="h-4 w-4 text-yellow-600" />
    return <AlertCircle className="h-4 w-4 text-orange-600" />
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Soil Health Analysis</h2>
        <Leaf className="h-6 w-6 text-green-600" />
      </div>

      {/* Overall Score */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Overall Soil Health Score</p>
            <p className="text-4xl font-bold text-primary-600">{soilData.overallScore}/100</p>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 rounded-full border-8 border-primary-200 border-t-primary-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">{soilData.overallScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Key Metrics</h3>
        {soilData.metrics.map((metric: any, index: number) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(metric.value, metric.optimal)}
                <span className="font-medium text-gray-700">{metric.name}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(metric.status)}`}>
                {metric.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-gray-800">
                  {metric.value}{metric.unit}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  (Optimal: {metric.optimal}{metric.unit})
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metric.status === 'excellent' ? 'bg-green-500' :
                  metric.status === 'good' ? 'bg-blue-500' :
                  metric.status === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((metric.value / metric.optimal) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
        <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
          <Droplets className="h-4 w-4 mr-2" />
          Regenerative Recommendations
        </h3>
        <ul className="space-y-2">
          {soilData.recommendations.map((rec: string, index: number) => (
            <li key={index} className="text-sm text-amber-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

