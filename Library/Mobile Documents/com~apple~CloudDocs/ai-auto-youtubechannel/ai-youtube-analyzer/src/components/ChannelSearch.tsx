'use client'

import React, { useState, FormEvent } from 'react'
import { ChannelSearchProps } from '@/lib/types'

export default function ChannelSearch({ onSearch, isLoading }: ChannelSearchProps) {
  const [channelInput, setChannelInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!channelInput.trim()) return
    
    // Extract channel ID or handle if it's a URL
    let channelId = channelInput.trim()
    
    // Check if input is a URL
    if (channelId.includes('youtube.com/')) {
      // Try to extract channel handle (@username)
      const handlePattern = /youtube\.com\/@([a-zA-Z0-9_-]+)/
      const handleMatch = channelId.match(handlePattern)
      
      if (handleMatch && handleMatch[1]) {
        channelId = '@' + handleMatch[1]
      } else {
        // Try to extract channel ID
        const channelPattern = /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/
        const channelMatch = channelId.match(channelPattern)
        
        if (channelMatch && channelMatch[1]) {
          channelId = channelMatch[1]
        }
      }
    }
    
    onSearch(channelId)
  }

  return (
    <div>
      <h2>유튜브 채널 검색</h2>
      <p>유튜브 채널 ID (예: @channelname) 또는 채널 URL을 입력하세요</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={channelInput}
          onChange={(e) => setChannelInput(e.target.value)}
          placeholder="채널 ID 또는 URL (예: @channelname)"
          disabled={isLoading}
        />
        
        <button 
          type="submit" 
          className="button"
          disabled={isLoading || !channelInput.trim()}
        >
          {isLoading ? '로딩 중...' : '채널 분석하기'}
        </button>
      </form>
    </div>
  )
} 