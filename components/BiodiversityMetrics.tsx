'use client'

import { useState } from 'react'
import { Bird, Flower2, Bug, TreePine, Activity } from 'lucide-react'

export default function BiodiversityMetrics() {
  const [biodiversity, setBiodiversity] = useState(() => ({
    pollinatorHabitat: {
      percentage: 18,
      floweringStrips: 45,
      status: 'good',
      species: ['Clover', 'Buckwheat', 'Sunflower', 'Phacelia'],
    },
    biodiversityIndex: {
      score: 7.2,
      maxScore: 10,
      birdSpecies: 12,
      beneficialInsects: 28,
      soilOrganisms: 150,
      trend: 'increasing',
    },
    forageBiomass: {
      current: 4200,
      unit: 'lbs/acre',
      grazingDays: 14,
      proteinContent: 18,
      status: 'excellent',
    },
    ecosystemServices: {
      pestControl: 'High - Beneficial insects active',
      pollination: 'Optimal - Diverse pollinator population',
      soilBuilding: 'Active - Earthworms and microbes thriving',
    },
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Ecosystem & Biodiversity</h2>
          <p className="text-sm text-gray-600 mt-1">Measuring whole-system health</p>
        </div>
        <TreePine className="h-6 w-6 text-primary-600" />
      </div>

      {/* Biodiversity Index */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="font-bold text-gray-800">Biodiversity Index</h3>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-3xl font-bold text-purple-600">
              {biodiversity.biodiversityIndex.score}/{biodiversity.biodiversityIndex.maxScore}
            </p>
            <p className="text-sm text-gray-600">Ecosystem Vibrancy</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border-2 border-green-300">
            {biodiversity.biodiversityIndex.trend.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded p-2 text-center">
            <Bird className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{biodiversity.biodiversityIndex.birdSpecies}</p>
            <p className="text-xs text-gray-500">Bird Species</p>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <Bug className="h-4 w-4 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{biodiversity.biodiversityIndex.beneficialInsects}</p>
            <p className="text-xs text-gray-500">Beneficial Insects</p>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <Activity className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{biodiversity.biodiversityIndex.soilOrganisms}+</p>
            <p className="text-xs text-gray-500">Soil Organisms</p>
          </div>
        </div>
      </div>

      {/* Pollinator Habitat */}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Flower2 className="h-5 w-5 text-pink-600" />
          <h3 className="font-semibold text-gray-800">Pollinator Habitat</h3>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Farm Coverage</span>
          <span className="text-lg font-bold text-primary-600">{biodiversity.pollinatorHabitat.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full"
            style={{ width: `${biodiversity.pollinatorHabitat.percentage}%` }}
          />
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600 mb-1">Flowering Strips:</p>
          <p className="font-semibold text-gray-800">{biodiversity.pollinatorHabitat.floweringStrips} acres</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Species Mix:</p>
          <div className="flex flex-wrap gap-2">
            {biodiversity.pollinatorHabitat.species.map((species, index) => (
              <span key={index} className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                {species}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Forage Biomass */}
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <TreePine className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Forage Biomass</h3>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">Available</p>
            <p className="text-xl font-bold text-green-600">{biodiversity.forageBiomass.current}</p>
            <p className="text-xs text-gray-500">{biodiversity.forageBiomass.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Grazing Days</p>
            <p className="text-xl font-bold text-blue-600">{biodiversity.forageBiomass.grazingDays}</p>
            <p className="text-xs text-gray-500">at 300 lbs/day</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Protein</p>
            <p className="text-xl font-bold text-purple-600">{biodiversity.forageBiomass.proteinContent}%</p>
            <p className="text-xs text-gray-500">High quality</p>
          </div>
        </div>
        <p className="text-sm text-green-700">
          💰 Value: This forage can replace <span className="font-bold">${biodiversity.forageBiomass.grazingDays * 25}</span> in hay costs
        </p>
      </div>

      {/* Ecosystem Services */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold text-blue-800 mb-3">Ecosystem Services</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Bug className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Pest Control</p>
              <p className="text-xs text-gray-600">{biodiversity.ecosystemServices.pestControl}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Flower2 className="h-4 w-4 text-pink-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Pollination</p>
              <p className="text-xs text-gray-600">{biodiversity.ecosystemServices.pollination}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Activity className="h-4 w-4 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Soil Building</p>
              <p className="text-xs text-gray-600">{biodiversity.ecosystemServices.soilBuilding}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

