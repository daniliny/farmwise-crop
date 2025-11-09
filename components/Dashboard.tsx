'use client'

import { useState, useEffect } from 'react'
import CropYieldPrediction from './CropYieldPrediction'
import SoilHealth from './SoilHealth'
import PlantingAdvice from './PlantingAdvice'
import WeatherWidget from './WeatherWidget'
import QuickStats from './QuickStats'
import SimpleFarmMap from './SimpleFarmMap'
import AerialFarmMap from './AerialFarmMap'
import EcoWallet from './EcoWallet'
import AIMentor from './AIMentor'
import AdvancedSoilMetrics from './AdvancedSoilMetrics'
import CarbonSequestration from './CarbonSequestration'
import PredictiveModels from './PredictiveModels'
import NutrientDensity from './NutrientDensity'
import BiodiversityMetrics from './BiodiversityMetrics'
import SpendingTracker from './SpendingTracker'
import SustainabilityOverview from './SustainabilityOverview'
import WaterConservation from './WaterConservation'
import ClimateImpact from './ClimateImpact'
import VoiceAssistant from './VoiceAssistant'

interface DashboardProps {
  alerts: string[]
  user?: {
    name: string
    farmName: string
    acres?: number
    crops?: string[]
  } | null
}

export default function Dashboard({ alerts, user }: DashboardProps) {
  // Initialize with user data or mock data
  const [farmData, setFarmData] = useState<any>(() => ({
    crops: user?.crops || ['Corn', 'Soybeans', 'Wheat'],
    totalAcres: user?.acres || 250,
    currentSeason: 'Spring 2024',
    farmName: user?.farmName || 'Your Farm',
    farmerName: user?.name || 'Farmer',
  }))

  useEffect(() => {
    // Try to fetch real data in background (optional)
    fetch('/api/farm-data')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('API not available')
      })
      .then(data => {
        setFarmData(data)
      })
      .catch(() => {
        // Keep using mock data
        console.log('Using mock farm data')
      })
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Section - Sustainability Focus */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {farmData?.farmerName || 'Farmer'}!
            </h1>
            <p className="text-green-100">
              {farmData?.farmName || 'Your Farm'} • {farmData?.currentSeason || 'Spring 2024'} • {farmData?.totalAcres || 250} acres
            </p>
            <p className="text-green-50 text-sm mt-1">
              <span className="font-semibold">Sustainability Score: 87/100</span>
            </p>
            <p className="text-sm text-green-50 mt-2">
              Your one-stop platform for regenerative agriculture, climate impact, and sustainable farming
            </p>
            <p className="text-xs text-green-100 mt-1">
              💬 Talk to your AI assistant • 💰 Track spending with Knot • 🌱 Make sustainable decisions
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-xs opacity-90">Carbon Impact</p>
              <p className="text-2xl font-bold">-425 tons</p>
              <p className="text-xs opacity-75">CO₂e this year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Overview - Hero Section */}
      <SustainabilityOverview />

      {/* Financial & Spending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EcoWallet />
        <SpendingTracker />
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Farm Map - Aerial View with Irrigation Indicators */}
      <div id="farm-map">
        <AerialFarmMap />
      </div>

      {/* Voice Assistant - Farmer's Best Friend */}
      <VoiceAssistant />

      {/* AI Mentor - Gabe Brown's Principles */}
      <AIMentor />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Yield Predictions */}
        <div id="predictions">
          <CropYieldPrediction />
        </div>

        {/* Soil Health */}
        <div id="soil-health">
          <SoilHealth />
        </div>
      </div>

      {/* Climate & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClimateImpact />
        <WaterConservation />
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Advanced Soil Biology */}
        <AdvancedSoilMetrics />

        {/* Carbon Sequestration */}
        <CarbonSequestration />
      </div>

      {/* Predictive Models & Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Intelligence */}
        <PredictiveModels />

        {/* Nutrient Density & Brix */}
        <NutrientDensity />
      </div>

      {/* Biodiversity Metrics - Full Width */}
      <BiodiversityMetrics />

      {/* Planting Advice - Full Width */}
      <div id="advice">
        <PlantingAdvice />
      </div>
    </div>
  )
}

