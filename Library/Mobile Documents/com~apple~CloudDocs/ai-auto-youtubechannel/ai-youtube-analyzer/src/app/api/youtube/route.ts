import { NextRequest, NextResponse } from 'next/server'

// Function to fetch YouTube channel data by ID or handle
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const channelId = searchParams.get('channelId')

    if (!channelId) {
      return NextResponse.json(
        { error: 'Channel ID is required' },
        { status: 400 }
      )
    }

    // Create API key URL parameter
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Step 1: Get channel details using fetch instead of the googleapis library
    let channelApiUrl = '';
    
    if (channelId.startsWith('@')) {
      channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forHandle=${channelId}&key=${apiKey}`;
    } else {
      channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}`;
    }
    
    const channelResponse = await fetch(channelApiUrl);
    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    const channel = channelData.items[0];
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return NextResponse.json(
        { error: 'Could not find uploads playlist' },
        { status: 404 }
      );
    }

    // Step 2: Get videos from the uploads playlist
    const videosApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
    const videosResponse = await fetch(videosApiUrl);
    const videosData = await videosResponse.json();

    if (!videosData.items) {
      return NextResponse.json({ 
        channelId: channel.id || '',
        channelTitle: channel.snippet?.title || '',
        totalVideos: 0,
        subscriberCount: parseInt(channel.statistics?.subscriberCount || '0', 10),
        viewCount: parseInt(channel.statistics?.viewCount || '0', 10),
        videos: []
      });
    }

    // Extract video IDs to get additional video details
    const videoIds = videosData.items.map((item: any) => item.contentDetails?.videoId).filter(Boolean).join(',');
    let videoDetails = [];
    
    if (videoIds) {
      // Get additional video data such as view counts, likes, etc.
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
      const videoDetailsResponse = await fetch(videoDetailsUrl);
      const videoDetailsData = await videoDetailsResponse.json();
      videoDetails = videoDetailsData.items || [];
    }
    
    // Step 3: Format the video data
    const videos = videosData.items.map((item: any, index: number) => ({
      id: item.contentDetails?.videoId || '',
      title: item.snippet?.title || '',
      description: item.snippet?.description || '',
      publishedAt: item.snippet?.publishedAt || '',
      thumbnailUrl: item.snippet?.thumbnails?.medium?.url || '',
      videoUrl: `https://www.youtube.com/watch?v=${item.contentDetails?.videoId}`,
      position: index + 1
    }));
    
    // Format video metrics
    const metrics = videoDetails.map((detail: any) => ({
      channelId: channel.id,
      videoId: detail.id,
      views: parseInt(detail.statistics?.viewCount || '0', 10),
      likes: parseInt(detail.statistics?.likeCount || '0', 10),
      comments: parseInt(detail.statistics?.commentCount || '0', 10),
      duration: detail.contentDetails?.duration || ''
    }));

    // Step 4: Prepare the final response
    const channelResults = {
      channelId: channel.id || '',
      channelTitle: channel.snippet?.title || '',
      totalVideos: parseInt(channel.statistics?.videoCount || '0', 10),
      subscriberCount: parseInt(channel.statistics?.subscriberCount || '0', 10),
      viewCount: parseInt(channel.statistics?.viewCount || '0', 10),
      videos,
      metrics
    };

    return NextResponse.json(channelResults);
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    );
  }
} 