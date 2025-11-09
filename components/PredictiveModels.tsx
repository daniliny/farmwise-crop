'use client'

import { useState } from 'react'
import { Brain, Bug, Droplets, Shield, TrendingUp } from 'lucide-react'

export default function PredictiveModels() {
  const [predictions, setPredictions] = useState(() => ({
    pestDisease: {
      cornRootworm: { risk: 'low', likelihood: 15, recommendation: 'No action needed - high Brix levels provide natural resistance' },
      soybeanAphid: { risk: 'medium', likelihood: 35, recommendation: 'Monitor closely - beneficial insects should control population' },
      wheatRust: { risk: 'low', likelihood: 10, recommendation: 'Low risk due to crop rotation and healthy soil' },
    },
    nitrogenRelease: {
      currentCoverCrop: '12-species mix',
      projectedRelease: [
        { days: 30, nitrogen: 45, status: 'optimal' },
        { days: 60, nitrogen: 85, status: 'optimal' },
        { days: 90, nitrogen: 120, status: 'optimal' },
      ],
      recommendation: 'Plant corn in 45 days to match peak nitrogen release',
    },
    droughtResilience: {
      score: 9,
      maxScore: 10,
      waterHoldingCapacity: '7.5 inches/hour',
      daysOfReserve: 42,
      comparison: 'Your neighbor (conventional): 0.5 inches/hour, 3 days reserve',
      recommendation: 'Excellent resilience - can survive 6-week drought without irrigation',
    },
  }))

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Predictive Intelligence</h2>
          <p className="text-sm text-gray-600 mt-1">AI-powered forecasts for proactive management</p>
        </div>
        <Brain className="h-6 w-6 text-primary-600" />
      </div>

      {/* Pest & Disease Forecast */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bug className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-gray-700">Pest & Disease Likelihood Forecast</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(predictions.pestDisease).map(([pest, data]: [string, any]) => (
            <div key={pest} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 capitalize">
                  {pest.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(data.risk)}`}>
                  {data.risk.toUpperCase()} RISK
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Likelihood</span>
                    <span className="text-sm font-semibold text-gray-800">{data.likelihood}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        data.risk === 'low' ? 'bg-green-500' :
                        data.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${data.likelihood}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{data.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nitrogen Release Forecast */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Droplets className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Nitrogen Release Forecast</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Current cover crop: <span className="font-semibold">{predictions.nitrogenRelease.currentCoverCrop}</span>
        </p>
        <div className="space-y-2 mb-3">
          {predictions.nitrogenRelease.projectedRelease.map((release: any, index: number) => (
            <div key={index} className="flex items-center justify-between bg-white rounded p-2">
              <span className="text-sm text-gray-600">{release.days} days</span>
              <span className="font-semibold text-blue-600">{release.nitrogen} lbs/acre N</span>
              <span className="text-xs text-green-600 font-medium">{release.status}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold text-blue-800">
          💡 {predictions.nitrogenRelease.recommendation}
        </p>
      </div>

      {/* Drought Resilience Score */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Micro-Climate Resilience Score</h3>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-3xl font-bold text-green-600">
              {predictions.droughtResilience.score}/{predictions.droughtResilience.maxScore}
            </p>
            <p className="text-sm text-gray-600">Drought Resilience</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">{predictions.droughtResilience.daysOfReserve}</p>
            <p className="text-xs text-gray-600">Days of water reserve</p>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700 mb-1">Water Infiltration Rate:</p>
          <p className="text-lg font-bold text-primary-600">{predictions.droughtResilience.waterHoldingCapacity}</p>
        </div>
        <div className="bg-white/60 rounded p-2 mb-2">
          <p className="text-xs text-gray-600 mb-1">Comparison:</p>
          <p className="text-xs text-gray-700">{predictions.droughtResilience.comparison}</p>
        </div>
        <p className="text-sm font-semibold text-green-800">
          ✅ {predictions.droughtResilience.recommendation}
        </p>
      </div>
    </div>
  )
}

