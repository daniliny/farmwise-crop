# Dedalus Labs Integration

## What is Dedalus Labs?

**Dedalus Labs** is a managed platform for creating and deploying AI agents with custom tools. It provides:
- 🤖 AI agent framework for intelligent, tool-using agents
- 🔧 Custom tools integration
- 📚 SDKs in Python, TypeScript, and Go
- ☁️ Managed infrastructure

**In our app:** Dedalus powers the Voice Assistant to provide smarter, more context-aware responses about regenerative farming.

---

This application integrates with [Dedalus Labs](https://dedaluslabs.ai/) for enhanced AI capabilities.

## Setup Instructions

### 1. Get Your Dedalus API Key

1. Create an account at [dedaluslabs.ai](https://dedaluslabs.ai/)
2. Navigate to your dashboard
3. Generate a new API key

### 2. Install Dedalus (For Python Backend - Optional)

**⚠️ Note:** The Python package `dedalus-labs==0.1.0a10` has a known bug. See [DEDALUS_BUG_FIX.md](./DEDALUS_BUG_FIX.md) for details.

If you want to use the Python SDK for a separate backend service:

```bash
pip install dedalus-labs==0.1.0a10
```

**Then apply the bug fix** from `DEDALUS_BUG_FIX.md` before using it.

**However, our Next.js app doesn't need the Python package** - we use HTTP API calls directly!

### 3. Configure Environment Variables

Add your Dedalus API key to your environment:

**For Local Development:**
Create a `.env.local` file:
```bash
DEDALUS_API_KEY=your_api_key_here
```

**For Production Deployment:**
Add the environment variable in your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Variables tab

### 4. Current Integration

The app currently uses:
- **Next.js API Route**: `/app/api/dedalus/route.ts`
- **Voice Assistant**: Automatically uses Dedalus when API key is available
- **Fallback**: Uses intelligent mock responses if API key is not set

### 5. Usage in Code

The Voice Assistant component automatically calls Dedalus:

```typescript
// In VoiceAssistant.tsx
const response = await fetch('/api/dedalus', {
  method: 'POST',
  body: JSON.stringify({
    input: userInput,
    model: 'openai/gpt-5-mini',
  }),
})
```

### 6. Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the Voice Assistant component
3. Ask a question like "How is my soil health?"
4. The app will use Dedalus if API key is set, otherwise use smart fallbacks

## Notes

- The app works **without** Dedalus API key (uses intelligent mock responses)
- All responses are context-aware and use your farm's actual data
- Dedalus integration enhances responses with more sophisticated AI reasoning
- The integration is ready for production - just add your API key

## Python Backend Alternative

If you prefer to use the Python SDK directly, you can create a separate Python service:

```python
import asyncio
from dedalus_labs import AsyncDedalus, DedalusRunner
from dotenv import load_dotenv

load_dotenv()

async def main():
    client = AsyncDedalus()
    runner = DedalusRunner(client)

    response = await runner.run(
        input="What was the score of the 2025 Wimbledon final?",
        model="openai/gpt-5-mini"
    )

    print(response.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

Then expose this as an API endpoint that your Next.js app can call.

