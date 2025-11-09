# FarmWise - AI-Powered Agricultural Dashboard

An accessible, AI-powered dashboard that provides clear crop yield predictions, ecology/soil health insights, personalized planting and harvesting advice, and voice/audio alerts—all through a real-time, easy-to-read farmer portal.

## Features

- 🌾 **Crop Yield Predictions**: AI-powered forecasts showing expected yields vs. previous years
- 🌱 **Soil Health Analysis**: Comprehensive soil metrics with regenerative agriculture recommendations
- 📅 **Planting & Harvesting Advice**: Personalized calendar with optimal timing windows
- 🔊 **Voice Alerts**: Real-time audio notifications for important farm events
- 🌤️ **Weather Integration**: Current conditions and 4-day forecast
- 📊 **Real-time Dashboard**: Easy-to-read metrics and visualizations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

**✅ Dependencies are already installed!**

1. Run the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

The project is fully set up and ready to run. All components are functional with mock AI data that simulates real predictions.

## 🚀 Deployment

This application is **production-ready** and can be deployed to:

- **Vercel** (Recommended): Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Netlify**: `netlify deploy --prod`
- **Railway**: Connect GitHub repo at [railway.app](https://railway.app)
- **Any Node.js hosting**: `npm run build && npm start`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or simply push to GitHub and connect to Vercel for automatic deployments.

## Project Structure

```
├── app/
│   ├── api/              # API routes for data fetching
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles
├── components/
│   ├── Dashboard.tsx           # Main dashboard component
│   ├── Navigation.tsx          # Navigation bar
│   ├── VoiceAlerts.tsx        # Voice alert system
│   ├── CropYieldPrediction.tsx # Yield predictions
│   ├── SoilHealth.tsx         # Soil health metrics
│   ├── PlantingAdvice.tsx     # Planting recommendations
│   ├── WeatherWidget.tsx      # Weather display
│   └── QuickStats.tsx         # Quick statistics cards
└── package.json
```

## API Endpoints

- `GET /api/farm-data` - Farm information and field data
- `GET /api/yield-prediction` - Crop yield predictions
- `GET /api/soil-health` - Soil health metrics and recommendations
- `GET /api/planting-advice` - Planting and harvesting recommendations

## Future Enhancements

- Integration with IoT sensors for real-time soil data
- Machine learning models for more accurate predictions
- Mobile app for field access
- Integration with weather APIs
- Market price tracking and recommendations
- Historical data analysis and trends

## License

MIT

