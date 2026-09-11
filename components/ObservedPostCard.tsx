'use client';

import React, { useState } from 'react';
import { ExtractedPost } from '@/lib/ingestion/adapters';
import { Eye, Heart, MessageSquare, Bookmark, Share2, Sparkles, ChevronDown, ChevronUp, Clock, ExternalLink } from 'lucide-react';

interface ObservedPostCardProps {
  post: ExtractedPost;
  index: number;
}

export function ObservedPostCard({ post, index }: ObservedPostCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="velvet-card hover:border-white/20 transition-all duration-200">
      <div className="velvet-card-header flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300 font-bold">
            #{index + 1}
          </span>
          <span className="font-display font-semibold text-white text-sm truncate max-w-[280px]">
            {post.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-velvet flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-zinc-400" />
            {post.durationSeconds}s
          </span>
          <span className="badge badge-emerald text-[11px]">
            {post.metrics.engagementRate.value}% ER
          </span>
        </div>
      </div>

      <div className="velvet-card-body space-y-4">
        {/* Hook Breakdown */}
        <div className="bg-black/30 border border-white/5 rounded-lg p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
              HOOK ARCHITECTURE
            </span>
            <span className="badge badge-amber text-[10px]">{post.hookType}</span>
          </div>
          <p className="text-sm font-medium text-white italic">
            "{post.hookText}"
          </p>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate"><strong className="text-zinc-300">Visual Cue:</strong> {post.contentSignals.hookVisualCue}</span>
          </div>
        </div>

        {/* Formats & Signals Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="metric-well p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Format</span>
            <span className="font-medium text-zinc-200 truncate mt-1">{post.format}</span>
          </div>
          <div className="metric-well p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Call to Action</span>
            <span className="font-medium text-zinc-200 truncate mt-1">{post.ctaType}</span>
          </div>
          <div className="metric-well p-2.5 flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Pacing</span>
            <span className="font-medium text-zinc-200 truncate mt-1">{post.contentSignals.pacingBpm} BPM (Fast)</span>
          </div>
        </div>

        {/* Metrics Grid with Provenance Badges */}
        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500">Metric Telemetry</span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Verified Public Data
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-white/[0.02] border border-white/5 rounded p-2">
              <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Eye className="w-3 h-3" /> Views
              </div>
              <div className="text-xs font-bold text-white">
                {post.metrics.views.value.toLocaleString()}
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">[OBSERVED]</span>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded p-2">
              <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Heart className="w-3 h-3 text-rose-400" /> Likes
              </div>
              <div className="text-xs font-bold text-white">
                {post.metrics.likes.value.toLocaleString()}
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">[OBSERVED]</span>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded p-2">
              <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <MessageSquare className="w-3 h-3 text-cyan-400" /> Comments
              </div>
              <div className="text-xs font-bold text-white">
                {post.metrics.comments.value.toLocaleString()}
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">[OBSERVED]</span>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded p-2">
              <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-0.5">
                <Bookmark className="w-3 h-3 text-amber-400" /> Saves
              </div>
              <div className="text-xs font-bold text-amber-300">
                ~{post.metrics.saves.value.toLocaleString()}
              </div>
              <span className="text-[9px] text-amber-500/80 uppercase tracking-tighter">[AI ESTIMATE]</span>
            </div>
          </div>
        </div>

        {/* Collapsible Transcript */}
        <div className="pt-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1 transition-colors"
          >
            <span className="font-mono">Full Media Transcript</span>
            {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showTranscript && (
            <div className="mt-2 p-3 bg-black/40 border border-white/5 rounded text-xs text-zinc-300 leading-relaxed font-sans animate-in fade-in duration-150">
              <p className="mb-2">"{post.transcript}"</p>
              <div className="text-[11px] text-zinc-500 border-t border-white/5 pt-2 flex items-center justify-between">
                <span>Key Takeaway: {post.contentSignals.keyTakeaway}</span>
                {post.permalink && (
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px]"
                  >
                    View Source <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
