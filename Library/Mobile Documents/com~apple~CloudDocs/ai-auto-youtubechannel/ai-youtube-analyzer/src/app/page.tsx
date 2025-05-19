'use client'

import { useState } from 'react'
import ChannelSearch from '@/components/ChannelSearch'
import VideoList from '@/components/VideoList'
import { ChannelData } from '@/lib/types'

export default function Home() {
  const [channelData, setChannelData] = useState<ChannelData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (channelId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/youtube?channelId=${channelId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch channel data')
      }
      
      const data = await response.json()
      setChannelData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setChannelData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <header className="header">
        <h1 className="title">YouTube Channel Analyzer</h1>
      </header>
      
      <div className="card">
        <ChannelSearch onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      {error && (
        <div className="card" style={{ backgroundColor: '#ffebee' }}>
          <p>{error}</p>
        </div>
      )}
      
      {channelData && (
        <div className="card">
          <h2>{channelData.channelTitle}</h2>
          <p>Total videos: {channelData.totalVideos}</p>
          <VideoList videos={channelData.videos} />
        </div>
      )}
    </div>
  )
} 