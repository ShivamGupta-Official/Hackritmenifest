import { Activity, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ExecutiveOverview() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-end border-b border-[var(--hairline)] pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight">Executive Overview</h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2">Health scores, growth signals, and active alerts.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost">Export Report</button>
          <button className="btn-vanilla">Run Diagnosis</button>
        </div>
      </header>

      {/* Top Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="velvet-card">
          <div className="velvet-card-body">
            <h3 className="text-sm font-medium text-[var(--text-vanilla-muted)]">Content Health Score</h3>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-bold text-[var(--text-vanilla-high)] font-mono">92/100</span>
              <span className="badge badge-emerald"><TrendingUp size={12}/> +4</span>
            </div>
          </div>
        </div>

        <div className="velvet-card">
          <div className="velvet-card-body">
            <h3 className="text-sm font-medium text-[var(--text-vanilla-muted)]">Active Opportunities</h3>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-bold text-[var(--text-vanilla-high)] font-mono">14</span>
              <span className="badge badge-amber">3 High Priority</span>
            </div>
          </div>
        </div>

        <div className="velvet-card">
          <div className="velvet-card-body">
            <h3 className="text-sm font-medium text-[var(--text-vanilla-muted)]">Campaign Drop-offs</h3>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-bold text-[var(--text-vanilla-high)] font-mono">2</span>
              <span className="badge badge-rose">Needs Action</span>
            </div>
          </div>
        </div>

        <div className="velvet-card">
          <div className="velvet-card-body">
            <h3 className="text-sm font-medium text-[var(--text-vanilla-muted)]">Brand Alignment</h3>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-bold text-[var(--text-vanilla-high)] font-mono">98%</span>
              <span className="badge badge-emerald"><CheckCircle2 size={12}/> Optimal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Signals */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="evidence-card">
            <div className="velvet-card-header">
              <h2 className="text-xl font-bold text-[var(--text-vanilla-high)]">Critical Insights</h2>
              <span className="badge badge-velvet font-mono">Last 7 Days</span>
            </div>
            <div className="velvet-card-body flex flex-col gap-4">
              <div className="metric-well flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-amber-bg)] text-[var(--status-amber-text)] flex items-center justify-center">
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)]">Trend Acceleration Detected</h4>
                    <p className="text-sm text-[var(--text-vanilla-muted)] mt-1">"Athletic recovery routines" search volume up 140%</p>
                  </div>
                </div>
                <button className="btn-ghost text-xs py-1.5 px-3">View Radar</button>
              </div>

              <div className="metric-well flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-emerald-bg)] text-[var(--status-emerald-text)] flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)]">Content DNA Outperformance</h4>
                    <p className="text-sm text-[var(--text-vanilla-muted)] mt-1">Founder-led hooks are converting at 2.1x baseline</p>
                  </div>
                </div>
                <button className="btn-ghost text-xs py-1.5 px-3">View Intel</button>
              </div>
              
              <div className="metric-well flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--status-rose-bg)] text-[var(--status-rose-text)] flex items-center justify-center">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-vanilla-high)]">Funnel Bottleneck</h4>
                    <p className="text-sm text-[var(--text-vanilla-muted)] mt-1">Q3 Webinar campaign has 68% drop-off at landing page</p>
                  </div>
                </div>
                <button className="btn-ghost text-xs py-1.5 px-3">Diagnose</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: System Status */}
        <div className="flex flex-col gap-6">
          <div className="velvet-card">
            <div className="velvet-card-header">
              <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Engine Status</h2>
            </div>
            <div className="velvet-card-body flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                <span className="text-[var(--text-vanilla-muted)] text-sm">Vector Search</span>
                <span className="text-[var(--status-emerald-text)] text-sm flex items-center gap-1.5 font-mono"><span className="w-2 h-2 rounded-full bg-[var(--status-emerald-text)] inline-block"></span> Online</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                <span className="text-[var(--text-vanilla-muted)] text-sm">Ingestion Pipeline</span>
                <span className="text-[var(--status-emerald-text)] text-sm flex items-center gap-1.5 font-mono"><span className="w-2 h-2 rounded-full bg-[var(--status-emerald-text)] inline-block"></span> Synced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-vanilla-muted)] text-sm">Analyzed Items</span>
                <span className="text-[var(--text-vanilla-high)] font-mono text-sm">1,248</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
