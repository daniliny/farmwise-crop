'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export default function CropYieldPrediction() {
  const [predictions, setPredictions] = useState<any>(() => {
    // Initialize with mock data immediately
    return {
      crops: [
        { name: 'Corn', predicted: 185, lastYear: 165, trend: 'up', risk: 'low' },
        { name: 'Soybeans', predicted: 52, lastYear: 48, trend: 'up', risk: 'medium' },
        { name: 'Wheat', predicted: 68, lastYear: 72, trend: 'down', risk: 'low' },
      ],
      monthlyData: [
        { month: 'Jan', yield: 120 },
        { month: 'Feb', yield: 135 },
        { month: 'Mar', yield: 150 },
        { month: 'Apr', yield: 165 },
        { month: 'May', yield: 175 },
        { month: 'Jun', predicted: 185 },
      ],
    }
  })

  useEffect(() => {
    // Fetch enhanced predictions with USDA data and Chestnut Forty
    // USDA is enabled by default, Chestnut Forty is opt-in
    fetch('/api/yield-prediction?usda=true&chestnut=true')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('API not available')
      })
      .then(data => {
        // Handle both standard and Chestnut Forty response formats
        if (data.predictedYield) {
          // Chestnut Forty format
          setPredictions({
            crops: [
              {
                name: 'Corn',
                predicted: data.predictedYield,
                lastYear: data.baseYield || data.comparison?.conventional || 165,
                trend: data.factors?.trend > 1 ? 'up' : 'down',
                risk: data.riskLevel || 'low',
                confidence: data.confidence || 85,
                factors: data.factors,
                recommendations: data.recommendations,
                comparison: data.comparison,
              },
            ],
            source: data.source || 'USDA + Chestnut Forty',
            monthlyData: data.timeline?.map((t: any) => ({
              month: t.month,
              yield: t.yieldEstimate,
            })) || [],
          })
        } else {
          // Standard format
          setPredictions(data)
        }
      })
      .catch(() => {
        // Keep using mock data
        console.log('Using mock yield predictions')
      })
  }, [])


  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-5 w-5 text-green-600" />
    ) : (
      <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />
    )
  }

  const getRiskBadge = (risk: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[risk as keyof typeof colors]}`}>
        {risk.toUpperCase()} RISK
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Crop Yield Predictions</h2>
          {predictions.source && (
            <p className="text-xs text-gray-500 mt-1">
              Powered by {predictions.source}
            </p>
          )}
        </div>
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>

      {/* Crop Comparison */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Expected Yield (bushels/acre)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={predictions.crops}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="predicted" fill="#22c55e" name="Predicted 2024" />
            <Bar dataKey="lastYear" fill="#94a3b8" name="2023 Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Crop Details */}
      <div className="space-y-4">
        {predictions.crops.map((crop: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{crop.name}</h4>
              {getTrendIcon(crop.trend)}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary-600">{crop.predicted}</p>
                <p className="text-sm text-gray-500">vs {crop.lastYear} last year</p>
              </div>
              {getRiskBadge(crop.risk)}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {(predictions.recommendations || predictions.crops?.[0]?.recommendations) && (
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">Chestnut Forty Recommendations</p>
              <ul className="text-sm text-blue-700 mt-1 list-disc list-inside space-y-1">
                {(predictions.recommendations || predictions.crops?.[0]?.recommendations || []).map((rec: string, idx: number) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Comparison with Conventional */}
      {predictions.comparison && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded">
          <p className="font-semibold text-green-800 mb-2">Regenerative vs Conventional</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600">Conventional</p>
              <p className="text-2xl font-bold text-gray-700">{predictions.comparison.conventional}</p>
              <p className="text-xs text-gray-500">bushels/acre</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Your Regenerative Farm</p>
              <p className="text-2xl font-bold text-green-600">{predictions.comparison.regenerative}</p>
              <p className="text-xs text-green-600 font-semibold">+{predictions.comparison.improvement}% improvement</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendation (Fallback) */}
      {!predictions.recommendations && !predictions.comparison && (
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">AI Recommendation</p>
              <p className="text-sm text-blue-700 mt-1">
                Based on current conditions, your corn fields show excellent growth potential. 
                Consider applying additional nitrogen fertilizer in the next 2 weeks to maximize yield.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

