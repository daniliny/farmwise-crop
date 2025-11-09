'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { format, addDays, isAfter, isBefore } from 'date-fns'

export default function PlantingAdvice() {
  const [advice, setAdvice] = useState<any>(() => {
    // Initialize with mock data immediately
    const today = new Date()
    return {
      currentTasks: [
        {
          crop: 'Corn',
          field: 'Field A',
          task: 'Plant seeds',
          date: format(addDays(today, 3), 'yyyy-MM-dd'),
          priority: 'high',
          status: 'upcoming',
        },
        {
          crop: 'Soybeans',
          field: 'Field B',
          task: 'Apply fertilizer',
          date: format(addDays(today, 1), 'yyyy-MM-dd'),
          priority: 'high',
          status: 'urgent',
        },
        {
          crop: 'Wheat',
          field: 'Field C',
          task: 'Harvest',
          date: format(addDays(today, 45), 'yyyy-MM-dd'),
          priority: 'medium',
          status: 'upcoming',
        },
      ],
      recommendations: [
        {
          crop: 'Corn',
          action: 'Plant',
          optimalWindow: {
            start: format(addDays(today, 2), 'MMM d'),
            end: format(addDays(today, 10), 'MMM d'),
          },
          reason: 'Soil temperature has reached optimal 55°F, weather forecast is favorable',
          field: 'Field A',
        },
        {
          crop: 'Cover Crop',
          action: 'Plant',
          optimalWindow: {
            start: format(addDays(today, 30), 'MMM d'),
            end: format(addDays(today, 45), 'MMM d'),
          },
          reason: 'Improve soil health and prevent erosion after harvest',
          field: 'Field C',
        },
      ],
    }
  })

  useEffect(() => {
    // Try to fetch real data in background
    fetch('/api/planting-advice')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('API not available')
      })
      .then(data => setAdvice(data))
      .catch(() => {
        // Keep using mock data
        console.log('Using mock planting advice')
      })
  }, [])

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300',
    }
    return colors[priority] || colors.medium
  }

  const getStatusIcon = (status: string) => {
    return status === 'urgent' ? (
      <AlertCircle className="h-5 w-5 text-red-600" />
    ) : (
      <CheckCircle className="h-5 w-5 text-green-600" />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Planting & Harvesting Advice</h2>
        <Calendar className="h-6 w-6 text-primary-600" />
      </div>

      {/* Current Tasks */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          {advice.currentTasks.map((task: any, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(task.status)}
                    <div>
                      <h4 className="font-semibold text-gray-800">{task.task}</h4>
                      <p className="text-sm text-gray-600">
                        {task.crop} • {task.field}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(task.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {isBefore(new Date(task.date), new Date())
                          ? 'Overdue'
                          : `${Math.ceil((new Date(task.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days away`}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">AI-Powered Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advice.recommendations.map((rec: any, index: number) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-primary-500 rounded-lg p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg mb-1">
                    {rec.action} {rec.crop}
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {rec.field}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">Optimal Window:</p>
                <p className="text-primary-700 font-medium">
                  {rec.optimalWindow.start} - {rec.optimalWindow.end}
                </p>
              </div>
              <p className="text-sm text-gray-600 italic">&ldquo;{rec.reason}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Climate Adaptation Tips */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Climate Adaptation Strategy
        </h3>
        <p className="text-sm text-blue-700">
          Based on climate projections, consider diversifying your crop rotation to include 
          drought-resistant varieties. The AI recommends planting 20% of your acreage with 
          cover crops to improve soil resilience against unpredictable weather patterns.
        </p>
      </div>
    </div>
  )
}

