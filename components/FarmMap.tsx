'use client'

import { useState, useEffect } from 'react'
import { MapPin, Droplets, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react'

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

export default function FarmMap() {
  const [fields, setFields] = useState<FieldStatus[]>([])
  const [selectedField, setSelectedField] = useState<FieldStatus | null>(null)

  useEffect(() => {
    // Initialize with mock data
    const mockFields: FieldStatus[] = [
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
    setFields(mockFields)

    // Try to fetch real data
    fetch('/api/farm-data')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.fields) {
          // Map API data to field status format
          const mappedFields = data.fields.map((field: any, index: number) => ({
            id: field.id || index + 1,
            name: field.name,
            crop: field.crop,
            acres: field.acres,
            status: ['excellent', 'good', 'fair', 'needs-attention'][index % 4] as FieldStatus['status'],
            soilHealth: 75 + Math.floor(Math.random() * 20),
            moisture: 60 + Math.floor(Math.random() * 20),
            plantingStatus: ['planted', 'ready', 'harvest-ready', 'fallow'][index % 4] as FieldStatus['plantingStatus'],
            daysUntilAction: Math.floor(Math.random() * 50),
            nextAction: ['Plant', 'Harvest', 'Fertilize', 'Irrigate'][index % 4],
          }))
          setFields(mappedFields)
        }
      })
      .catch(() => {
        // Keep using mock data
      })
  }, [])

  const getStatusColor = (status: FieldStatus['status']) => {
    const colors = {
      excellent: 'bg-green-500 border-green-600',
      good: 'bg-blue-500 border-blue-600',
      fair: 'bg-yellow-500 border-yellow-600',
      'needs-attention': 'bg-red-500 border-red-600',
    }
    return colors[status]
  }

  const getStatusGradient = (status: FieldStatus['status']) => {
    const gradients = {
      excellent: 'from-green-500 to-green-600',
      good: 'from-blue-500 to-blue-600',
      fair: 'from-yellow-500 to-yellow-600',
      'needs-attention': 'from-red-500 to-red-600',
    }
    return gradients[status]
  }

  const getStatusIcon = (status: FieldStatus['status']) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-white drop-shadow-md" />
      case 'good':
        return <TrendingUp className="h-5 w-5 text-white drop-shadow-md" />
      case 'fair':
        return <Info className="h-5 w-5 text-white drop-shadow-md" />
      case 'needs-attention':
        return <AlertCircle className="h-5 w-5 text-white drop-shadow-md" />
    }
  }

  const getPlantingStatusColor = (status: FieldStatus['plantingStatus']) => {
    const colors = {
      planted: 'bg-green-100 text-green-800 border-green-300',
      ready: 'bg-blue-100 text-blue-800 border-blue-300',
      'harvest-ready': 'bg-orange-100 text-orange-800 border-orange-300',
      fallow: 'bg-gray-100 text-gray-800 border-gray-300',
    }
    return colors[status]
  }

  // Calculate field sizes for visualization (proportional to acres)
  const totalAcres = fields.reduce((sum, field) => sum + field.acres, 0)
  const fieldSizes = fields.map(field => ({
    ...field,
    percentage: (field.acres / totalAcres) * 100,
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Farm Field Map</h2>
          <p className="text-sm text-gray-600 mt-1">Visual overview of all fields</p>
        </div>
        <MapPin className="h-6 w-6 text-primary-600" />
      </div>

      {/* Farm Visualization */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {fieldSizes.map((field) => (
            <div
              key={field.id}
              onClick={() => setSelectedField(field)}
              className={`
                relative border-4 rounded-lg p-4 cursor-pointer transition-all
                bg-gradient-to-br ${getStatusGradient(field.status)}
                ${selectedField?.id === field.id ? 'ring-4 ring-primary-300 scale-105' : 'hover:scale-[1.02]'}
                ${field.plantingStatus === 'harvest-ready' ? 'animate-pulse' : ''}
              `}
              style={{
                minHeight: '120px',
              }}
            >
              <div className="absolute top-2 right-2">
                {getStatusIcon(field.status)}
              </div>
              <div className="text-white">
                <h3 className="font-bold text-lg mb-1">{field.name}</h3>
                <p className="text-sm opacity-90">{field.crop}</p>
                <p className="text-xs opacity-75 mt-1">{field.acres} acres</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium bg-white/20 backdrop-blur-sm`}>
                    {field.plantingStatus.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Details Table */}
      <div className="overflow-x-auto">
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
            {fields.map((field) => (
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
                <td className="py-3 px-4 text-gray-700">{field.crop}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(field.status)} text-white`}>
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
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPlantingStatusColor(field.plantingStatus)}`}>
                    {field.nextAction}
                    {field.daysUntilAction > 0 && (
                      <span className="ml-1 text-gray-600">({field.daysUntilAction}d)</span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Field Details Panel */}
      {selectedField && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                {selectedField.name} - {selectedField.crop}
              </h3>
              <p className="text-sm text-gray-600">{selectedField.acres} acres</p>
            </div>
            <button
              onClick={() => setSelectedField(null)}
              className="text-gray-400 hover:text-gray-600"
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
            <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-sm text-red-800">
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

