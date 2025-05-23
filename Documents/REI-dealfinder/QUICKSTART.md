# REI DealFinder Quick Start Guide

## Get Started in 5 Minutes

1. **Installation**
   ```bash
   # Install Node.js and PostgreSQL
   brew install node postgresql

   # Clone the repository
   git clone https://github.com/yourusername/rei-dealfinder.git
   cd rei-dealfinder

   # Install dependencies
   npm install
   ```

2. **Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your API keys
   nano .env
   ```

3. **Database Setup**
   ```bash
   # Start PostgreSQL
   brew services start postgresql

   # Run database migrations
   npx prisma migrate dev
   ```

4. **Launch**
   ```bash
   # Start the development server
   npm run dev
   ```

5. **Access**
   - Open http://localhost:3000 in your browser
   - Check your email for the first daily report

## Key Features at a Glance

- 📊 Real-time deal analysis
- 💰 ROI and cash flow calculations
- 📈 Market appreciation tracking
- 📧 Daily email reports
- 📱 Mobile-responsive dashboard

## Need Help?

- Check the [Full Documentation](docs/README.md)
- Join our [Discord Community](https://discord.gg/rei-dealfinder)
- Email support: support@rei-dealfinder.com 