'use client'

import { useState } from 'react'
import { Droplets, TrendingDown, Waves, CloudRain, Shield } from 'lucide-react'

export default function WaterConservation() {
  const [waterData, setWaterData] = useState(() => ({
    totalSaved: 125000, // gallons
    infiltrationRate: 7.5, // inches/hour
    conventionalRate: 0.5, // inches/hour
    waterBanking: {
      capacity: 100000, // gallons
      current: 75000,
      status: 'good',
    },
    conservation: {
      irrigationReduced: 64, // %
      rainwaterCaptured: 85000, // gallons
      soilMoisture: 78, // %
      droughtResilience: 42, // days
    },
    practices: [
      { name: 'Cover Crops', impact: 'Reduces evaporation by 40%', icon: '🌾' },
      { name: 'No-Till', impact: 'Increases infiltration 15x', icon: '🚜' },
      { name: 'Mulching', impact: 'Retains 30% more moisture', icon: '🍂' },
      { name: 'Contour Farming', impact: 'Prevents runoff', icon: '⛰️' },
    ],
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Water Conservation</h2>
          <p className="text-sm text-gray-600 mt-1">Drought resilience through regenerative practices</p>
        </div>
        <Droplets className="h-6 w-6 text-cyan-600" />
      </div>

      {/* Water Savings Hero */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Total Water Saved This Year</p>
            <p className="text-4xl font-bold">{(waterData.totalSaved / 1000).toFixed(0)}K</p>
            <p className="text-sm opacity-75 mt-1">gallons</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Reduction</p>
            <p className="text-3xl font-bold">{waterData.conservation.irrigationReduced}%</p>
            <p className="text-xs opacity-75 mt-1">vs conventional</p>
          </div>
        </div>
      </div>

      {/* Water Infiltration Rate */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Waves className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Water Infiltration Rate</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Your Farm</p>
            <p className="text-2xl font-bold text-blue-600">{waterData.infiltrationRate}</p>
            <p className="text-xs text-gray-500">inches/hour</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Conventional Average</p>
            <p className="text-2xl font-bold text-gray-400">{waterData.conventionalRate}</p>
            <p className="text-xs text-gray-500">inches/hour</p>
          </div>
        </div>
        <div className="mt-3 bg-white rounded p-2">
          <p className="text-xs text-blue-700">
            💧 Your soil can absorb <span className="font-bold">{waterData.infiltrationRate / waterData.conventionalRate}x more</span> water per hour. 
            This means you can capture heavy rainfall that would otherwise run off.
          </p>
        </div>
      </div>

      {/* Water Banking */}
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Water Banking Capacity</h3>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Stored Water</span>
            <span className="text-sm font-bold text-green-600">
              {(waterData.waterBanking.current / 1000).toFixed(0)}K / {(waterData.waterBanking.capacity / 1000).toFixed(0)}K gallons
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full"
              style={{ width: `${(waterData.waterBanking.current / waterData.waterBanking.capacity) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-green-700">
          Your farm can store {waterData.waterBanking.capacity / 1000}K gallons of water in the soil, 
          providing {waterData.conservation.droughtResilience} days of drought resilience.
        </p>
      </div>

      {/* Conservation Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
          <div className="flex items-center space-x-2 mb-2">
            <CloudRain className="h-4 w-4 text-cyan-600" />
            <span className="text-xs text-gray-600">Rainwater Captured</span>
          </div>
          <p className="text-xl font-bold text-cyan-600">{(waterData.conservation.rainwaterCaptured / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500">gallons this season</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-gray-600">Soil Moisture</span>
          </div>
          <p className="text-xl font-bold text-blue-600">{waterData.conservation.soilMoisture}%</p>
          <p className="text-xs text-gray-500">optimal level</p>
        </div>
      </div>

      {/* Conservation Practices */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Active Conservation Practices</h3>
        <div className="grid grid-cols-2 gap-3">
          {waterData.practices.map((practice, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{practice.icon}</span>
                <span className="font-semibold text-sm text-gray-800">{practice.name}</span>
              </div>
              <p className="text-xs text-gray-600">{practice.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

