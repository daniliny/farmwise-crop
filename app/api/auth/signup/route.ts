import { NextResponse } from 'next/server'

// Mock user database (in production, use a real database)
const users: any[] = [
  {
    id: '1',
    email: 'demo@farm.com',
    password: 'demo123',
    name: 'John Farmer',
    farmName: 'Green Valley Farm',
    acres: 250,
    crops: ['Corn', 'Soybeans', 'Wheat'],
  },
]

export async function POST(request: Request) {
  try {
    const { email, password, name, farmName } = await request.json()

    if (!email || !password || !name || !farmName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      email,
      password, // In production, hash this password
      name,
      farmName,
      acres: 100, // Default
      crops: ['Corn', 'Soybeans'], // Default
    }

    users.push(newUser)

    // Generate token
    const token = `token_${newUser.id}_${Date.now()}`

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser

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

