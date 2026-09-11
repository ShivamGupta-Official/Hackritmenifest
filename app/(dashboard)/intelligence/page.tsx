import { FileSearch, Sparkles, BarChart3 } from "lucide-react";

export default function ContentIntelligence() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-end border-b border-[var(--hairline)] pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight">Content Intelligence</h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2">Visual breakdown of winning hooks, formats, and statistical win rates.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost">Filter Data</button>
          <button className="btn-vanilla">Extract DNA</button>
        </div>
      </header>

      {/* DNA Engine Analysis */}
      <section className="evidence-card">
        <div className="velvet-card-header">
          <div className="flex items-center gap-3">
            <Sparkles className="text-[var(--text-vanilla-high)]" size={20} />
            <h2 className="text-xl font-bold text-[var(--text-vanilla-high)]">Content DNA Analysis</h2>
          </div>
          <span className="badge badge-emerald">High Confidence (n=248)</span>
        </div>
        
        <div className="velvet-card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Hook */}
            <div className="metric-well flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-[var(--text-vanilla-muted)] font-mono">Top Hook Pattern</h3>
              <p className="text-lg font-semibold text-[var(--text-vanilla-high)]">"Problem-First Agitation"</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--hairline)]">
                <span className="text-sm text-[var(--text-vanilla-muted)]">Outperformance</span>
                <span className="text-[var(--status-emerald-text)] font-mono font-bold">2.4x</span>
              </div>
            </div>

            {/* Top Format */}
            <div className="metric-well flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-[var(--text-vanilla-muted)] font-mono">Best Format</h3>
              <p className="text-lg font-semibold text-[var(--text-vanilla-high)]">"Founder POV Video"</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--hairline)]">
                <span className="text-sm text-[var(--text-vanilla-muted)]">Outperformance</span>
                <span className="text-[var(--status-emerald-text)] font-mono font-bold">1.8x</span>
              </div>
            </div>

            {/* Top Topic */}
            <div className="metric-well flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-[var(--text-vanilla-muted)] font-mono">Resonating Topic</h3>
              <p className="text-lg font-semibold text-[var(--text-vanilla-high)]">"Behind The Scenes / Real Numbers"</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--hairline)]">
                <span className="text-sm text-[var(--text-vanilla-muted)]">Outperformance</span>
                <span className="text-[var(--status-emerald-text)] font-mono font-bold">3.1x</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistical Win Rates */}
      <section className="velvet-card">
        <div className="velvet-card-header">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-[var(--text-vanilla-high)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Historical Win Rates</h2>
          </div>
        </div>
        
        <div className="velvet-card-body p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--hairline)]">
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Topic Cluster</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Win Rate</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Avg CTR</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Sample Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">B2B Growth Strategies</td>
                <td className="p-4 text-[var(--status-emerald-text)] font-mono">68%</td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">4.2%</td>
                <td className="p-4 text-[var(--text-vanilla-muted)] font-mono">n=124</td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Product Demos</td>
                <td className="p-4 text-[var(--status-amber-text)] font-mono">42%</td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">2.1%</td>
                <td className="p-4 text-[var(--text-vanilla-muted)] font-mono">n=86</td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Company Updates</td>
                <td className="p-4 text-[var(--status-rose-text)] font-mono">14%</td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">0.8%</td>
                <td className="p-4 text-[var(--text-vanilla-muted)] font-mono">n=45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
