# Convertible Bond Analyzer

A web application for extracting and analyzing convertible bond (CB) information from DART (Korea) and SEC EDGAR (USA) filings, and analyzing their impact on stock prices. Built with Next.js, FastAPI, and open-source tools.

![Convertible Bond Analyzer](https://img.shields.io/badge/CB%20Analyzer-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.x-009688)

## Features

- **Dual Market Support**: Extract CB information from Korean DART and US SEC EDGAR filings
- **Multiple Exchanges**: Support for NYSE, Nasdaq, and Dow Jones companies
- **Price Analysis**: Get historical stock prices around CB announcement dates
- **Pattern Recognition**: Analyze price patterns and trends before/after CB announcements
- **Visual Analytics**: Interactive charts to visualize price movements
- **Automated Extraction**: LLM-powered extraction of CB terms and conditions

## Project Structure

The project consists of two main components:

### Frontend (Next.js)

```
cb-extractor/
├── src/
│   ├── app/          - Next.js application
│   ├── components/   - React components
│   └── lib/          - Utility functions
└── public/           - Static assets
```

### Backend (FastAPI + Python)

```
cb-backend/
├── src/
│   ├── dart_service.py     - Korean DART API integration
│   ├── edgar_service.py    - US SEC EDGAR integration
│   ├── langchain_service.py - LLM-based text extraction
│   ├── price_service.py    - Stock price analysis
│   └── db.py              - Database interactions
└── main.py                - FastAPI application
```

## Installation

Please refer to the [Quick Start Guide](./docs/QUICKSTART.md) for detailed setup instructions.

## Documentation

- [User Manual](./docs/MANUAL.md) - Comprehensive guide to all features
- [Tutorial](./docs/TUTORIAL.md) - Step-by-step usage examples
- [Quick Start](./docs/QUICKSTART.md) - Get up and running quickly

## License

MIT

## Disclaimer

This tool is for research purposes only. Not financial advice. Always consult professional advisors for investment decisions.
