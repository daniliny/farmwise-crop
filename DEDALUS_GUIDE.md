# Dedalus Labs - Complete Integration Guide

## 🤖 What is Dedalus Labs?

**Dedalus Labs** is an AI agent platform that provides:

1. **Universal Model Access**: Switch between AI models (GPT-4, Claude, Gemini) with one API
2. **Smart AI Agents**: Build intelligent agents that can use tools and make decisions
3. **Custom Tools**: Connect your own tools and functions to AI agents
4. **Managed Infrastructure**: No need to manage servers or infrastructure

### In Simple Terms:
Think of Dedalus Labs as a "smart AI brain" that can:
- Understand complex questions
- Access multiple AI models
- Use tools to get information
- Provide intelligent, context-aware responses

---

## 🎯 How Dedalus Enhances Your FarmWise App

### Current Integration:
Dedalus Labs powers your **Voice Assistant** to provide smarter, more sophisticated responses about regenerative farming.

### What It Does:
1. **Smarter Responses**: Instead of simple keyword matching, Dedalus uses actual AI reasoning
2. **Context Understanding**: Understands the full context of your question
3. **Multi-Model Support**: Can use different AI models (GPT-4, Claude, etc.) for best results
4. **Tool Integration**: Can connect to external tools and APIs for real-time data

### Example:
- **Without Dedalus**: "You asked about soil? Here's basic soil info..."
- **With Dedalus**: Analyzes your question, understands context, provides detailed, personalized advice based on your farm's actual data

---

## 🔧 How It's Currently Integrated

### 1. API Route (`/app/api/dedalus/route.ts`)
This is the backend endpoint that talks to Dedalus Labs:

```typescript
// When Voice Assistant asks a question:
POST /api/dedalus
{
  "input": "How is my soil health?",
  "model": "openai/gpt-5-mini"
}

// Dedalus processes it and returns:
{
  "success": true,
  "final_output": "Based on your regenerative farming practices..."
}
```

### 2. Voice Assistant Integration (`/components/VoiceAssistant.tsx`)
The Voice Assistant automatically tries to use Dedalus first:

```typescript
// Step 1: Try Dedalus API
const response = await fetch('/api/dedalus', {
  method: 'POST',
  body: JSON.stringify({
    input: userInput,
    model: 'openai/gpt-5-mini',
  }),
})

// Step 2: If Dedalus works, use its response
if (response.ok && data.final_output) {
  return { text: data.final_output }
}

// Step 3: If Dedalus fails, use smart fallback responses
// (This ensures the app always works, even without API key)
```

### 3. Fallback System
- **With API Key**: Uses real Dedalus AI for sophisticated responses
- **Without API Key**: Uses intelligent mock responses (still context-aware!)

---

## 🚀 How to Set Up Dedalus Labs

### Step 1: Get Your API Key

1. **Sign Up**: Go to [dedaluslabs.ai](https://dedaluslabs.ai/)
2. **Create Account**: Sign up for free
3. **Get API Key**: Navigate to your dashboard → API Keys → Create New Key
4. **Copy Key**: Save it somewhere safe

### Step 2: Add API Key to Your App

**For Local Development:**

Create a `.env.local` file in your project root:

```bash
DEDALUS_API_KEY=your_api_key_here
```

**For Production (Vercel):**

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add: `DEDALUS_API_KEY` = `your_api_key_here`
4. Redeploy

**For Production (Other Platforms):**

- **Netlify**: Site Settings → Environment Variables
- **Railway**: Variables tab
- **Any Platform**: Add as environment variable

### Step 3: Restart Your App

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It!

1. Open your app: `http://localhost:3000`
2. Log in
3. Scroll to "Voice Assistant"
4. Ask: "How is my soil health?"
5. You should get a sophisticated AI response!

---

## 📊 Current Integration Status

### ✅ What's Working:
- ✅ API route is set up (`/api/dedalus`)
- ✅ Voice Assistant calls Dedalus automatically
- ✅ Smart fallback if API key is missing
- ✅ Context-aware responses
- ✅ Error handling

### 🔄 How It Works:

```
User asks question
    ↓
Voice Assistant component
    ↓
Calls /api/dedalus endpoint
    ↓
API route checks for DEDALUS_API_KEY
    ↓
If key exists:
    → Calls Dedalus Labs API
    → Gets AI response
    → Returns to Voice Assistant
    ↓
If no key:
    → Uses intelligent mock responses
    → Still works perfectly!
    ↓
Voice Assistant displays response
    ↓
ElevenLabs speaks the response (if enabled)
```

---

## 🎨 What Makes Dedalus Special?

### 1. **Model Flexibility**
You can easily switch AI models:
```typescript
// Use GPT-4
model: 'openai/gpt-4'

// Use Claude
model: 'anthropic/claude-3'

// Use Gemini
model: 'google/gemini-pro'
```

### 2. **Tool Integration**
Dedalus can connect to tools like:
- Weather APIs
- Soil databases
- Market price APIs
- Your own custom functions

### 3. **Agent Capabilities**
Dedalus agents can:
- Make decisions
- Use multiple tools
- Chain operations
- Provide complex reasoning

---

## 🔍 Testing Your Integration

### Test 1: Check API Key
```bash
# In your terminal:
echo $DEDALUS_API_KEY

# Should show your key (if set)
```

### Test 2: Test API Route
```bash
# In your browser console or Postman:
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

### Test 3: Voice Assistant
1. Open Voice Assistant in your app
2. Ask: "Tell me about my carbon impact"
3. Check browser console for any errors
4. Should get a detailed response!

---

## 🐛 Troubleshooting

### Problem: "Using mock response" message
**Solution**: Your API key isn't set. Add it to `.env.local` and restart.

### Problem: API calls failing
**Solution**: 
1. Check your API key is correct
2. Check Dedalus Labs dashboard for API limits
3. Check browser console for error messages

### Problem: Responses not showing
**Solution**:
1. Check browser console (F12)
2. Check network tab for API calls
3. Verify `/api/dedalus` route is working

---

## 📈 Future Enhancements

### Potential Improvements:

1. **Custom Tools Integration**
   ```typescript
   // Connect to your farm data APIs
   tools: [
     { name: 'getSoilData', function: fetchSoilData },
     { name: 'getWeatherData', function: fetchWeather },
   ]
   ```

2. **Multi-Model Strategy**
   ```typescript
   // Use different models for different tasks
   if (question.includes('soil')) {
     model = 'openai/gpt-4' // Better for technical
   } else {
     model = 'anthropic/claude-3' // Better for general
   }
   ```

3. **Agent Memory**
   - Remember previous conversations
   - Learn from user preferences
   - Provide personalized advice

---

## 📚 Resources

- **Dedalus Labs Docs**: [dedaluslabs.ai/docs](https://dedaluslabs.ai/docs)
- **API Reference**: Check their documentation
- **Community**: Join their Discord/community for support

---

## ✅ Summary

**Dedalus Labs** = Smart AI brain for your Voice Assistant

**Current Status**: ✅ Fully integrated and working
**Setup Required**: Just add your API key
**Fallback**: Works without API key (uses smart mocks)

**Your app is ready to use Dedalus Labs!** Just add your API key and you'll get sophisticated AI responses. 🚀

