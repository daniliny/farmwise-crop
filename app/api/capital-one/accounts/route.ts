import { NextResponse } from 'next/server'

// Capital One Nessie API Integration
// Creates accounts and handles loan applications for farmers

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, customerId, accountType, loanAmount, ...otherData } = body

    // Get API key from environment
    const CAPITAL_ONE_API_KEY = process.env.CAPITAL_ONE_API_KEY || ''
    const NESSIE_API_BASE = 'http://api.reimaginebanking.com'

    if (!CAPITAL_ONE_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'CAPITAL_ONE_API_KEY not set',
        note: 'Add your Capital One Nessie API key to .env.local',
      }, { status: 400 })
    }

    // Create a new account (Savings or Loan)
    if (action === 'create_account') {
      const accountPayload = {
        type: accountType || 'Savings',
        nickname: otherData.nickname || 'Farm Account',
        rewards: 0,
        balance: accountType === 'Loan' ? -loanAmount : (otherData.initialDeposit || 0),
      }

      const url = `${NESSIE_API_BASE}/customers/${customerId}/accounts?key=${CAPITAL_ONE_API_KEY}`

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accountPayload),
        })

        if (response.ok) {
          const data = await response.json()
          return NextResponse.json({
            success: true,
            account: data,
            message: accountType === 'Loan' 
              ? `Loan account created successfully. Loan amount: $${loanAmount}`
              : 'Account created successfully',
          })
        } else {
          const errorText = await response.text()
          return NextResponse.json({
            success: false,
            error: 'Failed to create account',
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
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action',
    }, { status: 400 })
  } catch (error) {
    console.error('Capital One route error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Get customer accounts
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
    const url = `${NESSIE_API_BASE}/customers/${customerId}/accounts?key=${CAPITAL_ONE_API_KEY}`

    try {
      const response = await fetch(url)
      
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          success: true,
          accounts: data,
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'Failed to fetch accounts',
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

