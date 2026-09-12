'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  X,
  Sliders,
  Zap
} from "lucide-react";

export default function ExecutiveOverview() {
  const router = useRouter();
  const [isRunningDiagnosis, setIsRunningDiagnosis] = useState(false);
  const [diagnosisComplete, setDiagnosisComplete] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [reportExported, setReportExported] = useState(false);

  const handleRunDiagnosis = () => {
    setIsRunningDiagnosis(true);
    setDiagnosisComplete(false);
    setTimeout(() => {
      setIsRunningDiagnosis(false);
      setDiagnosisComplete(true);
    }, 1500);
  };

  const handleExportReport = () => {
    const data = {
      title: "ContentOS Executive Overview Report",
      generatedAt: new Date().toISOString(),
      contentHealthScore: 92,
      activeOpportunities: 14,
      campaignDropOffs: 2,
      brandAlignment: "98%",
      criticalSignals: [
        { type: "Trend Acceleration", title: "Athletic recovery routines (+140%)" },
        { type: "Content DNA", title: "Founder-led hooks converting at 2.1x baseline" },
        { type: "Funnel Bottleneck", title: "Q3 Webinar landing page 68% drop-off" }
      ]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contentos_executive_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setReportExported(true);
    setTimeout(() => setReportExported(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4 text-[#fcfcf9] selection:bg-white/20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[var(--hairline)] pb-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight font-display">
            Executive Overview
          </h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2 text-sm">
            Health scores, growth signals, and active alerts across your entire acquisition loop.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportReport}
            className="btn-ghost flex items-center gap-2 text-xs py-2 px-3.5"
          >
            <Download size={14} />
            {reportExported ? "Downloaded!" : "Export Report"}
          </button>
          <button 
            onClick={handleRunDiagnosis}
            disabled={isRunningDiagnosis}
            className="btn-vanilla flex items-center gap-2 text-xs py-2 px-4 shadow-lg shadow-emerald-500/10"
          >
            {isRunningDiagnosis ? (
              <>
                <RefreshCw size={14} className="animate-spin text-emerald-400" />
                Diagnosing Loop...
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-emerald-400" />
                Run AI Diagnosis
              </>
            )}
          </button>
        </div>
      </header>

      {/* Diagnosis Notification Banner */}
      {diagnosisComplete && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>AI Diagnosis Complete: 3 active vectors identified. Content health optimal at 92/100.</span>
          </div>
          <button onClick={() => setDiagnosisComplete(false)} className="text-emerald-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="velvet-card p-5">
          <h3 className="text-xs font-mono uppercase text-[var(--text-vanilla-muted)]">Content Health Score</h3>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-[var(--text-vanilla-high)] font-mono">92/100</span>
            <span className="badge badge-emerald flex items-center gap-1"><TrendingUp size={12}/> +4%</span>
          </div>
        </div>

        <div className="velvet-card p-5">
          <h3 className="text-xs font-mono uppercase text-[var(--text-vanilla-muted)]">Active Opportunities</h3>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-[var(--text-vanilla-high)] font-mono">14</span>
            <span className="badge badge-amber">3 High Priority</span>
          </div>
        </div>

        <div className="velvet-card p-5">
          <h3 className="text-xs font-mono uppercase text-[var(--text-vanilla-muted)]">Campaign Drop-offs</h3>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-[var(--text-vanilla-high)] font-mono">2</span>
            <span className="badge badge-rose">Needs Action</span>
          </div>
        </div>

        <div className="velvet-card p-5">
          <h3 className="text-xs font-mono uppercase text-[var(--text-vanilla-muted)]">Brand Alignment</h3>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-[var(--text-vanilla-high)] font-mono">98%</span>
            <span className="badge badge-emerald flex items-center gap-1"><CheckCircle2 size={12}/> Optimal</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Signals */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="evidence-card p-6">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4 mb-4">
              <h2 className="text-lg font-bold text-[var(--text-vanilla-high)] font-display">Critical Insights</h2>
              <span className="badge badge-velvet font-mono text-xs">Last 7 Days</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="metric-well p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-amber-bg)] text-[var(--status-amber-text)] flex items-center justify-center shrink-0">
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)] text-sm">Trend Acceleration Detected</h4>
                    <p className="text-xs text-[var(--text-vanilla-muted)] mt-0.5">"Athletic recovery routines" search volume up 140%</p>
                  </div>
                </div>
                <Link href="/radar" className="btn-ghost text-xs py-1.5 px-3 shrink-0">
                  View Radar →
                </Link>
              </div>

              <div className="metric-well p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-emerald-bg)] text-[var(--status-emerald-text)] flex items-center justify-center shrink-0">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)] text-sm">Content DNA Outperformance</h4>
                    <p className="text-xs text-[var(--text-vanilla-muted)] mt-0.5">Founder-led hooks are converting at 2.1x baseline</p>
                  </div>
                </div>
                <Link href="/intelligence" className="btn-ghost text-xs py-1.5 px-3 shrink-0">
                  View Intel →
                </Link>
              </div>
              
              <div className="metric-well p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-rose-bg)] text-[var(--status-rose-text)] flex items-center justify-center shrink-0">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)] text-sm">Funnel Bottleneck</h4>
                    <p className="text-xs text-[var(--text-vanilla-muted)] mt-0.5">Q3 Webinar campaign has 68% drop-off at landing page</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal('funnel-bottleneck')}
                  className="btn-ghost text-xs py-1.5 px-3 shrink-0 text-rose-400 hover:text-rose-300"
                >
                  Diagnose
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: System Status */}
        <div className="flex flex-col gap-6">
          <div className="velvet-card p-6">
            <h2 className="text-base font-bold text-[var(--text-vanilla-high)] font-display mb-4">Engine Status</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                <span className="text-[var(--text-vanilla-muted)] text-xs">Vector Search</span>
                <span className="text-[var(--status-emerald-text)] text-xs flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span> Online
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                <span className="text-[var(--text-vanilla-muted)] text-xs">Ingestion Pipeline</span>
                <span className="text-[var(--status-emerald-text)] text-xs flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Synced
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                <span className="text-[var(--text-vanilla-muted)] text-xs">Multi-Model Swarm</span>
                <span className="text-cyan-400 text-xs flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span> 4 Agents Active
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[var(--text-vanilla-muted)] text-xs">Analyzed Items</span>
                <span className="text-[var(--text-vanilla-high)] font-mono text-xs">1,248</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Modal */}
      {activeModal === 'funnel-bottleneck' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <h3 className="font-display font-bold text-white text-base">Funnel Bottleneck Diagnosis</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>
                <strong>Campaign:</strong> Q3 Webinar "Mastering Retention"
              </p>
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-300">
                <strong>Root Cause:</strong> Ad creative promises a "3-Minute Retention Audit Framework", but the landing page headline focuses on generic product features without addressing the audit hook.
              </div>
              <p className="text-zinc-400">
                <strong>Recommended Action:</strong> Harmonize the landing page hero copy with the top-performing problem hook.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setActiveModal(null)} className="btn-ghost text-xs py-2 px-3">
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  router.push('/studio?topic=Q3%20Retention%20Landing%20Page');
                }}
                className="btn-vanilla text-xs py-2 px-4 flex items-center gap-1"
              >
                Fix in Studio <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
