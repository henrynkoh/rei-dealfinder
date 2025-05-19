import { NextRequest, NextResponse } from 'next/server'
import { google, youtube_v3 } from 'googleapis'
import { Video, ChannelData } from '@/lib/types'

// Initialize YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const channelId = searchParams.get('channelId')

  if (!channelId) {
    return NextResponse.json(
      { error: 'Channel ID is required' },
      { status: 400 }
    )
  }

  try {
    // First, get the channel details
    const channelResponse = await youtube.channels.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: [channelId],
      // Support for @username format
      forHandle: channelId.startsWith('@') ? channelId : undefined
    })

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      )
    }

    const channel = channelResponse.data.items[0]
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return NextResponse.json(
        { error: 'Could not find uploads playlist' },
        { status: 404 }
      )
    }

    // Then, get the videos from the uploads playlist
    const videosResponse = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: uploadsPlaylistId,
      maxResults: 50 // API limit
    })

    if (!videosResponse.data.items) {
      return NextResponse.json({ 
        channelId: channel.id ?? '',
        channelTitle: channel.snippet?.title ?? '',
        totalVideos: 0,
        videos: []
      })
    }

    // Format the video data
    const videos: Video[] = videosResponse.data.items.map((item: youtube_v3.Schema$PlaylistItem) => ({
      id: item.contentDetails?.videoId ?? '',
      title: item.snippet?.title ?? '',
      description: item.snippet?.description ?? '',
      publishedAt: item.snippet?.publishedAt ?? '',
      thumbnailUrl: item.snippet?.thumbnails?.medium?.url ?? '',
      videoUrl: `https://www.youtube.com/watch?v=${item.contentDetails?.videoId}`
    }))

    // Prepare the final response
    const channelData: ChannelData = {
      channelId: channel.id ?? '',
      channelTitle: channel.snippet?.title ?? '',
      totalVideos: parseInt(channel.statistics?.videoCount ?? '0', 10),
      videos
    }

    return NextResponse.json(channelData)
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    )
  }
} 