import { Target, TrendingUp, AlertTriangle } from "lucide-react";

export default function TrendRadar() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-end border-b border-[var(--hairline)] pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight">Trend & Opportunity Radar</h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2">Scored commercial opportunities separating signal from viral noise.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost">Update Signals</button>
          <button className="btn-vanilla">Detect Gaps</button>
        </div>
      </header>

      {/* Top Opportunities */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="evidence-card">
          <div className="velvet-card-header">
            <h3 className="font-bold text-[var(--text-vanilla-high)]">Athletic Recovery</h3>
            <span className="badge badge-emerald">Score: 94/100</span>
          </div>
          <div className="velvet-card-body flex flex-col gap-4">
            <p className="text-sm text-[var(--text-vanilla-muted)]">High momentum in search volume intersecting with core audience segment.</p>
            <div className="grid grid-cols-2 gap-4 mt-2 border-t border-[var(--hairline)] pt-4">
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Momentum</span>
                <span className="text-[var(--status-emerald-text)] font-semibold flex items-center gap-1 mt-1"><TrendingUp size={14}/> High</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Saturation</span>
                <span className="text-[var(--status-emerald-text)] font-semibold flex items-center gap-1 mt-1">Low</span>
              </div>
            </div>
            <button className="btn-ghost w-full mt-2 justify-center">Generate Strategy</button>
          </div>
        </div>

        <div className="velvet-card">
          <div className="velvet-card-header">
            <h3 className="font-bold text-[var(--text-vanilla-high)]">Home Gym Setups</h3>
            <span className="badge badge-amber">Score: 72/100</span>
          </div>
          <div className="velvet-card-body flex flex-col gap-4">
            <p className="text-sm text-[var(--text-vanilla-muted)]">Stable search volume, but high competition in ad space.</p>
            <div className="grid grid-cols-2 gap-4 mt-2 border-t border-[var(--hairline)] pt-4">
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Momentum</span>
                <span className="text-[var(--status-amber-text)] font-semibold flex items-center gap-1 mt-1">Stable</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Saturation</span>
                <span className="text-[var(--status-rose-text)] font-semibold flex items-center gap-1 mt-1">High</span>
              </div>
            </div>
            <button className="btn-ghost w-full mt-2 justify-center">View Signals</button>
          </div>
        </div>

        <div className="velvet-card opacity-80">
          <div className="velvet-card-header">
            <h3 className="font-bold text-[var(--text-vanilla-high)]">Keto Diets</h3>
            <span className="badge badge-velvet">Score: 41/100</span>
          </div>
          <div className="velvet-card-body flex flex-col gap-4">
            <p className="text-sm text-[var(--text-vanilla-muted)]">Declining momentum and oversaturated content market.</p>
            <div className="grid grid-cols-2 gap-4 mt-2 border-t border-[var(--hairline)] pt-4">
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Momentum</span>
                <span className="text-[var(--status-rose-text)] font-semibold flex items-center gap-1 mt-1">Declining</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Saturation</span>
                <span className="text-[var(--status-rose-text)] font-semibold flex items-center gap-1 mt-1">Extreme</span>
              </div>
            </div>
            <button className="btn-ghost w-full mt-2 justify-center">View Signals</button>
          </div>
        </div>
      </section>
      
      {/* Content Gaps */}
      <section className="velvet-card">
        <div className="velvet-card-header">
          <div className="flex items-center gap-3">
            <Target className="text-[var(--text-vanilla-high)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Identified Content Gaps</h2>
          </div>
        </div>
        <div className="velvet-card-body p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--hairline)]">
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Gap Topic</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Audience Demand</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Current Coverage</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Post-workout sleep routines</td>
                <td className="p-4 text-[var(--status-emerald-text)] font-mono">High</td>
                <td className="p-4 text-[var(--status-rose-text)] font-mono">None</td>
                <td className="p-4"><button className="btn-ghost text-xs py-1.5 px-3">Create Brief</button></td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Mobility for office workers</td>
                <td className="p-4 text-[var(--status-emerald-text)] font-mono">High</td>
                <td className="p-4 text-[var(--status-amber-text)] font-mono">Low</td>
                <td className="p-4"><button className="btn-ghost text-xs py-1.5 px-3">Create Brief</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
