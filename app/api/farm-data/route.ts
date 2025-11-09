import { NextResponse } from 'next/server'

export async function GET() {
  // Mock farm data - in production, this would fetch from a database
  const farmData = {
    crops: ['Corn', 'Soybeans', 'Wheat'],
    totalAcres: 250,
    currentSeason: 'Spring 2024',
    fields: [
      { id: 1, name: 'Field A', crop: 'Corn', acres: 100 },
      { id: 2, name: 'Field B', crop: 'Soybeans', acres: 80 },
      { id: 3, name: 'Field C', crop: 'Wheat', acres: 70 },
    ],
  }

  return NextResponse.json(farmData)
}

