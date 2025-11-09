'use client'

import { useState } from 'react'
import { Cloud, TrendingDown, TrendingUp, Globe, Thermometer, Wind, Sun, Shield, Droplets } from 'lucide-react'

export default function ClimateImpact() {
  const [climateData, setClimateData] = useState(() => ({
    carbonImpact: {
      sequestered: 245, // tons CO2e
      avoided: 180, // tons CO2e from reduced inputs
      total: 425, // tons CO2e
      equivalent: {
        cars: 92, // cars off the road
        trees: 5100, // trees planted
        flights: 850, // flights avoided
      },
    },
    climateResilience: {
      extremeWeatherEvents: 3,
      survived: 3,
      yieldLoss: 5, // %
      conventionalYieldLoss: 60, // %
    },
    futureProjection: {
      year5: 1200, // tons CO2e sequestered
      year10: 2800,
      year20: 6500,
    },
    microclimate: {
      temperature: -2.5, // degrees F cooler
      humidity: 8, // % higher
      windSpeed: -15, // % reduction
    },
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Climate Impact</h2>
          <p className="text-sm text-gray-600 mt-1">Your farm&apos;s contribution to climate solutions</p>
        </div>
        <Globe className="h-6 w-6 text-green-600" />
      </div>

      {/* Carbon Impact Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Total Climate Impact</p>
            <p className="text-4xl font-bold">{climateData.carbonImpact.total}</p>
            <p className="text-sm opacity-75 mt-1">tons CO₂e removed/avoided</p>
          </div>
          <Cloud className="h-16 w-16 opacity-20" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-xs opacity-75 mb-1">Sequestered</p>
            <p className="text-xl font-bold">{climateData.carbonImpact.sequestered} tons</p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">Avoided</p>
            <p className="text-xl font-bold">{climateData.carbonImpact.avoided} tons</p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">This Year</p>
            <p className="text-xl font-bold">2024</p>
          </div>
        </div>
      </div>

      {/* Real-World Equivalents */}
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Real-World Impact</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{climateData.carbonImpact.equivalent.cars}</p>
            <p className="text-xs text-gray-600 mt-1">cars off road</p>
          </div>
          <div className="bg-white rounded p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{(climateData.carbonImpact.equivalent.trees / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-600 mt-1">trees planted</p>
          </div>
          <div className="bg-white rounded p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{climateData.carbonImpact.equivalent.flights}</p>
            <p className="text-xs text-gray-600 mt-1">flights avoided</p>
          </div>
        </div>
      </div>

      {/* Climate Resilience */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Climate Resilience</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Extreme Weather Events</span>
              <span className="text-sm font-bold text-green-600">
                {climateData.climateResilience.survived}/{climateData.climateResilience.extremeWeatherEvents} survived
              </span>
            </div>
            <div className="bg-white rounded p-2">
              <p className="text-xs text-gray-600 mb-1">Your Yield Loss:</p>
              <p className="text-lg font-bold text-blue-600">{climateData.climateResilience.yieldLoss}%</p>
              <p className="text-xs text-gray-500 mt-1">
                vs {climateData.climateResilience.conventionalYieldLoss}% for conventional farms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Microclimate Impact */}
      <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Microclimate Benefits</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-red-600" />
              <span className="text-sm text-gray-700">Temperature</span>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {climateData.microclimate.temperature > 0 ? '+' : ''}{climateData.microclimate.temperature}°F
            </span>
            <span className="text-xs text-gray-500">cooler than surrounding</span>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-cyan-600" />
              <span className="text-sm text-gray-700">Humidity</span>
            </div>
            <span className="text-sm font-bold text-cyan-600">+{climateData.microclimate.humidity}%</span>
            <span className="text-xs text-gray-500">higher</span>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Wind Speed</span>
            </div>
            <span className="text-sm font-bold text-gray-600">{climateData.microclimate.windSpeed}%</span>
            <span className="text-xs text-gray-500">reduction</span>
          </div>
        </div>
        <p className="text-xs text-purple-700 mt-2">
          🌍 Your farm is actively cooling the local environment and creating a more stable microclimate.
        </p>
      </div>

      {/* Future Projection */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
          Long-Term Climate Impact
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-white rounded p-2">
            <span className="text-sm text-gray-700">5 Years</span>
            <span className="text-lg font-bold text-emerald-600">{climateData.futureProjection.year5} tons CO₂e</span>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <span className="text-sm text-gray-700">10 Years</span>
            <span className="text-lg font-bold text-emerald-600">{climateData.futureProjection.year10} tons CO₂e</span>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <span className="text-sm text-gray-700">20 Years</span>
            <span className="text-lg font-bold text-emerald-600">{climateData.futureProjection.year20} tons CO₂e</span>
          </div>
        </div>
        <p className="text-xs text-emerald-700 mt-2">
          📈 Projected cumulative carbon sequestration if current practices continue.
        </p>
      </div>
    </div>
  )
}

