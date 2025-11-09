'use client'

import { useState } from 'react'
import { Microscope, Activity, Leaf, TrendingUp } from 'lucide-react'

export default function AdvancedSoilMetrics() {
  const [metrics, setMetrics] = useState(() => ({
    fungalToBacterialRatio: 0.65,
    soilRespiration: 85,
    waterExtractableOC: 245,
    waterExtractableON: 12,
    soilOrganicMatter: 4.2,
    trends: {
      fbratio: 'improving',
      respiration: 'stable',
      weoc: 'increasing',
    },
  }))

  const getFBRatioStatus = (ratio: number) => {
    if (ratio >= 0.8) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-50' }
    if (ratio >= 0.5) return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (ratio >= 0.3) return { status: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'poor', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const fbrStatus = getFBRatioStatus(metrics.fungalToBacterialRatio)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Advanced Soil Biology</h2>
          <p className="text-sm text-gray-600 mt-1">Deep ecosystem health indicators</p>
        </div>
        <Microscope className="h-6 w-6 text-primary-600" />
      </div>

      {/* Fungal-to-Bacterial Ratio */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="font-bold text-gray-800">Fungal-to-Bacterial (F:B) Ratio</h3>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-3xl font-bold text-purple-600">{metrics.fungalToBacterialRatio.toFixed(2)}:1</p>
            <p className="text-sm text-gray-600 mt-1">
              {metrics.fungalToBacterialRatio >= 0.8 ? 'Mature ecosystem (like old-growth forest)' :
               metrics.fungalToBacterialRatio >= 0.5 ? 'Healthy regenerative system' :
               metrics.fungalToBacterialRatio >= 0.3 ? 'Transitioning from bacterial to fungal' :
               'Bacterial-dominated (conventional/tilled)'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${fbrStatus.bg} ${fbrStatus.color} border-2 ${fbrStatus.color.replace('text-', 'border-')}`}>
            {fbrStatus.status.toUpperCase()}
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
              style={{ width: `${Math.min((metrics.fungalToBacterialRatio / 1.0) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Target: 1.0:1 (Ideal for most row crops) • Conventional: &lt;0.3:1
          </p>
        </div>
      </div>

      {/* Soil Respiration */}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Soil Respiration (CO2 Burst)</h3>
          </div>
          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
            {metrics.soilRespiration >= 100 ? 'EXCELLENT' : metrics.soilRespiration >= 75 ? 'GOOD' : 'FAIR'}
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-1">{metrics.soilRespiration} ppm CO2-C</p>
        <p className="text-sm text-gray-600">
          Measures how &quot;alive&quot; your soil is. Higher respiration = more active microbial life.
        </p>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${Math.min((metrics.soilRespiration / 150) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Haney Test Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Water Extractable Organic Carbon (WEOC)</h3>
          <p className="text-2xl font-bold text-primary-600">{metrics.waterExtractableOC} ppm</p>
          <p className="text-xs text-gray-500 mt-1">
            Nutrients available to microbes (real fuel for plants)
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Water Extractable Organic Nitrogen (WEON)</h3>
          <p className="text-2xl font-bold text-primary-600">{metrics.waterExtractableON} ppm</p>
          <p className="text-xs text-gray-500 mt-1">
            Bioavailable nitrogen from organic matter
          </p>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
        <p className="font-semibold text-amber-800 mb-2">🔬 Why These Metrics Matter</p>
        <p className="text-sm text-amber-700">
          Standard N-P-K tests only show what&apos;s in the soil. These advanced metrics show what&apos;s 
          actually available to your plants through the soil food web. A high F:B ratio means your soil 
          has rebuilt its &quot;internet&quot; to transport nutrients efficiently.
        </p>
      </div>
    </div>
  )
}

