# API Keys & Dependencies Setup Guide

## 📋 Quick Summary

**Required**: None! The app works with mock data out of the box.

**Optional**: API keys enhance features but have smart fallbacks.

---

## 🔑 API Keys Needed

### 1. **Knot API** ✅ (Already Configured)

**Status**: Already set up with hackathon credentials

**What it does**: Tracks farmer spending and transactions

**Current Setup**:
- API URL: `https://knot.tunnel.tel/transactions/sync`
- Auth: Already configured in code (Basic Auth)
- **No API key needed** - credentials are in the code

**Where it's used**:
- `/app/api/knot-transactions/route.ts`
- `/app/transactions` page
- Spending Tracker component

---

### 2. **ElevenLabs API** (Optional)

**Status**: Optional - has Web Speech API fallback

**What it does**: Natural voice synthesis for Voice Assistant

**How to get**:
1. Go to [elevenlabs.io](https://elevenlabs.io/)
2. Sign up for free account
3. Go to Profile → API Keys
4. Copy your API key

**Add to `.env.local`**:
```bash
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

**Where it's used**:
- `/app/api/elevenlabs-tts/route.ts`
- Voice Assistant component

**Fallback**: Uses browser's Web Speech API if not set

---

### 3. **Dedalus Labs API** (Optional)

**Status**: Optional - has smart mock responses

**What it does**: Enhanced AI responses for Voice Assistant

**How to get**:
1. Go to [dedaluslabs.ai](https://dedaluslabs.ai/)
2. Sign up for free account
3. Go to Dashboard → API Keys
4. Copy your API key

**Add to `.env.local`**:
```bash
DEDALUS_API_KEY=your_dedalus_api_key_here
```

**Where it's used**:
- `/app/api/dedalus/route.ts`
- Voice Assistant component

**Fallback**: Uses intelligent context-aware mock responses if not set

---

### 4. **USDA NASS API** (Optional)

**Status**: Optional - works with DEMO_KEY

**What it does**: Real agricultural statistics for yield predictions

**How to get**:
1. Go to [USDA Quick Stats API](https://quickstats.nass.usda.gov/api)
2. Sign up for free account
3. Get your API key

**Add to `.env.local`**:
```bash
USDA_API_KEY=your_usda_api_key_here
```

**Where it's used**:
- `/app/api/usda-data/route.ts`
- Yield prediction component

**Fallback**: Uses DEMO_KEY (has rate limits) or mock data

---

### 5. **Capital One Nessie API** ✅ (Fully Integrated!)

**Status**: Fully integrated and working!

**What it does**: Creates customer accounts and loan accounts for farmers

**How to get**:
1. Go to [Capital One Nessie API](http://api.reimaginebanking.com)
2. Sign in with GitHub
3. Go to Profile → Copy your API key

**Add to `.env.local`**:
```bash
CAPITAL_ONE_API_KEY=your_capital_one_nessie_key_here
```

**Where it's used**:
- `/app/api/capital-one/customers/route.ts` - Customer creation
- `/app/api/capital-one/accounts/route.ts` - Loan account creation
- `/app/starter-kit` page - Loan application flow

**Current Status**: ✅ Fully functional! Creates real loan accounts via Capital One API

---

### 6. **Google Gemini API** (Optional)

**Status**: Optional - for AI text summarization

**What it does**: Provides AI-powered text summarization using Google's Gemini model

**How to get**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey) or [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new API key for Gemini
3. Copy your API key

**Add to `.env.local`**:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash  # Optional: defaults to gemini-2.5-flash
# Other options: gemini-2.5-pro (better quality), gemini-1.5-flash (older)
```

**Where it's used**:
- `/app/api/gemini/route.ts` - Text summarization endpoint

**Note**: If the API key is not set, the endpoint will return an error message. Make sure to add it to `.env.local` and restart your dev server.

---

### 7. **Chestnut Forty** (Unknown - Need Info)

**Status**: Unknown - need to ask what it actually is

**What it might do**: Predictive intelligence (but we don't know the actual API)

**Current Status**: Created mock ML algorithm, but need real API details

**If you have Chestnut Forty API**:
```bash
CHESTNUT_FORTY_API_URL=https://api.chestnutforty.com/predict
CHESTNUT_FORTY_API_KEY=your_key_here
```

---

## 📦 Dependencies (Already Installed)

All dependencies are already in `package.json`:

### Core Dependencies:
- ✅ `next` - Next.js framework
- ✅ `react` - React library
- ✅ `react-dom` - React DOM
- ✅ `recharts` - Charts and graphs
- ✅ `lucide-react` - Icons
- ✅ `date-fns` - Date utilities

### Dev Dependencies:
- ✅ `typescript` - TypeScript
- ✅ `tailwindcss` - Styling
- ✅ `eslint` - Linting

**No additional packages needed!**

---

## 🚀 Setup Instructions

### Step 1: Create `.env.local` File

Create a file called `.env.local` in your project root:

```bash
# Optional API Keys (app works without these!)

# ElevenLabs for natural voice
ELEVENLABS_API_KEY=

# Dedalus Labs for enhanced AI
DEDALUS_API_KEY=

# USDA for real agricultural data
USDA_API_KEY=

# Base URL for internal API calls
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 2: Add API Keys (Optional)

Only add keys you want to use. The app works fine without them!

### Step 3: Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## ✅ What Works Without API Keys

**Everything!** The app is designed to work with mock data:

- ✅ All pages and features
- ✅ Voice Assistant (uses Web Speech API)
- ✅ Predictions (uses mock data)
- ✅ Transactions (uses mock data)
- ✅ Marketplace (works standalone)
- ✅ Starter Kit (calculates locally)
- ✅ All UI components

---

## 🎯 For Hackathon Demo

**You don't need any API keys!** The app is ready to demo with:

- ✅ Mock data that looks realistic
- ✅ Smart fallbacks everywhere
- ✅ Knot integration (already configured)
- ✅ All features functional

**Optional Enhancements** (if you have time):
- Add ElevenLabs for better voice
- Add Dedalus for smarter AI
- Add USDA for real data

---

## 📝 Environment Variables Summary

### Required: **NONE**

### Optional (Enhance Features):
```bash
# Voice & AI
ELEVENLABS_API_KEY=          # Better voice synthesis
DEDALUS_API_KEY=             # Smarter AI responses
GEMINI_API_KEY=              # Google Gemini for text summarization
GEMINI_MODEL=gemini-2.5-flash  # Optional: model name (defaults to gemini-2.5-flash)

# Data
USDA_API_KEY=               # Real agricultural statistics

# Banking
CAPITAL_ONE_API_KEY=         # Loan applications (Starter Kit)

# Infrastructure
NEXT_PUBLIC_BASE_URL=        # For internal API calls (defaults to localhost:3000)
```

### Already Configured:
- ✅ Knot API credentials (in code)
- ✅ All dependencies installed

---

## 🔍 How to Check What's Working

### Test Knot Integration:
```bash
# Should work - credentials are in code
curl -X POST http://localhost:3000/api/knot-transactions \
  -H "Content-Type: application/json" \
  -d '{"merchant_id":44,"external_user_id":"test","limit":5}'
```

### Test ElevenLabs (if key set):
- Open Voice Assistant
- Ask a question
- Should hear natural voice (if key set) or browser voice (fallback)

### Test Dedalus (if key set):
- Open Voice Assistant
- Ask complex question
- Should get smarter response (if key set) or smart mock (fallback)

---

## 🆘 Troubleshooting

### "API key not set" messages:
- **Normal!** The app uses fallbacks
- Add keys only if you want enhanced features

### Knot API not working:
- Check if hackathon credentials are still valid
- Falls back to mock data automatically

### Voice not working:
- Check browser supports Web Speech API
- Add ElevenLabs key for better voice

### Gemini API not working:
- **Check API key is set**: Make sure `GEMINI_API_KEY` is in your `.env.local` file (no space after =)
- **Restart dev server**: After adding the key, restart with `npm run dev`
- **Check model name**: Default is `gemini-2.5-flash`. If you get a 404 error, try:
  - `gemini-2.5-pro` (better quality, slower)
  - `gemini-2.5-flash` (default, fast and efficient)
  - `gemini-1.5-flash` (older fallback)
- **Verify API key**: Make sure your API key is valid and has access to the Gemini API
- **Check error messages**: The API now returns detailed error messages to help diagnose issues

---

## 📚 Documentation Files

- `ELEVENLABS_DEDALUS_INTEGRATION.md` - Voice & AI setup
- `USDA_CHESTNUT_INTEGRATION.md` - Data integration
- `DEPLOYMENT.md` - Deployment guide
- `DEDALUS_GUIDE.md` - Dedalus details

---

## ✅ Summary

**You need:**
- ❌ **Zero API keys** to run the app
- ✅ **All dependencies** already installed
- ✅ **Knot API** already configured

**Optional to enhance:**
- ElevenLabs API key (better voice)
- Dedalus API key (smarter AI)
- Gemini API key (text summarization)
- USDA API key (real data)

**Ready to demo!** 🚀

