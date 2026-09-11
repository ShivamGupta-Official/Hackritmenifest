import { SocialPlatformAdapter } from './SocialPlatformAdapter';
import { LiveSocialAdapter } from './LiveSocialAdapter';

export * from './SocialPlatformAdapter';
export * from './LiveSocialAdapter';

export class SocialAdapterFactory {
  static getAdapterForUrl(url: string): { adapter: SocialPlatformAdapter; platform: 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'web' } {
    const clean = (url || '').trim().toLowerCase();
    
    if (clean.includes('tiktok.com')) {
      return { adapter: new LiveSocialAdapter('tiktok'), platform: 'tiktok' };
    }
    if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
      return { adapter: new LiveSocialAdapter('youtube'), platform: 'youtube' };
    }
    if (clean.includes('linkedin.com')) {
      return { adapter: new LiveSocialAdapter('linkedin'), platform: 'linkedin' };
    }
    if (clean.includes('instagram.com')) {
      return { adapter: new LiveSocialAdapter('instagram'), platform: 'instagram' };
    }
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return { adapter: new LiveSocialAdapter('web'), platform: 'web' };
    }
    
    // Default to Instagram for bare handles or usernames
    return { adapter: new LiveSocialAdapter('instagram'), platform: 'instagram' };
  }
}
