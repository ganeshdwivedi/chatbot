# Valid8r 🚀

**AI-Powered Startup Idea Validator**

Valid8r is an intelligent validation platform that gives entrepreneurs brutally honest, AI-driven feedback on their startup ideas in seconds. No sugar-coating, no maybes—just clear YES or NO verdicts backed by comprehensive analysis.

![Valid8r Banner](./screenshots/banner.png)

---

## 🎯 Why Valid8r?

Every year, thousands of entrepreneurs waste months and millions building startups that were doomed from day one. Friends and family won't give you honest feedback. Consultants charge thousands for basic market research. Valid8r changes that.

**Get instant, unbiased validation using Google's Gemini AI** that evaluates your idea across 8 critical dimensions and tells you exactly what you need to hear—not what you want to hear.

---

## ✨ Features

### 🎯 **Binary Decision System**
- Clear verdict: **"YES, this startup can work"** or **"NO, this startup will not work"**
- No vague "it depends" or "maybe" responses
- Forces definitive assessment based on market realities

### 🧠 **8-Point Evaluation Framework**
Every idea is scored across critical dimensions:
1. **Market Demand** - Is there proven, measurable demand?
2. **Problem Severity** - How urgent is the pain point?
3. **Target Audience** - Is the ICP clear and reachable?
4. **Competition** - What's your unique 10x advantage?
5. **Execution Difficulty** - Can you build an MVP in 3-6 months?
6. **Revenue Model** - Is there a clear path to profitability?
7. **Scalability** - Can this grow without proportional costs?
8. **Profitability** - Are unit economics favorable?

### 💎 **Tone-Adaptive Responses**
- **Weak Ideas**: Blunt, direct criticism with no false hope
- **Strong Ideas**: Encouraging, constructive feedback with strategic guidance

### 📊 **Comprehensive Analysis**
- Detailed explanation of the verdict
- Strategic points to consider
- Specific pros and cons
- Actionable improvement steps with timelines
- Risk score (0-10) assessment

### 🛡️ **Cost Protection**
- Rate limiting: 2 free validations per 24 hours per user
- Prevents API abuse and controls costs
- Clear feedback when limit is reached

![Validation Results](./screenshots/results.png)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- (Optional) Upstash Redis account for production rate limiting

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/valid8r.git
cd valid8r
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: For production Redis rate limiting
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

![Input Interface](./screenshots/input.png)

---

## 📖 How to Use

1. **Enter your startup idea** in the text area (be specific and detailed)
2. **Click "Validate Idea"** to submit
3. **Review the AI analysis** including:
   - Clear YES/NO verdict
   - Detailed explanation
   - Pros and cons
   - Risk score
   - Actionable next steps
4. **Track remaining queries** (2 per day for free users)

![Analysis Dashboard](./screenshots/analysis.png)

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **AI Engine**: Google Gemini API
- **Styling**: Tailwind CSS
- **Rate Limiting**: In-memory store (dev) / Upstash Redis (prod)
- **Deployment**: Vercel (recommended)

---

## 📁 Project Structure

```
valid8r/
├── app/
│   ├── api/
│   │   └── validate/
│   │       └── route.ts          # API endpoint with rate limiting
│   ├── page.tsx                   # Main UI page
│   └── layout.tsx                 # Root layout
├── lib/
│   ├── rateLimit.ts              # In-memory rate limiter
│   ├── rateLimitRedis.ts         # Redis rate limiter (production)
│   └── validationPrompt.ts       # Gemini AI prompt template
├── middleware.ts                  # Next.js middleware for user tracking
├── components/
│   └── ValidationForm.tsx         # Main validation interface
├── public/
│   └── screenshots/               # Add your screenshots here
└── README.md
```

---

## ⚙️ Configuration

### Rate Limiting

**Development (In-Memory)**
- 2 queries per user per 24 hours
- Data resets on server restart
- No additional setup required

**Production (Redis)**
- Persistent rate limiting across server restarts
- Distributed rate limiting for multiple servers
- Requires Upstash Redis setup

To enable Redis rate limiting, update `app/api/validate/route.ts`:
```typescript
import { checkRateLimitRedis } from '@/lib/rateLimitRedis';

// Replace checkRateLimit with checkRateLimitRedis
const rateLimitResult = await checkRateLimitRedis(identifier, 2, 24 * 60 * 60 * 1000);
```

### Customizing the AI Prompt

Edit `lib/validationPrompt.ts` to adjust:
- Evaluation criteria weights
- Response tone calibration
- Output format
- Risk score calculation

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/valid8r)

### Environment Variables Checklist
- ✅ `GEMINI_API_KEY` (Required)
- ✅ `UPSTASH_REDIS_REST_URL` (Production only)
- ✅ `UPSTASH_REDIS_REST_TOKEN` (Production only)

---

## 📸 Screenshots

### Landing Page
![Landing](./screenshots/landing.png)

### Validation Input
![Input Form](./screenshots/input-form.png)

### Positive Verdict Example
![Yes Verdict](./screenshots/verdict-yes.png)

### Negative Verdict Example
![No Verdict](./screenshots/verdict-no.png)

### Rate Limit Warning
![Rate Limit](./screenshots/rate-limit.png)

---

## 🔒 Security & Privacy

- **No data storage**: Ideas are processed in real-time and not stored
- **IP-based rate limiting**: No account required, maximum privacy
- **API key protection**: Gemini API key stored securely in environment variables
- **HTTPS only**: All API communications encrypted

---

## 🛣️ Roadmap

- [ ] User authentication for unlimited queries
- [ ] Save validation history
- [ ] Export reports as PDF
- [ ] Team collaboration features
- [ ] Integration with market research databases
- [ ] Success prediction ML model based on historical data
- [ ] Mobile app (iOS/Android)
- [ ] API access for third-party integrations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google Gemini AI for powering intelligent validations
- The startup community for inspiration
- All entrepreneurs who deserve honest feedback

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/valid8r/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/valid8r/discussions)
- **Email**: support@valid8r.com
- **Twitter**: [@valid8r](https://twitter.com/valid8r)

---

## ⭐ Show Your Support

If Valid8r helped you avoid a bad startup idea (or validated a great one), give it a star! ⭐

**Built with 💙 for entrepreneurs who deserve the truth.**

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/valid8r?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/valid8r?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/valid8r)
![GitHub license](https://img.shields.io/github/license/yourusername/valid8r)

---

**Remember**: The best startup is the one you DON'T build when Valid8r tells you it won't work. Save your time. Save your money. Build something that matters. 🚀
