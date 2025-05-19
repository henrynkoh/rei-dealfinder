'use client'

import { useState, FormEvent } from 'react'
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
    if (channelId.includes('youtube.com/') || channelId.includes('youtu.be/')) {
      // Extract channel ID from URL
      const urlPattern = /(@[a-zA-Z0-9_-]+)/
      const match = channelId.match(urlPattern)
      
      if (match && match[1]) {
        channelId = match[1]
      }
    }
    
    onSearch(channelId)
  }

  return (
    <div>
      <h2>Enter YouTube Channel</h2>
      <p>Enter a YouTube channel ID (e.g., @channelname) or full channel URL</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={channelInput}
          onChange={(e) => setChannelInput(e.target.value)}
          placeholder="Channel ID or URL (e.g., @channelname)"
          disabled={isLoading}
        />
        
        <button 
          type="submit" 
          className="button"
          disabled={isLoading || !channelInput.trim()}
        >
          {isLoading ? 'Loading...' : 'Analyze Channel'}
        </button>
      </form>
    </div>
  )
} 