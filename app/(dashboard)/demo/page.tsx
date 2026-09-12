'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  FlaskConical, 
  ArrowRight, 
  Play, 
  Layers, 
  Activity, 
  Compass, 
  Blocks, 
  Zap, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Send,
  Database
} from 'lucide-react';

interface MockProfilePreset {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  avgEngagement: string;
  winningHook: string;
  avatarLetter: string;
  badgeColor: string;
  sampleUrl: string;
  brandInput: {
    brandName: string;
    industry: string;
    targetAudience: string;
    valueProposition: string;
    toneOfVoice: string;
    primaryProduct: string;
  };
  samplePosts: {
    title: string;
    duration: number;
    er: string;
    views: string;
    likes: string;
    comments: string;
    hookText: string;
    visualCue: string;
    pacing: string;
    transcript: string;
  }[];
}

const mockPresets: MockProfilePreset[] = [
  {
    id: 'preset-skincare',
    name: 'Glow Recipe',
    handle: 'glowrecipe',
    category: 'Clean D2C Beauty & Skincare',
    followers: '1,420,000',
    avgEngagement: '6.8%',
    avatarLetter: 'G',
    badgeColor: 'badge-emerald',
    sampleUrl: 'https://instagram.com/glowrecipe',
    winningHook: 'Stop washing your face with hot water if you want glass skin.',
    brandInput: {
      brandName: 'Aura Barrier Labs',
      industry: 'Clean Clinical Skincare',
      targetAudience: 'Skincare enthusiasts seeking barrier restoration without stripping ingredients',
      valueProposition: 'Ceramide-rich hydration formulated with dermatological bio-actives',
      toneOfVoice: 'Scientific, transparent, soothing, and authoritative',
      primaryProduct: 'Barrier Restore Multi-Ceramide Serum'
    },
    samplePosts: [
      {
        title: 'Glass Skin Barrier Mistake #1',
        duration: 22,
        er: '7.4%',
        views: '480,000',
        likes: '34,200',
        comments: '890',
        hookText: 'Stop washing your face with hot water if you want glass skin.',
        visualCue: 'Close-up macro shot of water droplets splashing on serum bottle with sound effect.',
        pacing: '128 BPM',
        transcript: 'Stop washing your face with hot water if you want glass skin. Hot water strips your lipid mantle and causes rebound redness. Instead, switch to lukewarm water and seal immediately with a ceramide barrier serum while skin is damp.'
      },
      {
        title: 'Morning Routine vs Night Routine',
        duration: 28,
        er: '6.2%',
        views: '320,000',
        likes: '21,500',
        comments: '412',
        hookText: 'The 3 ingredients dermatologists actually tell their friends to use.',
        visualCue: 'Side-by-side comparison on bathroom vanity with on-screen text overlays.',
        pacing: '132 BPM',
        transcript: 'The 3 ingredients dermatologists actually tell their friends to use: Niacinamide for pore texture, Ectoin for environmental stress, and high-potency Ceramide NP for hydration retention.'
      }
    ]
  },
  {
    id: 'preset-fitness',
    name: 'Gymshark Performance',
    handle: 'gymshark',
    category: 'Athletic Apparel & Training',
    followers: '6,900,000',
    avgEngagement: '8.1%',
    avatarLetter: 'S',
    badgeColor: 'badge-cyan',
    sampleUrl: 'https://instagram.com/gymshark',
    winningHook: 'The 5-minute cooldown protocol that cuts muscle soreness in half.',
    brandInput: {
      brandName: 'Veloce Athletic',
      industry: 'Performance Training & Recovery',
      targetAudience: 'High-performing athletes, CrossFitters, and hybrid runners',
      valueProposition: 'Compression garments engineered with thermal-dissipating microfibers',
      toneOfVoice: 'Relentless, athletic, motivating, and sharp',
      primaryProduct: 'Recovery Aero-Compression Tights'
    },
    samplePosts: [
      {
        title: 'Recovery Protocol for Hybrid Athletes',
        duration: 18,
        er: '9.3%',
        views: '890,000',
        likes: '78,400',
        comments: '1,240',
        hookText: 'The 5-minute cooldown protocol that cuts muscle soreness in half.',
        visualCue: 'Fast cut transition between heavy barbell drop and immediate foam rolling motion.',
        pacing: '144 BPM',
        transcript: 'The 5-minute cooldown protocol that cuts muscle soreness in half: 90 seconds elevated legs against the wall, 60 seconds diaphragmatic box breathing, and targeted hamstring flossing.'
      },
      {
        title: 'Form Check: Romanian Deadlift',
        duration: 24,
        er: '7.8%',
        views: '610,000',
        likes: '51,200',
        comments: '670',
        hookText: 'You are feeling your lower back on RDLs because of this one mistake.',
        visualCue: 'Red X indicator on hip hinge angle followed by green checkmark correction.',
        pacing: '120 BPM',
        transcript: 'You are feeling your lower back on RDLs because of this one mistake. You are bending forward instead of pushing your hips directly into the back wall. Think about shutting a car door with your glutes.'
      }
    ]
  },
  {
    id: 'preset-saas',
    name: 'Notion Productivity',
    handle: 'notionhq',
    category: 'AI SaaS & Workspace Systems',
    followers: '850,000',
    avgEngagement: '9.4%',
    avatarLetter: 'N',
    badgeColor: 'badge-amber',
    sampleUrl: 'https://instagram.com/notionhq',
    winningHook: 'How I organized my entire startup in 3 dashboard views.',
    brandInput: {
      brandName: 'Flowstate AI',
      industry: 'Developer Productivity & Async Tools',
      targetAudience: 'Remote engineering teams and technical founders',
      valueProposition: 'Automated sprint synthesis and real-time PR review copilot',
      toneOfVoice: 'Minimalist, clear, engineer-centric, and efficient',
      primaryProduct: 'Flowstate Sprint Copilot'
    },
    samplePosts: [
      {
        title: '3 Dashboard Views for Fast Teams',
        duration: 31,
        er: '10.2%',
        views: '410,000',
        likes: '39,100',
        comments: '820',
        hookText: 'How I organized my entire startup in 3 dashboard views.',
        visualCue: 'Screen record zoom into clean dark-mode Kanban database with fluid gestures.',
        pacing: '116 BPM',
        transcript: 'How I organized my entire startup in 3 dashboard views: View 1 is the 7-Day Sprint Focus, View 2 is the Async Blockers queue, and View 3 is the Customer Feedback Loop synced automatically.'
      }
    ]
  }
];

