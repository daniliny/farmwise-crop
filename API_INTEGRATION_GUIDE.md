# API Integration Guide

## Overview

This guide shows you how to integrate and use the three main AI APIs in your farm engagement app:
- **Gemini** - Text summarization
- **Dedalus** - AI-powered advice
- **ElevenLabs** - Text-to-speech

All APIs follow the same pattern: `POST /api/service → forwards to external API → returns output`

---

## 🎯 Integration Pattern

All API routes follow this structure:

```typescript
// app/api/[service]/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    const body = await request.json()
    const { input } = body

    // 2. Check API key (if required)
    if (!process.env.SERVICE_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // 3. Call external API
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SERVICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* request data */ }),
    })

    // 4. Handle response
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // 5. Return formatted response
    return NextResponse.json({ result: data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
```

---

## 1. Gemini API - Text Summarization

### Route: `/app/api/gemini/route.ts`

### Purpose
Summarizes user posts, updates, and content using Google's Gemini model.

### How to Call from Frontend

```typescript
const summarizeText = async (text: string) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to summarize')
    }

    const data = await response.json()
    return data.summary // The summarized text
  } catch (error) {
    console.error('Gemini API error:', error)
    // Fallback logic here
  }
}
```

### Request Format
```json
{
  "text": "Your long text content here..."
}
```

### Response Format
```json
{
  "summary": "Short summary of the text..."
}
```

### Error Handling
- Returns `500` if `GEMINI_API_KEY` is not set
- Returns `400` if `text` is missing
- Returns API error details if Gemini API fails

### Environment Variables
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash  # Optional: defaults to gemini-2.5-flash
# Other options: gemini-2.5-pro (better quality), gemini-1.5-flash (older)
```

---

## 2. Dedalus API - AI-Powered Advice

### Route: `/app/api/dedalus/route.ts`

### Purpose
Provides AI-powered farm advice using GPT-4/Claude models via Dedalus Labs.

### How to Call from Frontend

```typescript
const getAIAdvice = async (input: string, model?: string) => {
  try {
    const response = await fetch('/api/dedalus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input,
        model: model || 'openai/gpt-5-mini',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get AI advice')
    }

    const data = await response.json()
    return data.final_output || data.text // The AI response
  } catch (error) {
    console.error('Dedalus API error:', error)
    // Falls back to mock responses automatically
  }
}
```

### Request Format
```json
{
  "input": "What should I do about my soil health?",
  "model": "openai/gpt-5-mini"  // Optional
}
```

### Response Format
```json
{
  "success": true,
  "final_output": "AI-generated advice here...",
  "note": "Using mock response..."  // Only if API key not set
}
```

### Fallback Behavior
- If `DEDALUS_API_KEY` is not set, returns intelligent mock responses
- If API call fails, falls back to mock responses
- Mock responses are context-aware based on input keywords

### Environment Variables
```bash
DEDALUS_API_KEY=your_dedalus_api_key_here
```

---

## 3. ElevenLabs API - Text-to-Speech

### Route: `/app/api/elevenlabs-tts/route.ts`

### Purpose
Converts text to natural-sounding speech audio.

### How to Call from Frontend

```typescript
const speakText = async (text: string, voiceId?: string) => {
  try {
    const response = await fetch('/api/elevenlabs-tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        voice_id: voiceId || '21m00Tcm4TlvDq8ikWAM', // Rachel voice
      }),
    })

    if (!response.ok) {
      // Fallback to Web Speech API
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterance)
      }
      return
    }

    // Get audio blob and play it
    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl)
    }
    
    await audio.play()
  } catch (error) {
    console.error('ElevenLabs API error:', error)
    // Fallback to Web Speech API
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }
}
```

### Request Format
```json
{
  "text": "Text to convert to speech",
  "voice_id": "21m00Tcm4TlvDq8ikWAM"  // Optional
}
```

### Response Format
- **Success**: Returns `audio/mpeg` blob (binary audio data)
- **Error**: Returns JSON with error details

### Fallback Behavior
- If `ELEVENLABS_API_KEY` is not set, returns JSON error (client should use Web Speech API)
- If API call fails, client should fall back to browser's Web Speech API

### Environment Variables
```bash
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### Available Voices
- `21m00Tcm4TlvDq8ikWAM` - Rachel (default, natural, clear)
- `AZnzlk1XvdvUeBnXmlld` - Domi (professional)
- `EXAVITQu4vr4xnSDxMaL` - Bella (warm)
- See full list in `ELEVENLABS_DEDALUS_INTEGRATION.md`

---

## 🔄 Complete Integration Example

Here's how to use all three APIs together in a component:

