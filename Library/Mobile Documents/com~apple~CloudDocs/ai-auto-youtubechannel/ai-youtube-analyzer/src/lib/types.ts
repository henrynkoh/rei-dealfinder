export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface ChannelData {
  channelId: string;
  channelTitle: string;
  totalVideos: number;
  videos: Video[];
}

export interface ChannelSearchProps {
  onSearch: (channelId: string) => void;
  isLoading: boolean;
}

export interface VideoListProps {
  videos: Video[];
} 