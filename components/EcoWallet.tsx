'use client'

import { DollarSign, TrendingDown, PiggyBank, Award } from 'lucide-react'

export default function EcoWallet() {
  // Russell Hedrick's proven savings: $62,000/year on 500 acres
  // That's $124/acre/year in avoided costs
  const savings = {
    totalSaved: 31000,
    fertilizerAvoided: 12500,
    herbicideAvoided: 4000,
    pesticideAvoided: 3500,
    fuelAvoided: 2000,
    seedCostReduction: 3000,
    carbonCreditPotential: 8500,
    thisYear: new Date().getFullYear(),
    lastYear: new Date().getFullYear() - 1,
  }

  const categories = [
    {
      name: 'Fertilizer Avoided',
      amount: savings.fertilizerAvoided,
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'No synthetic fertilizers needed due to cover crop nitrogen',
    },
    {
      name: 'Herbicide Avoided',
      amount: savings.herbicideAvoided,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Reduced weed pressure through soil armor',
    },
    {
      name: 'Pesticide Avoided',
      amount: savings.pesticideAvoided,
      icon: TrendingDown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Natural pest resistance from healthy soil',
    },
    {
      name: 'Fuel Savings',
      amount: savings.fuelAvoided,
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'No-till practices reduce tractor passes',
    },
    {
      name: 'Seed Cost Reduction',
      amount: savings.seedCostReduction,
      icon: TrendingDown,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Cover crop seed pays for itself',
    },
    {
      name: 'Carbon Credit Potential',
      amount: savings.carbonCreditPotential,
      icon: Award,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Estimated annual carbon credit revenue',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Eco-Wallet</h2>
          <p className="text-sm text-gray-600 mt-1">Money saved through regenerative practices</p>
        </div>
        <PiggyBank className="h-6 w-6 text-primary-600" />
      </div>

      {/* Total Savings Hero */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Total Savings {savings.thisYear}</p>
            <p className="text-4xl font-bold">${savings.totalSaved.toLocaleString()}</p>
            <p className="text-sm opacity-75 mt-1">Based on Russell Hedrick&apos;s proven model</p>
          </div>
          <DollarSign className="h-16 w-16 opacity-20" />
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs opacity-75">
            💰 $124 saved per acre per year • Projected savings for {savings.thisYear}
          </p>
        </div>
      </div>

      {/* Savings Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <div
              key={index}
              className={`${category.bgColor} rounded-lg p-4 border-l-4 ${
                category.color.replace('text-', 'border-')
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  <span className="font-semibold text-gray-800">{category.name}</span>
                </div>
              </div>
              <p className={`text-2xl font-bold ${category.color} mb-1`}>
                ${category.amount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">{category.description}</p>
            </div>
          )
        })}
      </div>

      {/* Key Insight */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold text-blue-800 mb-2">💡 Regenerative Insight</p>
        <p className="text-sm text-blue-700">
          Russell Hedrick proved that eliminating $62,000 in annual input costs on 500 acres 
          while maintaining yields is possible. Your Eco-Wallet tracks these savings in real-time, 
          proving that &quot;ecology is the new economy.&quot;
        </p>
      </div>
    </div>
  )
}

