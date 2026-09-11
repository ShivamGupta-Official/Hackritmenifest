/**
 * ProxyDispatcher - Resilient Outbound HTTP Dispatcher for Scrapers
 * 
 * Capabilities:
 * 1. Realistic Browser Fingerprint Rotation (User-Agent, sec-ch-ua, platform headers)
 * 2. Reverse Proxy Support (via PROXY_URL / SCRAPER_PROXY_URL)
 * 3. Polite Rate Limiting & Randomized Jitter (as designed in scrapperidea.md)
 * 4. SSRF Defense (Blocks private subnets, loopbacks, and cloud metadata IPs)
 * 5. Exponential Backoff on HTTP 429 / 503
 */

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
];

export interface DispatchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  applyJitter?: boolean;
  minJitterMs?: number;
  maxJitterMs?: number;
}

export class ProxyDispatcher {
  private static instance: ProxyDispatcher;

  public static getInstance(): ProxyDispatcher {
    if (!ProxyDispatcher.instance) {
      ProxyDispatcher.instance = new ProxyDispatcher();
    }
    return ProxyDispatcher.instance;
  }

  /**
   * Randomly selects a modern desktop User-Agent string.
   */
  public getRandomUserAgent(): string {
    const idx = Math.floor(Math.random() * USER_AGENTS.length);
    return USER_AGENTS[idx];
  }

  /**
   * Generates realistic browser headers tailored to stealth scraping.
   */
  public getStealthHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const ua = this.getRandomUserAgent();
    const isMac = ua.includes('Macintosh');

    return {
      'User-Agent': ua,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Ch-Ua': isMac
        ? '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"'
        : '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': isMac ? '"macOS"' : '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      ...customHeaders
    };
  }

  /**
   * Validates target URL against Server-Side Request Forgery (SSRF)
   */
  public validateSSRF(targetUrl: string): void {
    try {
      const parsed = new URL(targetUrl);
      const host = parsed.hostname.toLowerCase();

      const blockedHosts = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '169.254.169.254', // AWS metadata service
        'metadata.google.internal' // GCP metadata service
      ];

      if (blockedHosts.includes(host)) {
        throw new Error(`SSRF Guard: Access to host '${host}' is prohibited.`);
      }

      // Block local private subnets
      if (
        host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        host.startsWith('172.16.') ||
        host.endsWith('.local') ||
        host.endsWith('.internal')
      ) {
        throw new Error(`SSRF Guard: Access to internal IP range '${host}' is prohibited.`);
      }

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error(`SSRF Guard: Unsupported protocol '${parsed.protocol}'.`);
      }
    } catch (err: any) {
      throw new Error(`Invalid or prohibited target URL: ${err.message}`);
    }
  }

  /**
   * Sleep helper with polite jitter
   */
  public async sleepWithJitter(minMs = 250, maxMs = 500): Promise<void> {
    const jitter = Math.floor(minMs + Math.random() * (maxMs - minMs));
    return new Promise(resolve => setTimeout(resolve, jitter));
  }

  /**
   * Dispatches a stealth HTTP request with retries, jitter, and proxy routing.
   */
  public async dispatch(url: string, options: DispatchOptions = {}): Promise<Response> {
    this.validateSSRF(url);

    const retries = options.retries ?? 2;
    const timeoutMs = options.timeoutMs ?? 7000;
    const applyJitter = options.applyJitter ?? true;
    const proxyUrl = process.env.PROXY_URL || process.env.SCRAPER_PROXY_URL;

    if (applyJitter) {
      await this.sleepWithJitter(options.minJitterMs || 150, options.maxJitterMs || 400);
    }

    let finalUrl = url;
    const headers: Record<string, string> = this.getStealthHeaders(options.headers as Record<string, string>);

    // If a proxy service like ScraperAPI or Webshare HTTP endpoint is specified as a gateway URL
    if (proxyUrl && proxyUrl.startsWith('http')) {
      if (proxyUrl.includes('api.scraperapi.com') || proxyUrl.includes('proxy.scrapeops.io')) {
        const separator = proxyUrl.includes('?') ? '&' : '?';
        finalUrl = `${proxyUrl}${separator}url=${encodeURIComponent(url)}`;
      } else {
        try {
          const parsedProxy = new URL(proxyUrl);
          if (parsedProxy.username && parsedProxy.password) {
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(
              `${parsedProxy.username}:${parsedProxy.password}`
            ).toString('base64')}`;
          }
        } catch {}
      }
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(finalUrl, {
          ...options,
          headers,
          signal: controller.signal
        });

        clearTimeout(timer);

        // Handle rate limiting (429) or temporary server block (503)
        if ((response.status === 429 || response.status === 503) && attempt < retries) {
          const backoffTime = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          console.warn(`[ProxyDispatcher] Rate limited (${response.status}) on ${url}. Retrying in ${Math.round(backoffTime)}ms...`);
          await new Promise(r => setTimeout(r, backoffTime));
          continue;
        }

        return response;
      } catch (err: any) {
        lastError = err;
        if (attempt < retries) {
          const backoff = (attempt + 1) * 700;
          await new Promise(r => setTimeout(r, backoff));
        }
      }
    }

    throw lastError || new Error(`Failed to dispatch request to ${url} after ${retries} retries`);
  }

  /**
   * Drop-in fetch alias for dispatch
   */
  public async fetch(url: string, options: DispatchOptions = {}): Promise<Response> {
    return this.dispatch(url, options);
  }
}

export const proxyDispatcher = ProxyDispatcher.getInstance();
