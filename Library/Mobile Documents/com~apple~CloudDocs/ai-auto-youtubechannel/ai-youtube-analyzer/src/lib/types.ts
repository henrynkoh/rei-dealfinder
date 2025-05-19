export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  position?: number;
}

export interface VideoMetrics {
  channelId: string;
  videoId: string;
  views?: number;
  likes?: number;
  comments?: number;
  duration?: string;
}

export interface ChannelData {
  channelId: string;
  channelTitle: string;
  totalVideos: number;
  subscriberCount?: number;
  viewCount?: number;
  videos: Video[];
  metrics?: VideoMetrics[];
}

export interface ChannelSearchProps {
  onSearch: (channelId: string) => void;
  isLoading: boolean;
}

export interface VideoListProps {
  videos: Video[];
  metrics?: VideoMetrics[];
  onExport: (format: ExportFormat, options?: Partial<ExportOptions>) => void;
}

export interface AnalyticsProps {
  channelData: ChannelData;
}

export type ExportFormat = 'csv' | 'json' | 'excel' | 'sheets';

export interface ExportOptions {
  includeDescription: boolean;
  includeMetrics: boolean;
  dateFormat: string;
} 