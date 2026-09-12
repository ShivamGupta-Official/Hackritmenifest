'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  Camera, Search, Database, Trash2, RefreshCw, AlertCircle,
  CheckCircle2, ChevronDown, ChevronUp, Heart, MessageCircle,
  Eye, ExternalLink, Loader2, Info, Image as ImageIcon,
  Video, Layers, Download, Sparkles, X, Plus
} from 'lucide-react';

// Alias so the rest of the file keeps the name Instagram
const Instagram = Camera;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScrapedPost {
  _id: string;
  shortcode: string;
  caption: string;
  likes: number;
  comments: number;
  views?: number;
  thumbnailUrl: string;
  imageUrl: string;
  mediaType: 'image' | 'video' | 'carousel';
  permalink: string;
  publishedAt?: number;
  altText?: string;
  aiSummary?: string;
  aiSentiment?: string;
  aiTopics?: string[];
}

interface ScrapedProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  source: string;
  scrapedAt: string;
}

type Step =
  | 'idle'
  | 'checking'
  | 'confirm-delete'
  | 'scraping'
  | 'done'
  | 'error';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n?: number) {
  if (n == null) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

function timeAgo(ts?: number) {
  if (!ts) return '';
  const diff = Math.floor((Date.now() / 1000 - ts) / 86400);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

const MEDIA_ICON: Record<string, React.FC<any>> = {
  image: ImageIcon,
  video: Video,
  carousel: Layers,
};

// ─── PostCard ─────────────────────────────────────────────────────────────────

function PostCard({ post, idx }: { post: ScrapedPost; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const MediaIcon = MEDIA_ICON[post.mediaType] || ImageIcon;

  const captionShort = post.caption
    ? post.caption.slice(0, 120) + (post.caption.length > 120 ? '…' : '')
    : 'No caption';

  return (
    <div
      className="group relative bg-gradient-to-br from-card/80 to-card/40 border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-black/10">
        {post.thumbnailUrl ? (
          <img
            src={post.thumbnailUrl}
            alt={post.altText || post.caption.slice(0, 60)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <MediaIcon className="w-12 h-12 text-primary/30" />
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
          <MediaIcon className="w-3 h-3" />
          <span className="capitalize">{post.mediaType}</span>
        </div>

        {/* Open on Instagram */}
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-primary/80 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Date */}
        {post.publishedAt && (
          <span className="absolute bottom-2 left-2 text-white/70 text-[10px]">
            {timeAgo(post.publishedAt)}
          </span>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex items-center divide-x divide-border/40 border-b border-border/40">
        <div className="flex items-center gap-1.5 px-3 py-2 flex-1">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-xs font-semibold text-foreground">{fmt(post.likes)}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2 flex-1">
          <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-semibold text-foreground">{fmt(post.comments)}</span>
        </div>
        {post.views != null && (
          <div className="flex items-center gap-1.5 px-3 py-2 flex-1">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-foreground">{fmt(post.views)}</span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {expanded ? post.caption || 'No caption' : captionShort}
        </p>
        {post.caption && post.caption.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-1.5 text-[10px] text-primary/70 hover:text-primary transition-colors"
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Less</> : <><ChevronDown className="w-3 h-3" /> More</>}
          </button>
        )}
      </div>

      {/* AI Analysis badge */}
      {post.aiSummary && (
        <div className="mx-3 mb-3 p-2 bg-primary/5 border border-primary/15 rounded-lg">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">AI Summary</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{post.aiSummary}</p>
        </div>
      )}
    </div>
  );
}

// ─── ProfileCard ──────────────────────────────────────────────────────────────

function ProfileCard({ profile }: { profile: ScrapedProfile }) {
  return (
    <div className="bg-gradient-to-br from-card/90 to-card/60 border border-border/60 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
      <div className="relative shrink-0">
        {profile.avatarUrl && !profile.avatarUrl.includes('ui-avatars') ? (
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
            <Instagram className="w-8 h-8 text-primary/50" />
          </div>
        )}
        {profile.isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-bold text-base text-foreground">{profile.displayName || profile.username}</span>
          {profile.isPrivate && (
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-1.5 py-0.5 rounded-full">Private</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">@{profile.username}</p>
        {profile.bio && (
          <p className="text-xs text-foreground/80 leading-relaxed mb-3 max-w-md">{profile.bio}</p>
        )}
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="font-bold text-foreground">{fmt(profile.followers)}</span>
            <span className="text-muted-foreground ml-1">followers</span>
          </div>
          <div>
            <span className="font-bold text-foreground">{fmt(profile.following)}</span>
            <span className="text-muted-foreground ml-1">following</span>
          </div>
          <div>
            <span className="font-bold text-foreground">{fmt(profile.postsCount)}</span>
            <span className="text-muted-foreground ml-1">posts</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Database className="w-3 h-3" />
          <span>{profile.source}</span>
        </div>
        {profile.scrapedAt && (
          <div className="text-[10px] text-muted-foreground mt-1">
            {new Date(profile.scrapedAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  username,
  existingCount,
  onDelete,
  onKeep,
  onCancel,
}: {
  username: string;
  existingCount: number;
  onDelete: () => void;
  onKeep: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border/80 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-yellow-500/10 rounded-xl">
              <Database className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-base font-bold text-foreground">Existing Data Found</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            There are already{' '}
            <span className="font-semibold text-foreground">{existingCount} saved posts</span>
            {' '}for <span className="font-semibold text-foreground">@{username}</span>.
            What would you like to do?
          </p>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {/* Delete option */}
          <button
            onClick={onDelete}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
          >
            <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
              <Trash2 className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold text-sm text-foreground">Delete & Refresh</div>
              <div className="text-xs text-muted-foreground">Remove the {existingCount} old posts and download fresh data</div>
            </div>
          </button>

          {/* Keep option */}
          <button
            onClick={onKeep}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Plus className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold text-sm text-foreground">Keep & Add More</div>
              <div className="text-xs text-muted-foreground">Append newly scraped posts to the existing {existingCount}</div>
            </div>
          </button>
        </div>

        {/* Cancel */}
        <div className="px-6 pb-6">
          <button
            onClick={onCancel}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Cancel — don't scrape
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ScrapePage() {
  const [username, setUsername] = useState('');
  const [limit, setLimit] = useState(12);
  const [sessionId, setSessionId] = useState('');
  const [showSessionField, setShowSessionField] = useState(false);

  const [step, setStep] = useState<Step>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [existingCount, setExistingCount] = useState(0);

  const [profile, setProfile] = useState<ScrapedProfile | null>(null);
  const [posts, setPosts] = useState<ScrapedPost[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [newPostCount, setNewPostCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const [pendingDelete, setPendingDelete] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // ── Check existing data first ─────────────────────────────────────────────
  const handleCheck = useCallback(async () => {
    const handle = username.trim().replace(/^@/, '').toLowerCase();
    if (!handle) { inputRef.current?.focus(); return; }

    setStep('checking');
    setErrorMsg('');

    try {
      const res = await fetch(`/api/scrape?username=${encodeURIComponent(handle)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Check failed');

      setExistingCount(data.existingPostCount || 0);

      if (data.existingPostCount > 0) {
        // Show the delete/append dialog
        setStep('confirm-delete');
      } else {
        // No existing data — start immediately
        await doScrape(handle, false);
      }
    } catch (err: any) {
      setStep('error');
      setErrorMsg(err.message);
    }
  }, [username, limit, sessionId]);

  // ── Actually run the scraper ───────────────────────────────────────────────
  const doScrape = useCallback(async (handle: string, deletePrevious: boolean, cursorAfter?: string) => {
    setStep('scraping');
    setErrorMsg('');

    try {
      const body: Record<string, any> = {
        username: handle,
        limit,
        deletePrevious,
        ...(sessionId && { sessionId }),
        ...(cursorAfter && { after: cursorAfter }),
      };

      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scrape failed');

      if (data.error && !data.success) {
        setStep('error');
        setErrorMsg(data.error);
        return;
      }

      setProfile(data.profile || null);
      setPosts(data.posts || []);
      setWarnings(data.warnings || []);
      setNewPostCount(data.newPostCount || 0);
      setHasNextPage(data.hasNextPage || false);
      setEndCursor(data.endCursor || null);
      setStep('done');
    } catch (err: any) {
      setStep('error');
      setErrorMsg(err.message);
    }
  }, [limit, sessionId]);

  const handleLoadMore = () => {
    if (!endCursor || !profile) return;
    doScrape(profile.username, false, endCursor);
  };

  const handleClearAll = async () => {
    if (!profile) return;
    if (!confirm(`Delete all saved data for @${profile.username}?`)) return;

    await fetch(`/api/scrape?username=${profile.username}`, { method: 'DELETE' });
    setPosts([]);
    setProfile(null);
    setStep('idle');
  };

  const isLoading = step === 'checking' || step === 'scraping';
  const handle = username.trim().replace(/^@/, '').toLowerCase();

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Delete Confirm Modal */}
      {step === 'confirm-delete' && (
        <DeleteConfirmModal
          username={handle}
          existingCount={existingCount}
          onDelete={() => {
            setPendingDelete(true);
            doScrape(handle, true);
          }}
          onKeep={() => {
            setPendingDelete(false);
            doScrape(handle, false);
          }}
          onCancel={() => setStep('idle')}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/20">
            <Instagram className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Instagram Scraper</h1>
            <p className="text-sm text-muted-foreground">Fetch & store real posts — from scratch, no libraries</p>
          </div>
        </div>
      </div>

      {/* Input Panel */}
      <div className="bg-card/60 border border-border/50 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Username */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-muted-foreground font-medium">@</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleCheck()}
              placeholder="gdgoncampus_tiu"
              className="w-full pl-7 pr-4 py-2.5 bg-background border border-border/60 rounded-xl text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Limit */}
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2.5 bg-background border border-border/60 rounded-xl text-sm focus:outline-none focus:border-primary/60 transition-all min-w-[110px]"
          >
            {[6, 12, 24, 50].map(n => (
              <option key={n} value={n}>{n} posts</option>
            ))}
          </select>

          {/* Scrape button */}
          <button
            onClick={handleCheck}
            disabled={isLoading || !username.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-pink-500/20"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {step === 'checking' ? 'Checking…' : 'Scraping…'}</>
            ) : (
              <><Search className="w-4 h-4" /> Scrape</>
            )}
          </button>
        </div>

        {/* Advanced: Session ID */}
        <div className="mt-3">
          <button
            onClick={() => setShowSessionField(!showSessionField)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showSessionField ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Advanced: provide Instagram session ID for unlocked post fetching
          </button>

          {showSessionField && (
            <div className="mt-2.5 flex gap-2 items-center">
              <input
                type="password"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="Paste your sessionid cookie value…"
                className="flex-1 px-3 py-2 bg-background border border-border/60 rounded-xl text-xs focus:outline-none focus:border-primary/60 transition-all"
              />
              {sessionId && (
                <button onClick={() => setSessionId('')} className="p-1.5 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          <div className="mt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground">
            <Info className="w-3 h-3 shrink-0 mt-0.5" />
            <span>
              Without a session ID, Instagram rate-limits anonymous scraping (~10 calls/hr). With one, post images & counts become available.
              Get it from your browser cookies at instagram.com (DevTools → Application → Cookies → sessionid).
            </span>
          </div>
        </div>
      </div>

      {/* Error State */}
      {step === 'error' && (
        <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm text-foreground mb-1">Scraper Error</div>
            <div className="text-sm text-muted-foreground">{errorMsg}</div>
            {errorMsg.includes('rate') && (
              <div className="mt-2 text-xs text-yellow-500">
                💡 Instagram is rate-limiting your IP. Wait ~30 minutes, or add a session ID above to bypass it.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && step === 'done' && (
        <div className="mb-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl space-y-1">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-yellow-600 dark:text-yellow-400">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Scraping progress pulse */}
      {step === 'scraping' && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
          <div>
            <div className="text-sm font-medium text-foreground">Scraping @{handle}…</div>
            <div className="text-xs text-muted-foreground mt-0.5">Running Python scraper → fetching posts → saving to database</div>
          </div>
        </div>
      )}

      {/* Results */}
      {step === 'done' && (
        <div className="space-y-6">
          {/* Summary bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-semibold text-foreground">{posts.length} posts</span>
                <span className="text-muted-foreground text-sm ml-2">in database</span>
                {newPostCount > 0 && (
                  <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    +{newPostCount} new
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasNextPage && endCursor && (
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-card border border-border/60 rounded-lg hover:border-primary/40 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Load more
                </button>
              )}
              <button
                onClick={() => doScrape(handle, false)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-card border border-border/60 rounded-lg hover:border-primary/40 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Re-scrape
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear DB
              </button>
            </div>
          </div>

          {/* Profile Card */}
          {profile && <ProfileCard profile={profile} />}

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Instagram className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No posts fetched yet.</p>
              <p className="text-xs mt-1">
                {profile?.isPrivate
                  ? 'This profile is private. A session ID is required.'
                  : 'Add a session ID above to unlock post fetching.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {posts.map((post, idx) => (
                <PostCard key={post._id || post.shortcode} post={post} idx={idx} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty idle state */}
      {step === 'idle' && (
        <div className="text-center py-24 text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/10 flex items-center justify-center">
            <Instagram className="w-8 h-8 text-pink-400/40" />
          </div>
          <p className="text-base font-medium text-foreground/50">Enter an Instagram username to begin</p>
          <p className="text-sm mt-1">Posts are stored in the local database with captions, likes, and thumbnails</p>
        </div>
      )}
    </div>
  );
}
