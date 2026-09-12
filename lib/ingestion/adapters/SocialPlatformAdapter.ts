export type DataProvenance = 'OBSERVED' | 'AI_ESTIMATE' | 'NOT_AVAILABLE';

export interface ExtractedMetric<T> {
  value: T;
  provenance: DataProvenance;
  notes?: string;
}

export interface ExtractedPost {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'web';
  accountHandle: string;
  accountName: string;
  accountAvatar?: string;
  title: string;
  caption: string;
  transcript: string;
  durationSeconds: number;
  format: string; // e.g. 'Founder POV', 'Problem Agitation Reel', 'Step-by-Step Breakdown'
  hookType: string; // e.g. 'Contrarian Question', 'Visual Curiosity', 'Pain-First Callout'
  hookText: string;
  ctaType: string; // e.g. 'Comment Keyword', 'Save for Later', 'Link in Bio'
  ctaText: string;
  tone: string; // e.g. 'Authoritative', 'Raw & Authentic', 'High-Energy'
  topic: string;
  mediaUrl?: string;
  thumbnailUrl?: string; // post thumbnail / cover image
  postType?: 'reel' | 'carousel' | 'image' | 'video' | 'story' | 'short' | 'article'; // content type
  permalink: string;
  publishedAt: string;
  
  // Metrics with clear provenance separation
  metrics: {
    views: ExtractedMetric<number>;
    likes: ExtractedMetric<number>;
    comments: ExtractedMetric<number>;
    shares: ExtractedMetric<number>;
    saves: ExtractedMetric<number>;
    reach?: ExtractedMetric<number>;      // Instagram / TikTok
    reposts?: ExtractedMetric<number>;    // Twitter / TikTok
    impressions?: ExtractedMetric<number>;// LinkedIn / YouTube
    watchTime?: ExtractedMetric<number>;  // YouTube (seconds)
    engagementRate: ExtractedMetric<number>;
  };

  // AI Extraction Signals
  contentSignals: {
    hookVisualCue: string;
    pacingBpm: number;
    textOnScreenDensity: 'low' | 'medium' | 'high';
    emotionalTrigger: string;
    keyTakeaway: string;
  };
}

export interface PlatformProfileInfo {
  handle: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  followersCount?: ExtractedMetric<number>;
  followingCount?: ExtractedMetric<number>;
  postsCount?: ExtractedMetric<number>;
  isVerified?: boolean;
}

export interface SocialPlatformAdapter {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'web';
  validateUrl(url: string): boolean;
  extractAccountHandle(url: string): string | null;
  resolveAccountHandle?(url: string): Promise<string>;
  getProfile(url: string): Promise<PlatformProfileInfo>;
  extractPublicPosts(url: string, limit?: number): Promise<ExtractedPost[]>;
}
