'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles, ArrowRight, Camera, Video, Play, Globe,
  ShieldCheck, Zap, BarChart2, Layers, TrendingUp,
  Cpu, SlidersHorizontal, Heart, MessageCircle, Eye,
  ExternalLink, Loader2, AlertCircle, Info, X,
  RefreshCw, Trash2, Database, CheckCircle2,
} from 'lucide-react';
import { AnalysisTransition } from '@/components/AnalysisTransition';

function fmtNum(n?: number) {
  if (n == null) return '';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function proxyUrl(src?: string) {
  if (!src) return '';
  return '/api/img?url=' + encodeURIComponent(src);
}

interface ScrapePost {
  _id?: string; shortcode: string; caption?: string;
  likes?: number; comments?: number; views?: number;
  thumbnailUrl?: string; imageUrl?: string; mediaType?: string;
  permalink?: string; altText?: string;
}
interface ScrapeProfile {
  displayName?: string; bio?: string; avatarUrl?: string;
  followers?: number; following?: number; postsCount?: number;
  isVerified?: boolean; source?: string;
}
interface ScrapeResult {
  success: boolean; profile?: ScrapeProfile; posts: ScrapePost[];
  warnings?: string[]; error?: string | null; newPostCount?: number;
}

function PostCard({ post }: { post: ScrapePost }) {
  const thumb = post.thumbnailUrl || post.imageUrl;
  const cap = post.caption || '';
  const short = cap.length > 120 ? cap.slice(0, 117) + '...' : cap;
  return (
    <div className="velvet-card overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      <div className="relative aspect-square bg-zinc-900 overflow-hidden">
        {thumb ? (
          <img src={proxyUrl(thumb)} alt={post.altText || 'Post'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <Camera className="w-10 h-10" />
          </div>
        )}
        {post.mediaType === 'video' && (
          <div className="absolute top-2 right-2 bg-black/70 rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-mono text-white">
            <Video className="w-3 h-3 text-cyan-400" /> Reel
          </div>
        )}
        {post.mediaType === 'sidecar' && (
          <div className="absolute top-2 right-2 bg-black/70 rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-mono text-white">
            <Layers className="w-3 h-3 text-amber-400" /> Album
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-3">
          <span className="flex items-center gap-1 text-white text-xs font-mono"><Heart className="w-3.5 h-3.5 text-rose-400" />{fmtNum(post.likes)}</span>
          <span className="flex items-center gap-1 text-white text-xs font-mono"><MessageCircle className="w-3.5 h-3.5 text-blue-400" />{fmtNum(post.comments)}</span>
          {post.views != null && <span className="flex items-center gap-1 text-white text-xs font-mono"><Eye className="w-3.5 h-3.5 text-emerald-400" />{fmtNum(post.views)}</span>}
        </div>
      </div>
      <div className="p-3">
        {short ? <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{short}</p>
          : <p className="text-xs text-zinc-600 italic">No caption</p>}
        {post.permalink && (
          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors">
            View on Instagram <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
          <span className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono"><Heart className="w-3 h-3 text-rose-400/70" />{fmtNum(post.likes)}</span>
          <span className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono"><MessageCircle className="w-3 h-3 text-blue-400/70" />{fmtNum(post.comments)}</span>
          {post.views != null && <span className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono"><Eye className="w-3 h-3 text-emerald-400/70" />{fmtNum(post.views)}</span>}
        </div>
      </div>
    </div>
  );
}

// Removed extra steps and explore arrays to simplify UI

export default function LaunchpadPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState<number>(12);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [scrapeError, setScrapeError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [existingCount, setExistingCount] = useState(0);
  const pendingRef = useRef('');
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const detectPlatform = (v: string) => {
    const c = v.toLowerCase();
    if (c.includes('tiktok')) return 'tiktok';
    if (c.includes('youtube') || c.includes('youtu.be')) return 'youtube';
    if (c.includes('linkedin')) return 'linkedin';
    if (c.includes('twitter') || c.includes('x.com')) return 'twitter';
    return 'instagram';
  };

  const platformMeta: Record<string, { label: string; placeholder: string; color: string; prefix: string; icon: string }> = {
    instagram: { label: 'Instagram', placeholder: 'glowrecipe', color: 'text-pink-400',  prefix: 'instagram.com/', icon: '📷' },
    tiktok:    { label: 'TikTok',    placeholder: 'notionhq',   color: 'text-cyan-400',  prefix: 'tiktok.com/@',  icon: '🎵' },
    youtube:   { label: 'YouTube',   placeholder: 'channel',    color: 'text-rose-500',  prefix: 'youtube.com/@', icon: '▶' },
    linkedin:  { label: 'LinkedIn',  placeholder: 'handle',     color: 'text-blue-400',  prefix: 'linkedin.com/in/', icon: '💼' },
    twitter:   { label: 'Twitter',   placeholder: 'handle',     color: 'text-sky-400',   prefix: 'twitter.com/', icon: '🐦' },
  };

  const selectPlatform = (p: string) => {
    setUrl(platformMeta[p].prefix);
    setErrorMessage('');
    setFetchedData(null);
    // Focus and place cursor at end
    setTimeout(() => {
      const el = inputRef.current;
      if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    }, 10);
  };

  const handleFetch = async () => {
    let raw = url.trim().replace(/@+/g, '@');
    if (!raw) { setErrorMessage('Paste a link or handle to get started.'); return; }
    setUrl(raw);
    setErrorMessage('');
    setLoading(true);
    setResult(null);
    setFetchedData(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: raw, limit }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Could not fetch profile. Check the link and try again.');
        return;
      }
      setFetchedData(data);
    } catch (e: any) {
      setErrorMessage(e.message || 'Network error — check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: route to intelligence page with fetched data
  const handleAnalyze = () => {
    if (!fetchedData) return;
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    router.push('/intelligence?url=' + encodeURIComponent(url.trim()) + '&limit=' + limit);
  };

  // Legacy Instagram scraper (modal re-scrape)
  const doScrape = async (h: string, del: boolean) => {
    setLoading(true); setScrapeError(''); setWarnings([]); setResult(null); setShowModal(false);
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: h, limit: 12, deletePrevious: del }),
      });
      const data: ScrapeResult = await res.json();
      if (!res.ok) { setScrapeError((data as any).error || 'Scrape failed'); return; }
      setResult(data); setWarnings(data.warnings || []);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    } catch (e: any) { setScrapeError(e.message || 'Network error'); }
    finally { setLoading(false); }
  };

  const handleScrape = async () => {
    const h = handle.trim().replace(/^@/, '').replace(/^https?:\/\/[^\/]+\//, '').split('/')[0];
    if (!h) { setScrapeError('Enter a valid Instagram handle.'); return; }
    setScrapeError(''); pendingRef.current = h;
    try {
      const r = await fetch('/api/scrape?username=' + encodeURIComponent(h));
      const d = await r.json();
      if (d.existingPostCount > 0) { setExistingCount(d.existingPostCount); setShowModal(true); return; }
    } catch {}
    doScrape(h, false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fcfcf9] selection:bg-white/20">

      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white tracking-tighter font-display">C<span className="text-emerald-400">OS</span></div>
            <span className="font-display font-bold text-lg tracking-tight">ContentOS</span>
            <span className="badge badge-emerald hidden sm:inline-flex text-[10px]">v2.4 Live Intelligence</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/intelligence" className="text-zinc-400 hover:text-white transition-colors">Content DNA</Link>
            <Link href="/radar" className="text-zinc-400 hover:text-white transition-colors">Trend Radar</Link>
            <Link href="/campaigns" className="text-zinc-400 hover:text-white transition-colors">Campaigns</Link>
            <Link href="/dashboard" className="btn-vanilla !py-1.5 !px-3.5 !text-xs">Enter Workspace</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight max-w-3xl text-white mb-8 leading-[1.1]">
          Content Intelligence
          <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500 text-3xl sm:text-4xl">Fast, Simple, and Data-Driven</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mb-16 font-normal leading-relaxed">
          Paste any public link from Instagram, TikTok, YouTube, LinkedIn, or Twitter. We instantly fetch engagement velocity, views, and subscriber counts — using AI fallbacks when needed to ensure lightning-fast results.
        </p>

        <div className="w-full max-w-2xl mb-12">
          <div className="velvet-card p-4 sm:p-6 shadow-2xl relative border border-white/15">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Step 1 — enter any social link or handle */}
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3 text-left">
              ① Paste a public profile link or handle
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                {/* Platform-aware icon */}
                {detectPlatform(url) === 'tiktok'
                  ? <Video className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${platformMeta.tiktok.color}`} />
                  : detectPlatform(url) === 'youtube'
                  ? <Play className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${platformMeta.youtube.color}`} />
                  : detectPlatform(url) === 'linkedin'
                  ? <Globe className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${platformMeta.linkedin.color}`} />
                  : detectPlatform(url) === 'twitter'
                  ? <MessageCircle className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${platformMeta.twitter.color}`} />
                  : <Camera className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${platformMeta.instagram.color}`} />
                }
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={`${platformMeta[detectPlatform(url)].prefix}${platformMeta[detectPlatform(url)].placeholder}`}
                  value={url}
                  onChange={e => {
                    const cleanVal = e.target.value.replace(/@+/g, '@');
                    setUrl(cleanVal);
                    setErrorMessage('');
                    setFetchedData(null);
                  }}
                  onKeyDown={e => e.key === 'Enter' && !loading && handleFetch()}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleFetch}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-sm py-3.5 px-6 rounded-lg shadow-lg transition-all shrink-0 disabled:opacity-60 disabled:cursor-not-allowed min-w-[140px]"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Fetching…</>
                  : <><Sparkles className="w-4 h-4" /> Fetch Profile</>
                }
              </button>
            </div>

            {/* Platform pills — clickable, set URL prefix + focus input */}
            <div className="flex gap-1.5 mt-3 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
              {(['instagram', 'tiktok', 'youtube', 'linkedin', 'twitter'] as const).map(p => {
                const active = detectPlatform(url) === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => selectPlatform(p)}
                    className={`shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      active
                        ? `border-white/30 bg-white/10 ${platformMeta[p].color} font-semibold`
                        : 'border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                    }`}
                  >
                    {platformMeta[p].label}
                  </button>
                );
              })}
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-rose-400 text-xs mt-3 font-mono">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errorMessage}
              </div>
            )}

            {/* Step 2 — only appears after successful fetch */}
            {fetchedData?.success && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  {fetchedData.profile?.avatarUrl && (
                    <img src={proxyUrl(fetchedData.profile.avatarUrl)} alt={fetchedData.profile.displayName || 'Avatar'}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-white text-sm truncate">{fetchedData.profile?.displayName || fetchedData.handle}</span>
                      {fetchedData.profile?.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{fetchedData.platform}</span>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[11px] font-mono text-zinc-400">{fmtNum(fetchedData.profile?.followers ?? fetchedData.profile?.followersCount?.value)} {fetchedData.platform?.toLowerCase() === 'youtube' ? 'subs' : 'followers'}</span>
                      <span className="text-[11px] font-mono text-zinc-400">{fetchedData.extractedCount} {fetchedData.platform?.toLowerCase() === 'youtube' ? 'uploads' : 'posts'} fetched</span>
                    </div>
                  </div>
                  <button onClick={() => { setFetchedData(null); setUrl(''); setErrorMessage(''); }}
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                    <X className="w-3 h-3" /> Clear
                  </button>
                </div>

                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3 text-left">
                  ② Extraction depth — how many {detectPlatform(url) === 'youtube' || fetchedData.platform?.toLowerCase() === 'youtube' ? 'uploads' : 'posts'} to analyze
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {[5, 12, 25, 50].map(n => (
                    <button key={n} onClick={() => setLimit(n)}
                      className={n === limit
                        ? 'px-2.5 py-1 rounded-md text-[11px] font-mono bg-white text-black font-semibold'
                        : 'px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}>
                      {n} {detectPlatform(url) === 'youtube' || fetchedData.platform?.toLowerCase() === 'youtube' ? 'Uploads' : 'Posts'}
                    </button>
                  ))}
                </div>

                <button onClick={handleAnalyze}
                  className="w-full btn-vanilla !py-4 text-sm font-semibold justify-center">
                  <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
                  Analyze Content DNA
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </>
            )}
          </div>
        </div>

      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card border border-white/15 w-full max-w-sm p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Database className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">Existing Data Found</h3>
                <p className="text-xs text-zinc-500 font-mono">{existingCount} posts already cached</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              <strong className="text-white">{existingCount} posts</strong> are already stored for this profile. Delete and re-fetch, or keep them?
            </p>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => doScrape(pendingRef.current, true)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-sm font-mono transition-colors">
                <Trash2 className="w-4 h-4" />Delete &amp; Refresh
              </button>
              <button onClick={() => doScrape(pendingRef.current, false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-mono transition-colors">
                <CheckCircle2 className="w-4 h-4" />Keep &amp; Add More
              </button>
              <button onClick={() => setShowModal(false)} className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors pt-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && <AnalysisTransition url={url} limit={limit} onComplete={handleAnalysisComplete} />}
    </div>
  );
}
