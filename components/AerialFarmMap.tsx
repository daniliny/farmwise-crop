'use client'

import { useState } from 'react'
import { MapPin, Droplets, AlertCircle } from 'lucide-react'

interface FieldStatus {
  id: number
  name: string
  crop: string
  acres: number
  status: 'excellent' | 'good' | 'fair' | 'needs-attention'
  soilHealth: number
  moisture: number
  plantingStatus: 'planted' | 'ready' | 'harvest-ready' | 'fallow'
  daysUntilAction: number
  nextAction: string
  irrigationNeeded: boolean
  moistureLevel: 'optimal' | 'adequate' | 'low' | 'critical'
}

export default function AerialFarmMap() {
  const [selectedField, setSelectedField] = useState<FieldStatus | null>(null)

  // Initialize with mock data - fields with irrigation status
  const fields: FieldStatus[] = [
    {
      id: 1,
      name: 'Field A',
      crop: 'Corn',
      acres: 100,
      status: 'excellent',
      soilHealth: 88,
      moisture: 72,
      plantingStatus: 'planted',
      daysUntilAction: 45,
      nextAction: 'Harvest',
      irrigationNeeded: false,
      moistureLevel: 'optimal',
    },
    {
      id: 2,
      name: 'Field B',
      crop: 'Soybeans',
      acres: 80,
      status: 'good',
      soilHealth: 82,
      moisture: 68,
      plantingStatus: 'ready',
      daysUntilAction: 3,
      nextAction: 'Plant',
      irrigationNeeded: false,
      moistureLevel: 'adequate',
    },
    {
      id: 3,
      name: 'Field C',
      crop: 'Wheat',
      acres: 70,
      status: 'needs-attention',
      soilHealth: 75,
      moisture: 45,
      plantingStatus: 'harvest-ready',
      daysUntilAction: 0,
      nextAction: 'Harvest Now',
      irrigationNeeded: true,
      moistureLevel: 'low',
    },
    {
      id: 4,
      name: 'Field D',
      crop: 'Corn',
      acres: 60,
      status: 'fair',
      soilHealth: 70,
      moisture: 38,
      plantingStatus: 'planted',
      daysUntilAction: 2,
      nextAction: 'Irrigate',
      irrigationNeeded: true,
      moistureLevel: 'critical',
    },
  ]

  const getFieldColor = (field: FieldStatus) => {
    // Color based on moisture/irrigation needs - like satellite imagery
    if (field.irrigationNeeded) {
      if (field.moistureLevel === 'critical') {
        return 'bg-amber-200' // Very dry - needs immediate irrigation
      }
      return 'bg-yellow-100' // Low moisture - needs irrigation
    }
    
    if (field.moistureLevel === 'optimal') {
      return 'bg-green-600' // Healthy, well-watered
    }
    if (field.moistureLevel === 'adequate') {
      return 'bg-green-400' // Adequate moisture
    }
    return 'bg-green-500' // Good moisture
  }

  const getFieldPattern = (field: FieldStatus) => {
    // Add visual texture based on crop type
    if (field.plantingStatus === 'planted') {
      return 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:8px_8px]'
    }
    if (field.plantingStatus === 'ready') {
      return 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:12px_12px]'
    }
    return ''
  }

  const getCropIcon = (crop: string) => {
    switch (crop.toLowerCase()) {
      case 'corn':
        return '🌽'
      case 'soybeans':
        return '🫘'
      case 'wheat':
        return '🌾'
      default:
        return '🌱'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Aerial Farm Map</h2>
          <p className="text-sm text-gray-600 mt-1">Field colors indicate moisture levels and irrigation needs</p>
        </div>
        <MapPin className="h-6 w-6 text-primary-600" />
      </div>

      {/* Aerial View Farm Layout */}
      <div className="bg-gradient-to-br from-sky-100 to-green-50 rounded-lg p-6 mb-6 border-2 border-gray-300 relative overflow-hidden">
        {/* Farm boundary paths */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Field boundaries - paths between fields */}
            <path d="M 0 50 L 100 50" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
            <path d="M 50 0 L 50 100" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
            <path d="M 25 0 L 25 50" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
            <path d="M 75 0 L 75 50" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
          </svg>
        </div>

        {/* Fields Grid - Aerial View */}
        <div className="grid grid-cols-2 gap-1 relative z-10" style={{ minHeight: '400px' }}>
          {fields.map((field) => {
            const isSelected = selectedField?.id === field.id
            const fieldColor = getFieldColor(field)
            const fieldPattern = getFieldPattern(field)
            
            return (
              <div
                key={field.id}
                onClick={() => setSelectedField(field)}
                className={`
                  relative border-2 rounded-sm cursor-pointer transition-all transform hover:scale-[1.02] hover:z-20
                  ${fieldColor} ${fieldPattern}
                  ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 scale-[1.02] z-20' : ''}
                  ${field.irrigationNeeded ? 'animate-pulse border-amber-400' : 'border-gray-300'}
                  ${field.moistureLevel === 'critical' ? 'border-red-500 border-2' : ''}
                `}
                style={{
                  minHeight: '180px',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {/* Field label overlay */}
                <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                  <p className="text-white text-xs font-bold">{field.name}</p>
                </div>

                {/* Irrigation alert badge */}
                {field.irrigationNeeded && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 animate-pulse">
                    <Droplets className="h-4 w-4" />
                  </div>
                )}

                {/* Crop icon */}
                <div className="absolute bottom-2 left-2 text-2xl opacity-80">
                  {getCropIcon(field.crop)}
                </div>

                {/* Moisture indicator */}
                <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Droplets className={`h-3 w-3 ${
                      field.moistureLevel === 'optimal' ? 'text-blue-600' :
                      field.moistureLevel === 'adequate' ? 'text-blue-400' :
                      field.moistureLevel === 'low' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                    <span className="text-xs font-semibold text-gray-700">{field.moisture}%</span>
                  </div>
                </div>

                {/* Status text overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-1">
                    <p className="text-white text-xs font-medium uppercase">
                      {field.irrigationNeeded ? 'Irrigation Needed' : field.plantingStatus.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs font-semibold text-gray-700 mb-2">Color Legend:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-green-600 border border-gray-300" />
              <span className="text-gray-600">Optimal (No irrigation)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-green-400 border border-gray-300" />
              <span className="text-gray-600">Adequate (Monitor)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-yellow-100 border border-amber-400 animate-pulse" />
              <span className="text-gray-600">Low (Irrigate soon)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-amber-200 border-2 border-red-500" />
              <span className="text-gray-600">Critical (Irrigate now!)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Field Details Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Field</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Crop</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Moisture</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => {
              return (
                <tr
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className={`
                    border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${selectedField?.id === field.id ? 'bg-primary-50' : ''}
                    ${field.irrigationNeeded ? 'bg-red-50/50' : ''}
                  `}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${getFieldColor(field)} border border-gray-300`} />
                      <span className="font-medium text-gray-800">{field.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="mr-1">{getCropIcon(field.crop)}</span>
                    {field.crop}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Droplets className={`h-4 w-4 ${
                        field.moistureLevel === 'optimal' ? 'text-blue-600' :
                        field.moistureLevel === 'adequate' ? 'text-blue-400' :
                        field.moistureLevel === 'low' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        field.moistureLevel === 'critical' ? 'text-red-600' :
                        field.moistureLevel === 'low' ? 'text-yellow-600' : 'text-gray-700'
                      }`}>
                        {field.moisture}%
                      </span>
                      {field.irrigationNeeded && (
                        <span className="text-xs text-red-600 font-semibold">⚠️</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      field.moistureLevel === 'optimal' ? 'bg-green-100 text-green-800' :
                      field.moistureLevel === 'adequate' ? 'bg-blue-100 text-blue-800' :
                      field.moistureLevel === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {field.moistureLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      field.irrigationNeeded
                        ? 'bg-red-100 text-red-800 border border-red-300 font-bold animate-pulse'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {field.nextAction}
                      {field.daysUntilAction > 0 && (
                        <span className="ml-1 text-gray-600">({field.daysUntilAction}d)</span>
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Field Details Panel */}
      {selectedField && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 rounded-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                {selectedField.name} - {selectedField.crop}
                <span className="ml-2">{getCropIcon(selectedField.crop)}</span>
              </h3>
              <p className="text-sm text-gray-600">{selectedField.acres} acres</p>
            </div>
            <button
              onClick={() => setSelectedField(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Moisture Level</p>
              <p className={`text-lg font-semibold ${
                selectedField.moistureLevel === 'critical' ? 'text-red-600' :
                selectedField.moistureLevel === 'low' ? 'text-yellow-600' : 'text-gray-800'
              }`}>
                {selectedField.moisture}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">{selectedField.moistureLevel}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Soil Health</p>
              <p className="text-lg font-semibold text-gray-800">{selectedField.soilHealth}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Next Action</p>
              <p className="text-lg font-semibold text-gray-800">{selectedField.nextAction}</p>
            </div>
          </div>
          {selectedField.irrigationNeeded && (
            <div className={`mt-3 p-3 rounded text-sm font-semibold ${
              selectedField.moistureLevel === 'critical'
                ? 'bg-red-100 border-2 border-red-500 text-red-800 animate-pulse'
                : 'bg-yellow-100 border border-yellow-400 text-yellow-800'
            }`}>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>
                  {selectedField.moistureLevel === 'critical'
                    ? '⚠️ CRITICAL: Immediate irrigation required!'
                    : '⚠️ Irrigation recommended to maintain crop health'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

