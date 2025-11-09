'use client'

import { TrendingUp, Droplets, Thermometer, Calendar } from 'lucide-react'

export default function QuickStats() {
  const stats = [
    {
      label: 'Expected Yield',
      value: '+12%',
      change: 'vs last season',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Soil Moisture',
      value: 'Optimal',
      change: '68% capacity',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Avg Temperature',
      value: '72°F',
      change: 'Ideal range',
      icon: Thermometer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Days to Harvest',
      value: '45',
      change: 'Corn field A',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
            <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        )
      })}
    </div>
  )
}

