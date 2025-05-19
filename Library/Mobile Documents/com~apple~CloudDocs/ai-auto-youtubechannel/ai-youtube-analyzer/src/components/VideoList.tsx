'use client'

import React, { useState } from 'react'
import { VideoListProps } from '@/lib/types'
import { format } from 'date-fns'
import ExportOptions from './ExportOptions'
import { exportChannelData } from '@/lib/exportUtils'

type SortField = 'date' | 'title' | 'views' | 'likes' | 'comments';

export default function VideoList({ videos, metrics, onExport }: VideoListProps) {
  const [sortBy, setSortBy] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  
  // Get metrics for a specific video
  const getMetricsForVideo = (videoId: string) => {
    if (!metrics) return null;
    return metrics.find(m => m.videoId === videoId);
  }
  
  // Sort videos based on current sort settings
  const sortedVideos = [...videos].sort((a, b) => {
    const aMetrics = getMetricsForVideo(a.id);
    const bMetrics = getMetricsForVideo(b.id);
    
    // Compare based on selected sort field
    switch (sortBy) {
      case 'date':
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        
      case 'title':
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
          
      case 'views':
        const viewsA = aMetrics?.views || 0;
        const viewsB = bMetrics?.views || 0;
        return sortOrder === 'asc' ? viewsA - viewsB : viewsB - viewsA;
        
      case 'likes':
        const likesA = aMetrics?.likes || 0;
        const likesB = bMetrics?.likes || 0;
        return sortOrder === 'asc' ? likesA - likesB : likesB - likesA;
        
      case 'comments':
        const commentsA = aMetrics?.comments || 0;
        const commentsB = bMetrics?.comments || 0;
        return sortOrder === 'asc' ? commentsA - commentsB : commentsB - commentsA;
        
      default:
        return 0;
    }
  });
  
  // Change sort field and toggle order if clicking the same field
  const handleSortChange = (field: SortField) => {
    if (sortBy === field) {
      // If already sorting by this field, toggle the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If changing sort field, set to desc by default
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Format a summary of the description (first 100 characters)
  const formatSummary = (description: string) => {
    if (!description) return '';
    const summary = description.substring(0, 100);
    return summary.length < description.length ? `${summary}...` : summary;
  }

  // Format large numbers with commas
  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A';
    return num.toLocaleString();
  }

  // Helper for rendering sort indicators
  const renderSortIndicator = (field: SortField) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <h3>영상 목록 ({videos.length})</h3>
        <div>
          <button 
            className="button" 
            style={{ 
              marginRight: '0.5rem',
              backgroundColor: viewMode === 'table' ? 'var(--primary-color)' : 'var(--accent-color)' 
            }}
            onClick={() => setViewMode('table')}
          >
            표 형식
          </button>
          <button 
            className="button" 
            style={{ 
              marginRight: '0.5rem',
              backgroundColor: viewMode === 'grid' ? 'var(--primary-color)' : 'var(--accent-color)' 
            }}
            onClick={() => setViewMode('grid')}
          >
            그리드 형식
          </button>
        </div>
      </div>
      
      {viewMode === 'table' && (
        <div className="video-table-container">
          <table className="video-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>썸네일</th>
                <th className="sortable" onClick={() => handleSortChange('title')}>
                  제목{renderSortIndicator('title')}
                </th>
                <th>내용 요약</th>
                <th className="sortable" onClick={() => handleSortChange('date')}>
                  등록 날짜{renderSortIndicator('date')}
                </th>
                <th className="sortable" onClick={() => handleSortChange('views')}>
                  조회수{renderSortIndicator('views')}
                </th>
                <th className="sortable" onClick={() => handleSortChange('likes')}>
                  좋아요{renderSortIndicator('likes')}
                </th>
                <th className="sortable" onClick={() => handleSortChange('comments')}>
                  댓글수{renderSortIndicator('comments')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedVideos.map((video, index) => {
                const videoMetrics = getMetricsForVideo(video.id);
                return (
                  <tr key={video.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          style={{ width: '120px', height: 'auto' }} 
                        />
                      </a>
                    </td>
                    <td>
                      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="video-title-link">
                        {video.title}
                      </a>
                    </td>
                    <td className="video-description">{formatSummary(video.description)}</td>
                    <td>{format(new Date(video.publishedAt), 'yyyy-MM-dd')}</td>
                    <td>{formatNumber(videoMetrics?.views)}</td>
                    <td>{formatNumber(videoMetrics?.likes)}</td>
                    <td>{formatNumber(videoMetrics?.comments)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {viewMode === 'grid' && (
        <div>
          <div className="sort-controls">
            <span>정렬:</span>
            <button 
              className="button" 
              style={{ 
                marginLeft: '0.5rem',
                backgroundColor: sortBy === 'date' ? 'var(--primary-color)' : 'var(--accent-color)' 
              }}
              onClick={() => handleSortChange('date')}
            >
              날짜순{renderSortIndicator('date')}
            </button>
            <button 
              className="button"
              style={{ 
                backgroundColor: sortBy === 'title' ? 'var(--primary-color)' : 'var(--accent-color)' 
              }}
              onClick={() => handleSortChange('title')}
            >
              제목순{renderSortIndicator('title')}
            </button>
            <button 
              className="button"
              style={{ 
                backgroundColor: sortBy === 'views' ? 'var(--primary-color)' : 'var(--accent-color)' 
              }}
              onClick={() => handleSortChange('views')}
            >
              조회수{renderSortIndicator('views')}
            </button>
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
                    {format(new Date(video.publishedAt), 'yyyy-MM-dd')}
                  </div>
                  {metrics && (
                    <div className="video-metrics">
                      <span>조회수: {formatNumber(getMetricsForVideo(video.id)?.views)}</span>
                      <span>좋아요: {formatNumber(getMetricsForVideo(video.id)?.likes)}</span>
                    </div>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 