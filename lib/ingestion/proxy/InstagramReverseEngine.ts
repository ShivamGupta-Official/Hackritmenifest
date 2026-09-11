import { proxyDispatcher } from './ProxyDispatcher';

export interface InstagramRawPost {
  id: string;
  title: string;
  caption: string;
  likes: number;
  comments: number;
  views: number;
  permalink: string;
  publishedAt: string;
  shortcode?: string;
}

export interface InstagramScrapeResult {
  success: boolean;
  profile: {
    handle: string;
    displayName: string;
    bio: string;
    followers: number;
    postsCount: number;
    isVerified: boolean;
    userId?: string;
  };
  posts: InstagramRawPost[];
  hasNextPage: boolean;
  endCursor?: string;
  rawSnapshot?: any;
  error?: string;
}

export class InstagramReverseEngine {
  private static instance: InstagramReverseEngine;

  public static getInstance(): InstagramReverseEngine {
    if (!InstagramReverseEngine.instance) {
      InstagramReverseEngine.instance = new InstagramReverseEngine();
    }
    return InstagramReverseEngine.instance;
  }

  /**
   * Scrapes an Instagram account with cursor-based pagination up to the requested limit.
   */
  public async scrapeProfile(handle: string, requestedLimit: number = 12): Promise<InstagramScrapeResult> {
    const cleanHandle = handle.replace(/^@/, '').toLowerCase();
    const appId = process.env.WMACID || process.env.META_APP_ID || process.env.X_IG_APP_ID || '936619743392459';

    try {
      const initialUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(cleanHandle)}`;
      
      const res = await proxyDispatcher.dispatch(initialUrl, {
        headers: {
          'x-ig-app-id': appId,
          'x-ig-www-claim': '0',
          'x-requested-with': 'XMLHttpRequest',
          'Referer': `https://www.instagram.com/${cleanHandle}/`,
          'Origin': 'https://www.instagram.com'
        },
        timeoutMs: 6000
      });

      if (!res.ok) {
        return {
          success: false,
          profile: {
            handle: cleanHandle,
            displayName: cleanHandle,
            bio: '',
            followers: 0,
            postsCount: 0,
            isVerified: false
          },
          posts: [],
          hasNextPage: false,
          error: `Instagram API returned status ${res.status}`
        };
      }

      const json = await res.json();
      const user = json?.data?.user;

      if (!user) {
        return {
          success: false,
          profile: {
            handle: cleanHandle,
            displayName: cleanHandle,
            bio: '',
            followers: 0,
            postsCount: 0,
            isVerified: false
          },
          posts: [],
          hasNextPage: false,
          error: 'User data not found in response'
        };
      }

      const timelineMedia = user.edge_owner_to_timeline_media;
      const initialEdges = timelineMedia?.edges || [];
      const pageInfo = timelineMedia?.page_info || {};
      const userId = user.id;

      const collectedPosts: InstagramRawPost[] = [];

      // Parse initial batch
      this.parseEdges(initialEdges, collectedPosts);

      let hasNextPage = pageInfo.has_next_page ?? false;
      let endCursor = pageInfo.end_cursor;

      // Deep Pagination Loop if requestedLimit > collectedPosts.length
      const maxPages = Math.min(Math.ceil(requestedLimit / 12), 8); // safety ceiling
      let pageCount = 1;

      while (hasNextPage && endCursor && collectedPosts.length < requestedLimit && pageCount < maxPages) {
        pageCount++;
        try {
          // GraphQL Pagination Query Hash for User Profile Feed
          const queryHash = '69cba40317214236af40e7efa697781d';
          const variables = JSON.stringify({
            id: userId,
            first: 12,
            after: endCursor
          });

          const nextUrl = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables=${encodeURIComponent(variables)}`;

          const nextRes = await proxyDispatcher.dispatch(nextUrl, {
            headers: {
              'x-ig-app-id': appId,
              'x-requested-with': 'XMLHttpRequest',
              'Referer': `https://www.instagram.com/${cleanHandle}/`
            },
            timeoutMs: 5000,
            applyJitter: true,
            minJitterMs: 300,
            maxJitterMs: 600
          });

          if (!nextRes.ok) break;

          const nextJson = await nextRes.json();
          const nextMedia = nextJson?.data?.user?.edge_owner_to_timeline_media;
          const nextEdges = nextMedia?.edges || [];

          if (nextEdges.length === 0) break;

          this.parseEdges(nextEdges, collectedPosts);

          hasNextPage = nextMedia?.page_info?.has_next_page ?? false;
          endCursor = nextMedia?.page_info?.end_cursor;
        } catch {
          // If secondary pagination hits a checkpoint, safely return what was collected so far
          break;
        }
      }

      return {
        success: true,
        profile: {
          handle: user.username || cleanHandle,
          displayName: user.full_name || cleanHandle,
          bio: user.biography || '',
          followers: user.edge_followed_by?.count || 0,
          postsCount: timelineMedia?.count || collectedPosts.length,
          isVerified: user.is_verified || false,
          userId
        },
        posts: collectedPosts.slice(0, requestedLimit),
        hasNextPage,
        endCursor,
        rawSnapshot: {
          scrapedAt: new Date().toISOString(),
          handle: cleanHandle,
          extractedCount: collectedPosts.length,
          userSnapshot: {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            biography: user.biography,
            followers: user.edge_followed_by?.count
          }
        }
      };
    } catch (err: any) {
      return {
        success: false,
        profile: {
          handle: cleanHandle,
          displayName: cleanHandle,
          bio: '',
          followers: 0,
          postsCount: 0,
          isVerified: false
        },
        posts: [],
        hasNextPage: false,
        error: err.message || 'Instagram extraction failed'
      };
    }
  }

  private parseEdges(edges: any[], targetArray: InstagramRawPost[]): void {
    for (const edge of edges) {
      const node = edge.node;
      if (!node) continue;

      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text || '';
      const likes = node.edge_liked_by?.count || node.edge_media_preview_like?.count || 0;
      const comments = node.edge_media_to_comment?.count || 0;
      const views = node.video_view_count || Math.round(likes * 14.5);
      const timestamp = node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toISOString() : new Date().toISOString();
      const shortcode = node.shortcode || '';

      targetArray.push({
        id: node.id || `ig_${shortcode || Math.random().toString(36).slice(2)}`,
        title: caption.split('\n')[0].slice(0, 60) || 'Instagram Media Update',
        caption,
        likes,
        comments,
        views,
        permalink: `https://instagram.com/p/${shortcode}`,
        publishedAt: timestamp,
        shortcode
      });
    }
  }
}

export const instagramReverseEngine = InstagramReverseEngine.getInstance();
