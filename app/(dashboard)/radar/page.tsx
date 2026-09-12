'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  X,
  Flame,
  CheckCircle2,
  Compass
} from "lucide-react";

export default function TrendRadar() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showGapsModal, setShowGapsModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const handleUpdateSignals = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Updated just now (Real-Time Index)');
    }, 1200);
  };

  const opportunities = [
    {
      id: 'opp-1',
      title: 'Athletic Recovery',
      score: 94,
      badgeClass: 'badge-emerald',
      description: 'High momentum in search volume (+140%) intersecting with founder and high-performer audience segment.',
      momentum: 'High (+140%)',
      momentumStatus: 'emerald',
      saturation: 'Low',
      saturationStatus: 'emerald',
      topicParam: 'Athletic Recovery Routines'
    },
    {
      id: 'opp-2',
      title: 'Home Gym Setups',
      score: 72,
      badgeClass: 'badge-amber',
      description: 'Stable search volume, but rising paid ad competition in short-form video feeds.',
      momentum: 'Stable (+12%)',
      momentumStatus: 'amber',
      saturation: 'High',
      saturationStatus: 'rose',
      topicParam: 'Compact Home Gym Architecture'
    },
    {
      id: 'opp-3',
      title: 'Keto Diets',
      score: 41,
      badgeClass: 'badge-velvet',
      description: 'Declining consumer interest and heavily oversaturated organic content market.',
      momentum: 'Declining (-28%)',
      momentumStatus: 'rose',
      saturation: 'Extreme',
      saturationStatus: 'rose',
      topicParam: 'Metabolic Health vs Keto'
    }
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4 text-[#fcfcf9] selection:bg-white/20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[var(--hairline)] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-2">
            <Compass size={14} className="text-cyan-400" />
            <span>OPPORTUNITY RADAR v2.4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight font-display">
            Trend & Opportunity Radar
          </h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2 text-sm">
            Scored commercial opportunities separating verified growth signals from viral noise.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleUpdateSignals}
            disabled={isRefreshing}
            className="btn-ghost flex items-center gap-2 text-xs py-2 px-3.5"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin text-cyan-400" : ""} />
            {isRefreshing ? "Scanning Feeds..." : "Update Signals"}
          </button>
          <button 
            onClick={() => setShowGapsModal(true)}
            className="btn-vanilla flex items-center gap-2 text-xs py-2 px-4 shadow-lg shadow-cyan-500/10"
          >
            <Sparkles size={14} className="text-cyan-400" />
            Detect Gaps
          </button>
        </div>
      </header>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
        <span>Signal Engine: Active Monitoring</span>
        <span>{lastUpdated}</span>
      </div>

      {/* Top Opportunities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="evidence-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4">
                <h3 className="font-bold text-[var(--text-vanilla-high)] font-display text-lg">{opp.title}</h3>
                <span className={`badge ${opp.badgeClass} font-mono text-xs font-semibold`}>
                  Score: {opp.score}/100
                </span>
              </div>
              <p className="text-xs text-[var(--text-vanilla-muted)] leading-relaxed">
                {opp.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 my-4 border-t border-[var(--hairline)] pt-4">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-zinc-500">Momentum</span>
                  <span className={`text-xs font-semibold flex items-center gap-1 mt-1 ${
                    opp.momentumStatus === 'emerald' ? 'text-emerald-400' :
                    opp.momentumStatus === 'amber' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    <TrendingUp size={14}/> {opp.momentum}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-zinc-500">Saturation</span>
                  <span className={`text-xs font-semibold block mt-1 ${
                    opp.saturationStatus === 'emerald' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {opp.saturation}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setSelectedSignal(opp)}
                className="btn-ghost text-xs py-2 px-3 flex-1 justify-center"
              >
                View Signals
              </button>
              <button 
                onClick={() => router.push(`/blueprint?topic=${encodeURIComponent(opp.topicParam)}`)}
                className="btn-vanilla text-xs py-2 px-3 flex-1 justify-center flex items-center gap-1"
              >
                Blueprint <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </section>
      
      {/* Content Gaps Table */}
      <section className="velvet-card p-6">
        <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <Target className="text-cyan-400" size={20} />
            <h2 className="text-lg font-bold text-[var(--text-vanilla-high)] font-display">
              Identified Content Gaps
            </h2>
          </div>
          <span className="badge badge-emerald text-xs font-mono">High Commercial Intent</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-zinc-500 text-xs font-mono uppercase">
                <th className="p-3">Gap Topic</th>
                <th className="p-3">Audience Demand</th>
                <th className="p-3">Current Coverage</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-[var(--hairline)] hover:bg-white/[0.02] transition-colors">
                <td className="p-3 text-[var(--text-vanilla-high)] font-medium">Post-workout sleep & recovery routines</td>
                <td className="p-3 text-emerald-400 font-mono font-semibold">High (+180%)</td>
                <td className="p-3 text-rose-400 font-mono">None (0 competitors)</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => router.push('/studio?topic=Post-workout%20sleep%20routines')}
                    className="btn-vanilla text-xs py-1.5 px-3"
                  >
                    Create Brief →
                  </button>
                </td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-white/[0.02] transition-colors">
                <td className="p-3 text-[var(--text-vanilla-high)] font-medium">Desk mobility & posture reset for office workers</td>
                <td className="p-3 text-emerald-400 font-mono font-semibold">High (+125%)</td>
                <td className="p-3 text-amber-400 font-mono">Low (Saturated with generic advice)</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => router.push('/studio?topic=Desk%20mobility%20for%20office%20workers')}
                    className="btn-vanilla text-xs py-1.5 px-3"
                  >
                    Create Brief →
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3 text-[var(--text-vanilla-high)] font-medium">Biometric sleep score optimization without wearables</td>
                <td className="p-3 text-cyan-400 font-mono font-semibold">Emerging (+95%)</td>
                <td className="p-3 text-zinc-400 font-mono">Moderate</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => router.push('/studio?topic=Sleep%20score%20optimization')}
                    className="btn-vanilla text-xs py-1.5 px-3"
                  >
                    Create Brief →
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Signal Details Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                {selectedSignal.title} — Signal Breakdown
              </h3>
              <button onClick={() => setSelectedSignal(null)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>{selectedSignal.description}</p>
              <div className="grid grid-cols-2 gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                <div>
                  <span className="text-zinc-500 font-mono text-[10px] uppercase block">Search Velocity</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{selectedSignal.momentum}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[10px] uppercase block">Commercial Conversion</span>
                  <span className="text-white font-bold font-mono text-sm">8.4 / 10</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setSelectedSignal(null)} className="btn-ghost text-xs py-2 px-3">
                Close
              </button>
              <button 
                onClick={() => {
                  const param = selectedSignal.topicParam;
                  setSelectedSignal(null);
                  router.push(`/blueprint?topic=${encodeURIComponent(param)}`);
                }}
                className="btn-vanilla text-xs py-2 px-4"
              >
                Synthesize Blueprint →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detect Gaps Modal */}
      {showGapsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-lg">AI Content Gap Analysis</h3>
              </div>
              <button onClick={() => setShowGapsModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>
                Our AI analyzed the latest 500 competitor videos across your sector. The following unaddressed audience pain points have high purchase intent:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                <li><strong>Circadian Rhythm Disruption:</strong> 64% increase in user questions regarding night shift energy recovery.</li>
                <li><strong>Raw Formulation Scrutiny:</strong> Consumers are rejecting proprietary blends in favor of lab-certified dosages.</li>
                <li><strong>Micro-Habit Workouts:</strong> Surge in demand for 5-minute desk resets.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setShowGapsModal(false)} className="btn-ghost text-xs py-2 px-3">
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setShowGapsModal(false);
                  router.push('/studio?topic=Circadian%20Energy%20Recovery');
                }}
                className="btn-vanilla text-xs py-2 px-4"
              >
                Draft First Gap Brief →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
