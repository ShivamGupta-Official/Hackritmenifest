'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Atom, 
  Layers, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Play, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';
import InteractiveListPreview from '@/components/ui/interactive-list-preview';

const SHOWCASE_STREAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    alt: "Glow Recipe Glass Skin Hook",
    creator: "@glowrecipe",
    hook: "Stop washing your face with hot water if you want glass skin.",
    multiplier: "+3.1× MEDIAN",
  },
  {
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    alt: "Gymshark Recovery Protocol",
    creator: "@gymshark",
    hook: "The 5-minute cooldown protocol that cuts muscle soreness in half.",
    multiplier: "+2.8× VIRAL",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    alt: "Notion Startup Workspace",
    creator: "@notionhq",
    hook: "How I organized my entire startup in 3 dashboard views.",
    multiplier: "+4.2× VIRAL",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    alt: "Zomato Viral Street Food Reel",
    creator: "@zomato",
    hook: "Kya aapne ye secret menu item kabhi try kiya hai?",
    multiplier: "+3.5× VIRAL",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    alt: "Zerodha Wealth Compounding",
    creator: "@zerodha",
    hook: "The compounding math they never teach you in business school.",
    multiplier: "+2.9× RETENTION",
  },
  {
    src: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80",
    alt: "Cult.fit Mobility Drill",
    creator: "@cultfit",
    hook: "Fix your squat depth with this 10-second hip mobility drill.",
    multiplier: "+2.5× VIRAL",
  },
];

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'dna' | 'agents' | 'blueprint' | 'radar'>('all');

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto p-4 sm:p-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-emerald text-[10px] font-mono">LIVE COMPONENT VAULT</span>
            <span className="text-zinc-400 text-xs font-mono">• Motion & Intelligence Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            ContentOS Interactive Component Suite
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Live interactive demonstration of the 3D perspective corridor, GSAP difference-blend capability preview, and asymmetric technical menus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="btn-ghost text-xs font-mono">
            ← Back to Launchpad
          </Link>
          <Link href="/demo" className="btn-vanilla !py-2 !px-4 text-xs font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Open Mock Lab</span>
          </Link>
        </div>
      </div>

      {/* Component 1: 3D Image Stream Corridor */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-display font-semibold text-white">
              01 // 3D Dual-Rail Corridor (ImageStreamHero)
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">cqw projection • preserve-3d</span>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-black">
          <ImageStreamHero
            images={SHOWCASE_STREAM_IMAGES}
            cards={8}
            speed={16}
            axis={50}
            className="h-[440px] w-full"
          >
            <div className="relative z-20 flex h-full flex-col items-center justify-between py-10 px-6 text-center max-w-2xl mx-auto pointer-events-none">
              <span className="badge badge-emerald text-[10px] font-mono">3D REEL CORRIDOR</span>
              <div className="space-y-2 bg-black/60 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Real Competitor Content Reverse-Engineered
                </h3>
                <p className="text-xs text-zinc-300">
                  Each streaming card carries real viral multipliers, creator handles, and verified hook text extracted from public social endpoints.
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">Streaming 8 concurrent rails in perspective</span>
            </div>
          </ImageStreamHero>
        </div>
      </section>

      {/* Component 2: Interactive List Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-display font-semibold text-white">
              02 // GSAP Hover Capability Matrix (InteractiveListPreview)
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">mix-blend: difference • clip-path tween</span>
        </div>

        <div className="rounded-tl-[32px] rounded-tr-[12px] rounded-br-[36px] rounded-bl-[14px] border border-white/15 border-t-white/30 border-l-cyan-500/30 overflow-hidden shadow-2xl bg-[#090a0f]">
          <InteractiveListPreview
            bgColor="#090a0f"
            imageSize={1.1}
            smoothness={0.3}
            className="py-4"
          />
        </div>
      </section>

      {/* Architecture Specs Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="velvet-card p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-sm font-semibold font-display text-white">100% Policy-Safe Public Ingestion</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Operates exclusively on publicly accessible social media URLs. Zero login credentials or platform passwords ever requested or stored.
          </p>
        </div>

        <div className="velvet-card p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Cpu className="w-4 h-4" />
            <h4 className="text-sm font-semibold font-display text-white">Multi-Agent Swarm Reasoning</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            4 coordinated LLM agents (Strategist, Creator, Brand Critic, and Studio Director) reason over Content DNA and enforce brand rules.
          </p>
        </div>

        <div className="velvet-card p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <h4 className="text-sm font-semibold font-display text-white">Statistical Multiplier Telemetry</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Replaces viral guesswork with statistical median outperformance baselines (2.4× - 4.2×) calculated across past reel performance.
          </p>
        </div>
      </section>
    </div>
  );
}
