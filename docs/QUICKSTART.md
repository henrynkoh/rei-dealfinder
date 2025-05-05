# Convertible Bond Analyzer - Quick Start Guide

Get up and running with the Convertible Bond Analyzer in under 5 minutes.

## For Users (No Installation Required)

### 1. Access the Application

Open your web browser and navigate to:
- Development: http://localhost:3000 (if running locally)
- Production: [Your deployed URL]

### 2. Run Your First Search

**For Korean Companies:**
1. Enter stock code (e.g., `041960` for 코미팜) in the "Company Identifier" field
2. Select "DART (Korea)" from "Market" dropdown
3. Click "Search"

**For US Companies:**
1. Enter ticker (e.g., `AAPL` for Apple) in the "Company Identifier" field
2. Select "NYSE", "Nasdaq", or "Dow Jones" from "Market" dropdown
3. Click "Search"

### 3. Extract CB Details

1. In the search results, find a document related to convertible bonds
   - Korean: Look for "전환사채" or "CB" in the title
   - US: Look for Form 8-K or S-3 with "convertible notes" mention
2. Click on the document
3. Click "Extract Details" button
4. View extracted CB information

### 4. Analyze Price Impact

1. Click "Analyze Price Impact" button
2. View the price chart showing before/after the CB announcement
3. Adjust date range if needed
4. Click "Run Pattern Analysis" for automated insights

## For Developers (Local Installation)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/henrynkoh/cb-analyzer.git
cd cb-analyzer/cb-extractor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd ../cb-backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up your .env file
cp env.sample .env
# Edit .env with your API keys

# Start the backend server
python main.py
```

## Configuration Requirements

### API Keys Needed:

1. **DART OpenAPI Key** (for Korean filings)
   - Register at https://opendart.fss.or.kr/
   - Free for limited usage

2. **Alpha Vantage API** (for stock prices)
   - Register at https://www.alphavantage.co/
   - Free tier available

## Next Steps

- Check the [full tutorial](TUTORIAL.md) for a detailed walkthrough
- Read the [user manual](MANUAL.md) for complete feature documentation
- Visit our GitHub repository for updates and issues 