import { NextRequest, NextResponse } from 'next/server';
import { proxyDispatcher } from '@/lib/ingestion/proxy/ProxyDispatcher';

/**
 * Internal Scraper Reverse Proxy Endpoint
 * Allows serverless functions and client components to dispatch stealth requests
 * through the centralized ProxyDispatcher with SSRF protection.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetUrl, customHeaders, timeoutMs } = body;

    if (!targetUrl || typeof targetUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'targetUrl is required' },
        { status: 400 }
      );
    }

    // SSRF verification occurs inside proxyDispatcher.dispatch
    const response = await proxyDispatcher.dispatch(targetUrl, {
      headers: customHeaders,
      timeoutMs: timeoutMs || 8000
    });

    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const json = await response.json();
      return NextResponse.json({
        success: response.ok,
        status: response.status,
        data: json
      });
    }

    const text = await response.text();
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: text
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Reverse proxy request failed' },
      { status: 500 }
    );
  }
}
