# Convertible Bond Analyzer - User Manual

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Interface](#user-interface)
4. [Search Functionality](#search-functionality)
5. [Reports Interface](#reports-interface)
6. [CB Detail Extraction](#cb-detail-extraction)
7. [Price Analysis](#price-analysis)
8. [Pattern Recognition](#pattern-recognition)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

## Introduction

Convertible Bond Analyzer is a specialized web application designed for financial analysts, investors, and researchers who need to track and analyze convertible bond (CB) issuances and their impact on stock prices. The tool extracts information from official sources (DART for Korean markets and SEC EDGAR for US markets) and provides visualization tools to understand market reactions to CB announcements.

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- API keys for DART (if analyzing Korean stocks)

### Account Setup
1. Register for a free DART OpenAPI key at [DART API Portal](https://opendart.fss.or.kr/)
2. Configure your API key in the application settings

## User Interface

The application features a clean, intuitive interface with several key components:

- **Navigation Bar**: Access different sections of the application
- **Search Area**: Find companies and their related CB filings
- **Data Display**: View extracted CB information and price data
- **Charts**: Visualize price movements before and after CB announcements
- **Analysis Panel**: See pattern recognition and statistical insights

## Search Functionality

### Searching for a Company
1. Enter the company identifier in the search box
2. Select the appropriate market (DART, NYSE, NASDAQ, Dow Jones)
3. Choose whether you're searching by name, ticker, or stock code
4. Click "Search" to find the company

### Search Tips
- For Korean companies, use the stock code (e.g., 005930 for Samsung Electronics)
- For US companies, use the ticker symbol (e.g., AAPL for Apple)
- Partial name searches are supported for both markets

## Reports Interface

The Reports Interface displays all CB-related filings for the selected company:

### Available Information
- Filing date
- Document type
- Document title
- Source (DART or EDGAR)
- Direct link to original document

### Filtering Reports
- Filter by date range
- Filter by document type
- Sort by filing date, relevance, or document type

## CB Detail Extraction

The application can automatically extract key CB information from filings:

### Extracted Information
- Issuance amount
- Conversion price
- Conversion premium
- Maturity date
- Interest rate
- Use of proceeds

### Extraction Process
1. Select a report from the list
2. Click "Extract Details"
3. Review the extracted information
4. Manual correction of fields is supported if needed

## Price Analysis

Analyze stock price movements around CB announcement dates:

### Price Charts
- Pre-announcement period (configurable, default: -30 days)
- Announcement date marker
- Post-announcement period (configurable, default: +30 days)
- Comparison to market index

### Chart Controls
- Zoom in/out
- Change time periods
- Toggle comparison benchmark
- Display volume information

## Pattern Recognition

The application includes pattern recognition algorithms to identify common price patterns around CB announcements:

### Available Patterns
- Pre-announcement run-up
- Post-announcement drop
- V-shaped recovery
- Extended decline
- Neutral/no impact

### Statistical Analysis
- Average price change (%, absolute)
- Volume analysis
- Volatility metrics
- Comparison to similar announcements

## Troubleshooting

### Common Issues

**Issue**: No results when searching for a company
- Verify the company identifier is correct
- Check market selection
- Ensure API keys are properly configured

**Issue**: CB details not extracting properly
- Try a different report
- Some filings may have non-standard formats that are harder to parse
- Use manual input for complex documents

**Issue**: Charts not displaying
- Check internet connection
- Verify stock price data is available for the selected period
- Try a different browser

## FAQ

**Q: Does the application support languages other than English?**
A: The interface is in English, but it can extract and analyze documents in Korean and English.

**Q: Can I export the data?**
A: Yes, all data can be exported in CSV format for further analysis.

**Q: How often is filing data updated?**
A: DART data is updated daily, while SEC EDGAR data is updated within 24 hours of filings.

**Q: Is there a limit to the number of searches?**
A: Free accounts have a daily limit of 50 searches. Premium accounts have unlimited access.

**Q: Can I analyze multiple CBs simultaneously?**
A: Yes, you can open multiple tabs or use the comparison feature to analyze up to 3 CBs side by side. 