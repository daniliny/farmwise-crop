# Deployment Guide

This Next.js application is **production-ready** and can be deployed to various platforms.

## ✅ Build Status

The application builds successfully with no errors. All components are functional and ready for deployment.

## 🚀 Deployment Options

### 1. Vercel (Recommended - Easiest)

Vercel is the recommended platform for Next.js applications:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Or simply connect your GitHub repository to [vercel.com](https://vercel.com)

3. **Environment Variables** (if needed):
   - `DEDALUS_API_KEY` - For Dedalus Labs AI integration (optional, has fallback)
   - `ELEVENLABS_API_KEY` - For ElevenLabs natural voice synthesis (optional, has fallback)
   - `KNOT_API_KEY` - Already configured in code (hackathon credentials)
   
   **Note**: Both Dedalus and ElevenLabs have smart fallbacks, so the app works without these keys!

### 2. Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

### 3. Railway

1. Connect your GitHub repository to [railway.app](https://railway.app)
2. Railway will auto-detect Next.js
3. Deploy automatically on git push

### 4. Docker (Any Platform)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### 5. Traditional Hosting (Node.js Server)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Configure your server**:
   - Port: 3000 (default)
   - Node.js version: 18+
   - Process manager: PM2 recommended

## 📋 Pre-Deployment Checklist

- ✅ Build completes successfully
- ✅ All TypeScript types are valid
- ✅ No ESLint errors
- ✅ All components render correctly
- ✅ API routes are functional
- ✅ Environment variables documented

## 🔧 Environment Variables

The application works without environment variables (uses mock data), but for production:

- **DEDALUS_API_KEY** (optional): For enhanced AI responses via Dedalus Labs - has smart fallback
- **ELEVENLABS_API_KEY** (optional): For natural voice synthesis via ElevenLabs - has Web Speech API fallback
- **KNOT_API_KEY**: Already configured in code for hackathon

## 🌐 Post-Deployment

After deployment, your application will be available at:
- Production URL: `https://your-app.vercel.app` (or your platform's URL)

## 📝 Notes

- The app uses mock data by default, so it works immediately after deployment
- All API routes have fallback to mock data if external APIs fail
- Voice features use Web Speech API as fallback if ElevenLabs is not configured
- Knot integration is ready and will use real API if available

## 🆘 Troubleshooting

If deployment fails:
1. Check build logs for errors
2. Verify Node.js version (18+)
3. Ensure all dependencies are installed
4. Check environment variables if using external APIs

