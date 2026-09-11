'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Video, 
  Play, 
  ShieldCheck, 
  Zap, 
  BarChart2, 
  Layers, 
  ChevronDown,
  TrendingUp,
  Cpu,
  SlidersHorizontal,
  Workflow,
  Search,
  CheckCircle2,
  Atom,
  BrainCircuit
} from 'lucide-react';
import { AnalysisTransition } from '@/components/AnalysisTransition';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';
import InteractiveListPreview from '@/components/ui/interactive-list-preview';

const HERO_STREAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    alt: "Abstract 3D motion gradient",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    alt: "Growth analytics & data telemetry",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    alt: "High-retention creator hook frame",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    alt: "AI agent neural swarm visualization",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    alt: "Viral reaction & engagement moment",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    alt: "Retro-futuristic studio equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=80",
    alt: "Flowing velocity vectors",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    alt: "Content strategy workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    alt: "Marketing attribution & scaling radar",
  }
];

export default function LaunchpadPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState<number>(12);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'dna' | 'agents' | 'blueprint' | 'radar'>('all');

  const analyzerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    setIsDropdownOpen(false);
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const detectPlatform = (inputUrl: string) => {
    const clean = inputUrl.toLowerCase();
    if (clean.includes('tiktok')) return 'TikTok';
    if (clean.includes('youtube') || clean.includes('youtu.be')) return 'YouTube';
    return 'Instagram';
  };

  const handleAnalyze = (targetUrl?: string) => {
    const link = targetUrl || url;
    if (!link || link.trim() === '') {
      setErrorMessage('Please enter a public social media link or creator handle.');
      return;
    }
    setErrorMessage('');
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    const cleanUrl = encodeURIComponent(url.trim());
    router.push(`/intelligence?url=${cleanUrl}&limit=${limit}`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fcfcf9] selection:bg-white/20">
      {/* Background Decorative Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-white/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white tracking-tighter font-display">
              C<span className="text-emerald-400">OS</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ContentOS</span>
            <span className="badge badge-emerald hidden sm:inline-flex text-[10px]">v2.4 Intelligence</span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors hidden md:inline-block">Dashboard</Link>
            <Link href="/intelligence" className="text-zinc-400 hover:text-white transition-colors hidden md:inline-block">Content DNA</Link>
            <Link href="/radar" className="text-zinc-400 hover:text-white transition-colors hidden md:inline-block">Trend Radar</Link>
            <Link href="/campaigns" className="text-zinc-400 hover:text-white transition-colors hidden md:inline-block">Campaigns</Link>
            
            {/* Reactive Dropdown Navigation Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 transition-all"
              >
                <span>Project Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-950/95 border border-white/15 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">System Navigation</p>
                    <p className="text-xs font-medium text-white">ContentOS Intelligence</p>
                  </div>
                  
                  <button
                    onClick={() => scrollToSection(analyzerRef)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 text-emerald-400" />
                    <span>01. URL Reverse-Engineer</span>
                  </button>

                  <button
                    onClick={() => scrollToSection(previewRef)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Atom className="w-3.5 h-3.5 text-cyan-400" />
                    <span>02. Interactive Core Modules</span>
                  </button>

                  <button
                    onClick={() => scrollToSection(processRef)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Workflow className="w-3.5 h-3.5 text-amber-400" />
                    <span>03. Operating Loop (01-04)</span>
                  </button>

                  <div className="my-1 border-t border-white/5" />

                  <Link
                    href="/demo"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-amber-400 hover:bg-amber-400/10 flex items-center gap-2.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>⚡ Mock Data Lab</span>
                  </Link>

                  <Link
                    href="/brain"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                    <span>Brand Persona Brain</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/demo" className="text-amber-400 hover:text-amber-300 transition-colors font-mono text-xs hidden sm:flex items-center gap-1">
              ⚡ Demo Lab
            </Link>
            <Link href="/dashboard" className="btn-vanilla !py-1.5 !px-3.5 !text-xs">
              Enter Workspace
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH IMAGE STREAM CORRIDOR */}
      <section className="relative w-full border-b border-white/10 overflow-hidden">
        <ImageStreamHero
          images={HERO_STREAM_IMAGES}
          cards={9}
          speed={18}
          axis={52}
          className="h-[520px] sm:h-[580px] w-full bg-[#09090b]"
        >
          {/* Hero Overlay Content Floating in Front */}
          <div className="relative z-20 flex h-full flex-col items-center justify-between py-10 sm:py-14 px-6 text-center max-w-5xl mx-auto">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono text-zinc-300 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>CONTENTOS — PROVENANCE-AWARE SOCIAL REVERSE-ENGINEERING</span>
            </div>

            {/* Core Value Proposition */}
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                Turn Public Competitor Content DNA into an{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-white to-cyan-300">
                  Unfair Growth Engine
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300/90 max-w-2xl mx-auto font-normal leading-relaxed bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5">
                We deconstruct winning 3-second hooks, audio BPM pacing, psychological triggers, and engagement velocity—synthesizing high-retention organic and paid ad playbooks.
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => scrollToSection(analyzerRef)}
                className="btn-vanilla !py-2.5 !px-5 text-xs font-semibold shadow-xl hover:scale-105 transition-all"
              >
                Analyze Public URL <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
              <button
                onClick={() => scrollToSection(previewRef)}
                className="btn-ghost !py-2.5 !px-5 text-xs font-mono bg-black/60 backdrop-blur-md hover:bg-white/10"
              >
                Interactive System Preview ↓
              </button>
            </div>
          </div>
        </ImageStreamHero>
      </section>

      {/* INTERACTIVE COMPONENT PREVIEW SHOWCASE */}
      <section ref={previewRef} className="w-full border-b border-white/10 py-16 px-4 sm:px-6 bg-[#0d0d11]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                <Atom className="w-3.5 h-3.5" />
                <span>Motion-Activated Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Interactive System Deconstruction
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mt-1">
                Hover over the architecture layers to inspect how ContentOS connects observed public telemetry into generative creative production.
              </p>
            </div>

            {/* Reactive Tab Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono">
              <span className="text-zinc-500 text-[11px] px-2">HIGHLIGHT:</span>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'all' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
              >
                All Systems
              </button>
              <button
                onClick={() => scrollToSection(analyzerRef)}
                className="px-2.5 py-1 rounded-md text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                Try Extraction →
              </button>
            </div>
          </div>

          {/* InteractiveListPreview Component */}
          <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-black/40">
            <InteractiveListPreview
              bgColor="#09090b"
              imageSize={1.1}
              smoothness={0.3}
              className="py-4"
            />
          </div>
        </div>
      </section>

      {/* URL ANALYZER LAUNCHPAD SECTION */}
      <main ref={analyzerRef} className="max-w-6xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        
        <div className="mb-8 max-w-2xl">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Public Extraction Engine</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Input Competitor Handle or Post URL
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            No login credentials required. Analyzes public Instagram reels, TikTok videos, and YouTube Shorts safely.
          </p>
        </div>

        {/* Interactive Analyzer Input Card */}
        <div className="w-full max-w-3xl velvet-card p-4 sm:p-6 shadow-2xl relative mb-8 border border-white/15">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                {detectPlatform(url) === 'TikTok' ? (
                  <Video className="w-5 h-5 text-cyan-400" />
                ) : detectPlatform(url) === 'YouTube' ? (
                  <Play className="w-5 h-5 text-rose-500" />
                ) : (
                  <Camera className="w-5 h-5 text-pink-400" />
                )}
              </div>
              <input
                type="text"
                placeholder="Paste public link (e.g. instagram.com/glowrecipe or @notionhq)..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setErrorMessage('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAnalyze();
                }}
                className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-black/60 border border-white/10 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
              />
            </div>
            
            <button
              onClick={() => handleAnalyze()}
              className="btn-vanilla !py-3.5 !px-6 text-sm font-semibold justify-center shadow-lg hover:shadow-white/10 shrink-0"
            >
              Analyze Content DNA <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Data Extraction Limit Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-white/5 text-xs">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>EXTRACTION DEPTH:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { count: 5, label: '5 Posts (Fast)' },
                { count: 12, label: '12 Posts (Feed)' },
                { count: 25, label: '25 Posts (Deep Audit)' },
                { count: 50, label: '50 Posts (Exhaustive)' },
              ].map(preset => (
                <button
                  key={preset.count}
                  type="button"
                  onClick={() => setLimit(preset.count)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    limit === preset.count
                      ? 'bg-white text-black font-semibold shadow'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}

              <div className="flex items-center gap-1 pl-1">
                <span className="text-zinc-500 text-[10px] font-mono">Custom:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={limit}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) setLimit(Math.max(1, Math.min(val, 100)));
                  }}
                  className="w-12 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-white font-mono text-center text-[11px] focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="text-rose-400 text-xs text-left mt-2.5 font-mono">
              ⚠ {errorMessage}
            </div>
          )}
        </div>

        {/* Live System Metric Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400 pt-2 mb-20">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Policy-Safe Public Ingestion
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            400ms Hook Velocity Scoring
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Observed vs AI Provenance Demarcation
          </span>
        </div>

        {/* 4-Step Process Section */}
        <section ref={processRef} className="w-full max-w-5xl text-left mb-24">
          <div className="mb-10 text-center">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">End-to-End Operating Loop</span>
            <h2 className="text-3xl font-display font-bold text-white mt-1">
              From Public URL to Production-Ready Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="velvet-card p-5 relative">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-zinc-300 mb-4">
                01
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                Public Extraction
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connects to public social endpoints, retrieving the latest 4-5 media items, captions, and verified engagement rates.
              </p>
            </div>

            <div className="velvet-card p-5 relative">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-zinc-300 mb-4">
                02
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                Content DNA Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Deconstructs 3-second hook structures, audio BPM pacing, psychological triggers, and statistical outperformance multipliers.
              </p>
            </div>

            <div className="velvet-card p-5 relative">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-zinc-300 mb-4">
                03
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                Brand Persona Fusion
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Map winning patterns against your specific startup, ICP audience desires, core product value props, and voice tone.
              </p>
            </div>

            <div className="velvet-card p-5 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-sm text-emerald-400 mb-4">
                04
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                Actionable Blueprint
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receive 5 tailored video hook scripts, a 7-day organic calendar, and conversion-focused paid ad angles ready for studio export.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
          <div className="evidence-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-white text-lg">Statistical Outperformance</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Replace gut feeling with statistical rigor. Identify formats and hooks that beat industry median baselines by 2.4×.
            </p>
            <Link href="/intelligence" className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1">
              Explore Content DNA →
            </Link>
          </div>

          <div className="evidence-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-white text-lg">Company Brand Brain</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Enforce strict brand rules, negative claims, and audience personas to guarantee generated content matches your identity.
            </p>
            <Link href="/brain" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
              Manage Brand Rules →
            </Link>
          </div>

          <div className="evidence-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-bold text-white text-lg">Opportunity Radar</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Surface rising industry topics and high commercial-intent trends before your competitors saturate the algorithm.
            </p>
            <Link href="/radar" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
              View Trend Signals →
            </Link>
          </div>
        </section>
      </main>

      {/* Simulated High-Tech Analysis Transition Modal */}
      {isAnalyzing && (
        <AnalysisTransition 
          url={url} 
          limit={limit} 
          onComplete={handleAnalysisComplete} 
        />
      )}
    </div>
  );
}
