import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Fetch most popular videos
    const popularVideosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&regionCode=KR&key=${apiKey}`;
    const videosResponse = await fetch(popularVideosUrl);
    const videosData = await videosResponse.json();

    if (!videosData.items) {
      return NextResponse.json({ channels: [] });
    }

    // Extract unique channel IDs
    const channelMap = new Map();
    for (const video of videosData.items) {
      const channelId = video.snippet.channelId;
      if (!channelMap.has(channelId)) {
        channelMap.set(channelId, {
          channelId,
          channelTitle: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails?.default?.url || '',
        });
      }
    }
    const uniqueChannels = Array.from(channelMap.values()).slice(0, 10);

    // Fetch channel details (subscriber count, etc.)
    const ids = uniqueChannels.map((c) => c.channelId).join(',');
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ids}&key=${apiKey}`;
    const channelsResponse = await fetch(channelsUrl);
    const channelsData = await channelsResponse.json();

    const topChannels = (channelsData.items || []).map((item: any) => ({
      channelId: item.id,
      channelTitle: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.default?.url || '',
      subscriberCount: item.statistics?.subscriberCount || '0',
    }));

    return NextResponse.json({ channels: topChannels });
  } catch (error) {
    console.error('YouTube Top Channels API error:', error);
    return NextResponse.json({ error: 'Failed to fetch top channels' }, { status: 500 });
  }
} 