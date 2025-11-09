'use client'

import { useState } from 'react'
import { MapPin, Droplets } from 'lucide-react'

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
}

export default function SimpleFarmMap() {
  const [selectedField, setSelectedField] = useState<FieldStatus | null>(null)

  // Initialize with mock data immediately
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
    },
    {
      id: 3,
      name: 'Field C',
      crop: 'Wheat',
      acres: 70,
      status: 'needs-attention',
      soilHealth: 75,
      moisture: 58,
      plantingStatus: 'harvest-ready',
      daysUntilAction: 0,
      nextAction: 'Harvest Now',
    },
  ]

  const getStatusColor = (status: FieldStatus['status']) => {
    const colors = {
      excellent: 'bg-green-500',
      good: 'bg-blue-500',
      fair: 'bg-yellow-500',
      'needs-attention': 'bg-red-500',
    }
    return colors[status]
  }

  const getStatusBorder = (status: FieldStatus['status']) => {
    const borders = {
      excellent: 'border-green-600',
      good: 'border-blue-600',
      fair: 'border-yellow-600',
      'needs-attention': 'border-red-600',
    }
    return borders[status]
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
          <h2 className="text-xl font-bold text-gray-800">Farm Field Map</h2>
          <p className="text-sm text-gray-600 mt-1">Visual overview of your fields</p>
        </div>
        <MapPin className="h-6 w-6 text-primary-600" />
      </div>

      {/* Visual Farm Layout */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-6 border-2 border-dashed border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {fields.map((field) => {
            const isSelected = selectedField?.id === field.id
            return (
              <div
                key={field.id}
                onClick={() => setSelectedField(field)}
                className={`
                  relative border-4 rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105
                  ${getStatusColor(field.status)} ${getStatusBorder(field.status)}
                  ${isSelected ? 'ring-4 ring-yellow-400 scale-105' : ''}
                  ${field.plantingStatus === 'harvest-ready' ? 'animate-pulse' : ''}
                `}
              >
                <div className="text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{field.name}</h3>
                    <span className="text-2xl">{getCropIcon(field.crop)}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-1">{field.crop}</p>
                  <p className="text-xs opacity-75">{field.acres} acres</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-white/20 backdrop-blur-sm">
                      {field.plantingStatus.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Field C - Full Width */}
        {(() => {
          const fieldC = fields.find(f => f.id === 3)
          if (!fieldC) return null
          return (
            <div
              onClick={() => setSelectedField(fieldC)}
              className={`
                relative border-4 rounded-lg p-6 cursor-pointer transition-all transform hover:scale-[1.02]
                ${getStatusColor(fieldC.status)} ${getStatusBorder(fieldC.status)}
                ${selectedField?.id === 3 ? 'ring-4 ring-yellow-400 scale-[1.02]' : ''}
                ${fieldC.plantingStatus === 'harvest-ready' ? 'animate-pulse' : ''}
              `}
            >
              <div className="text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{fieldC.name}</h3>
                  <span className="text-2xl">{getCropIcon(fieldC.crop)}</span>
                </div>
                <p className="text-sm opacity-90 mb-1">{fieldC.crop}</p>
                <p className="text-xs opacity-75">{fieldC.acres} acres</p>
                <div className="mt-3 flex items-center space-x-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-white/20 backdrop-blur-sm">
                    {fieldC.plantingStatus.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Field Details Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Field</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Crop</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Soil Health</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Moisture</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Next Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => {
              const statusColor = getStatusColor(field.status).replace('bg-', '')
              return (
                <tr
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className={`
                    border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${selectedField?.id === field.id ? 'bg-primary-50' : ''}
                  `}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(field.status)}`} />
                      <span className="font-medium text-gray-800">{field.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="mr-1">{getCropIcon(field.crop)}</span>
                    {field.crop}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(field.status)}`}>
                      {field.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            field.soilHealth >= 85 ? 'bg-green-500' :
                            field.soilHealth >= 75 ? 'bg-blue-500' :
                            field.soilHealth >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${field.soilHealth}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{field.soilHealth}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700">{field.moisture}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      field.daysUntilAction === 0
                        ? 'bg-red-100 text-red-800 border border-red-300'
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
              <p className="text-xs text-gray-600 mb-1">Soil Health</p>
              <p className="text-lg font-semibold text-gray-800">{selectedField.soilHealth}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Moisture</p>
              <p className="text-lg font-semibold text-gray-800">{selectedField.moisture}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">{selectedField.status}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Next Action</p>
              <p className="text-lg font-semibold text-gray-800">{selectedField.nextAction}</p>
            </div>
          </div>
          {selectedField.daysUntilAction === 0 && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-sm text-red-800 animate-pulse">
              ⚠️ Action required immediately: {selectedField.nextAction}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">Status Legend:</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600" />
            <span className="text-sm text-gray-600">Excellent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-600" />
            <span className="text-sm text-gray-600">Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600" />
            <span className="text-sm text-gray-600">Fair</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600" />
            <span className="text-sm text-gray-600">Needs Attention</span>
          </div>
        </div>
      </div>
    </div>
  )
}

