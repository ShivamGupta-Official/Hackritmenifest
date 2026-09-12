import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import { connectDB, ScrapedPost, ScrapedProfile } from '@/lib/db';

const SCRAPER_PATH = path.join(process.cwd(), 'scripts', 'instagram_scraper.py');

function runPythonScraper(username: string, limit: number, sessionId?: string, after?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const args = [SCRAPER_PATH, username, '--limit', String(limit)];
    if (sessionId) { args.push('--session-id', sessionId); }
    if (after) { args.push('--after', after); }

    const child = spawn('python', args, {
      env: { ...process.env, PYTHONUNBUFFERED: '1' },
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    child.on('close', (code) => {
      if (code !== 0 && !stdout.trim()) {
        return reject(new Error(stderr || `Python exited with code ${code}`));
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch {
        reject(new Error(`Invalid JSON from scraper: ${stdout.slice(0, 300)}`));
      }
    });

    child.on('error', (err) => reject(err));
  });
}

// ─── GET /api/scrape?username=xxx — check existing data count ─────────────────
export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')?.toLowerCase().trim();
  if (!username) {
    return NextResponse.json({ error: 'username required' }, { status: 400 });
  }

  try {
    await connectDB();
    const count = await ScrapedPost.countDocuments({ username });
    const profile = await ScrapedProfile.findOne({ username }).lean();
    return NextResponse.json({ username, existingPostCount: count, profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST /api/scrape — run scraper and store results ─────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    username,
    limit = 12,
    sessionId,
    after,
    deletePrevious = false,  // client tells us whether to wipe old posts
  } = body as {
    username?: string;
    limit?: number;
    sessionId?: string;
    after?: string;
    deletePrevious?: boolean;
  };

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 });
  }

  const handle = username.toLowerCase().replace(/^@/, '');

  // 1. Run the Python scraper
  let scraperResult: any;
  try {
    scraperResult = await runPythonScraper(handle, limit, sessionId, after);
  } catch (err: any) {
    return NextResponse.json({ error: `Scraper failed: ${err.message}` }, { status: 500 });
  }

  // 2. Persist to DB
  try {
    await connectDB();

    // 2a. Handle delete decision
    if (deletePrevious) {
      await ScrapedPost.deleteMany({ username: handle });
    }

    // 2b. Upsert profile
    if (scraperResult.profile) {
      const p = scraperResult.profile;
      await ScrapedProfile.findOneAndUpdate(
        { username: handle },
        {
          username: handle,
          displayName: p.displayName || '',
          bio: p.bio || '',
          avatarUrl: p.avatarUrl || '',
          followers: p.followers || 0,
          following: p.following || 0,
          postsCount: p.postsCount || 0,
          isVerified: p.isVerified || false,
          isPrivate: p.isPrivate || false,
          externalUrl: p.externalUrl || '',
          source: p.source || 'unknown',
          scrapedAt: new Date(),
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    // 2c. Upsert posts (deduplication by shortcode)
    const savedPosts: string[] = [];
    const skippedPosts: string[] = [];

    for (const post of scraperResult.posts || []) {
      if (!post.shortcode) continue;
      try {
        await ScrapedPost.findOneAndUpdate(
          { shortcode: post.shortcode },
          {
            username: handle,
            shortcode: post.shortcode,
            postId: post.id || '',
            caption: post.caption || '',
            likes: post.likes || 0,
            comments: post.comments || 0,
            views: post.views ?? undefined,
            thumbnailUrl: post.thumbnailUrl || '',
            imageUrl: post.imageUrl || '',
            mediaType: post.mediaType || 'image',
            permalink: post.permalink || '',
            publishedAt: post.publishedAt ?? undefined,
            altText: post.altText || '',
            scrapedAt: new Date(),
          },
          { upsert: true, new: true }
        );
        savedPosts.push(post.shortcode);
      } catch {
        skippedPosts.push(post.shortcode);
      }
    }

    // 2d. Fetch all stored posts for this user to return to client
    const allPosts = await ScrapedPost.find({ username: handle })
      .sort({ scrapedAt: -1, publishedAt: -1 })
      .lean();

    const profile = await ScrapedProfile.findOne({ username: handle }).lean();

    return NextResponse.json({
      success: scraperResult.success,
      username: handle,
      profile,
      posts: allPosts,
      newPostCount: savedPosts.length,
      skippedCount: skippedPosts.length,
      hasNextPage: scraperResult.hasNextPage,
      endCursor: scraperResult.endCursor,
      warnings: scraperResult.warnings || [],
      error: scraperResult.error || null,
      postSource: scraperResult.postSource,
    });
  } catch (err: any) {
    return NextResponse.json({ error: `DB error: ${err.message}` }, { status: 500 });
  }
}

// ─── DELETE /api/scrape?username=xxx — wipe all posts for a user ──────────────
export async function DELETE(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')?.toLowerCase().trim();
  if (!username) {
    return NextResponse.json({ error: 'username required' }, { status: 400 });
  }

  try {
    await connectDB();
    const { deletedCount } = await ScrapedPost.deleteMany({ username });
    await ScrapedProfile.deleteOne({ username });
    return NextResponse.json({ success: true, deletedCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
