import puppeteer from 'puppeteer';

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
    avatarUrl?: string;
    followers: number;
    following?: number;
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

  public async scrapeProfile(handle: string, requestedLimit: number = 12): Promise<InstagramScrapeResult> {
    const cleanHandle = handle.replace(/^@/, '').toLowerCase();

    try {
      console.log(`[InstagramReverseEngine] Launching Puppeteer for ${cleanHandle}...`);
      
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      
      const profileUrl = `https://www.instagram.com/${cleanHandle}/`;
      await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a moment for dynamic tags to populate
      await new Promise(r => setTimeout(r, 2000));
      
      const currentUrl = page.url();
      if (currentUrl.includes('/accounts/login')) {
        await browser.close();
        throw new Error('Instagram aggressively redirected to the login page. Anonymous access blocked.');
      }

      const html = await page.content();
      
      // Extract from meta tags
      const metaDescMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:description"/i);
      
      if (!metaDescMatch || !metaDescMatch[1]) {
        await browser.close();
        throw new Error('Could not find profile metadata on the page. The page might be blocked or structured differently.');
      }

      const desc = metaDescMatch[1];
      // format: "1M Followers, 200 Following, 500 Posts - See Instagram photos and videos from Name (@username)"
      const followersMatch = desc.match(/([\d.,KMB]+)\s+Followers/i);
      const followingMatch = desc.match(/([\d.,KMB]+)\s+Following/i);
      const postsMatch = desc.match(/([\d.,KMB]+)\s+Posts/i);
      
      const parseNum = (str: string) => {
        if (!str) return 0;
        let num = parseFloat(str.replace(/,/g, ''));
        if (str.toLowerCase().includes('k')) num *= 1000;
        if (str.toLowerCase().includes('m')) num *= 1000000;
        if (str.toLowerCase().includes('b')) num *= 1000000000;
        return Math.round(num);
      };
      
      const followers = parseNum(followersMatch?.[1] || '0');
      const postsCount = parseNum(postsMatch?.[1] || '0');
      
      const nameMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i) || html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:title"/i);
      let displayName = cleanHandle;
      if (nameMatch && nameMatch[1]) {
        let rawName = nameMatch[1];
        rawName = rawName.replace(/&#064;/g, '@').replace(/&amp;/g, '&');
        displayName = rawName.split(' (@')[0] || cleanHandle;
      }

      const imageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
      const avatarUrl = imageMatch ? imageMatch[1].replace(/&amp;/g, '&') : undefined;
      
      await browser.close();
      
      console.log(`[InstagramReverseEngine] Successfully scraped profile metadata for ${cleanHandle}`);

      return {
        success: true,
        profile: {
          handle: cleanHandle,
          displayName,
          bio: '', // Bio extraction is complex without JSON data, omitting for now
          avatarUrl,
          followers,
          following: parseNum(followingMatch?.[1] || '0'),
          postsCount,
          isVerified: false
        },
        posts: [], // Posts cannot be fetched anonymously anymore
        hasNextPage: false,
        rawSnapshot: { scrapedAt: new Date().toISOString(), fallback: 'puppeteer_meta' },
        error: 'Posts cannot be fetched anonymously on Instagram without a session ID. Returned profile data only.'
      };

    } catch (err: any) {
      console.error('[InstagramReverseEngine] Scrape failed:', err.message);
      return {
        success: false,
        profile: {
          handle: cleanHandle,
          displayName: cleanHandle,
          bio: '',
          followers: 0,
          following: 0,
          postsCount: 0,
          isVerified: false
        },
        posts: [],
        hasNextPage: false,
        error: err.message || 'Instagram extraction failed'
      };
    }
  }
}

export const instagramReverseEngine = InstagramReverseEngine.getInstance();
