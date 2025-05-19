# YouTube Channel Analyzer

A Next.js application for analyzing YouTube channels and organizing video data in a Google Sheets-compatible format.

## Features

- Search for YouTube channels using channel ID or URL
- View total number of videos for a channel
- Display video information (title, thumbnail, publish date)
- Sort videos by date or title
- Prepare data for export to Google Sheets

## Technologies Used

- Next.js 14
- TypeScript
- YouTube Data API v3
- googleapis
- date-fns

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- YouTube Data API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-youtube-analyzer.git
cd ai-youtube-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your YouTube API key:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

To get a YouTube API key:
- Go to the [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable the YouTube Data API v3
- Create credentials (API Key)

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a YouTube channel ID (e.g., @channelname) or URL
2. Click "Analyze Channel" to retrieve the channel's video data
3. View the total number of videos and details for each video
4. Sort the videos by date or title
5. Use the data to create a Google Sheet

## Connecting to GitHub

```bash
# Add your remote repository
git remote add origin https://github.com/yourusername/ai-youtube-analyzer.git

# Push your code to GitHub
git push -u origin main
```

## License

MIT 