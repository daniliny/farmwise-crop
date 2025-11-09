import { NextResponse } from 'next/server'

// Capital One Nessie API - Customer Management
// Creates or retrieves customer accounts for farmers

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, streetNumber, streetName, city, state, zip, email } = body

    const CAPITAL_ONE_API_KEY = process.env.CAPITAL_ONE_API_KEY || ''
    const NESSIE_API_BASE = 'http://api.reimaginebanking.com'

    if (!CAPITAL_ONE_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'CAPITAL_ONE_API_KEY not set',
        note: 'Add your Capital One Nessie API key to .env.local',
      }, { status: 400 })
    }

    // Create customer payload
    const customerPayload = {
      first_name: firstName,
      last_name: lastName,
      address: {
        street_number: streetNumber || '123',
        street_name: streetName || 'Farm Road',
        city: city || 'Farm City',
        state: state || 'IA',
        zip: zip || '50001',
      },
    }

    const url = `${NESSIE_API_BASE}/customers?key=${CAPITAL_ONE_API_KEY}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerPayload),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          success: true,
          customer: data,
          customerId: data.objectCreated?._id || data._id,
          message: 'Customer created successfully',
        })
      } else {
        const errorText = await response.text()
        return NextResponse.json({
          success: false,
          error: 'Failed to create customer',
          details: errorText,
        }, { status: response.status })
      }
    } catch (error) {
      console.error('Capital One API error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to Capital One API',
        details: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Capital One route error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Get customer by ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const CAPITAL_ONE_API_KEY = process.env.CAPITAL_ONE_API_KEY || ''

    if (!customerId || !CAPITAL_ONE_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Missing customerId or API key',
      }, { status: 400 })
    }

    const NESSIE_API_BASE = 'http://api.reimaginebanking.com'
    const url = `${NESSIE_API_BASE}/customers/${customerId}?key=${CAPITAL_ONE_API_KEY}`

    try {
      const response = await fetch(url)
      
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          success: true,
          customer: data,
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'Failed to fetch customer',
        }, { status: response.status })
      }
    } catch (error) {
      console.error('Capital One API error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to Capital One API',
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Capital One route error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

