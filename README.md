# 📈 TickrMind

A modern stock tracking application that provides real-time market data, personalized alerts, and detailed company insights powered by AI.

## ✨ Features

- **Real-time Stock Tracking**: Monitor live stock prices and market movements
- **Interactive Charts**: Multiple TradingView widgets including candlestick charts, heatmaps, and technical analysis
- **Smart Watchlist**: Track your favorite stocks with a personalized watchlist
- **Market Overview**: Comprehensive dashboard with market data, top stories, and market heatmaps
- **Stock Details**: In-depth company profiles, financials, and technical analysis for individual stocks
- **AI-Powered Insights**: Personalized welcome emails and news summaries powered by Gemini AI
- **Email Notifications**: Automated email alerts for market news and watchlist updates
- **Secure Authentication**: Email-based authentication with Better Auth
- **Dark Mode**: Beautiful dark theme optimized for long trading sessions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router & Turbopack
- **Frontend**: [React 19.1.0](https://react.dev/), TypeScript, TailwindCSS
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose 8.19.1](https://mongoosejs.com/)
- **Market Data**: [Finnhub API](https://finnhub.io/) for real-time stock data
- **Charts**: [TradingView Widgets](https://www.tradingview.com/widget/)
- **AI**: [Google Gemini API](https://ai.google.dev/) for content generation
- **Background Jobs**: [Inngest](https://www.inngest.com/) for scheduled tasks
- **Email**: [Nodemailer](https://nodemailer.com/) for transactional emails
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), shadcn/ui components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **MongoDB** instance (local or cloud like MongoDB Atlas)

You'll also need API keys from:
- [Finnhub](https://finnhub.io/) - for stock market data
- [Google AI Studio](https://ai.google.dev/) - for Gemini API access
- SMTP credentials for email notifications

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Dev-muse/TickrMind.git
cd TickrMind
```


### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# Finnhub API (Stock Market Data)
FINNHUB_API_KEY=your_finnhub_api_key
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Email Configuration (Nodemailer)
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_app_specific_password
```

**Note**: 
- Generate `BETTER_AUTH_SECRET` using: `openssl rand -base64 32`
- For Gmail, use [App Passwords](https://support.google.com/accounts/answer/185833) for `NODEMAILER_PASSWORD`

### 4. Test database connection

```bash
npm run test:db
```

This will verify your MongoDB connection is working correctly.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
TickrMind/
├── app/                      # Next.js App Router
│   ├── (app)/               # Protected app routes
│   │   ├── page.tsx         # Dashboard with market overview
│   │   └── stocks/          # Stock detail pages
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/         # Sign in page
│   │   └── sign-up/         # Sign up page
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── forms/               # Form components
│   ├── ui/                  # UI components (shadcn)
│   ├── Header.tsx           # Navigation header
│   ├── SearchCommand.tsx    # Stock search command palette
│   ├── TradingViewWidget.tsx # TradingView widget wrapper
│   └── WatchlistButton.tsx  # Add to watchlist button
├── database/                # Database layer
│   ├── models/              # Mongoose models
│   └── mongoose.ts          # Database connection
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
│   ├── actions/             # Server actions
│   │   ├── auth.actions.ts  # Authentication actions
│   │   ├── finnhub.actions.ts # Stock data fetching
│   │   ├── user.actions.ts  # User operations
│   │   └── watchlist.actions.ts # Watchlist management
│   ├── better-auth/         # Auth configuration
│   ├── ingest/              # Inngest functions & prompts
│   ├── nodemailer/          # Email templates & sender
│   ├── constants.ts         # App constants & configs
│   └── utils.ts             # Helper functions
├── middleware/              # Next.js middleware
├── public/                  # Static assets
├── scripts/                 # Utility scripts
├── types/                   # TypeScript type definitions
└── .env.local              # Environment variables (create this)
```

## 🎯 Key Features Explained

### Dashboard
The main dashboard (`app/(app)/page.tsx`) displays:
- Market overview with major indices
- Stock heatmap for market sentiment
- Latest market news timeline
- Real-time market quotes

### Stock Details
Individual stock pages (`app/(app)/stocks/[symbol]/page.tsx`) show:
- Symbol information and pricing
- Advanced candlestick charts
- Technical analysis indicators
- Company profile and financials
- Baseline chart for performance tracking

### Watchlist
Users can:
- Add stocks to their personal watchlist
- Receive email notifications about watchlist stocks
- Quick access to tracked stocks

### AI-Powered Emails
- **Welcome Email**: Personalized based on user profile (investment goals, risk tolerance, preferred industry)
- **News Summary**: Daily digest of market news for watchlist stocks

## 📜 Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Test database connection
npm run test:db
```

## 🔐 Authentication

The app uses Better Auth for authentication with:
- Email/password sign-up and sign-in
- Protected routes via middleware
- Session-based authentication
- Secure password handling

Protected routes (requiring authentication):
- Dashboard (`/`)
- Stock details (`/stocks/[symbol]`)
- Any route except sign-in, sign-up, and API routes

## 🗄️ Database Schema

### User Collection
Managed by Better Auth (email, password hash, session data)

### Watchlist Collection
```typescript
{
  userId: string,      // Reference to user
  symbol: string,      // Stock symbol (e.g., "AAPL")
  company: string,     // Company name
  addedAt: Date        // Timestamp
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your deployment platform supports:
- Node.js 20+
- Environment variables configuration
- MongoDB connection (whitelist deployment IPs if using MongoDB Atlas)

## 🔧 Configuration

### TradingView Widgets
Widget configurations are in `lib/constants.ts`. Customize:
- Chart types
- Colors and themes
- Symbols displayed
- Time intervals

### Email Templates
Email templates are in `lib/nodemailer/templates.ts`. Customize:
- Welcome email content
- News summary format
- Styling

### Inngest Functions
Background jobs are in `lib/ingest/functions.ts`:
- `sendSignUpEmail`: Triggered on user registration
- `sendNewsSummaryEmail`: Scheduled daily news digest

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB URI in `.env.local`
- Check MongoDB Atlas IP whitelist
- Run `npm run test:db` to diagnose

### API Rate Limits
- Finnhub free tier has rate limits
- Consider caching strategies for production

### Email Not Sending
- Verify SMTP credentials
- For Gmail, use App Passwords
- Check firewall/network restrictions

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by Dev-muse**
```
