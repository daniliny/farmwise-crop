import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // In production, verify JWT token and get user from database
    // For now, extract user ID from token
    const userId = token.split('_')[1]

    // Mock user lookup (in production, query database)
    const mockUsers: any = {
      '1': {
        id: '1',
        email: 'demo@farm.com',
        name: 'John Farmer',
        farmName: 'Green Valley Farm',
        acres: 250,
        crops: ['Corn', 'Soybeans', 'Wheat'],
      },
      '2': {
        id: '2',
        email: 'sarah@farm.com',
        name: 'Sarah Johnson',
        farmName: 'Sunrise Organic Farm',
        acres: 180,
        crops: ['Corn', 'Soybeans'],
      },
    }

    const user = mockUsers[userId]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

