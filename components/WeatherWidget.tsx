'use client'

import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react'

export default function WeatherWidget() {
  const weather = {
    current: {
      temp: 72,
      condition: 'Partly Cloudy',
      icon: Cloud,
      humidity: 65,
      windSpeed: 8,
    },
    forecast: [
      { day: 'Today', high: 75, low: 58, condition: 'Sunny', icon: Sun },
      { day: 'Tomorrow', high: 73, low: 60, condition: 'Light Rain', icon: CloudRain },
      { day: 'Wed', high: 70, low: 55, condition: 'Cloudy', icon: Cloud },
      { day: 'Thu', high: 68, low: 52, condition: 'Sunny', icon: Sun },
    ],
  }

  const CurrentIcon = weather.current.icon

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Weather Forecast</h2>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b">
        <div className="flex items-center space-x-4">
          <CurrentIcon className="h-12 w-12 text-blue-500" />
          <div>
            <p className="text-3xl font-bold text-gray-800">{weather.current.temp}°F</p>
            <p className="text-gray-600">{weather.current.condition}</p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center space-x-2 text-gray-600">
            <Droplets className="h-4 w-4" />
            <span>{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Wind className="h-4 w-4" />
            <span>{weather.current.windSpeed} mph</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {weather.forecast.map((day, index) => {
          const Icon = day.icon
          return (
            <div key={index} className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
              <Icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-800">{day.high}°</p>
              <p className="text-sm text-gray-500">{day.low}°</p>
              <p className="text-xs text-gray-500 mt-1">{day.condition}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

