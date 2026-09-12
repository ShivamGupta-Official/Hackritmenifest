'use client';

import React, { useState } from 'react';
import { ExtractedPost } from '@/lib/ingestion/adapters';
import {
  Eye, Heart, MessageSquare, Bookmark, Sparkles,
  ChevronDown, ChevronUp, Clock, ExternalLink, Zap, Bot
} from 'lucide-react';

interface ObservedPostCardProps {
  post: ExtractedPost;
  index: number;
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function ProvenanceDot({ p }: { p: string }) {
  return p === 'OBSERVED'
    ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Observed" />
    : <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" title="AI Estimate" />;
}

export function ObservedPostCard({ post, index }: ObservedPostCardProps) {
  const [open, setOpen] = useState(false);
  const isAI = post.publishedAt === 'AI-Synthesized Example';
  const er = post.metrics.engagementRate.value;
  const erColor = er >= 5 ? 'text-emerald-400' : er >= 2.5 ? 'text-amber-400' : 'text-zinc-400';

  return (
    <div className={`border rounded-lg transition-all duration-200 overflow-hidden ${
      open
        ? 'border-white/20 bg-black/40'
        : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]'
    }`}>

      {/* ── Compact Row ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        {/* Index */}
        <span className="w-6 shrink-0 text-center text-xs font-mono font-bold text-zinc-500">
          {index + 1}
        </span>

        {/* Video Thumbnail if present */}
        {post.thumbnailUrl && (
          <img
            src={'/api/img?url=' + encodeURIComponent(post.thumbnailUrl)}
            alt={post.title || 'Video thumbnail'}
            className="w-10 h-7 rounded object-cover border border-white/10 shrink-0 bg-zinc-900"
            loading="lazy"
          />
        )}

        {/* AI badge */}
        {isAI && (
          <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase">
            <Bot className="w-2.5 h-2.5" /> AI
          </span>
        )}

        {/* Hook text / Title */}
        <span className="flex-1 text-sm text-zinc-200 truncate font-medium flex items-center gap-1.5">
          <span>{post.hookText || post.title}</span>
          {post.permalink && (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors p-1"
              title="Open video link"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </span>

        {/* Format pill */}
        <span className="hidden sm:inline shrink-0 text-[10px] font-mono text-zinc-500 bg-white/5 border border-white/8 rounded px-2 py-0.5 truncate max-w-[140px]">
          {post.format}
        </span>

        {/* Duration */}
        <span className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-zinc-500">
          <Clock className="w-3 h-3" />{post.durationSeconds}s
        </span>

        {/* Metrics row */}
        <div className="hidden md:flex items-center gap-3 shrink-0 font-mono text-xs">
          <span className="flex items-center gap-1 text-zinc-400">
            <Eye className="w-3 h-3" />
            <span>{fmt(post.metrics.views.value)}</span>
            <ProvenanceDot p={post.metrics.views.provenance} />
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Heart className="w-3 h-3 text-rose-400" />
            <span>{fmt(post.metrics.likes.value)}</span>
            <ProvenanceDot p={post.metrics.likes.provenance} />
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span>{fmt(post.metrics.comments.value)}</span>
            <ProvenanceDot p={post.metrics.comments.provenance} />
          </span>
        </div>

        {/* ER badge */}
        <span className={`shrink-0 text-xs font-mono font-bold ${erColor}`}>
          {er}% ER
        </span>

        {/* Expand icon */}
        <span className="shrink-0 text-zinc-500">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* ── Expanded Detail Panel ── */}
      {open && (
        <div className="border-t border-white/8 px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-150">

          {isAI && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-white/8 text-zinc-500 text-xs">
              <Bot className="w-3.5 h-3.5 shrink-0 text-zinc-600" />
              AI-synthesized content example based on account context. Metrics are estimated.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Left — Hook + Signals */}
            <div className="space-y-3">
              <div className="bg-black/30 border border-white/8 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Hook</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/8 text-amber-400 truncate max-w-[200px]">
                    {post.hookType}
                  </span>
                </div>
                <p className="text-sm text-white italic">"{post.hookText}"</p>
                <p className="text-[11px] text-zinc-500 flex items-start gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                  {post.contentSignals.hookVisualCue}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/20 border border-white/8 rounded-lg p-2.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Format</div>
                  <div className="text-zinc-200 font-medium">{post.format}</div>
                </div>
                <div className="bg-black/20 border border-white/8 rounded-lg p-2.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">CTA</div>
                  <div className="text-zinc-200 font-medium">{post.ctaType}</div>
                </div>
                <div className="bg-black/20 border border-white/8 rounded-lg p-2.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Tone</div>
                  <div className="text-zinc-200 font-medium">{post.tone}</div>
                </div>
                <div className="bg-black/20 border border-white/8 rounded-lg p-2.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Pacing</div>
                  <div className="text-zinc-200 font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {post.contentSignals.pacingBpm} BPM
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Metrics</span>
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Live
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block ml-1" /> Estimate
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-center">
                  {[
                    { icon: <Eye className="w-3.5 h-3.5" />, label: 'Views', val: post.metrics.views.value, p: post.metrics.views.provenance, color: 'text-zinc-200' },
                    { icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, label: 'Likes', val: post.metrics.likes.value, p: post.metrics.likes.provenance, color: 'text-rose-300' },
                    { icon: <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />, label: 'Comments', val: post.metrics.comments.value, p: post.metrics.comments.provenance, color: 'text-cyan-300' },
                    { icon: <Bookmark className="w-3.5 h-3.5 text-amber-400" />, label: 'Saves', val: post.metrics.saves.value, p: post.metrics.saves.provenance, color: 'text-amber-300' },
                  ].map(m => (
                    <div key={m.label} className="bg-black/30 border border-white/8 rounded-lg p-3">
                      <div className="flex items-center justify-center gap-1 text-zinc-500 text-[10px] mb-1">
                        {m.icon} {m.label}
                      </div>
                      <div className={`text-sm font-bold ${m.color}`}>
                        {m.p === 'AI_ESTIMATE' ? '~' : ''}{fmt(m.val)}
                      </div>
                      <div className={`text-[9px] uppercase mt-0.5 ${m.p === 'OBSERVED' ? 'text-emerald-500' : 'text-amber-500/70'}`}>
                        [{m.p === 'OBSERVED' ? 'live' : 'estimate'}]
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotional trigger + takeaway */}
              <div className="bg-black/20 border border-white/8 rounded-lg p-3 text-xs space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-zinc-500">Psychological Trigger</div>
                <p className="text-zinc-300">{post.contentSignals.emotionalTrigger}</p>
                <div className="text-[10px] font-mono uppercase text-zinc-500 mt-2">Key Takeaway</div>
                <p className="text-zinc-400">{post.contentSignals.keyTakeaway}</p>
              </div>
            </div>
          </div>

          {/* Transcript + source */}
          {post.transcript && post.transcript.length > 10 && (
            <div className="bg-black/30 border border-white/8 rounded-lg p-3 text-xs text-zinc-400 leading-relaxed">
              <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1.5">Transcript / Caption</div>
              <p>"{post.transcript.slice(0, 400)}{post.transcript.length > 400 ? '...' : ''}"</p>
              {post.permalink && post.permalink !== `https://instagram.com/${post.accountHandle}` && (
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-[10px]"
                >
                  View source post <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
