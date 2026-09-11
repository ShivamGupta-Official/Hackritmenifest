'use client';

import React, { useState } from 'react';
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
  Compass, 
  CheckCircle2,
  TrendingUp,
  Activity,
  Cpu,
  SlidersHorizontal
} from 'lucide-react';
import { AnalysisTransition } from '@/components/AnalysisTransition';

export default function LaunchpadPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState<number>(12);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

      {/* Top Navigation */}
      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white tracking-tighter font-display">
              C<span className="text-emerald-400">OS</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ContentOS</span>
            <span className="badge badge-emerald hidden sm:inline-flex text-[10px]">v2.4 Live Intelligence</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/intelligence" className="text-zinc-400 hover:text-white transition-colors">Content DNA</Link>
            <Link href="/radar" className="text-zinc-400 hover:text-white transition-colors">Trend Radar</Link>
            <Link href="/campaigns" className="text-zinc-400 hover:text-white transition-colors">Campaigns</Link>
            <Link href="/dashboard" className="btn-vanilla !py-1.5 !px-3.5 !text-xs">
              Enter Workspace
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 mb-8 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>PROVENANCE-AWARE SOCIAL REVERSE-ENGINEERING</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight max-w-4xl text-white mb-6 leading-[1.08]">
          Turn Public Competitor Content DNA into an <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">Unfair Growth Engine</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 font-normal leading-relaxed">
          Paste any public Instagram, TikTok, or YouTube link. We deconstruct the winning 3-second hooks, transcripts, and engagement velocity—then synthesize an original 7-day Growth Blueprint customized for your brand.
        </p>

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
            100% Policy-Safe Public APIs
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
        <section className="w-full max-w-5xl text-left mb-24">
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
