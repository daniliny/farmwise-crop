import { NextResponse } from 'next/server'

// Mock user database (in production, use a real database)
const users = [
  {
    id: '1',
    email: 'demo@farm.com',
    password: 'demo123', // In production, use hashed passwords
    name: 'John Farmer',
    farmName: 'Green Valley Farm',
    acres: 250,
    crops: ['Corn', 'Soybeans', 'Wheat'],
  },
  {
    id: '2',
    email: 'sarah@farm.com',
    password: 'farm123',
    name: 'Sarah Johnson',
    farmName: 'Sunrise Organic Farm',
    acres: 180,
    crops: ['Corn', 'Soybeans'],
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

