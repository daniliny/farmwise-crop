'use client'

import { useState, useEffect } from 'react'
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
  x: number
  y: number
  width: number
  height: number
}

export default function AnimatedFarmMap() {
  const [selectedField, setSelectedField] = useState<FieldStatus | null>(null)
  const [hoveredField, setHoveredField] = useState<number | null>(null)

  // Initialize with mock data immediately - positioned fields
  const [fields, setFields] = useState<FieldStatus[]>(() => [
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
        x: 10,
        y: 10,
        width: 35,
        height: 40,
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
        x: 50,
        y: 10,
        width: 40,
        height: 35,
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
        x: 10,
        y: 55,
        width: 80,
        height: 35,
      },
    ])

  useEffect(() => {
    // Try to fetch real data in background
    fetch('/api/farm-data')
      .then(res => res.ok ? res.json() : null)
      .catch(() => {})
  }, [])

  const getStatusColor = (status: FieldStatus['status']) => {
    const colors = {
      excellent: '#22c55e',
      good: '#3b82f6',
      fair: '#eab308',
      'needs-attention': '#ef4444',
    }
    return colors[status]
  }

  const getStatusPattern = (status: FieldStatus['status']) => {
    const patterns = {
      excellent: 'url(#excellentPattern)',
      good: 'url(#goodPattern)',
      fair: 'url(#fairPattern)',
      'needs-attention': 'url(#attentionPattern)',
    }
    return patterns[status]
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
          <p className="text-sm text-gray-600 mt-1">Interactive visual overview of your fields</p>
        </div>
        <MapPin className="h-6 w-6 text-primary-600" />
      </div>

      {/* Animated SVG Farm Map */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-6 border-2 border-dashed border-gray-300">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto"
          style={{ minHeight: '400px', maxHeight: '500px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Define patterns for different field statuses */}
          <defs>
            <pattern id="excellentPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#22c55e" opacity="0.3">
                <animate attributeName="r" values="1;1.5;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </pattern>
            <pattern id="goodPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="2" height="2" fill="#3b82f6" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
              </rect>
            </pattern>
            <pattern id="fairPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="4" y2="4" stroke="#eab308" strokeWidth="0.5" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="2s" repeatCount="indefinite" />
              </line>
            </pattern>
            <pattern id="attentionPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="none" stroke="#ef4444" strokeWidth="0.3" opacity="0.5">
                <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" />
              </circle>
            </pattern>
            
            {/* Gradient definitions */}
            <linearGradient id="excellentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="fairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="attentionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
            
            {/* Compass arrow marker */}
            <marker id="arrowhead" markerWidth="2" markerHeight="2" refX="1" refY="1" orient="auto">
              <polygon points="0 0, 2 1, 0 2" fill="#ef4444" />
            </marker>
          </defs>

          {/* Background - farm boundary */}
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.5"
          >
            <animate attributeName="stroke-dashoffset" values="0;4" dur="3s" repeatCount="indefinite" />
          </rect>

          {/* Draw fields */}
          {fields.map((field) => {
            const isSelected = selectedField?.id === field.id
            const isHovered = hoveredField === field.id
            const gradientId = `${field.status}Gradient`
            const statusColor = getStatusColor(field.status)

            return (
              <g key={field.id}>
                {/* Field shape with rounded corners effect */}
                <rect
                  x={field.x}
                  y={field.y}
                  width={field.width}
                  height={field.height}
                  rx="2"
                  ry="2"
                  fill={`url(#${gradientId})`}
                  stroke={isSelected ? '#fbbf24' : statusColor}
                  strokeWidth={isSelected ? '1' : isHovered ? '0.8' : '0.5'}
                  opacity={isHovered ? 1 : isSelected ? 0.95 : 0.85}
                  style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                  onClick={() => setSelectedField(field)}
                  onMouseEnter={() => setHoveredField(field.id)}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <animate
                    attributeName="opacity"
                    values={field.plantingStatus === 'harvest-ready' ? "0.85;1;0.85" : "0.85;0.85"}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Animated pattern overlay */}
                <rect
                  x={field.x}
                  y={field.y}
                  width={field.width}
                  height={field.height}
                  rx="2"
                  ry="2"
                  fill={getStatusPattern(field.status)}
                  opacity="0.4"
                />

                {/* Field label background */}
                <rect
                  x={field.x + 1}
                  y={field.y + 1}
                  width={field.width - 2}
                  height="4"
                  fill="white"
                  opacity="0.9"
                  rx="1"
                />

                {/* Field name */}
                <text
                  x={field.x + field.width / 2}
                  y={field.y + 3}
                  textAnchor="middle"
                  fontSize="2.5"
                  fontWeight="bold"
                  fill={statusColor}
                  style={{ pointerEvents: 'none' }}
                >
                  {field.name}
                </text>

                {/* Crop icon - using foreignObject for better emoji rendering */}
                <foreignObject
                  x={field.x + field.width / 2 - 3}
                  y={field.y + field.height / 2 - 3}
                  width="6"
                  height="6"
                  style={{ pointerEvents: 'none', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '6px', textAlign: 'center', lineHeight: '6px' }}>
                    {getCropIcon(field.crop)}
                  </div>
                </foreignObject>

                {/* Status indicator dot */}
                <circle
                  cx={field.x + field.width - 2}
                  cy={field.y + 2}
                  r="1.5"
                  fill={statusColor}
                  opacity="0.9"
                >
                  {field.plantingStatus === 'harvest-ready' && (
                    <animate
                      attributeName="r"
                      values="1.5;2.5;1.5"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                {/* Acres label */}
                <text
                  x={field.x + field.width / 2}
                  y={field.y + field.height - 2}
                  textAnchor="middle"
                  fontSize="2"
                  fill={statusColor}
                  opacity="0.8"
                  style={{ pointerEvents: 'none' }}
                >
                  {field.acres}ac
                </text>

                {/* Hover/Selected highlight */}
                {(isSelected || isHovered) && (
                  <rect
                    x={field.x - 0.5}
                    y={field.y - 0.5}
                    width={field.width + 1}
                    height={field.height + 1}
                    rx="2.5"
                    ry="2.5"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="0.8"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="stroke-width"
                      values="0.8;1.2;0.8"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
              </g>
            )
          })}

          {/* Farm house/office icon */}
          <g>
            <rect x="45" y="45" width="10" height="8" fill="#8b5cf6" opacity="0.7" rx="1" />
            <polygon points="45,45 50,40 55,45" fill="#7c3aed" opacity="0.8" />
            <circle cx="48" cy="47" r="0.8" fill="#fbbf24" />
            <circle cx="52" cy="47" r="0.8" fill="#fbbf24" />
            <foreignObject x="48" y="52" width="4" height="4">
              <div style={{ fontSize: '4px', textAlign: 'center' }}>🏠</div>
            </foreignObject>
          </g>

          {/* Compass */}
          <g transform="translate(85, 8)">
            <circle r="3" fill="white" stroke="#666" strokeWidth="0.3" opacity="0.9" />
            <line x1="0" y1="-3" x2="0" y2="0" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
            <text x="0" y="-4.5" textAnchor="middle" fontSize="1.5" fill="#666">N</text>
          </g>
        </svg>
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
              const statusColor = getStatusColor(field.status)
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
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: statusColor }}
                      />
                      <span className="font-medium text-gray-800">{field.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="mr-1">{getCropIcon(field.crop)}</span>
                    {field.crop}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: statusColor }}
                    >
                      {field.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${field.soilHealth}%`,
                            backgroundColor: field.soilHealth >= 85 ? '#22c55e' : field.soilHealth >= 75 ? '#3b82f6' : field.soilHealth >= 65 ? '#eab308' : '#ef4444',
                          }}
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
              className="text-gray-400 hover:text-gray-600 text-2xl"
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