```typescript
'use client'

import { useState } from 'react'

export default function PostComponent() {
  const [post, setPost] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    setLoading(true)

    // 1. Post the content
    // ... save to database ...

    // 2. Get summary from Gemini
    try {
      const geminiResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: post }),
      })
      const geminiData = await geminiResponse.json()
      setSummary(geminiData.summary)
    } catch (error) {
      console.error('Gemini error:', error)
    }

    // 3. If it's a question, get AI advice from Dedalus
    if (post.includes('?')) {
      try {
        const dedalusResponse = await fetch('/api/dedalus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: post }),
        })
        })
        const dedalusData = await dedalusResponse.json()
        // Use dedalusData.final_output for AI advice
      } catch (error) {
        console.error('Dedalus error:', error)
      }
    }

    // 4. Play audio with ElevenLabs
    try {
      const audioResponse = await fetch('/api/elevenlabs-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summary || post }),
      })

      if (audioResponse.ok) {
        const audioBlob = await audioResponse.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        await audio.play()
      }
    } catch (error) {
      console.error('ElevenLabs error:', error)
      // Fallback to Web Speech API
      if (window.speechSynthesis) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(summary || post))
      }
    }

    setLoading(false)
  }

  return (
    <div>
      <textarea value={post} onChange={(e) => setPost(e.target.value)} />
      <button onClick={handlePost} disabled={loading}>
        Post
      </button>
      {summary && <div>Summary: {summary}</div>}
    </div>
  )
}
```

---

## 🧪 Testing Your APIs

### Test Gemini API
```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a long text that needs to be summarized into a shorter version."}'
```

### Test Dedalus API
```bash
curl -X POST http://localhost:3000/api/dedalus \
  -H "Content-Type: application/json" \
  -d '{"input": "What is regenerative farming?", "model": "openai/gpt-5-mini"}'
```

### Test ElevenLabs API
```bash
curl -X POST http://localhost:3000/api/elevenlabs-tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, this is a test of text to speech."}' \
  --output test.mp3
```

### Browser Console Testing
```javascript
// Test Gemini
fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Test text' })
})
.then(r => r.json())
.then(console.log)

// Test Dedalus
fetch('/api/dedalus', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: 'What is soil health?' })
})
.then(r => r.json())
.then(console.log)

// Test ElevenLabs
fetch('/api/elevenlabs-tts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Hello world' })
})
.then(r => r.blob())
.then(blob => {
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.play()
})
```

---

## 🐛 Troubleshooting

### Gemini Not Working
1. Check `GEMINI_API_KEY` is set in `.env.local` (no space after =)
2. Restart dev server after adding key
3. Check model name - default is `gemini-2.5-flash`. If 404 error, try:
   - `gemini-2.5-pro` (better quality)
   - `gemini-2.5-flash` (default, fast)
   - `gemini-1.5-flash` (older fallback)
4. Verify API key is valid in Google AI Studio
5. Note: `gemini-pro` is deprecated - use `gemini-2.5-flash` or newer

### Dedalus Not Working
1. Check `DEDALUS_API_KEY` is set (optional - has fallback)
2. Verify API endpoint URL is correct
3. Check API quotas/limits
4. Falls back to mock responses if unavailable

### ElevenLabs Not Working
1. Check `ELEVENLABS_API_KEY` is set (optional - has fallback)
2. Verify voice_id is valid
3. Check API quotas/limits
4. Falls back to Web Speech API if unavailable

### General Issues
- **Routes not found**: Make sure files are in `app/api/[service]/route.ts`
- **CORS errors**: Next.js API routes handle CORS automatically
- **Environment variables not loading**: Restart dev server after changes
- **API calls timing out**: Check network connectivity and API status

---

## 📁 File Structure

```
app/
  api/
    gemini/
      route.ts          # Gemini API route
    dedalus/
      route.ts          # Dedalus API route
    elevenlabs-tts/
      route.ts          # ElevenLabs API route

components/
  CommunityFeed.tsx     # Example component using all three APIs
  VoiceAssistant.tsx    # Uses Dedalus + ElevenLabs

.env.local              # API keys (not committed to git)
```

---

## ✅ Summary

All three APIs follow the same pattern:
1. **Client** → `POST /api/[service]` with JSON body
2. **API Route** → Validates, calls external API
3. **External API** → Returns response
4. **API Route** → Formats and returns to client
5. **Client** → Handles response (with fallbacks if needed)

Each API has:
- ✅ Proper error handling
- ✅ Environment variable configuration
- ✅ Fallback mechanisms
- ✅ Clear request/response formats
- ✅ TypeScript types

**Ready to integrate!** 🚀

