# API Quick Reference Card

## 🚀 Quick Start

### 1. Gemini - Summarize Text
```typescript
const response = await fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Your text here' })
})
const { summary } = await response.json()
```

### 2. Dedalus - Get AI Advice
```typescript
const response = await fetch('/api/dedalus', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: 'Your question here' })
})
const { final_output } = await response.json()
```

### 3. ElevenLabs - Text to Speech
```typescript
const response = await fetch('/api/elevenlabs-tts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Text to speak' })
})
const audioBlob = await response.blob()
const audio = new Audio(URL.createObjectURL(audioBlob))
await audio.play()
```

---

## 📋 Request/Response Formats

### Gemini
**Request:**
```json
{ "text": "Long text to summarize" }
```

**Response:**
```json
{ "summary": "Short summary" }
```

### Dedalus
**Request:**
```json
{ "input": "Question or prompt", "model": "openai/gpt-5-mini" }
```

**Response:**
```json
{ "success": true, "final_output": "AI response" }
```

### ElevenLabs
**Request:**
```json
{ "text": "Text to speak", "voice_id": "21m00Tcm4TlvDq8ikWAM" }
```

**Response:**
- Success: `audio/mpeg` blob
- Error: `{ "success": false, "error": "..." }`

---

## 🔑 Environment Variables

```bash
# Required for Gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash  # Optional: defaults to gemini-2.5-flash

# Optional for Dedalus (has fallback)
DEDALUS_API_KEY=your_key_here

# Optional for ElevenLabs (has fallback)
ELEVENLABS_API_KEY=your_key_here
```

---

## 🛠️ Routes

- `/api/gemini` - Text summarization
- `/api/dedalus` - AI-powered advice
- `/api/elevenlabs-tts` - Text-to-speech

---

## 📖 Full Documentation

See `API_INTEGRATION_GUIDE.md` for complete examples and troubleshooting.

