'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, MessageCircle, Plus, Search, Filter, User, Phone, Mail, Package, DollarSign, Calendar } from 'lucide-react'

interface MarketplaceItem {
  id: string
  farmerName: string
  farmName: string
  itemName: string
  category: 'fertilizer' | 'seeds' | 'equipment' | 'crops' | 'other'
  description: string
  price: number
  quantity: string
  location: string
  postedDate: string
  contactEmail: string
  contactPhone?: string
  imageUrl?: string
}

export default function MarketplacePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showPostForm, setShowPostForm] = useState(false)
  const [newItem, setNewItem] = useState({
    itemName: '',
    category: 'fertilizer' as const,
    description: '',
    price: '',
    quantity: '',
    location: '',
  })

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('farmer_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        router.push('/login')
      }
    }
  }, [router])

  useEffect(() => {
    // Load marketplace items (mock data for now)
    const mockItems: MarketplaceItem[] = [
      {
        id: '1',
        farmerName: 'John Smith',
        farmName: 'Green Valley Farm',
        itemName: 'Organic NPK Fertilizer',
        category: 'fertilizer',
        description: 'High-quality organic fertilizer, 50lb bags. Extra supply from last season.',
        price: 45,
        quantity: '10 bags',
        location: 'Iowa',
        postedDate: '2024-03-20',
        contactEmail: 'john@greenvalley.com',
        contactPhone: '(555) 123-4567',
      },
      {
        id: '2',
        farmerName: 'Sarah Johnson',
        farmName: 'Sunrise Acres',
        itemName: 'Corn Hybrid Seeds',
        category: 'seeds',
        description: 'Premium corn hybrid seeds, 50lb bag. Based on our yield predictions, we have extra.',
        price: 320,
        quantity: '3 bags',
        location: 'Nebraska',
        postedDate: '2024-03-19',
        contactEmail: 'sarah@sunrise.com',
      },
      {
        id: '3',
        farmerName: 'Mike Davis',
        farmName: 'Davis Family Farm',
        itemName: 'Tractor Attachment - Plow',
        category: 'equipment',
        description: 'Used but well-maintained plow attachment. Upgrading equipment.',
        price: 1200,
        quantity: '1 unit',
        location: 'Kansas',
        postedDate: '2024-03-18',
        contactEmail: 'mike@davisfarm.com',
        contactPhone: '(555) 987-6543',
      },
    ]
    setItems(mockItems)
    setFilteredItems(mockItems)
  }, [])

  useEffect(() => {
    // Filter items based on search and category
    let filtered = items

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.farmName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory, items])

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMarketplaceItem: MarketplaceItem = {
      id: Date.now().toString(),
      farmerName: user?.name || 'Farmer',
      farmName: user?.farmName || 'Farm',
      itemName: newItem.itemName,
      category: newItem.category,
      description: newItem.description,
      price: parseFloat(newItem.price),
      quantity: newItem.quantity,
      location: newItem.location || 'Not specified',
      postedDate: new Date().toISOString().split('T')[0],
      contactEmail: user?.email || '',
    }

    setItems([newMarketplaceItem, ...items])
    setShowPostForm(false)
    setNewItem({
      itemName: '',
      category: 'fertilizer',
      description: '',
      price: '',
      quantity: '',
      location: '',
    })
  }

  const quickPostFromPrediction = () => {
    // Pre-fill form based on predictions (simulated)
    setNewItem({
      itemName: 'Extra Fertilizer Supply',
      category: 'fertilizer',
      description: 'Based on yield predictions, we have extra fertilizer available.',
      price: '45',
      quantity: '10 bags',
      location: user?.farmName || '',
    })
    setShowPostForm(true)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      fertilizer: 'bg-red-100 text-red-800',
      seeds: 'bg-blue-100 text-blue-800',
      equipment: 'bg-purple-100 text-purple-800',
      crops: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors.other
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Farmers Marketplace</h1>
              <p className="text-gray-600">Buy, sell, and connect with fellow farmers</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={quickPostFromPrediction}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Package className="h-4 w-4" />
                <span>Quick Post from Predictions</span>
              </button>
              <button
                onClick={() => setShowPostForm(!showPostForm)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post Item</span>
              </button>
            </div>
          </div>
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Post New Item</h2>
            <form onSubmit={handlePostItem} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    value={newItem.itemName}
                    onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="fertilizer">Fertilizer</option>
                    <option value="seeds">Seeds</option>
                    <option value="equipment">Equipment</option>
                    <option value="crops">Crops</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="text"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 10 bags, 50 lbs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Post Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items, farmers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Categories</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="seeds">Seeds</option>
                <option value="equipment">Equipment</option>
                <option value="crops">Crops</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Marketplace Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.itemName}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-bold text-green-600">${item.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{item.location}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.farmerName}</p>
                    <p className="text-xs text-gray-500">{item.farmName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>Posted {new Date(item.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`mailto:${item.contactEmail}`}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </a>
                  {item.contactPhone && (
                    <a
                      href={`tel:${item.contactPhone}`}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No items found. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  )
}

