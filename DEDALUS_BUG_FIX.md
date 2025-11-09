# Dedalus Labs Package Bug Fix

## The Bug

The `dedalus-labs==0.1.0a10` package has an import error:
```
ModuleNotFoundError: No module named 'dedalus_labs.types.dedalus_model'
```

## Why This Doesn't Affect Our App

**Good news!** Our Next.js app doesn't use the Python package directly. We call the Dedalus API via HTTP, so this bug doesn't affect us.

However, if you want to use the Python SDK (for a separate backend service), here's how to fix it:

## Fix Option 1: Patch the Package (Recommended)

After installing the package, edit the `__init__.py` file:

**Location:** `.venv/lib/python3.12/site-packages/dedalus_labs/__init__.py`

**Change line 44:**
```python
# from .types.dedalus_model import DedalusModel  # Commented out - file doesn't exist
```

**Change line ~90 (in __all__ list):**
```python
# "DedalusModel",  # Commented out - type doesn't exist
```

## Fix Option 2: Use Direct Imports (Workaround)

Instead of:
```python
from dedalus_labs import AsyncDedalus, DedalusRunner
```

Use:
```python
from dedalus_labs._client import AsyncDedalus
from dedalus_labs.lib.runner import DedalusRunner
```

**Note:** You still need to apply Option 1's patch because Python loads `__init__.py` even when importing from submodules.

## Our Current Implementation (No Python Needed!)

Our Next.js app uses HTTP API calls, so we don't need the Python package at all:

```typescript
// app/api/dedalus/route.ts
const response = await fetch('https://api.dedaluslabs.ai/v1/...', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${DEDALUS_API_KEY}`,
  },
  body: JSON.stringify({ input, model }),
})
```

This approach:
- ✅ Avoids the Python package bug entirely
- ✅ Works directly in Next.js
- ✅ No Python environment needed
- ✅ Simpler deployment

## If You Need Python Backend

If you want to create a separate Python service using Dedalus SDK:

1. **Install with bug fix:**
   ```bash
   pip install dedalus-labs==0.1.0a10
   ```

2. **Apply the patch** (Option 1 above)

3. **Use in your Python service:**
   ```python
   from dedalus_labs._client import AsyncDedalus
   from dedalus_labs.lib.runner import DedalusRunner
   
   async def main():
       client = AsyncDedalus()
       runner = DedalusRunner(client)
       
       response = await runner.run(
           input="Your question here",
           model="openai/gpt-5-mini"
       )
       
       return response.final_output
   ```

4. **Expose as API** that your Next.js app can call

## Recommendation

**For this hackathon project:** Stick with our current HTTP API approach. It's simpler, works immediately, and avoids the Python package bug entirely.

