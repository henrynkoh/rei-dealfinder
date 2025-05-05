# Convertible Bond Analyzer - Tutorial

This tutorial will guide you through a complete workflow using the Convertible Bond Analyzer, from searching for CB reports to analyzing price patterns.

## Case Study: Analyzing a Korean Company's CB Issuance

In this tutorial, we'll analyze a convertible bond issuance by 코미팜 (Komipharm), a Korean pharmaceutical company with stock code 041960.

### Step 1: Launch the Application

1. Open your web browser and navigate to the Convertible Bond Analyzer application.
2. You'll see the main interface with a search form at the top of the page.

### Step 2: Search for CB Reports

1. In the Company Identifier field, enter `041960` (the stock code for 코미팜).
2. Select `DART (Korea)` from the Market dropdown.
3. Make sure `Stock Code` is selected in the Search By dropdown.
4. Click the `Search` button.
5. You'll see a list of the company's information, including its full name, industry, and stock listing date.

### Step 3: Review Available Reports

1. The application will display a list of reports filed by 코미팜.
2. Look for reports with titles containing keywords like "전환사채" (convertible bond), "CB", or "사채권" (bond).
3. For this tutorial, locate a report from 2021-03-15 titled "주요사항보고서(전환사채권발행결정)".
4. This is the report announcing the company's decision to issue convertible bonds.

### Step 4: Extract CB Details

1. Click on the report to select it.
2. Click the `Extract Details` button.
3. The application will process the document and extract key CB information:
   - Issuance amount: 5,000,000,000 KRW
   - Conversion price: 2,235 KRW per share
   - Maturity: 3 years
   - Interest rate: 0% (zero coupon)
   - Issue date: 2021-03-17

4. The extraction results are displayed in a structured form for easy reading.

### Step 5: Analyze Stock Price Impact

1. With the CB details extracted, click the `Analyze Price Impact` button.
2. The application will fetch historical stock prices for 코미팜 from 30 days before to 30 days after the announcement.
3. A price chart will appear showing:
   - The stock price line (blue)
   - The announcement date (red vertical line)
   - KOSDAQ index for comparison (gray line)
   - Daily trading volume (bars at bottom)

4. You can see that 코미팜's stock price was in a slight downtrend prior to the announcement and experienced a sharp drop after the announcement.

### Step 6: Adjust Chart Settings

1. Use the date range selector to change the analysis period if desired.
2. Toggle the comparison benchmark on or off using the checkbox.
3. Click the `Show Moving Averages` button to add 5-day and 20-day moving averages to the chart.
4. Use the zoom buttons or click and drag on the chart to focus on specific time periods.

### Step 7: View Pattern Analysis

1. Click the `Run Pattern Analysis` button.
2. The application will process the price data and identify the pattern that best matches this CB announcement.
3. For 코미팜, the pattern is identified as "Post-announcement Drop" with a 15% average decline in the first week.
4. The analysis also shows:
   - Increased trading volume (145% of normal) after the announcement
   - Higher-than-average volatility
   - Similar patterns found in 65% of pharmaceutical company CB announcements

### Step 8: Export and Save Results

1. To save your analysis, click the `Export Results` button.
2. Choose between:
   - CSV format (raw data)
   - PDF report (formatted analysis)
   - Excel workbook (data and charts)
3. Enter a name for your report and click `Save`.
4. The report will be downloaded to your computer.

## Case Study: Analyzing a US Company's CB Issuance

Now let's briefly look at a US example.

### Step 1: Search for a US Company

1. In the Company Identifier field, enter `TSLA` (the ticker for Tesla).
2. Select `Nasdaq` from the Market dropdown.
3. Make sure `Ticker` is selected in the Search By dropdown.
4. Click the `Search` button.

### Step 2: Find CB Announcements

1. Look for Form 8-K filings that mention convertible notes or bonds.
2. Select a filing from May 2019 announcing Tesla's convertible note offering.
3. Click the `Extract Details` button to process the document.

### Step 3: Analyze the Results

1. The application extracts details of the $1.6 billion convertible senior notes offering.
2. Click the `Analyze Price Impact` button to visualize stock price movements.
3. Compare Tesla's stock performance to the Nasdaq index.
4. Observe how the stock price reacted to the CB announcement.

## Conclusion

This tutorial has demonstrated how to:
- Search for companies in both Korean and US markets
- Find CB-related filings
- Extract key information automatically
- Visualize price impacts
- Identify patterns in stock price reactions
- Compare results across different markets

By following these steps, you can conduct thorough analysis of convertible bond offerings and their market impact, helping inform investment decisions or market research. 