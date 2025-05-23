# REI DealFinder User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage Guide](#usage-guide)
6. [Troubleshooting](#troubleshooting)
7. [API Reference](#api-reference)
8. [Security](#security)
9. [Maintenance](#maintenance)

## Introduction

REI DealFinder is a powerful real estate investment analysis tool that helps investors identify and evaluate potential investment opportunities in the Northwest Multiple Listing Service (NWMLS) market.

### Key Features
- Automated listing analysis
- ROI and cash flow calculations
- Market appreciation tracking
- Daily email reports
- Interactive dashboard
- Detailed deal reasoning

## System Requirements

### Hardware Requirements
- CPU: 2+ cores
- RAM: 4GB minimum
- Storage: 1GB free space

### Software Requirements
- Node.js 14.x or later
- PostgreSQL 12.x or later
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### Step 1: Install Dependencies
```bash
# Install Node.js and PostgreSQL
brew install node postgresql

# Start PostgreSQL service
brew services start postgresql
```

### Step 2: Clone and Setup
```bash
# Clone repository
git clone https://github.com/yourusername/rei-dealfinder.git
cd rei-dealfinder

# Install dependencies
npm install
```

### Step 3: Database Setup
```bash
# Create database
createdb dealfinder

# Run migrations
npx prisma migrate dev
```

## Configuration

### Environment Variables
Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dealfinder"
GOOGLE_SEARCH_API_KEY="your_google_search_api_key"
GOOGLE_SEARCH_CX="your_google_search_cx"
SENDGRID_API_KEY="your_sendgrid_api_key"
ADMIN_EMAIL="your_email@example.com"
```

### API Keys Setup
1. Google Search API
   - Visit Google Cloud Console
   - Create a new project
   - Enable Custom Search API
   - Create credentials

2. SendGrid API
   - Sign up for SendGrid
   - Create API key
   - Verify sender email

## Usage Guide

### Dashboard
1. Access the dashboard at http://localhost:3000
2. View top deals sorted by ROI and cash flow
3. Click "Show Reasoning" for detailed analysis
4. Use filters to narrow down listings

### Daily Reports
1. Reports are sent automatically at 8 AM PST
2. Check your email for the latest deals
3. Click links to view full details on dashboard

### Deal Analysis
1. ROI Calculation
   - Purchase price
   - Estimated ARV
   - Repair costs
   - Market appreciation

2. Cash Flow Analysis
   - Monthly rent
   - PITI payments
   - Operating expenses
   - Net cash flow

## Troubleshooting

### Common Issues
1. Database Connection
   ```bash
   # Check PostgreSQL status
   brew services list
   
   # Restart PostgreSQL
   brew services restart postgresql
   ```

2. API Errors
   - Verify API keys in .env
   - Check API quotas
   - Review error logs

3. Email Notifications
   - Verify SendGrid configuration
   - Check spam folder
   - Review email templates

## API Reference

### Endpoints
1. `/api/listings`
   - Method: GET
   - Purpose: Fetch and process listings
   - Response: JSON array of listings

2. `/api/daily`
   - Method: GET
   - Purpose: Generate daily report
   - Response: JSON with report status

## Security

### Best Practices
1. Keep API keys secure
2. Regular password updates
3. Database backups
4. SSL/TLS encryption

### Data Protection
1. Encrypt sensitive data
2. Regular security audits
3. Access control
4. Log monitoring

## Maintenance

### Regular Tasks
1. Database backups
2. Log rotation
3. Dependency updates
4. Security patches

### Monitoring
1. Check error logs
2. Monitor API usage
3. Review performance
4. Update documentation

## Support

### Contact Information
- Email: support@rei-dealfinder.com
- Discord: https://discord.gg/rei-dealfinder
- Documentation: https://docs.rei-dealfinder.com

### Updates
- GitHub: https://github.com/yourusername/rei-dealfinder
- Blog: https://blog.rei-dealfinder.com
- Newsletter: https://newsletter.rei-dealfinder.com 