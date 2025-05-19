'use client'

import { useState } from 'react'
import ChannelSearch from '@/components/ChannelSearch'
import VideoList from '@/components/VideoList'
import ExportOptions from '@/components/ExportOptions'
import type { ChannelData, ExportFormat, ExportOptions as ExportOptionType } from '@/lib/types'
import { exportChannelData } from '@/lib/exportUtils'
import Link from 'next/link'

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

  const handleExport = (format: ExportFormat, options?: Partial<ExportOptionType>) => {
    if (channelData) {
      exportChannelData(channelData, format, options || {})
    }
  }

  return (
    <div>
      <header className="header">
        <h1 className="title">YouTube Channel Analyzer</h1>
        <div>
          <Link href="/channels" className="button">
            인기 채널 비교
          </Link>
        </div>
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
          <div className="channel-header">
            <h2>{channelData.channelTitle}</h2>
            <div className="channel-stats">
              <p>Total videos: {channelData.totalVideos}</p>
              {channelData.subscriberCount && (
                <p>Subscribers: {formatNumber(channelData.subscriberCount)}</p>
              )}
              {channelData.viewCount && (
                <p>Views: {formatNumber(channelData.viewCount)}</p>
              )}
            </div>
          </div>
          
          <div className="export-container">
            <ExportOptions 
              onExport={handleExport} 
              disabled={isLoading || !channelData}
            />
          </div>
          
          <VideoList 
            videos={channelData.videos} 
            metrics={channelData.metrics}
            onExport={handleExport}
          />
        </div>
      )}
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
} 