export default function MockSandboxPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState<MockProfilePreset>(mockPresets[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const loadIntoIntelligence = (preset: MockProfilePreset) => {
    router.push(`/intelligence?url=${encodeURIComponent(preset.sampleUrl)}&limit=12`);
  };

  const loadIntoBlueprint = (preset: MockProfilePreset) => {
    router.push(`/blueprint?competitorUrl=${encodeURIComponent(preset.sampleUrl)}&handle=${encodeURIComponent(preset.handle)}&limit=12`);
  };

  const loadIntoStudio = (preset: MockProfilePreset) => {
    router.push(`/studio?topic=${encodeURIComponent(preset.brandInput.primaryProduct)}`);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans text-[#fcfcf9] selection:bg-white/20">
      {/* Header */}
      <header className="mb-8 border-b border-white/5 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 mb-3">
              <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
              <span>TEST & DEMO SANDBOX (MOCK DATA LAB)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white mb-2">
              Mock Intelligence & Testing Lab
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              Temporary sandbox containing curated sample profiles, verified hook transcripts, and pre-configured brand architectures. Test any feature with one click.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="btn-ghost text-xs py-2 px-3.5">
              ← Back to Overview
            </Link>
            <Link href="/intelligence" className="btn-vanilla text-xs py-2 px-4 shadow-lg shadow-emerald-500/10">
              Live Inspector
            </Link>
          </div>
        </div>
      </header>

      {/* Preset Selector Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase text-zinc-400 font-semibold tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Select Demo Profile Archetype
          </h2>
          <span className="text-xs text-zinc-500 font-mono">3 Sample Niches Loaded</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockPresets.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white/[0.08] border-emerald-500/40 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-white/20 to-white/5 border border-white/15 flex items-center justify-center font-bold text-base text-white">
                      {preset.avatarLetter}
                    </div>
                    <span className={`badge ${preset.badgeColor} text-[10px]`}>
                      {preset.avgEngagement} ER
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mb-0.5">{preset.name}</h3>
                  <p className="text-xs font-mono text-zinc-400 mb-2">@{preset.handle}</p>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    Category: <span className="text-zinc-200 font-medium">{preset.category}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{preset.followers} Followers</span>
                  <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {isSelected ? '✓ Active Preset' : 'Click to Load'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Preset Details & Quick Execution Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Preset Overview & Action Triggers (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="velvet-card p-6 border border-white/15 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-base">Quick Action Triggers</h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">Preset: @{selectedPreset.handle}</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => loadIntoIntelligence(selectedPreset)}
                className="w-full p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Inspect in Content DNA</div>
                    <div className="text-xs text-zinc-400">Deconstruct @{selectedPreset.handle} video transcripts</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => loadIntoBlueprint(selectedPreset)}
                className="w-full p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Synthesize Growth Blueprint</div>
                    <div className="text-xs text-zinc-400">Generate 5 hooks & 7-day calendar for {selectedPreset.brandInput.brandName}</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => loadIntoStudio(selectedPreset)}
                className="w-full p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Blocks size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Draft in Content Studio</div>
                    <div className="text-xs text-zinc-400">Launch multi-agent Creator ↔ Critic loop</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Configured Startup Identity Card */}
          <div className="velvet-card p-6 border border-white/15 space-y-4">
            <h3 className="font-display font-bold text-white text-base border-b border-white/10 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Fused Brand Identity: {selectedPreset.brandInput.brandName}
            </h3>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500 font-mono uppercase">Category:</span>
                <span className="text-white font-medium">{selectedPreset.brandInput.industry}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500 font-mono uppercase">Flagship:</span>
                <span className="text-emerald-400 font-medium">{selectedPreset.brandInput.primaryProduct}</span>
              </div>
              <div className="py-1 border-b border-white/5">
                <span className="text-zinc-500 font-mono uppercase block mb-1">Target ICP:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedPreset.brandInput.targetAudience}</p>
              </div>
              <div className="py-1">
                <span className="text-zinc-500 font-mono uppercase block mb-1">Value Proposition:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedPreset.brandInput.valueProposition}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-extracted Sample Media Transcripts (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display">
              Sample Deconstructed Transcripts & Metrics
            </h3>
            <span className="badge badge-emerald text-xs font-mono">
              Verified Mock Payload
            </span>
          </div>

          {selectedPreset.samplePosts.map((post, idx) => (
            <div key={idx} className="velvet-card p-5 border border-white/15 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono font-bold text-white">
                    0{idx + 1}
                  </span>
                  <h4 className="font-display font-bold text-white text-sm">{post.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-velvet text-[11px] font-mono flex items-center gap-1">
                    <Clock size={12} /> {post.duration}s
                  </span>
                  <span className="badge badge-emerald text-[11px] font-mono">
                    {post.er} ER
                  </span>
                </div>
              </div>

              {/* Hook Frame */}
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    0–3S AUDIO & HOOK HEADLINE
                  </span>
                  <button
                    onClick={() => handleCopy(post.hookText, `hook-${idx}`)}
                    className="text-zinc-400 hover:text-white text-[11px] flex items-center gap-1"
                  >
                    <Copy size={12} />
                    {copiedText === `hook-${idx}` ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm font-semibold text-white italic font-display">
                  "{post.hookText}"
                </p>
                <p className="text-xs text-zinc-400 pt-1">
                  🎬 <span className="text-zinc-300 font-semibold">Visual Pattern Interrupt:</span> {post.visualCue}
                </p>
              </div>

              {/* Full Transcript */}
              <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-zinc-300 leading-relaxed space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                  Media Transcript Breakdown
                </span>
                <p>"{post.transcript}"</p>
              </div>

              {/* Metric Footers */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs pt-1">
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Views</span>
                  <span className="font-bold text-white">{post.views}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Likes</span>
                  <span className="font-bold text-rose-400">{post.likes}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Comments</span>
                  <span className="font-bold text-cyan-400">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
