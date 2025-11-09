import { NextResponse } from 'next/server'

// Dedalus Labs API integration
// This calls the Dedalus API directly (since we're in Node.js, not Python)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { input, model = 'openai/gpt-5-mini' } = body

    // Get API key from environment or use default
    const DEDALUS_API_KEY = process.env.DEDALUS_API_KEY || ''
    const DEDALUS_API_URL = 'https://api.dedaluslabs.ai/v1/chat/completions' // Adjust based on actual API endpoint

    if (!DEDALUS_API_KEY) {
      // For demo/hackathon, return mock response
      return NextResponse.json({
        success: true,
        final_output: generateMockResponse(input),
        note: 'Using mock response. Set DEDALUS_API_KEY environment variable for real API calls.',
      })
    }

    // Make actual API call to Dedalus
    try {
      const response = await fetch(DEDALUS_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEDALUS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input,
          model: model,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          success: true,
          ...data,
        })
      } else {
        // Fallback to mock if API fails
        return NextResponse.json({
          success: true,
          final_output: generateMockResponse(input),
          note: 'API call failed, using mock response',
        })
      }
    } catch (error) {
      console.error('Dedalus API error:', error)
      // Fallback to mock
      return NextResponse.json({
        success: true,
        final_output: generateMockResponse(input),
        note: 'API error, using mock response',
      })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Mock response generator for demo
function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  // Context-aware mock responses for farming queries
  if (lowerInput.includes('soil') || lowerInput.includes('health')) {
    return "Based on your regenerative farming practices, your soil health is excellent. Your fungal-to-bacterial ratio of 0.8:1 indicates a mature, healthy soil ecosystem. The high soil respiration (125 ppm) shows active microbial life. Continue with cover crops and no-till to maintain this health."
  }

  if (lowerInput.includes('carbon') || lowerInput.includes('sequestration')) {
    return "Your farm is sequestering 245 tons of CO₂ annually, equivalent to removing 92 cars from the road. At current carbon credit prices, this represents approximately $8,500 in potential revenue. Your regenerative practices are making a significant climate impact."
  }

  if (lowerInput.includes('yield') || lowerInput.includes('crop')) {
    return "Your crop yield predictions are strong: Corn at 185 bushels/acre, Soybeans at 58, and Wheat at 72. These yields are competitive with conventional farming while using 78% fewer chemical inputs. Your nutrient density scores are excellent, allowing for premium pricing."
  }

  if (lowerInput.includes('water') || lowerInput.includes('irrigation')) {
    return "Your water conservation efforts are impressive. You've saved 125,000 gallons this year, a 64% reduction. Your soil infiltration rate of 7.5 inches/hour is 15x better than conventional farms, providing 42 days of drought resilience."
  }

  if (lowerInput.includes('spending') || lowerInput.includes('cost')) {
    return "Through Knot transaction tracking, you've spent $33,700 this season but saved $31,000 via regenerative practices, resulting in a net benefit. Your biggest savings: $12,500 in avoided fertilizer costs. Focus on eliminating pesticide spending next for additional $4,200 savings."
  }

  // Default response
  return "I can help you with soil health, carbon sequestration, crop yields, water conservation, spending analysis, and sustainability metrics for your regenerative farm. What specific information would you like?"
}

