'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Channel {
  id: string
  title: string
  sector: string
  subscriberCount: number
  videoCount: number
  viewCount: number
  joinDate: string
  thumbnailUrl: string
}

// Sample initial data
const initialChannels: Channel[] = []

// Add a new type for top channels
interface TopChannel {
  channelId: string;
  channelTitle: string;
  thumbnail: string;
  subscriberCount: string;
}

export default function TopChannelsPage() {
  const router = useRouter()
  const [channels, setChannels] = useState<Channel[]>(initialChannels)
  const [newChannel, setNewChannel] = useState<Partial<Channel>>({
    id: '',
    title: '',
    sector: '',
    subscriberCount: 0,
    videoCount: 0,
    viewCount: 0,
    joinDate: '',
    thumbnailUrl: ''
  })
  const [sortBy, setSortBy] = useState<keyof Channel>('subscriberCount')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isLoading, setIsLoading] = useState(false)
  const [topChannels, setTopChannels] = useState<TopChannel[]>([])
  const [topLoading, setTopLoading] = useState(false)
  const [topError, setTopError] = useState('')

  useEffect(() => {
    const fetchTopChannels = async () => {
      setTopLoading(true)
      setTopError('')
      try {
        const res = await fetch('/api/youtube/top-channels')
        if (!res.ok) throw new Error('Failed to fetch top channels')
        const data = await res.json()
        setTopChannels(data.channels || [])
      } catch (err) {
        setTopError('상위 채널 정보를 불러오지 못했습니다.')
      } finally {
        setTopLoading(false)
      }
    }
    fetchTopChannels()
  }, [])

  // Add a new channel
  const handleAddChannel = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newChannel.id || !newChannel.title) {
      alert('채널 ID와 제목은 필수 입력 항목입니다.')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Fetch channel data from YouTube API if channel ID is provided
      if (newChannel.id) {
        const channelId = newChannel.id
        let apiUrl = `/api/youtube?channelId=${channelId}`
        
        const response = await fetch(apiUrl)
        
        if (response.ok) {
          const data = await response.json()
          
          // Update the new channel with real data
          const updatedChannel: Channel = {
            id: channelId,
            title: data.channelTitle || newChannel.title,
            sector: newChannel.sector || '미분류',
            subscriberCount: data.subscriberCount || 0,
            videoCount: data.totalVideos || 0,
            viewCount: data.viewCount || 0,
            joinDate: newChannel.joinDate || new Date().toISOString().split('T')[0],
            thumbnailUrl: data.thumbnailUrl || ''
          }
          
          // Add to channels list
          setChannels(prev => [...prev, updatedChannel])
          
          // Reset the form
          setNewChannel({
            id: '',
            title: '',
            sector: '',
            subscriberCount: 0,
            videoCount: 0,
            viewCount: 0,
            joinDate: '',
            thumbnailUrl: ''
          })
        } else {
          throw new Error('채널 정보를 가져오는데 실패했습니다.')
        }
      }
    } catch (error) {
      console.error('Error adding channel:', error)
      alert('채널을 추가하는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Convert number values
    if (name === 'subscriberCount' || name === 'videoCount' || name === 'viewCount') {
      setNewChannel(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }))
    } else {
      setNewChannel(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Remove a channel from the list
  const handleRemoveChannel = (channelId: string) => {
    setChannels(prev => prev.filter(channel => channel.id !== channelId))
  }

  // Change sort field and toggle order if clicking the same field
  const handleSortChange = (field: keyof Channel) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Helper for rendering sort indicators
  const renderSortIndicator = (field: keyof Channel) => {
    if (sortBy !== field) return null
    return sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    } else {
      return num.toString()
    }
  }

  // Sort channels based on current sort settings
  const sortedChannels = [...channels].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  }).slice(0, 10) // Limit to top 10 channels based on sort

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">인기 유튜브 채널 비교</h1>
        <div>
          <Link href="/" className="button">
            채널 분석으로 돌아가기
          </Link>
        </div>
      </header>
      
      <div className="card">
        <h2>새 채널 추가</h2>
        <form onSubmit={handleAddChannel} className="channel-form">
          <div className="form-group">
            <label htmlFor="id">채널 ID 또는 @username</label>
            <input
              type="text"
              id="id"
              name="id"
              className="input"
              value={newChannel.id}
              onChange={handleInputChange}
              placeholder="예: @channelname"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">채널 이름</label>
            <input
              type="text"
              id="title"
              name="title"
              className="input"
              value={newChannel.title}
              onChange={handleInputChange}
              placeholder="채널 이름"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sector">분야</label>
            <select
              id="sector"
              name="sector"
              className="input"
              value={newChannel.sector}
              onChange={handleInputChange}
            >
              <option value="">분야 선택</option>
              <option value="게임">게임</option>
              <option value="음악">음악</option>
              <option value="교육">교육</option>
              <option value="엔터테인먼트">엔터테인먼트</option>
              <option value="과학기술">과학기술</option>
              <option value="뷰티">뷰티</option>
              <option value="스포츠">스포츠</option>
              <option value="요리">요리</option>
              <option value="여행">여행</option>
              <option value="기타">기타</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="joinDate">채널 개설일</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              className="input"
              value={newChannel.joinDate}
              onChange={handleInputChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="button"
            disabled={isLoading}
          >
            {isLoading ? '로딩 중...' : '채널 추가'}
          </button>
        </form>
      </div>
      
      <div className="card">
        <h2>상위 10개 채널</h2>
        {topLoading ? (
          <p>로딩 중...</p>
        ) : topError ? (
          <p style={{ color: 'red' }}>{topError}</p>
        ) : topChannels.length === 0 ? (
          <p>아직 등록된 채널이 없습니다. 위 폼을 통해 채널을 추가해주세요.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topChannels.map((ch, idx) => (
              <li key={ch.channelId} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 'bold', marginRight: 12 }}>{idx + 1}.</span>
                <img src={ch.thumbnail} alt={ch.channelTitle} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }} />
                <span style={{ fontWeight: 500, marginRight: 12 }}>{ch.channelTitle}</span>
                <span style={{ color: '#888' }}>구독자: {Number(ch.subscriberCount).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 