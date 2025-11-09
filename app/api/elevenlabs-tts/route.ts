import { NextResponse } from 'next/server'

// ElevenLabs Text-to-Speech API endpoint
// Integrates with Dedalus AI responses for natural voice synthesis
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, voice_id = '21m00Tcm4TlvDq8ikWAM' } = body // Default: Rachel voice

    // Get ElevenLabs API key from environment
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || ''
    const ELEVENLABS_API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`

    if (!ELEVENLABS_API_KEY) {
      // Return error if no API key (client will use Web Speech API fallback)
      return NextResponse.json({
        success: false,
        error: 'ELEVENLABS_API_KEY not set',
        note: 'Using Web Speech API fallback. Add ELEVENLABS_API_KEY to enable ElevenLabs voice.',
      }, { status: 200 }) // Return 200 so client can handle fallback
    }

    // Make actual API call to ElevenLabs
    try {
      const response = await fetch(ELEVENLABS_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      })

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer()
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.byteLength.toString(),
          },
        })
      } else {
        const errorText = await response.text()
        console.error('ElevenLabs API error:', response.status, errorText)
        return NextResponse.json(
          { 
            success: false,
            error: 'ElevenLabs API call failed',
            status: response.status,
            details: errorText,
          },
          { status: response.status }
        )
      }
    } catch (error) {
      console.error('ElevenLabs fetch error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to connect to ElevenLabs API',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('ElevenLabs API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

