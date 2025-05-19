import { ChannelData, ExportFormat, ExportOptions, Video, VideoMetrics } from './types';
import { format as formatDate } from 'date-fns';

// Default export options
const defaultOptions: ExportOptions = {
  includeDescription: true,
  includeMetrics: true,
  dateFormat: 'yyyy-MM-dd'
};

/**
 * Formats video data for export
 */
export function formatVideosForExport(
  channelData: ChannelData, 
  options: Partial<ExportOptions> = {}
): any[] {
  const mergedOptions = { ...defaultOptions, ...options };
  const { videos, metrics } = channelData;
  
  return videos.map((video, index) => {
    // Base data that's always included
    const videoData: any = {
      position: index + 1,
      videoId: video.id,
      title: video.title,
      url: video.videoUrl,
      publishedAt: formatDate(
        new Date(video.publishedAt), 
        mergedOptions.dateFormat
      )
    };
    
    // Add description if requested
    if (mergedOptions.includeDescription) {
      videoData.description = video.description;
    }
    
    // Add metrics if requested and available
    if (mergedOptions.includeMetrics && metrics) {
      const videoMetrics = metrics.find(m => m.videoId === video.id);
      if (videoMetrics) {
        videoData.views = videoMetrics.views;
        videoData.likes = videoMetrics.likes;
        videoData.comments = videoMetrics.comments;
        videoData.duration = videoMetrics.duration;
      }
    }
    
    return videoData;
  });
}

/**
 * Exports channel data to CSV format
 */
export function exportToCSV(channelData: ChannelData, options: Partial<ExportOptions> = {}): string {
  const formattedData = formatVideosForExport(channelData, options);
  
  if (formattedData.length === 0) {
    return '';
  }
  
  // Get headers from the first object's keys
  const headers = Object.keys(formattedData[0]);
  
  // Create CSV header row
  let csv = headers.join(',') + '\n';
  
  // Add data rows
  formattedData.forEach(row => {
    const values = headers.map(header => {
      const value = row[header]?.toString() || '';
      // Escape quotes and wrap in quotes if contains comma
      return value.includes(',') ? 
        `"${value.replace(/"/g, '""')}"` : 
        value;
    });
    csv += values.join(',') + '\n';
  });
  
  return csv;
}

/**
 * Exports channel data to JSON format
 */
export function exportToJSON(channelData: ChannelData, options: Partial<ExportOptions> = {}): string {
  const formattedData = formatVideosForExport(channelData, options);
  return JSON.stringify({
    channelId: channelData.channelId,
    channelTitle: channelData.channelTitle,
    totalVideos: channelData.totalVideos,
    subscriberCount: channelData.subscriberCount,
    viewCount: channelData.viewCount,
    exportDate: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    videos: formattedData
  }, null, 2);
}

/**
 * Creates a downloadable file from data
 */
export function downloadFile(data: string, filename: string, mimeType: string): void {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Main export function that handles different formats
 */
export function exportChannelData(
  channelData: ChannelData, 
  format: ExportFormat, 
  options: Partial<ExportOptions> = {}
): void {
  const safeChannelTitle = channelData.channelTitle
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  
  const timestamp = formatDate(new Date(), 'yyyyMMdd_HHmmss');
  
  switch (format) {
    case 'csv':
      const csvData = exportToCSV(channelData, options);
      downloadFile(
        csvData, 
        `${safeChannelTitle}_videos_${timestamp}.csv`,
        'text/csv;charset=utf-8;'
      );
      break;
      
    case 'json':
      const jsonData = exportToJSON(channelData, options);
      downloadFile(
        jsonData,
        `${safeChannelTitle}_videos_${timestamp}.json`,
        'application/json'
      );
      break;
      
    case 'excel':
      // For Excel, we just create a CSV and rename it to .xlsx
      // In a real app, you would use a library like xlsx
      const excelData = exportToCSV(channelData, options);
      downloadFile(
        excelData,
        `${safeChannelTitle}_videos_${timestamp}.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      break;
      
    case 'sheets':
      // For Google Sheets, create a CSV that can be imported
      const sheetsData = exportToCSV(channelData, options);
      downloadFile(
        sheetsData,
        `${safeChannelTitle}_videos_${timestamp}_for_sheets.csv`,
        'text/csv;charset=utf-8;'
      );
      break;
  }
} 