'use client'

import { useState } from 'react'
import { VideoListProps } from '@/lib/types'
import { format } from 'date-fns'

export default function VideoList({ videos }: VideoListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // Sort videos based on current sort settings
  const sortedVideos = [...videos].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    } else { // sort by title
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    }
  })
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3>Videos ({videos.length})</h3>
        <div>
          <button 
            className="button" 
            style={{ 
              marginRight: '0.5rem',
              backgroundColor: sortBy === 'date' ? 'var(--primary-color)' : 'var(--accent-color)' 
            }}
            onClick={() => setSortBy('date')}
          >
            Sort by Date
          </button>
          <button 
            className="button"
            style={{ 
              backgroundColor: sortBy === 'title' ? 'var(--primary-color)' : 'var(--accent-color)' 
            }}
            onClick={() => setSortBy('title')}
          >
            Sort by Title
          </button>
          <button 
            className="button"
            style={{ marginLeft: '0.5rem' }}
            onClick={toggleSortOrder}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      <div className="video-grid">
        {sortedVideos.map(video => (
          <div key={video.id} className="video-card">
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                style={{ width: '100%', height: 'auto' }} 
              />
              <div className="video-title">{video.title}</div>
              <div className="video-date">
                {format(new Date(video.publishedAt), 'MMMM d, yyyy')}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
} 