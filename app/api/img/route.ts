import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url param', { status: 400 });
  }

  // Only allow known CDN hosts
  let hostname: string;
  try {
    hostname = new URL(imageUrl).hostname;
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  const allowed = [
    'cdninstagram.com',
    'fbcdn.net',
    'instagram.com',
    'yt3.ggpht.com',
    'yt3.googleusercontent.com',
    'i.ytimg.com',
    'pbs.twimg.com',
    'abs.twimg.com',
    'ui-avatars.com',
  ];
  if (!allowed.some(d => hostname.endsWith(d))) {
    return new NextResponse('Domain not allowed', { status: 403 });
  }

  const cleanUrl = imageUrl.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

  try {
    const res = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return new NextResponse('Failed to fetch image', { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new NextResponse('Proxy error', { status: 502 });
  }
}
