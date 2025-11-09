'use client'

import { useState } from 'react'
import { Apple, TestTube, TrendingUp, Award } from 'lucide-react'

export default function NutrientDensity() {
  const [nutrientData, setNutrientData] = useState(() => ({
    brix: {
      corn: 18.5,
      soybeans: 12.3,
      wheat: 14.2,
      average: 15.0,
      status: 'excellent',
    },
    nutrientDensity: {
      corn: {
        protein: 12.5,
        zinc: 28,
        iron: 4.2,
        magnesium: 145,
        score: 92,
      },
      soybeans: {
        protein: 38.2,
        zinc: 45,
        iron: 8.5,
        magnesium: 220,
        score: 95,
      },
      wheat: {
        protein: 14.8,
        zinc: 32,
        iron: 5.1,
        magnesium: 160,
        score: 88,
      },
    },
    marketPremium: {
      potential: 15,
      reason: 'Nutrient-dense crops command premium prices',
    },
  }))

  const getBrixStatus = (brix: number) => {
    if (brix >= 16) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-50' }
    if (brix >= 12) return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (brix >= 8) return { status: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'poor', color: 'text-red-600', bg: 'bg-red-50' }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Crop Quality & Nutrition</h2>
          <p className="text-sm text-gray-600 mt-1">Beyond yield - measuring real nutrition</p>
        </div>
        <Apple className="h-6 w-6 text-primary-600" />
      </div>

      {/* Brix Levels */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-l-4 border-amber-500">
        <div className="flex items-center space-x-2 mb-3">
          <TestTube className="h-5 w-5 text-amber-600" />
          <h3 className="font-bold text-gray-800">Plant Sap Analysis (Brix)</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Higher Brix = Better photosynthesis, natural pest resistance, and superior nutrition
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {Object.entries(nutrientData.brix).filter(([key]) => key !== 'average' && key !== 'status').map(([crop, brix]: [string, any]) => {
            const status = getBrixStatus(brix)
            return (
              <div key={crop} className={`${status.bg} rounded-lg p-3 border-2 ${status.color.replace('text-', 'border-')}`}>
                <p className="text-xs text-gray-600 mb-1 capitalize">{crop}</p>
                <p className={`text-2xl font-bold ${status.color}`}>{brix}°Bx</p>
                <p className="text-xs text-gray-500 mt-1">{status.status}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-3 p-3 bg-white rounded border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Average Brix:</span>
            <span className="text-xl font-bold text-green-600">{nutrientData.brix.average}°Bx</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {nutrientData.brix.average >= 16 
              ? 'Excellent - High sugar content means natural pest resistance. Skip preventative sprays!'
              : nutrientData.brix.average >= 12
              ? 'Good - Healthy plants with good nutrient uptake'
              : 'Monitor - Consider improving soil biology'}
          </p>
        </div>
      </div>

      {/* Nutrient Density Scores */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
          <Award className="h-5 w-5 text-primary-600 mr-2" />
          Nutrient Density (per Bushel)
        </h3>
        <div className="space-y-4">
          {Object.entries(nutrientData.nutrientDensity).map(([crop, nutrients]: [string, any]) => (
            <div key={crop} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-800 capitalize">{crop}</h4>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{nutrients.score}/100</p>
                  <p className="text-xs text-gray-500">Quality Score</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Protein</p>
                  <p className="font-semibold text-gray-800">{nutrients.protein}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Zinc</p>
                  <p className="font-semibold text-gray-800">{nutrients.zinc} ppm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Iron</p>
                  <p className="font-semibold text-gray-800">{nutrients.iron} ppm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Magnesium</p>
                  <p className="font-semibold text-gray-800">{nutrients.magnesium} ppm</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${nutrients.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Premium */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <p className="font-semibold text-green-800">Premium Market Potential</p>
        </div>
        <p className="text-sm text-green-700 mb-2">
          Your crops have <span className="font-bold">{nutrientData.marketPremium.potential}% higher</span> nutrient density 
          than conventional averages. This qualifies for premium pricing.
        </p>
        <p className="text-xs text-green-600">
          {nutrientData.marketPremium.reason} - Verifiable through lab tests.
        </p>
      </div>
    </div>
  )
}

