import { NextResponse } from 'next/server'

// USDA Data API Integration
// Fetches real agricultural data from USDA NASS (National Agricultural Statistics Service)
// and ERS (Economic Research Service) for crop yield predictions

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state') || 'US' // Default to national data
    const commodity = searchParams.get('commodity') || 'CORN' // CORN, SOYBEANS, WHEAT
    const year = searchParams.get('year') || new Date().getFullYear().toString()

    // USDA NASS Quick Stats API
    // Free API - no key required for basic queries
    const USDA_NASS_API = 'https://quickstats.nass.usda.gov/api/api_GET'
    
    // USDA API Key (optional - get free key from https://quickstats.nass.usda.gov/api)
    const USDA_API_KEY = process.env.USDA_API_KEY || ''
    
    // Build query parameters
    const params = new URLSearchParams({
      key: USDA_API_KEY || 'DEMO_KEY', // Use DEMO_KEY if no API key
      format: 'JSON',
      source_desc: 'SURVEY',
      sector_desc: 'CROPS',
      commodity_desc: commodity,
      statisticcat_desc: 'YIELD',
      unit_desc: 'BU / ACRE',
      year: year,
      agg_level_desc: state === 'US' ? 'NATIONAL' : 'STATE',
      state_alpha: state !== 'US' ? state : '',
    })

    try {
      // Fetch from USDA NASS API
      const response = await fetch(`${USDA_NASS_API}?${params.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        
        // Process USDA data
        if (data.data && data.data.length > 0) {
          const processedData = processUSDAData(data.data, commodity)
          return NextResponse.json({
            success: true,
            source: 'USDA NASS',
            data: processedData,
            raw: data.data, // Include raw data for debugging
          })
        } else {
          // If no data, return mock with USDA structure
          return NextResponse.json({
            success: true,
            source: 'USDA NASS (fallback)',
            data: getMockUSDAData(commodity, year),
            note: 'No USDA data available, using processed mock data',
          })
        }
      } else {
        // Fallback to mock data if API fails
        console.log('USDA API not available, using processed mock data')
        return NextResponse.json({
          success: true,
          source: 'Mock (USDA structure)',
          data: getMockUSDAData(commodity, year),
          note: 'USDA API unavailable, using mock data with USDA structure',
        })
      }
    } catch (error) {
      console.error('USDA API error:', error)
      // Fallback to mock data
      return NextResponse.json({
        success: true,
        source: 'Mock (USDA structure)',
        data: getMockUSDAData(commodity, year),
        note: 'USDA API error, using mock data',
      })
    }
  } catch (error) {
    console.error('Error processing USDA request:', error)
    return NextResponse.json(
      { error: 'Failed to fetch USDA data' },
      { status: 500 }
    )
  }
}

// Process raw USDA NASS data into usable format
function processUSDAData(usdaData: any[], commodity: string) {
  // Get the most recent year's data
  const latestData = usdaData.sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  )[0]

  const currentYear = new Date().getFullYear()
  const lastYear = currentYear - 1

  // Extract yield values
  const currentYield = parseFloat(latestData?.Value || '0')
  const historicalData = usdaData
    .filter(d => parseInt(d.year) >= lastYear - 5)
    .map(d => ({
      year: d.year,
      yield: parseFloat(d.Value || '0'),
    }))

  // Calculate trend
  const trend = historicalData.length >= 2
    ? historicalData[historicalData.length - 1].yield > historicalData[historicalData.length - 2].yield
      ? 'up'
      : 'down'
    : 'stable'

  return {
    commodity: commodity,
    currentYield: currentYield,
    lastYearYield: historicalData.find(d => d.year === lastYear.toString())?.yield || currentYield,
    trend: trend,
    historicalData: historicalData,
    confidence: 85, // USDA data is highly reliable
    source: 'USDA NASS',
    lastUpdated: latestData?.year || new Date().getFullYear().toString(),
  }
}

// Mock USDA-structured data (fallback)
function getMockUSDAData(commodity: string, year: string) {
  const baseYields: Record<string, { current: number; lastYear: number }> = {
    CORN: { current: 185, lastYear: 165 },
    SOYBEANS: { current: 52, lastYear: 48 },
    WHEAT: { current: 68, lastYear: 72 },
  }

  const yields = baseYields[commodity] || { current: 100, lastYear: 95 }

  return {
    commodity: commodity,
    currentYield: yields.current,
    lastYearYield: yields.lastYear,
    trend: yields.current > yields.lastYear ? 'up' : 'down',
    historicalData: [
      { year: (parseInt(year) - 4).toString(), yield: yields.lastYear - 10 },
      { year: (parseInt(year) - 3).toString(), yield: yields.lastYear - 5 },
      { year: (parseInt(year) - 2).toString(), yield: yields.lastYear - 2 },
      { year: (parseInt(year) - 1).toString(), yield: yields.lastYear },
      { year: year, yield: yields.current },
    ],
    confidence: 75,
    source: 'Mock (USDA structure)',
    lastUpdated: year,
  }
}

