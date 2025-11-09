'use client'

import { useState } from 'react'
import { TreePine, Coins, TrendingUp, Leaf } from 'lucide-react'

export default function CarbonSequestration() {
  const [carbonData, setCarbonData] = useState(() => {
    const acres = 250
    const tonsPerAcre = 0.5 // Conservative estimate for regenerative practices
    const carbonPricePerTon = 15 // Current market rate (varies)
    
    return {
      totalAcres: acres,
      tonsSequestered: acres * tonsPerAcre,
      tonsPerAcre: tonsPerAcre,
      carbonPricePerTon: carbonPricePerTon,
      potentialRevenue: acres * tonsPerAcre * carbonPricePerTon,
      thisYear: new Date().getFullYear(),
      projected5Year: acres * tonsPerAcre * 5,
      projectedRevenue5Year: acres * tonsPerAcre * 5 * carbonPricePerTon,
      practices: [
        { name: 'No-till farming', contribution: 0.2, tons: acres * 0.2 },
        { name: 'Cover crops', contribution: 0.15, tons: acres * 0.15 },
        { name: 'Crop rotation', contribution: 0.1, tons: acres * 0.1 },
        { name: 'Animal integration', contribution: 0.05, tons: acres * 0.05 },
      ],
    }
  })

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Carbon Sequestration</h2>
          <p className="text-sm text-gray-600 mt-1">Turn ecological health into revenue</p>
        </div>
        <TreePine className="h-6 w-6 text-primary-600" />
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="h-5 w-5" />
            <p className="text-sm opacity-90">This Year</p>
          </div>
          <p className="text-3xl font-bold">{carbonData.tonsSequestered.toFixed(1)}</p>
          <p className="text-sm opacity-75">Tons CO2e</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="h-5 w-5" />
            <p className="text-sm opacity-90">Potential Revenue</p>
          </div>
          <p className="text-3xl font-bold">${carbonData.potentialRevenue.toLocaleString()}</p>
          <p className="text-sm opacity-75">@ ${carbonData.carbonPricePerTon}/ton</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5" />
            <p className="text-sm opacity-90">5-Year Projection</p>
          </div>
          <p className="text-3xl font-bold">{carbonData.projected5Year.toFixed(0)}</p>
          <p className="text-sm opacity-75">Tons CO2e</p>
        </div>
      </div>

      {/* Practices Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Carbon Contribution by Practice</h3>
        <div className="space-y-3">
          {carbonData.practices.map((practice, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{practice.name}</span>
                <span className="text-lg font-bold text-primary-600">
                  {practice.tons.toFixed(1)} tons
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(practice.contribution / carbonData.tonsPerAcre) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Projection */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
        <p className="font-semibold text-blue-800 mb-2">💰 5-Year Revenue Potential</p>
        <p className="text-2xl font-bold text-blue-900 mb-1">
          ${carbonData.projectedRevenue5Year.toLocaleString()}
        </p>
        <p className="text-sm text-blue-700">
          Based on {carbonData.tonsPerAcre} tons/acre/year × {carbonData.totalAcres} acres × 5 years × ${carbonData.carbonPricePerTon}/ton
        </p>
      </div>

      {/* Key Insight */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <p className="font-semibold text-green-800 mb-2">🌱 New Revenue Stream</p>
        <p className="text-sm text-green-700">
          Carbon credits turn your regenerative practices into a new income source. As carbon markets 
          mature, prices are expected to rise. Your farm is building both ecological and financial value.
        </p>
      </div>
    </div>
  )
}

