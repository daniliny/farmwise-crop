'use client'

import { useState, useEffect, useCallback } from 'react'
import { DollarSign, TrendingDown, TrendingUp, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react'

interface Transaction {
  id: string
  merchant: string
  amount: number
  category: string
  date: string
  sku?: string
}

interface SpendingAnalysis {
  totalSpent: number
  categories: {
    fertilizer: number
    seeds: number
    equipment: number
    fuel: number
    pesticides: number
    other: number
  }
  savings: number
  netProfit: number
  recommendations: string[]
}

// Mock transaction data for demo (replace with real Knot API calls)
const mockTransactions: Transaction[] = [
    { id: '1', merchant: 'Tractor Supply Co', amount: 12500, category: 'fertilizer', date: '2024-03-15', sku: 'FERT-NPK-50LB' },
    { id: '2', merchant: 'John Deere', amount: 8500, category: 'equipment', date: '2024-03-10', sku: 'JD-PLOW-2024' },
    { id: '3', merchant: 'Seed Co', amount: 3200, category: 'seeds', date: '2024-02-28', sku: 'CORN-HYBRID-X' },
    { id: '4', merchant: 'AgChem', amount: 4200, category: 'pesticides', date: '2024-03-05', sku: 'HERB-ROUNDUP' },
    { id: '5', merchant: 'Shell', amount: 2800, category: 'fuel', date: '2024-03-12', sku: 'DIESEL-50GAL' },
    { id: '6', merchant: 'Tractor Supply Co', amount: 1500, category: 'fertilizer', date: '2024-03-20', sku: 'FERT-UREA-40LB' },
]

export default function SpendingTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [analysis, setAnalysis] = useState<SpendingAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [knotConnected, setKnotConnected] = useState(false)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    try {
      // Call our API route which integrates with Knot
      const response = await fetch('/api/knot-transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: 44, // Can be dynamic based on user selection
          external_user_id: 'farmer-123',
          limit: 10,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        // Map Knot transaction format to our Transaction interface
        const mappedTransactions = data.transactions?.map((txn: any) => ({
          id: txn.id,
          merchant: txn.merchant || 'Unknown',
          amount: txn.amount || 0,
          category: categorizeTransaction(txn),
          date: txn.date || new Date().toISOString(),
          sku: txn.sku || txn.sku_data?.sku,
        })) || mockTransactions
        
        setTransactions(mappedTransactions)
        calculateAnalysis(mappedTransactions)
      } else {
        // Fallback to mock data if API fails
        setTransactions(mockTransactions)
        calculateAnalysis(mockTransactions)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      // Fallback to mock data
      setTransactions(mockTransactions)
      calculateAnalysis(mockTransactions)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetch transactions from Knot API
    if (knotConnected) {
      fetchTransactions()
    }
  }, [knotConnected, fetchTransactions])

  const categorizeTransaction = (txn: any): string => {
    // Categorize based on merchant name or SKU
    const merchant = (txn.merchant || '').toLowerCase()
    const sku = (txn.sku || txn.sku_data?.sku || '').toLowerCase()
    
    if (merchant.includes('seed') || sku.includes('seed') || sku.includes('corn') || sku.includes('soy')) {
      return 'seeds'
    }
    if (merchant.includes('fert') || sku.includes('fert') || sku.includes('npk') || sku.includes('urea')) {
      return 'fertilizer'
    }
    if (merchant.includes('pest') || merchant.includes('chem') || sku.includes('herb') || sku.includes('pest')) {
      return 'pesticides'
    }
    if (merchant.includes('fuel') || merchant.includes('gas') || merchant.includes('shell') || sku.includes('diesel')) {
      return 'fuel'
    }
    if (merchant.includes('deere') || merchant.includes('tractor') || merchant.includes('equipment')) {
      return 'equipment'
    }
    return 'other'
  }

  const calculateAnalysis = (txns: Transaction[]) => {
    const categories = {
      fertilizer: 0,
      seeds: 0,
      equipment: 0,
      fuel: 0,
      pesticides: 0,
      other: 0,
    }

    txns.forEach(txn => {
      const cat = txn.category as keyof typeof categories
      if (categories.hasOwnProperty(cat)) {
        categories[cat] += txn.amount
      } else {
        categories.other += txn.amount
      }
    })

    const totalSpent = Object.values(categories).reduce((sum, val) => sum + val, 0)
    
    // Compare with regenerative savings from EcoWallet
    const regenerativeSavings = 31000 // From EcoWallet component
    const netProfit = regenerativeSavings - totalSpent

    const recommendations: string[] = []
    if (categories.fertilizer > 0) {
      recommendations.push(`You spent $${categories.fertilizer.toLocaleString()} on fertilizer. Cover crops can eliminate this cost entirely.`)
    }
    if (categories.pesticides > 0) {
      recommendations.push(`Pesticide spending: $${categories.pesticides.toLocaleString()}. Healthy soil reduces pest pressure naturally.`)
    }
    if (categories.fuel > 0) {
      recommendations.push(`Fuel costs: $${categories.fuel.toLocaleString()}. No-till practices can reduce tractor passes by 60%.`)
    }
    if (netProfit < 0) {
      recommendations.push(`⚠️ You're spending more than you're saving. Focus on eliminating fertilizer and pesticide costs first.`)
    } else {
      recommendations.push(`✅ Net profit: $${netProfit.toLocaleString()} from regenerative practices!`)
    }

    setAnalysis({
      totalSpent,
      categories,
      savings: regenerativeSavings,
      netProfit,
      recommendations,
    })
  }

  const handleConnectKnot = async () => {
    setLoading(true)
    
    // Knot SDK Integration (for production)
    // The Knot SDK would be used here for real account linking
    // For hackathon demo, we simulate the connection and fetch from API
    
    // Real implementation would be:
    // 1. Initialize Knot SDK with clientId
    // 2. Call linkAccount() to open Knot UI
    // 3. Handle onSuccess callback to get merchant_id
    // 4. Use merchant_id to sync transactions
    
    // For now, we simulate connection and fetch transactions
    // This demonstrates the full flow including SKU data usage
    
    try {
      // Simulate SDK connection flow
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // After "connecting", fetch transactions (which will use real Knot API if available)
      setKnotConnected(true)
      await fetchTransactions()
    } catch (error) {
      console.error('Error connecting Knot account:', error)
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      fertilizer: 'bg-red-100 text-red-800 border-red-300',
      seeds: 'bg-blue-100 text-blue-800 border-blue-300',
      equipment: 'bg-purple-100 text-purple-800 border-purple-300',
      fuel: 'bg-orange-100 text-orange-800 border-orange-300',
      pesticides: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      other: 'bg-gray-100 text-gray-800 border-gray-300',
    }
    return colors[category] || colors.other
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Spending Tracker</h2>
          <p className="text-sm text-gray-600 mt-1">Track expenses and optimize profitability</p>
        </div>
        <div className="flex items-center space-x-3">
          {knotConnected ? (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Knot Connected</span>
            </div>
          ) : (
            <button
              onClick={handleConnectKnot}
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Connect Knot Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Knot Logo & Integration Badge - Visual Representation Required */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
            KNOT
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Powered by Knot Transaction Link API</p>
            <p className="text-xs text-gray-600">Automatically syncs transactions with SKU data from your agricultural suppliers</p>
            {knotConnected && (
              <p className="text-xs text-green-600 mt-1 font-medium">✓ Account linked and syncing</p>
            )}
          </div>
        </div>
      </div>

      {loading && !analysis ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Syncing transactions...</p>
        </div>
      ) : analysis ? (
        <>
          {/* Profit/Loss Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Spent</span>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">${analysis.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">This season</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Regenerative Savings</span>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">${analysis.savings.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">From Eco-Wallet</p>
            </div>
            <div className={`border-l-4 rounded-lg p-4 ${
              analysis.netProfit >= 0 
                ? 'bg-emerald-50 border-emerald-500' 
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Net Profit</span>
                {analysis.netProfit >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <p className={`text-2xl font-bold ${
                analysis.netProfit >= 0 ? 'text-emerald-600' : 'text-orange-600'
              }`}>
                ${Math.abs(analysis.netProfit).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {analysis.netProfit >= 0 ? 'Positive ROI' : 'Needs optimization'}
              </p>
            </div>
          </div>

          {/* Spending by Category */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Spending by Category</h3>
            <div className="space-y-2">
              {Object.entries(analysis.categories)
                .filter(([_, amount]) => amount > 0)
                .sort(([_, a], [__, b]) => b - a)
                .map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded text-xs font-medium border capitalize ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {((amount / analysis.totalSpent) * 100).toFixed(1)}% of total
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">${amount.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Transactions with SKU Data - Knot Requirement */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">Recent Transactions</h3>
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                SKU Data Included
              </span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.slice(0, 5).map(txn => (
                <div key={txn.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-800">{txn.merchant}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${getCategoryColor(txn.category)}`}>
                        {txn.category}
                      </span>
                    </div>
                    {txn.sku && (
                      <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 mt-1 mb-1">
                        <p className="text-xs font-semibold text-blue-800">SKU: <span className="font-mono">{txn.sku}</span></p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400">{new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold text-red-600">${txn.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            {transactions.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No transactions found. Connect your Knot account to sync.</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Profitability Recommendations
            </h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  )
}

