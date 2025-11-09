# ElevenLabs + Dedalus Integration Guide

## 🎯 How They Work Together

**Dedalus Labs** = Smart AI Brain (generates intelligent responses)  
**ElevenLabs** = Natural Voice (speaks the responses)

### The Flow:
```
User asks question
    ↓
Voice Assistant captures question
    ↓
Dedalus Labs AI generates smart response
    ↓
ElevenLabs converts text to natural voice
    ↓
Farmer hears the answer! 🎤
```

---

## 🔧 Complete Integration Setup

### Step 1: Get Your API Keys

#### ElevenLabs API Key:
1. Go to [elevenlabs.io](https://elevenlabs.io/)
2. Sign up for free account
3. Go to Profile → API Keys
4. Copy your API key

#### Dedalus Labs API Key:
1. Go to [dedaluslabs.ai](https://dedaluslabs.ai/)
2. Sign up for free account
3. Go to Dashboard → API Keys
4. Copy your API key

### Step 2: Add Environment Variables

Create or update `.env.local` in your project root:

```bash
# ElevenLabs for natural voice synthesis
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Dedalus Labs for smart AI responses
DEDALUS_API_KEY=your_dedalus_api_key_here
```

### Step 3: Restart Your App

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 4: Test the Integration

1. Open your app: `http://localhost:3000`
2. Log in
3. Scroll to "Voice Assistant"
4. Click "Tap to Talk"
5. Ask: "How is my soil health?"
6. You should hear a natural voice response!

---

## 🎤 How It Works in Code

### 1. User Asks Question
```typescript
// Voice Assistant captures voice input
User: "How is my soil health?"
```

### 2. Dedalus Generates Response
```typescript
// VoiceAssistant.tsx calls Dedalus
const response = await fetch('/api/dedalus', {
  method: 'POST',
  body: JSON.stringify({
    input: "How is my soil health?",
    model: 'openai/gpt-5-mini',
  }),
})

// Dedalus returns smart response:
"Your soil health is excellent! Your fungal-to-bacterial ratio is 0.8:1..."
```

### 3. ElevenLabs Speaks It
```typescript
// VoiceAssistant.tsx calls ElevenLabs
await fetch('/api/elevenlabs-tts', {
  method: 'POST',
  body: JSON.stringify({
    text: "Your soil health is excellent!...",
    voice_id: '21m00Tcm4TlvDq8ikWAM', // Rachel voice
  }),
})

// ElevenLabs returns audio file
// Audio plays automatically
```

---

## 🎨 Available ElevenLabs Voices

You can change the voice by updating `voice_id` in `VoiceAssistant.tsx:

| Voice ID | Name | Description |
|----------|------|-------------|
| `21m00Tcm4TlvDq8ikWAM` | Rachel | Natural, clear, friendly (default) |
| `AZnzlk1XvdvUeBnXmlld` | Domi | Professional, confident |
| `EXAVITQu4vr4xnSDxMaL` | Bella | Warm, conversational |
| `ErXwobaYiN019PkySvjV` | Antoni | Deep, authoritative |
| `MF3mGyEYCl7XYWbV9V6O` | Elli | Young, energetic |
| `TxGEqnHWrfWFTfGW9XjX` | Josh | Casual, friendly |
| `VR6AewLTigWG4xSOukaG` | Arnold | Strong, clear |
| `pNInz6obpgDQGcFmaJgB` | Adam | Professional, calm |
| `yoZ06aMxZJJ28mfd3POQ` | Sam | Natural, balanced |

**To change voice**, edit `components/VoiceAssistant.tsx`:
```typescript
body: JSON.stringify({
  text: text,
  voice_id: 'EXAVITQu4vr4xnSDxMaL', // Change this to any voice ID
}),
```

---

## 🔄 Fallback System

The integration has smart fallbacks:

### Scenario 1: Both APIs Available ✅
- Dedalus generates smart response
- ElevenLabs speaks it naturally
- **Best experience!**

### Scenario 2: Only Dedalus Available
- Dedalus generates smart response
- Web Speech API speaks it (browser built-in)
- **Still works, but less natural voice**

### Scenario 3: Only ElevenLabs Available
- Local smart responses (context-aware)
- ElevenLabs speaks them naturally
- **Works great!**

### Scenario 4: Neither Available
- Local smart responses
- Web Speech API speaks them
- **Still fully functional!**

---

## 📊 Current Integration Status

### ✅ What's Working:
- ✅ Dedalus API route (`/api/dedalus`)
- ✅ ElevenLabs API route (`/api/elevenlabs-tts`)
- ✅ Voice Assistant calls both automatically
- ✅ Smart fallback system
- ✅ Error handling
- ✅ Natural voice synthesis

### 🎯 How to Enable:

**Just add your API keys to `.env.local`:**
```bash
ELEVENLABS_API_KEY=your_key_here
DEDALUS_API_KEY=your_key_here
```

**That's it!** The app will automatically:
1. Use Dedalus for smart responses
2. Use ElevenLabs for natural voice
3. Fall back gracefully if keys are missing

---

## 🧪 Testing

### Test 1: Check API Keys
```bash
# In terminal:
cat .env.local

# Should show both keys
```

### Test 2: Test Dedalus
```bash
# In browser console:
fetch('/api/dedalus', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    input: 'What is regenerative farming?',
    model: 'openai/gpt-5-mini'
  })
})
.then(r => r.json())
.then(console.log)
```

### Test 3: Test ElevenLabs
```bash
# In browser console:
fetch('/api/elevenlabs-tts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hello, this is a test of ElevenLabs voice synthesis.',
    voice_id: '21m00Tcm4TlvDq8ikWAM'
  })
})
.then(r => r.blob())
.then(blob => {
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.play()
})
```

### Test 4: Full Integration
1. Open Voice Assistant
2. Click "Tap to Talk"
3. Say: "Tell me about my carbon impact"
4. Should hear natural voice response!

---

## 🐛 Troubleshooting

### Problem: No voice output
**Solutions:**
1. Check browser console for errors (F12)
2. Verify `ELEVENLABS_API_KEY` is set
3. Check network tab for API calls
4. Try Web Speech API fallback (should work automatically)

### Problem: "Using mock response" message
**Solutions:**
1. Check `DEDALUS_API_KEY` is set in `.env.local`
2. Restart dev server after adding key
3. Verify key is correct in Dedalus dashboard

### Problem: API calls failing
**Solutions:**
1. Check API keys are correct
2. Check API quotas/limits in dashboards
3. Check network connectivity
4. Verify `.env.local` file exists and is in project root

---

## 🚀 Production Deployment

### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   - `ELEVENLABS_API_KEY` = your key
   - `DEDALUS_API_KEY` = your key
3. Redeploy

### For Netlify:
1. Site Settings → Environment Variables
2. Add both keys
3. Redeploy

### For Railway:
1. Variables tab
2. Add both keys
3. Redeploy

---

## 💡 Pro Tips

1. **Voice Selection**: Try different voices to find the best fit for your farmers
2. **Response Length**: Dedalus responses are automatically optimized for voice
3. **Error Handling**: The app gracefully handles API failures
4. **Cost Management**: Both services have free tiers - monitor usage in dashboards

---

## 📈 What Makes This Special

### Before (Without Integration):
- Simple keyword matching
- Robotic browser voice
- Basic responses

### After (With Integration):
- ✅ Smart AI reasoning (Dedalus)
- ✅ Natural, human-like voice (ElevenLabs)
- ✅ Context-aware responses
- ✅ Professional experience

---

## ✅ Summary

**Dedalus Labs** = Smart AI responses  
**ElevenLabs** = Natural voice synthesis  
**Together** = Professional voice assistant for farmers!

**Status**: ✅ Fully integrated and ready to use!

Just add your API keys and you're good to go! 🚀

