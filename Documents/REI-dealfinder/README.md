# REI DealFinder

A real estate investment deal finder application that analyzes NWMLS listings to identify potential investment opportunities.

## Features

- Real-time analysis of real estate listings
- ROI and cash flow calculations
- Market appreciation tracking
- Daily email reports
- Interactive dashboard with charts
- Detailed deal reasoning

## Prerequisites

- Node.js 14.x or later
- PostgreSQL database
- Google Search API key
- SendGrid API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rei-dealfinder.git
cd rei-dealfinder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dealfinder"
GOOGLE_SEARCH_API_KEY="your_google_search_api_key"
GOOGLE_SEARCH_CX="your_google_search_cx"
SENDGRID_API_KEY="your_sendgrid_api_key"
ADMIN_EMAIL="your_email@example.com"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. The application automatically fetches and analyzes new listings daily
2. Top deals are displayed on the dashboard with ROI and cash flow metrics
3. Daily email reports are sent to the configured admin email
4. Click on "Show Reasoning" to view detailed analysis for each deal

## API Endpoints

- `GET /api/listings`: Fetches and processes new listings
- `GET /api/daily`: Generates daily report and sends email notification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 