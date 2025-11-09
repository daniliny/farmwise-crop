'use client'

import { useState } from 'react'
import { Leaf, TrendingUp, Award, Target, Zap, Droplets, Wind, TreePine } from 'lucide-react'

export default function SustainabilityOverview() {
  const [sustainability, setSustainability] = useState(() => ({
    overallScore: 87,
    maxScore: 100,
    impact: {
      carbonSequestrated: 245, // tons CO2e
      waterSaved: 125000, // gallons
      soilErosionPrevented: 18, // tons
      biodiversityIncrease: 42, // %
      chemicalUseReduced: 78, // %
    },
    milestones: [
      { name: 'Carbon Neutral', achieved: true, date: '2024-02-15' },
      { name: 'Zero Synthetic Fertilizer', achieved: true, date: '2024-01-20' },
      { name: '50% Water Reduction', achieved: true, date: '2023-12-10' },
      { name: 'Biodiversity Restoration', achieved: false, progress: 85 },
    ],
    comparison: {
      yourFarm: {
        carbonFootprint: -245, // Negative = sequestering
        waterUsage: 125000,
        chemicalUse: 22,
      },
      conventionalAverage: {
        carbonFootprint: 180,
        waterUsage: 350000,
        chemicalUse: 100,
      },
    },
  }))

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-500'
    if (score >= 60) return 'bg-yellow-50 border-yellow-500'
    return 'bg-red-50 border-red-500'
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 p-3 rounded-full">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sustainability Impact</h2>
            <p className="text-sm text-gray-600">Your regenerative farming impact dashboard</p>
          </div>
        </div>
        <div className={`${getScoreBg(sustainability.overallScore)} border-2 rounded-lg px-4 py-2 text-center`}>
          <p className="text-xs text-gray-600 mb-1">Overall Score</p>
          <p className={`text-3xl font-bold ${getScoreColor(sustainability.overallScore)}`}>
            {sustainability.overallScore}/100
          </p>
        </div>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <Wind className="h-5 w-5 text-blue-600" />
            <span className="text-xs text-gray-600">Carbon Sequestered</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{sustainability.impact.carbonSequestrated}</p>
          <p className="text-xs text-gray-500">tons CO₂e</p>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-5 w-5 text-cyan-600" />
            <span className="text-xs text-gray-600">Water Saved</span>
          </div>
          <p className="text-2xl font-bold text-cyan-600">
            {(sustainability.impact.waterSaved / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-500">gallons</p>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
          <div className="flex items-center space-x-2 mb-2">
            <TreePine className="h-5 w-5 text-amber-600" />
            <span className="text-xs text-gray-600">Erosion Prevented</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{sustainability.impact.soilErosionPrevented}</p>
          <p className="text-xs text-gray-500">tons/year</p>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="text-xs text-gray-600">Chemicals Reduced</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{sustainability.impact.chemicalUseReduced}%</p>
          <p className="text-xs text-gray-500">vs conventional</p>
        </div>
      </div>

      {/* Comparison with Conventional Farming */}
      <div className="bg-white rounded-lg p-4 mb-6 border-2 border-green-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="h-5 w-5 text-green-600 mr-2" />
          Environmental Impact Comparison
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Carbon Footprint</span>
              <span className="text-xs text-gray-500">
                {sustainability.comparison.yourFarm.carbonFootprint < 0 ? 'Sequestering' : 'Emitting'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width: `${Math.abs(sustainability.comparison.yourFarm.carbonFootprint) / 3}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-green-600">
                {sustainability.comparison.yourFarm.carbonFootprint} tons
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${sustainability.comparison.conventionalAverage.carbonFootprint / 3}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                Conventional: +{sustainability.comparison.conventionalAverage.carbonFootprint} tons
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Water Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-cyan-500 h-3 rounded-full"
                  style={{
                    width: `${(sustainability.comparison.yourFarm.waterUsage / sustainability.comparison.conventionalAverage.waterUsage) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-cyan-600">
                {(sustainability.comparison.yourFarm.waterUsage / 1000).toFixed(0)}K gal
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(
                ((sustainability.comparison.conventionalAverage.waterUsage - sustainability.comparison.yourFarm.waterUsage) /
                  sustainability.comparison.conventionalAverage.waterUsage) *
                  100
              )}% less than conventional ({sustainability.comparison.conventionalAverage.waterUsage / 1000}K gal)
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Chemical Use</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{
                    width: `${sustainability.comparison.yourFarm.chemicalUse}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-purple-600">
                {sustainability.comparison.yourFarm.chemicalUse}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {sustainability.comparison.conventionalAverage.chemicalUse - sustainability.comparison.yourFarm.chemicalUse}% reduction vs conventional
            </p>
          </div>
        </div>
      </div>

      {/* Sustainability Milestones */}
      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="h-5 w-5 text-green-600 mr-2" />
          Sustainability Milestones
        </h3>
        <div className="space-y-3">
          {sustainability.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {milestone.achieved ? (
                  <div className="bg-green-500 rounded-full p-1">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="bg-gray-300 rounded-full p-1">
                    <Target className="h-4 w-4 text-gray-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{milestone.name}</p>
                  {milestone.achieved ? (
                    <p className="text-xs text-gray-500">Achieved on {new Date(milestone.date!).toLocaleDateString()}</p>
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{milestone.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
              {milestone.achieved && (
                <span className="text-green-600 font-semibold text-sm">✓ Complete</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

